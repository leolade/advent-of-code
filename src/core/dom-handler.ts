export function setResult(v: string | number, parentDivId?: string): undefined {
  setValue(v, 'result', parentDivId);
}

export function setTimer(v: string, parentDivId?: string): undefined {
  setValue(v, 'timer', parentDivId);
}

export function setValue(
  v: unknown,
  divId: string,
  parentDivId?: string
): undefined {
  const parentDiv: HTMLElement | null = parentDivId
    ? document.getElementById(parentDivId)
    : document.body;

  if (!parentDiv) {
    return;
  }

  const resultElement: HTMLElement | null = parentDiv.querySelector(
    '#' + divId
  );
  if (!resultElement) {
    return;
  }
  resultElement.innerHTML = v + '';
}
