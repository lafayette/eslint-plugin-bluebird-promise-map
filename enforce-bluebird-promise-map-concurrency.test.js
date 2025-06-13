const { RuleTester } = require('eslint')
const rule = require('./enforce-bluebird-promise-map-concurrency')

const ruleTester = new RuleTester({
  languageOptions: { ecmaVersion: 2015 },
})

ruleTester.run(
  'enforce-bluebird-promise-map-concurrency',
  rule,
  {
    valid: [
      {
        code: "Promise.map(func, { concurrency: 10 })",
      },
    ],
    invalid: [
      {
        code: 'Promise.map(func)',
        errors: 1,
      },
      {
        code: 'Promise.map(func, { foo: "bar" })',
        errors: 1,
      },
    ],
  },
)

console.log('All tests passed!')
