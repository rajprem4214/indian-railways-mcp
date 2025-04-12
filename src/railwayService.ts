import { parseLiveStationStatus, parseTrainData } from "./railwayUtils.js";

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