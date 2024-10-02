const corsAnywhere = require('cors-anywhere');

// Define the port for the server
const PORT = process.env.PORT || 8080;

// Create and start the CORS Anywhere server
corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
