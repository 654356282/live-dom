# core

```html
<template>
  <div>{count}</div>
</template>

<script>
  import { reactive } from 'live-dom/core'

  const [count, setCount] = reactive(1) 

  autoRun(() => {
    console.log('update ', count())
  })

  setTimeout(() => {
    setCount(count()++)
  }, 100)
</script>
```

```js
<!-- comp.js -->
import { reactive } from 'live-dom'
function Comp() {

}

<!-- app.js -->
<template>
  <div>{name}</div>
  <Comp :name={name} />
</template>

<script>
  import { reactive, comp } from 'live-dom/core'
  import Comp from './comp'

  comp({ name: 'Comp', component: Comp })
  const [name, setName] = reactive('小明')

</script>
```
