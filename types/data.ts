export type Difficulty = "easy" | "medium" | "hard";
export type SquenceType = "exercise" | "stretch" | "break";
export interface Workout {
  slug: string;
  name: string;
  duration: number;
  difficulty: Difficulty;
  sequence: Sequence[];
}

export interface Sequence {
  slug: string;
  name: string;
  type: SquenceType;
  reps?: number;
  duration: number;
}
