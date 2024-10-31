SceneryStack examples with Vite/Parcel.
================

## Clone and NPM install

```sh
git clone https://github.com/scenerystack/demo-examples.git
cd demo-examples
npm install
```

## Run with Vite

```sh
npx vite preview
```

will run a server, browse to the URL (usually http://localhost:4173/) to see the demo.

## Run with Parcel

```sh
npx parcel index.html
```

will run a server, browse to the URL (usually http://localhost:1234/) to see the demo.

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