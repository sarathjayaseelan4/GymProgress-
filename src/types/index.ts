export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export interface WorkoutDayData {
  name: string;
  focus: string;
  muscles: string[];
}

export interface WorkoutSplit {
  name: string;
  days: WorkoutDayData[];
}

export interface SetData {
  reps: string;
  weight: string;
  rpe: string;
}
//cd path\to\your\project
npm install


export interface CompletedSet {
  set: number;
  reps: number;
  weight: number;
  rpe: number | null;
  timestamp: string;
}

export interface Exercise {
  name: string;
  sets: CompletedSet[];
}

export interface WorkoutSession {
  date: string;
  dayName: string;
  focus: string;
  muscles: string[];
  exercises: { [exerciseName: string]: CompletedSet[] };
  customExercises: string[];
  notes: string;
}