"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaVolumeMute } from "react-icons/fa";
import { pieceMarbleMachine } from "./constants";
import { keyMap } from "./sounds/sounds";

// constants
const piece = pieceMarbleMachine;
const lineCount = piece.keys.length;
const lookAhead = 20;
const totalLength = piece.length;
const beatLength = 60 / piece.bpm;

const MidiPlayer = () => {
  // canvas data
  const canvasRef = useRef(null);
  const canvasStart = useRef(performance.now());

  // audio data
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext>();
  const melodyPosition = useRef(0);
  const melodyStart = useRef(0);
  const audioBuffers = useRef<{
    [key: string]: { buffer: AudioBuffer | null; node: AudioBufferSourceNode };
  }>({});
  const [audioPlaying, setAudioPlaying] = useState(false);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, audioContext: AudioContext) => {
      ctx.canvas.width = ctx.canvas.clientWidth;
      ctx.canvas.height = ctx.canvas.clientHeight;

      const width = ctx.canvas.width;
      const height = ctx.canvas.height;
      const lineSpacing = width / (lineCount + 1);

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw vertical lines
      ctx.strokeStyle = "white";
      for (let i = 1; i <= lineCount; i++) {
        const x = i * lineSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // util function to draw a note
      const drawNote = (lane: number, ypos: number, colour = "white") => {
        ctx.beginPath();
        ctx.arc((lane + 1) * lineSpacing, ypos * height, 10, 0, 2 * Math.PI);
        ctx.fillStyle = colour;
        ctx.fill();
      };

      // note positions
      const noteNum =
        (performance.now() - canvasStart.current) / 1000 / beatLength;
      const keyNumber = Math.ceil(noteNum);
      const keyIndex = keyNumber;

      // render notes
      for (let i = 0; i < lookAhead; i++) {
        const notes: string[] | undefined =
          piece.notes[(keyIndex + i) % totalLength];
        if (!notes) continue;

        for (const note of notes) {
          const pos = i + (keyNumber - noteNum);
          drawNote(piece.keys.indexOf(note), 1 - pos / lookAhead);
        }
      }

      // play audio
      if (!audioPlaying) return;

      const target = noteNum + 2;
      for (
        let i = Math.max(melodyPosition.current, keyIndex);
        i <= target;
        i++
      ) {
        const notes: string[] | undefined = piece.notes[i % totalLength];
        if (!notes) continue;

        for (const note of notes) {
          audioBuffers.current[note]?.node?.start(
            i * beatLength + canvasStart.current / 1000 - melodyStart.current
          );
          audioBuffers.current[note].node = audioContext.createBufferSource();
          audioBuffers.current[note].node.buffer =
            audioBuffers.current[note].buffer;
          audioBuffers.current[note].node.connect(audioContext.destination);
        }
      }
      melodyPosition.current = Math.ceil(target);
    },
    [audioPlaying]
  );

  useEffect(() => {
    if (canvasRef.current === null || audioRef.current === null) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (context === null) return;

    const AudioContext = window.AudioContext || window?.webkitAudioContext;
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;

    for (const usedKey of piece.keys) {
      audioBuffers.current[usedKey] = {
        node: audioContext.createBufferSource(),
        buffer: null,
      };
      fetch(`/components/MidiPlayer/${keyMap?.[usedKey]}`)
        .then(res => res.arrayBuffer())
        .then(res => audioContext.decodeAudioData(res))
        .then(res => {
          audioBuffers.current[usedKey].buffer = res;
          audioBuffers.current[usedKey].node.buffer = res;
          audioBuffers.current[usedKey].node.connect(audioContext.destination);
        })
        .catch(err => console.error(err));
    }

    let animationFrameId: number | undefined;
    const render = () => {
      draw(context, audioContext);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      animationFrameId && window.cancelAnimationFrame(animationFrameId);
      audioContextRef.current
        ?.suspend()
        .catch(() => console.error("failed to suspend audio context"));
    };
  }, [draw]);

  return (
    <div className="flex h-full w-full justify-center">
      <button
        className="relative flex justify-center items-center w-full"
        onClick={() => {
          if (audioContextRef?.current?.state === "suspended") {
            audioContextRef.current?.resume().catch(err => console.log(err));
          }
          if (!audioPlaying) {
            // audioContext's currentTime does not run while suspended
            // syncs up the melody with the notes
            melodyStart.current = performance.now() / 1000;
          }
          setAudioPlaying(val => !val);
        }}
      >
        {audioPlaying ? null : (
          <FaVolumeMute
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "30%",
              height: "30%",
              translate: "-50% -50%",
            }}
          />
        )}
        <canvas
          style={{
            maxHeight: "90vh",
            minHeight: "400px",
            width: "100%",
            height: "100%",
          }}
          ref={canvasRef}
        />
        <audio ref={audioRef} />
      </button>
    </div>
  );
};

export default MidiPlayer;
