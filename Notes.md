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

### 3) Api is not refreshed with fast-refresh

### 4) No NextJS v12 doc

Since NextJS v13 I dont know where to find the v12 doc.

### 5) Add storybook to NextJS x PNPM Project

Currently, Pnpm support is still in the 7.0.0-beta version so we need no to install storybook with the `@next` version.

```bash
pnpm dlx sb@next init
```

[Storybook x NextJS](https://storybook.js.org/blog/integrate-nextjs-and-storybook-automatically/)   
[Make Storybook support PNPM PR](https://github.com/storybookjs/storybook/pull/19425)

### 6) Storybook not working on MacOS

I've installed storybook on my **Windows WSL (Ubuntu 20.04)** as i said in the [5th point](#5-add-storybook-to-nextjs-x-pnpm-project) and it was working correctly.

But on **MacOS** it didn't work, to fix it i had to install those dependencies : `css-loader postcss-loader resolve-url-loader sass-loader style-loader`

### 7) Render.com free-tier limitation 

Render.com socket connections are dropped after 5 minutes regardless of the activity

[Source](https://community.render.com/t/socket-io-in-a-node-app/3051)