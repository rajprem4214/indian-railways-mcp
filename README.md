# Indian Railways MCP Server

## Overview

The Indian Railways MCP Server provides live station status and train information using the Model Context Protocol (MCP). This server is designed to handle requests for live data from Indian Railways.

## Features

- Fetch live station status
- Retrieve train information
- Get train details between stations

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/indian-railways-mcp.git
   cd indian-railways-mcp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Test the functions:**
   ```bash
   npx ts-node src/testFunctions.ts
   ```

## API

### Get Station Live Status

- **Endpoint:** `tools/call`
- **Method:** `get-station-live-status`
- **Parameters:**
  - `stationCode`: The code of the station to get live status for.

### Get Train Details Between Stations

- **Endpoint:** `tools/call`
- **Method:** `get-trains-between-stations`
- **Parameters:**
  - `from`: Source station code.
  - `to`: Destination station code.

## Development

- **Build:** `npm run build`
- **Start:** `npm start`
- **Test:** `npx ts-node src/testFunctions.ts`

## Using with Claude

To use this server with Claude, follow these steps:

1. **Set Up Claude**: Ensure Claude is configured to interact with external APIs.
2. **Connect to MCP Server**: Use Claude's API integration to connect to the MCP server.
3. **Send Requests**: Use Claude to send requests to the server endpoints and process the responses.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.