import { getStationLiveStatus, getTrainDetails } from "./railwayService.js";

async function testGetStationLiveStatus(stationCode: string) {
  try {
    const result = await getStationLiveStatus(stationCode);
    console.log(`Live status for station ${stationCode}:`, result);
  } catch (error) {
    console.error("Error calling getStationLiveStatus:", error);
  }
}

async function testGetTrainDetails(trainNo: string) {
  try {
    const result = await getTrainDetails(trainNo);
    console.log(`Train details for train ${trainNo}:`, result);
  } catch (error) {
    console.error("Error calling getTrainDetails:", error);
  }
}   

// Example usage
// testGetStationLiveStatus("NDLS"); // Replace "NDLS" with the station code you want to test
testGetTrainDetails("12059"); // Replace "12345" with the train number you want to test
