import {Exercise} from './exercises/exercise';
import {runExercise} from './runner';
import {Exercise32024} from "./exercises/2024/3/exercise.ts";

/**
 * To change exercice, only edit next line.
 */
const exercice: Exercise = new Exercise32024();

runExercise(exercice);
