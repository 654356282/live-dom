import { is } from "shared";
import { Dep } from "./dep";
import { curEffect } from "./effect";

export type ReactData = string | number | boolean;

export class Reactive<T extends ReactData> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
}

function reader<T extends ReactData>(r: Reactive<T>): T {
  const value = r.value;

  if (curEffect) {
    // 订阅主题
    const dep = new Dep(r);
    dep.effects.add(curEffect);
  }

  return value;
}

function setter<T extends ReactData>(
  r: Reactive<T>,
  action: (state: T) => T | T
) {
  const oldValue = r.value;
  const newValue = typeof action === "function" ? action(r.value) : action;
  if (is(oldValue, newValue)) return;

  // 发布主题

  r.value = newValue;
}

export default function reactive<T extends ReactData>(initialData: T) {
  const r = new Reactive(initialData);
  return [reader.bind(r), setter.bind(r)];
}
