const development = {
  "ENV": "development",
  "API_URL": "https://test.adventuregold.org/api"
  // "API_URL": "https://staging-api.de-fine.art/v3"
}
// const development = {
//   "ENV": "production",
//   "API_URL": "https://api.de-fine.art/v3"
// }

// const production = {
//   "ENV": "development",
//   "API_URL": "https://staging-api.de-fine.art/v3"
// }
const production = {
  "ENV": "production",
  "API_URL": "https://test.adventuregold.org/api"
}

const env = { development, production }[process.env.NODE_ENV || 'development']

export default env;
