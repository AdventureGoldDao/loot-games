const development = {
  "ENV": "development",
  "API_URL": "https://test.adventuregold.org/api"
}
const production = {
  "ENV": "production",
  // "API_URL": "https://freemint-api.lootchain.com/api"
  "API_URL": "https://test.adventuregold.org/api"
}

const env = { development, production }[process.env.NODE_ENV || 'development']

export default env;
