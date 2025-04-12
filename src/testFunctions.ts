import { getStationLiveStatus } from "./railwayService.js";

async function testGetStationLiveStatus(stationCode: string) {
  try {
    const result = await getStationLiveStatus(stationCode);
    console.log(`Live status for station ${stationCode}:`, result);
  } catch (error) {
    console.error("Error calling getStationLiveStatus:", error);
  }
}

// Example usage
testGetStationLiveStatus("NDLS"); // Replace "NDLS" with the station code you want to test
