import { parseLiveStationStatus, parseTrainData, parseBetweenStationsData, parseRouteData, parsePnrStatus } from "./railwayUtils.js";
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

  export async function getTrainsOnDate<T>(from: string, to: string, date: string): Promise<T | null> {
    const arr: any[] = [];
    const retval: any = {};
    if (!date) {
      retval["success"] = false;
      retval["time_stamp"] = Date.now();
      retval["data"] = "Please Add Specific Date";
      return retval as T;
    }
    const URL_Trains = `https://erail.in/rail/getTrains.aspx?Station_From=${from}&Station_To=${to}&DataSource=0&Language=0&Cache=true`;
    try {
      const response = await fetch(URL_Trains);
      const data = await response.text();
      const json = parseBetweenStationsData(data);
      if (!json["success"]) {
        return json as T;
      }
      const [DD, MM, YYYY] = date.split("-");
      const day = getDayOnDate(DD, MM, YYYY);
      json["data"].forEach((ele: any) => {
        if (ele["train_base"]["running_days"][day] == 1) arr.push(ele);
      });
      retval["success"] = true;
      retval["time_stamp"] = Date.now();
      retval["data"] = arr;
      return retval as T;
    } catch (err: any) {
      console.log(err.message);
      return { success: false, error: err.message } as T;
    }
  }

  function getDayOnDate(day: string, month: string, year: string): number {
    const date = new Date(`${year}-${month}-${day}`);
    return date.getDay(); // Returns 0 (Sunday) to 6 (Saturday)
  }

  export async function getTrainRoute<T>(trainNo: string): Promise<T | null> {
    try {
      let URL_Train = `https://erail.in/rail/getTrains.aspx?TrainNo=${trainNo}&DataSource=0&Language=0&Cache=true`;
      let response = await fetch(URL_Train);
      let data = await response.text();
      let json = parseTrainData(data);
      if (!("success" in json) || !json.success) {
        return json as T;
      }
      URL_Train = `https://erail.in/data.aspx?Action=TRAINROUTE&Password=2012&Data1=${json.data.trainId}&Data2=0&Cache=true`;
      response = await fetch(URL_Train);
      data = await response.text();
      json = parseRouteData(data);
      return json as T;
    } catch (err: any) {
      console.log(err.message);
      return { success: false, error: err.message } as T;
    }
  }

  export async function getPnrStatus<T>(pnrNumber: string): Promise<T | null> {
    try {
      const URL_Train = `https://www.confirmtkt.com/pnr-status/${pnrNumber}`;
      const response = await fetch(URL_Train);
      const data = await response.text();
      const json = parsePnrStatus(data);
      return json as T;
    } catch (error: any) {
      console.log(error.message);
      return { success: false, error: error.message } as T;
    }
  }