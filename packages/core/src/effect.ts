export class Effect {
  public action: null | (() => void) = null;
  constructor(action: () => void) {
    this.action = action;
  }
}

export let curEffect: Effect | null = null;

/**
 * 提供副作用环境，如果在副作用环境中，则说明可以收集依赖
 */
export default function effect(fn: () => void) {
  const preEffect = curEffect;
  try {
    curEffect = new Effect(fn);
    fn();
  } finally {
    curEffect = preEffect;
  }
}
