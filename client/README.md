# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## tailwind css

1.  npm install -D tailwindcss postcss autoprefixer
2.  npx tailwindcss init -p

# create jsconfig.json file and below

    {

"compilerOptions": {
// ...
"baseUrl": ".",
"paths": {
"@/_": [
"./src/_"
]
}
// ...
}
}

## edit config file

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
plugins: [react()],
resolve: {
alias: {
"@": path.resolve(\_\_dirname, "./src"),
},
},
})

## add shadcn/ui for components

1.  npx shadcn-ui@latest init
2.  npx shadcn-ui@latest add button

## react router

-- npm i react-router-dom
--- https://reactrouter.com/en/main
