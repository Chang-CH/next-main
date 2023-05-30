export interface notes {
  [time: number]: string[];
}

const marbleMachineNotes: notes = {
  0: ["E6"],
  2: ["E5", "B4"],
  3: ["B5"],
  6: ["E5", "B4"],
  7: ["A5"],
  8: ["G5"],
  9: ["A5"],
  10: ["E5", "B4"],
  11: ["B5"],
  13: ["G5"],
  14: ["A5", "B4", "E5"],
  15: ["D6"],
  18: ["D5", "B4"],
  19: ["B5"],
  22: ["B4", "D5"],
  23: ["A5"],
  24: ["G5"],
  25: ["A5"],
  26: ["D5", "B4"],
  27: ["F#5"],
  29: ["G5"],
  30: ["D5", "A5", "B4"],
  31: ["D6"],
  34: ["F#5", "D5"],
  35: ["B5"],
  38: ["D5", "F#5"],
  39: ["D6"],
  40: ["C6"],
  41: ["B5"],
  42: ["D5", "F#5"],
  43: ["A5"],
  45: ["G5"],
  46: ["F#5", "D5", "A5"],
  47: ["E5"],
  49: ["C5"],
  50: ["E5"],
  51: ["B5"],
  52: ["B4"],
  53: ["C5"],
  54: ["D5"],
  55: ["D6"],
  56: ["C6"],
  57: ["B5"],
  58: ["F#5", "D5"],
  59: ["A5"],
  61: ["G5"],
  62: ["A5", "F#5", "D5"],
};

const marbleMachineKeys = [
  "D5",
  "B5",
  "F#5",
  "D6",
  "A5",
  "C5",
  "E5",
  "E6",
  "G5",
  "B4",
  "C6",
];

const marbleMachineBpm = 144;

const marbleMachineLength = 63;

export interface piece {
  notes: notes;
  keys: string[];
  bpm: number;
  length: number;
}

export const pieceMarbleMachine: piece = {
  notes: marbleMachineNotes,
  keys: marbleMachineKeys,
  bpm: marbleMachineBpm,
  length: marbleMachineLength,
};
