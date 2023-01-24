const {rest} = require("../operations/rest.cjs")

function eightMinusFour() {
  return rest(8, 4)
}

module.exports = {
  eightMinusFour,
}
