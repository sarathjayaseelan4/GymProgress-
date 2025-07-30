import { WorkoutSplit } from '../types';

export const WORKOUT_SPLITS: { [key: number]: WorkoutSplit } = {
  1: {
    name: "Full Body",
    days: [
      { name: "Day 1", focus: "Full Body", muscles: ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core"] }
    ]
  },
  2: {
    name: "Upper/Lower",
    days: [
      { name: "Day 1", focus: "Upper", muscles: ["Chest", "Back", "Shoulders", "Arms"] },
      { name: "Day 2", focus: "Lower", muscles: ["Legs", "Glutes", "Calves"] }
    ]
  },
  3: {
    name: "Upper/Lower/Full",
    days: [
      { name: "Day 1", focus: "Upper", muscles: ["Chest", "Back", "Shoulders", "Arms"] },
      { name: "Day 2", focus: "Lower", muscles: ["Legs", "Glutes", "Calves"] },
      { name: "Day 3", focus: "Full Body", muscles: ["Core", "Neglected Muscles"] }
    ]
  },
  4: {
    name: "Upper/Lower/Upper/Lower",
    days: [
      { name: "Day 1", focus: "Upper", muscles: ["Chest", "Back", "Shoulders", "Arms"] },
      { name: "Day 2", focus: "Lower", muscles: ["Legs", "Glutes", "Calves"] },
      { name: "Day 3", focus: "Upper", muscles: ["Chest", "Back", "Shoulders", "Arms"] },
      { name: "Day 4", focus: "Lower", muscles: ["Legs", "Glutes", "Calves"] }
    ]
  },
  5: {
    name: "Upper/Lower/Push/Pull/Legs",
    days: [
      { name: "Day 1", focus: "Upper", muscles: ["Chest", "Back", "Shoulders", "Arms"] },
      { name: "Day 2", focus: "Lower", muscles: ["Legs", "Glutes", "Calves"] },
      { name: "Day 3", focus: "Push", muscles: ["Chest", "Shoulders", "Triceps"] },
      { name: "Day 4", focus: "Pull", muscles: ["Back", "Biceps"] },
      { name: "Day 5", focus: "Legs", muscles: ["Legs", "Glutes", "Calves"] }
    ]
  },
  6: {
    name: "Push/Pull/Legs (x2)",
    days: [
      { name: "Day 1", focus: "Push", muscles: ["Chest", "Shoulders", "Triceps"] },
      { name: "Day 2", focus: "Pull", muscles: ["Back", "Biceps"] },
      { name: "Day 3", focus: "Legs", muscles: ["Legs", "Glutes", "Calves"] },
      { name: "Day 4", focus: "Push", muscles: ["Chest", "Shoulders", "Triceps"] },
      { name: "Day 5", focus: "Pull", muscles: ["Back", "Biceps"] },
      { name: "Day 6", focus: "Legs", muscles: ["Legs", "Glutes", "Calves"] }
    ]
  }
};