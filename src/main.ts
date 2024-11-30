import { Exercise } from './exercises/exercise';
import { Exercise12020 } from './exercises/exercise-1-2020/exercise-1-2020';
import { runExercise } from './runner';

/**
 * To change exercice, only edit next line.
 */
const exercice: Exercise = new Exercise12020();

runExercise(exercice);
