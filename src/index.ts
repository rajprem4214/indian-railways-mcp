import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getStationLiveStatus } from "./railwayService.js";
import { TrainInfo, LiveStationStatusResponse } from "./railwayUtils.js";

// Create server instance
const server = new McpServer({
  name: "indian-railways-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
    "get-station-live-status",
    "Get live station status",
   {
    stationCode: z.string().describe("The station code to get live status for"),
   },
   async ({ stationCode }) => {
    const liveStationCode = stationCode.toUpperCase();
    const stationStatusResponse = await getStationLiveStatus<LiveStationStatusResponse>(liveStationCode);
    const stationStatus = stationStatusResponse?.station;
    const trains = stationStatusResponse?.trains;

    if (!stationStatus || !trains) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error fetching live station status for ${liveStationCode}`,
                }
            ]
        }
    }

    return {
        content: [
            {
                type: "text",
                text: `Live status for station ${liveStationCode}: ${stationStatus}`,
            },
            {
                type: "text",
                text: `Trains: ${trains?.map((train: TrainInfo) => `${train.name} - ${train.time}`).join(", ")}`,
            }
        ]
    }
   }
)

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Indian Railway MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });