import test from "ava"
import path from "node:path"
import {fileURLToPath} from "node:url"
import {importDirectory} from "../index.js"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = dir => path.resolve(dirname, dir)
const everyKeyStartsWith = (obj, startsWith) => Object.keys(obj).every(path => path.startsWith(startsWith))
const getLength = o => Object.keys(o).length

const CONSTANTS = {
  NUMBER_OF_FILES: {
    TOTAL: 9,
    JS: 6,
    CJS: 2,
    MJS: 1,
    ACTIONS: 4,
    OPERATION: 4,
  },
}

test("should import directory", async t => {
  const actions = await importDirectory(resolve("actions"))

  const {
    "/eightMinusFour.cjs": {eightMinusFour},
    "/fiveTimesFive.mjs": {fiveTimesFive},
    "/onePlusTen.js": {onePlusTen},
    "/tenDivideTwo.js": {tenDivideTwo},
  } = actions

  t.deepEqual(getLength(actions), 4)
  t.deepEqual(eightMinusFour(), 4)
  t.deepEqual(fiveTimesFive(), 25)
  t.deepEqual(onePlusTen(), 11)
  t.deepEqual(tenDivideTwo(), 5)
})

test("should import directory without file extensions", async t => {
  const operations = await importDirectory(resolve("operations"), {removeExtensionFile: true})

  const {
    "/divide": {divide},
    "/multiply": {multiply},
    "/rest": {rest},
    "/sum": {sum},
  } = operations

  t.deepEqual(getLength(operations), 4)
  t.deepEqual(divide(5, 1), 5)
  t.deepEqual(multiply(10, 3), 30)
  t.deepEqual(rest(100, 1), 99)
  t.deepEqual(sum(11, 111, 78), 200)
})

test("should import directory with path on key", async t => {
  const directory = resolve("operations")

  const operations = await importDirectory(directory, {keepPathOnKey: true})

  const withPathOnKey = everyKeyStartsWith(operations, directory)

  t.deepEqual(withPathOnKey, true)
})

test("should import directory with prefix key", async t => {
  const prefixKey = "/actions"

  const actions = await importDirectory(resolve("actions"), {
    prefixKey,
  })

  const withPreficKey = everyKeyStartsWith(actions, prefixKey)

  t.deepEqual(withPreficKey, true)
})

test("should import directory with the given extensions", async t => {
  const directory = resolve(".")

  const [totalFiles, jsFiles, cjsFiles, mjsFiles] = await Promise.all([
    importDirectory(directory),
    importDirectory(directory, {extensions: [".js"]}),
    importDirectory(directory, {extensions: [".cjs"]}),
    importDirectory(directory, {extensions: [".mjs"]}),
  ])

  t.deepEqual(getLength(totalFiles), CONSTANTS.NUMBER_OF_FILES.TOTAL)
  t.deepEqual(getLength(jsFiles), CONSTANTS.NUMBER_OF_FILES.JS)
  t.deepEqual(getLength(cjsFiles), CONSTANTS.NUMBER_OF_FILES.CJS)
  t.deepEqual(getLength(mjsFiles), CONSTANTS.NUMBER_OF_FILES.MJS)
})

test("should throw error when importing json files", async t => {
  const getJsonFiles = () => importDirectory(resolve("actions"), {extensions: [".json"]})

  await t.throwsAsync(getJsonFiles)
})
