export class Effect {
  public action: null | (() => void) = null;
  constructor(action: () => void) {
    this.action = action;
  }
}

export let curEffect: Effect | null = null;

export default function effect(fn: () => void) {
  const preEffect = curEffect;
  try {
    curEffect = new Effect(fn);
    fn();
  } finally {
    curEffect = preEffect;
  }
}
