import { parseLiveStationStatus, parseTrainData, parseBetweenStationsData } from "./railwayUtils.js";
// Global URL constants
const ERAIL_BASE_URL = "https://erail.in/rail/getTrains.aspx";
const CONFIRMTKT_BASE_URL = "https://www.confirmtkt.com/pnr-status";
const ERAIL_STATION_LIVE_URL = "https://erail.in/station-live";
const ERAIL_ROUTE_URL = "https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=";


// Function to get live station status
export async function getStationLiveStatus<T>(code: string): Promise<T | null> {
    const URL_Train = `${ERAIL_STATION_LIVE_URL}/${code}?DataSource=0&Language=0&Cache=true`;
    try {
      const response = await fetch(URL_Train);
      const html = await response.text();
      return parseLiveStationStatus(html) as T;
    } catch (err: any) {
      throw new Error(err.message);
    }   
  }


  export async function getTrainDetails<T>(trainNo: string): Promise<T | null> {
    const URL_Train = `${ERAIL_BASE_URL}?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
    try {
      const response = await fetch(URL_Train);
      const data = await response.text();
      const json = parseTrainData(data);
      return json as T;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }
  

  export async function getTrainsBetweenStations<T>(from: string, to: string): Promise<T | null> {
    const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    try {
      const response = await fetch(URL_Trains);
      const data = await response.text();
      const json = parseBetweenStationsData(data); // Implement this function to parse the response
      return json as T;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Failed to fetch trains between stations");
    }
  }