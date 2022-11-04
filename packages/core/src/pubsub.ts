import { Effect } from "./effect";
import { Reactive } from "./reactive";

class PubSub<T, E> {
  groups: Map<T, Set<E>> = new Map();
  subscribe(topic: T, effect: E) {
    if(!this.groups.has(topic)) {

    }
  }
}

const pubsub = new PubSub();
export default pubsub;
