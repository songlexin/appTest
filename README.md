# vue-vite-h5

This template should help get you started developing mobile applications with Vue3 and Typescript and Vant in Vite.

## Project setup

```
yarn
```

### Compiles and hot-reloads for development

```
yarn start
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files (eslint + prettier)

```
yarn lint
```

### Generate component(page) templates for development

```
yarn generate
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).

## Browser adaptation

### Rem Unit (default)

Vant uses `px` unit by default,You can use tools such as `postcss-pxtorem` to transform `px` unit to `rem` unit.

- [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
- [lib-flexible](https://github.com/amfe/lib-flexible)

#### PostCSS Config

PostCSS config example:

```js
// .postcssrc.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
};
```

### Viewport Units

you can use tools such as [postcss--px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) to transform `px` unit to viewport units (vw, vh, vmin, vmax).

#### PostCSS Config

PostCSS config example:

```js
// .postcssrc.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
};
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
