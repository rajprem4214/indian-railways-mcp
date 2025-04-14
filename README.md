# Indian Railways MCP Server

## Overview

The Indian Railways MCP Server provides live station status and train information using the Model Context Protocol (MCP). This server is designed to handle requests for live data from Indian Railways.

## Features

- Fetch live station status
- Retrieve train information
- Get train details between stations
- Get train details on a specific date
- Retrieve train route information
- Check PNR status

## Demo
https://github.com/user-attachments/assets/3f751174-cb0e-43b0-86a5-5493ab3da1e5



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
   node --loader ts-node/esm src/testFunctions.ts
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

### Get Train Details on a Specific Date

- **Endpoint:** `tools/call`
- **Method:** `get-trains-on-date`
- **Parameters:**
  - `from`: Source station code.
  - `to`: Destination station code.
  - `date`: Date in `YYYY-MM-DD` format.

### Retrieve Train Route Information

- **Endpoint:** `tools/call`
- **Method:** `get-train-route`
- **Parameters:**
  - `trainNo`: Train number.

### Check PNR Status

- **Endpoint:** `tools/call`
- **Method:** `get-pnr-status`
- **Parameters:**
  - `pnr`: PNR number.

## Sample Queries

Here are some example queries you can use with the API:

- **Get live railway station status for NDLS:**
  ```json
  {
    "method": "get-station-live-status",
    "params": {
      "stationCode": "NDLS"
    }
  }
  ```

- **Get all details of train number 12059:**
  ```json
  {
    "method": "get-train-details",
    "params": {
      "trainNo": "12059"
    }
  }
  ```

- **Fetch complete route of train number 12059:**
  ```json
  {
    "method": "get-train-route",
    "params": {
      "trainNo": "12059"
    }
  }
  ```

- **Get all trains running between GODA and NDLS:**
  ```json
  {
    "method": "get-trains-between-stations",
    "params": {
      "from": "GODA",
      "to": "NDLS"
    }
  }
  ```

## Development

- **Build:** `npm run build`
- **Start:** `npm start`
- **Test:** `npx ts-node src/testFunctions.ts`

## Using with Claude

To integrate this server with Claude, follow these steps:

1. **Configure Claude Desktop**: Add the following configuration to your Claude Desktop config file:

   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

   ```json
   {
     "mcpServers": {
       "indian-railways-mcp": {
         "command": "node",
         "args": [
           "F:\\railways-mcp\\indian-railways-mcp\\build\\index.js"
         ]
       }
     }
   }
   ```

2. **Restart Claude Desktop**: After updating the configuration file, restart Claude Desktop to apply the changes.

This setup will allow Claude to connect to the Indian Railways MCP Server and handle requests seamlessly.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
