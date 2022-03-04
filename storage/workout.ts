import { containsKey, getData, storeData } from ".";
import data from "../data.json";
import { Workout } from "../types/data";

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData("workout");
  return workouts;
};

export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
  const workouts = await getWorkouts();
  const workout = workouts.filter((w) => w.slug === slug)[0];
  return workout;
};

export const initWorkouts = async (): Promise<boolean> => {
  const hasWorkData = await containsKey("workout");
  if (!hasWorkData) {
    await storeData("workout", data);
    return true;
  }
  return false;
};

export const storeWorkout = async (newWorkout: Workout): Promise<boolean> => {
  const workouts = await getWorkouts();
  await storeData("workout", newWorkout);
  return true;
};
