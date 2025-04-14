import { getPnrStatus, getStationLiveStatus, getTrainDetails, getTrainRoute, getTrainsBetweenStations, getTrainsOnDate } from "./railwayService.js";

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

async function testGetTrainRoute(trainNo: string) {
  try {
    const result = await getTrainRoute(trainNo);
    console.log(`Train route for train ${trainNo}:`, result);
  } catch (error) {
    console.error("Error calling getTrainRoute:", error);
  }
}

async function testGetTrainsOnDate(from: string, to: string, date: string) {
  try {
    const result = await getTrainsOnDate(from, to, date);
    console.log(`Trains on date ${date} between stations ${from} and ${to}:`, result);
  } catch (error) {
    console.error("Error calling getTrainsOnDate:", error);
  }
} 

async function testGetPnrStatus(pnrNumber: string) {
  try {
    const result = await getPnrStatus(pnrNumber);
    console.log(`PNR status for PNR number ${pnrNumber}:`, result);
  } catch (error) {
    console.error("Error calling getPnrStatus:", error);
  }
}


// Example usage
// testGetStationLiveStatus("NDLS"); // Replace "NDLS" with the station code you want to test
// testGetTrainDetails("12059"); // Replace "12345" with the train number you want to test
// testGetTrainsBetweenStations("NDLS", "GODA"); // Replace "NDLS" and "BCT" with the stations you want to test
// testGetTrainRoute("12059"); // Replace "12345" with the train number you want to test
testGetTrainsOnDate("NDLS", "GODA", "2025-04-13"); // Replace "NDLS" and "BCT" with the stations you want to test
// testGetPnrStatus("1234567890"); // Replace "1234567890" with the PNR number you want to test