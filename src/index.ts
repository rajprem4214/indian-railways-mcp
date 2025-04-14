import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { getStationLiveStatus, getTrainDetails, getTrainsBetweenStations, getTrainRoute, getTrainsOnDate, getPnrStatus } from "./railwayService.js";
import { TrainInfo, LiveStationStatusResponse, TrainDetailsResponse, TrainsBetweenStationsResponse, TrainRouteResponse, TrainsOnDateResponse, PnrStatusResponse } from "./railwayUtils.js";

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

server.tool(
    "get-train-route",
    "Get train route by train number",
    {
        trainNumber: z.string().describe("The train number to get route for"),
    },
    async ({ trainNumber }) => {
        const trainRouteResponse = await getTrainRoute<TrainRouteResponse>(trainNumber);

        if (!trainRouteResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching train route for ${trainNumber}`,
                    }
                ]
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: `Train route for ${trainNumber}: ${JSON.stringify(trainRouteResponse)}`,
                }
            ]
        }   
    }   
)

server.tool(
    "get-trains-on-date",
    "Get trains between two stations on a specific date",
    {
        from: z.string().describe("The starting station code"), 
        to: z.string().describe("The destination station code"),
        date: z.string().describe("The date to get trains for"),
    },
    async ({ from, to, date }) => {
        const trainsOnDateResponse = await getTrainsOnDate<TrainsOnDateResponse>(from, to, date);

        if (!trainsOnDateResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching trains on date ${date} between stations ${from} and ${to}`,
                    }
                ]
            }
        }   

        return {
            content: [
                {
                    type: "text",
                    text: `Trains on date ${date} between stations ${from} and ${to}: ${JSON.stringify(trainsOnDateResponse)}`,
                }
            ]
        }   
    }
)   

server.tool(
    "get-pnr-status",
    "Get PNR status by PNR number",
    {
        pnrNumber: z.string().describe("The PNR number to get status for"),
    },  
    async ({ pnrNumber }) => {
            const pnrStatusResponse = await getPnrStatus<PnrStatusResponse>(pnrNumber);

        if (!pnrStatusResponse) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error fetching PNR status for ${pnrNumber}`,
                    }
                ]
            }
        }

        return {
            content: [
                {
                    type: "text",
                    text: `PNR status for ${pnrNumber}: ${JSON.stringify(pnrStatusResponse)}`,
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