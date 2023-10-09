#!/usr/bin/env node
function foo() {
  console.log('npm publish')
}
const Axios = require('axios')
export { foo as default, Axios }
