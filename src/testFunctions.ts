import { getStationLiveStatus, getTrainDetails, getTrainsBetweenStations } from "./railwayService.js";

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

async function testGetTrainsBetweenStations(from: string, to: string) {
  try {
    const result = await getTrainsBetweenStations(from, to);
    if (!result) {
      console.error("No result returned from getTrainsBetweenStations");
      return;
    }   
    console.log(`Trains between stations ${from} and ${to}:`, result);
  } catch (error) {
    console.error("Error calling getTrainsBetweenStations:", error);
  }
}

// Example usage
// testGetStationLiveStatus("NDLS"); // Replace "NDLS" with the station code you want to test
// testGetTrainDetails("12059"); // Replace "12345" with the train number you want to test
testGetTrainsBetweenStations("NDLS", "GODA"); // Replace "NDLS" and "BCT" with the stations you want to test
