import { setResult, setTimer, setValue } from './core/dom-handler';
import { Exercise } from './exercises/exercise';

export function runExercise(e: Exercise): void {
  setValue(e.aocYear + '', 'year');
  setValue(e.aocDay + '', 'day');
  setValue(e.aocName + '', 'name');
  setTimer('Pending...', 'part-1');
  setTimer('Pending...', 'part-2');
  let startTimer: Date = new Date();
  setResult(e.getPart1Result(), 'part-1');
  setTimer(new Date().getTime() - startTimer.getTime() + 'ms', 'part-1');
  startTimer = new Date();
  setResult(e.getPart2Result(), 'part-2');
  setTimer(new Date().getTime() - startTimer.getTime() + 'ms', 'part-2');
}
