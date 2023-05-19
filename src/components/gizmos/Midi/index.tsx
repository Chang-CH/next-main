"use client";

import React, { useEffect, useRef } from "react";
import {
  marbleMachineKeys,
  marbleMachineLength,
  marbleMachineNotes,
} from "./constants";

const MidiPlayer = () => {
  const canvasRef = useRef(null);
  const lineCount = 10;
  const lookAhead = 50;
  const totalLength = marbleMachineLength;

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.canvas.width = ctx.canvas.clientWidth;
    ctx.canvas.height = ctx.canvas.clientHeight;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const lineSpacing = width / (lineCount + 1);

    // Clear canvas
    ctx.clearRect(0, 0, width, height); //TODO: can remove?

    // Draw vertical lines
    ctx.strokeStyle = "black";
    for (let i = 1; i <= lineCount; i++) {
      const x = i * lineSpacing;
      ctx.beginPath();
      ctx.moveTo(x, 0); // TODO: can remove?
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // util function to draw a note
    const drawNote = (lane: number, ypos: number) => {
      ctx.beginPath();
      ctx.arc(
        (lane + 1) * lineSpacing,
        (ypos / lookAhead) * height,
        10,
        0,
        2 * Math.PI
      );
      ctx.fill();
    };

    const frame = frameCount % totalLength;
    for (let i = 0; i < lookAhead; i++) {
      const notes: string[] | undefined =
        marbleMachineNotes[(frame + i) % totalLength];

      if (!notes) continue;

      for (const note of notes) {
        drawNote(marbleMachineKeys.indexOf(note), i);
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current === null) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    // @ts-ignore
    const context: CanvasRenderingContext2D = canvas.getContext("2d");

    let frameCount = 0;
    let animationFrameId: number | undefined;

    // Our draw came here
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      animationFrameId && window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas className="w-[512px] h-[512px]" ref={canvasRef} />;
};

export default MidiPlayer;
