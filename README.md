# Import directories

> recursively imports all files in a directory

## Install

```bash
# npm
npm install import-directories

# yarn
yarn add import-directories
```

## Usage

### Import Directory

```js
import { importDirectory } from "import-directories";

const foo = await importDirectory("./foo");

console.log(foo);
// => { "/bar.js": { foobar: 2 } }
```

#### Remove the extension file

```js
import { importDirectory } from "import-directories";

const foo = await importDirectory("./foo", { removeExtensionFile: true });

console.log(foo);
// => { "/bar": { foobar: "Hello World" } }
```

#### Keep the absolute file path on the key

```js
import { importDirectory } from "import-directories";

const foo = await importDirectory("./foo", { keepPathOnKey: true });

console.log(foo);
// => { "/home/user/foo/bar.js": { foobar: "raboof" } }
```

#### Prefix Key

```js
import { importDirectory } from "import-directories";

const foo = await importDirectory("./foo", { prefixKey: "/foobar-app" });

console.log(foo);
// => {
//   "/foobar-app/foo.js": { foo: "bar" }
//   "/foobar-app/bar.js": { bar: "foo" }
// }
```

## Related

- [express-router-helpers](https://github.com/iswilljr/express-router-helpers) - create your route handlers easier and autoload routes
