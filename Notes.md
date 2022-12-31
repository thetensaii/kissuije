# My notes

### 1) No type checking in dev environment
When we launch the dev environment with the `next dev` command, there is no type checking, it is like coding in javascript. You are only able to see type error on runtime.   
   
At least, there is type checking at build time (`next build`).
   
It seems like, there is no type checking for performance reason and DX improvement, mais personally i prefer a type safe environment more than a very fast HMR.
   
(The github discussion on the problem [HERE](https://github.com/vercel/next.js/discussions/33634))
   
My Solution : 
```json
(package.json)

"scripts": {
  "dev": "concurrently -n NEXT,TS -c magenta,cyan \"next dev\" \"pnpm ts --watch\"",
  "ts": "tsc --noEmit --incremental --preserveWatchOutput --pretty",
}
```

### 2) Whole page component is re-renderered on every game update
As i put the game logic in only ONE **React Context** that is use in every component.   
   
If some context data is updated, every component which subscribed to the context are re-rendered, even if they don't use the updated data which is not performant.
   
But, we'll see later.

