import { Effect } from "./effect";
import { Reactive } from "./reactive";

export class Dep {
  public el: any;
  public effects: Set<Effect> = new Set();
  public reactive: Reactive<any>;
  constructor(r: Reactive<any>) {
    this.reactive = r;
  }
}
