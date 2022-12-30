# Mes notes

### 1) Pas de type check en dev (Discussion lié au problème : )
Lorsque l'on lance notre environnement de dev avec la commande `next dev`, aucun type checking n'est fait, c'est un peu comme développé en javascript du coup.    
Au moins il y a un type checking au moment du build.   
À Priori il n'y a pas de type checking pour des raisons de performance afin d'améliorer la DX, mais personellement je préfère un environnement type safe qu'un HMR très rapide.   
(Discussion concernant le problème : [ICI](https://github.com/vercel/next.js/discussions/33634))

Solution : 
```json
(package.json)

"scripts": {
  "dev": "concurrently -n NEXT,TS -c magenta,cyan \"next dev\" \"pnpm ts --watch\"",
  "ts": "tsc --noEmit --incremental --preserveWatchOutput --pretty",
}
```
