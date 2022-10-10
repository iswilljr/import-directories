import test from "ava"
import {importDirectory} from "../index.js"

test("import directory operations", async t => {
  const operations = await importDirectory("./__test__/operations", {
    removeExtensionFile: true,
  })

  const {
    "/divide": {divide},
    "/multiply": {multiply},
    "/rest": {rest},
    "/sum": {sum},
  } = operations

  t.deepEqual(divide(5, 1), 5)
  t.deepEqual(multiply(10, 3), 30)
  t.deepEqual(rest(100, 1), 99)
  t.deepEqual(sum(11, 111, 78), 200)
})

test("import directory actions", async t => {
  const actions = await importDirectory("./__test__/actions", {
    prefixKey: "/actions",
  })

  const {
    "/actions/eightMinusFour.js": {eightMinusFour},
    "/actions/fiveTimesFive.js": {fiveTimesFive},
    "/actions/onePlusTen.js": {onePlusTen},
    "/actions/tenDivideTwo.js": {tenDivideTwo},
  } = actions

  t.deepEqual(eightMinusFour(), 4)
  t.deepEqual(fiveTimesFive(), 25)
  t.deepEqual(onePlusTen(), 11)
  t.deepEqual(tenDivideTwo(), 5)
})
