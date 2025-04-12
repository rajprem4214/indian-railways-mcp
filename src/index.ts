import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getStationLiveStatus, getTrainDetails, getTrainsBetweenStations } from "./railwayService.js";
import { TrainInfo, LiveStationStatusResponse, TrainDetailsResponse, TrainsBetweenStationsResponse } from "./railwayUtils.js";

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

server.tool(
    "get-train-details",
    "Get train details by train number",
    {
        trainNumber: z.string().describe("The train number to get details for"),
    },
    async ({ trainNumber }) => {
        const trainDetailsResponse = await getTrainDetails<TrainDetailsResponse>(trainNumber);

        if (!trainDetailsResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching train details for ${trainNumber}`,
                    }
                ]
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: `Train details for ${trainNumber}: ${JSON.stringify(trainDetailsResponse)}`,  
                }
            ]
        }
    }   
)       

server.tool(
    "get-trains-between-stations",
    "Get trains between two stations",
    {
        from: z.string().describe("The starting station code"),
        to: z.string().describe("The destination station code"),
    },
    async ({ from, to }) => {
            const trainsBetweenStationsResponse = await getTrainsBetweenStations<TrainsBetweenStationsResponse>(from, to);

        if (!trainsBetweenStationsResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching trains between stations ${from} and ${to}`,
                    }
                ]
            }
        }       

        return {
            content: [
                {
                    type: "text",
                    text: `Trains between stations ${from} and ${to}: ${JSON.stringify(trainsBetweenStationsResponse)}`,
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