SceneryStack examples with Vite/Parcel/Webpack.
================

## Clone and NPM install

```sh
git clone https://github.com/scenerystack/demo-examples.git
cd demo-examples
npm install
```

## Run with Vite

```sh
npx vite
```

will run a server, browse to the URL (usually http://localhost:5173/) to see the demo.

## Run with Parcel

```sh
npx parcel index.html
```

will run a server, browse to the URL (usually http://localhost:1234/) to see the demo.

## Run with Webpack

```sh
npm run webpack-serve
````

will run a server, browse to the URL (usually http://localhost:8080/) to see the demo.

## Build with Vite

```sh
npx vite build
```

This will build into the `dist` directory, view dist/index.html in a browser.

## Build with Parcel

```sh
npx parcel build index.html --public-url .
```

This will build into the `dist` directory, view dist/index.html in a browser.

## Build with Webpack

```sh
npm run webpack-build
```

This will build into the `dist` directory, view dist/index.html in a browser.