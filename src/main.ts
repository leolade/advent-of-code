import {Exercise} from './exercises/exercise';
import {runExercise} from './runner';
import {Exercise42024} from "./exercises/2024/4/exercise.ts";

/**
 * To change exercice, only edit next line.
 */
const exercice: Exercise = new Exercise42024();

runExercise(exercice);
