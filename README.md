# notily-react

[![npm](https://img.shields.io/npm/v/notily-react.svg?style=flat-square)](https://www.npmjs.com/package/notily-react)

An annotation tool for react.

![notily-react demo](https://raw.githubusercontent.com/RandyLiu6410/notily-react/main/images/demo.png)

## Installation

Install it from npm and include it in your React build process (using [Webpack](http://webpack.github.io/), [Browserify](http://browserify.org/), etc).

```bash
npm install --save notily-react
```

or:

```bash
yarn add notily-react
```

## Usage

```jsx static
import { NotilyReact } from "notily-react";
import "notily-react/dist/style.css";

function App() {
  return (
    <>
      <NotilyReact options={{ ... }} />
    </>
  );
}
```

## NotilyReactOptions

| key                | type                                                    |
| ------------------ | ------------------------------------------------------- |
| className          | string (optional)                                       |
| onComponentsChange | (components: NotilyReactComponent[]) => void (optional) |

## License

MIT
