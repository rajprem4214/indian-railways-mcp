# Indian Railways MCP Server

## Overview

The Indian Railways MCP Server provides live station status and train information using the Model Context Protocol (MCP). This server is designed to handle requests for live data from Indian Railways.

## Features

- Fetch live station status
- Retrieve train information

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

## Development

- **Build:** `npm run build`
- **Start:** `npm start`
- **Test:** `npx ts-node src/testFunctions.ts`

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
