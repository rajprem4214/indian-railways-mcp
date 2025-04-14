import { JSDOM } from "jsdom";

export interface TrainInfo {
  name: string;
  time: string;
}

export interface StationStatus {
  station: string;
  trains: TrainInfo[];
}

export interface LiveStationStatusResponse {
  station: string;
  trains: TrainInfo[];
}

export interface TrainDetailsResponse {
  trainNumber: string;
  trainName: string;
  sourceStationName: string;
  sourceStationCode: string;
  destinationStationName: string;
  destinationStationCode: string;
  departureTime: string;
  arrivalTime: string;
  travelDuration: string;
  operatingDays: string;
  trainType: string;
  trainId: string;
  distance: string;
  averageSpeed: string; 
}

export interface TrainsBetweenStationsResponse {
  success: boolean;
  time_stamp: number;
  data: TrainDetailsResponse[];
}

export interface TrainRoute {
  sourceStationName: string;
  sourceStationCode: string;
  arrivalTime: string;
  departureTime: string;
  distance: string; 
  day: string;
  zone: string;
} 

export interface TrainRouteResponse {
  success: boolean;
  time_stamp: number;
  data: TrainRoute[];
}

export interface TrainsOnDateResponse {
  success: boolean;
  time_stamp: number;
  data: TrainInfo[];
}

export interface PnrStatusResponse {
  success: boolean;
  time_stamp: number;
  data: any;
}

// Function to parse live station status
export function parseLiveStationStatus(html: string): LiveStationStatusResponse {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const trains: TrainInfo[] = [];

  const trainRows = document.querySelectorAll(".StationLive2 tr");
  trainRows.forEach((row: Element) => {
    const trainName = row.querySelector(".name")?.textContent?.trim();
    const trainTime = row.querySelector(".bold.greenLink")?.textContent?.trim();
    if (trainName && trainTime) {
      trains.push({
        name: trainName,
        time: trainTime,
      });
    }
  });

  const station = document.querySelector("h1.mainpageH1")?.textContent?.trim() || "";

  return {
    station,
    trains,
  };
}

// Function to parse train data
export function parseTrainData(rawData: string): TrainDetailsResponse | { success: boolean; error?: string; data?: any } {
  try {
    let trainInfo: any = {};
    let sections = rawData.split("~~~~~~~~");

    if (
      sections[0] === "~~~~~Please try again after some time." ||
      sections[0] === "~~~~~Train not found"
    ) {
      return {
        success: false,
        data: sections[0].replaceAll("~", ""),
      };
    }

    let primaryData = sections[0].split("~").filter((el) => el !== "");
    if (primaryData[1].length > 6) {
      primaryData.shift();
    }

    trainInfo["trainNumber"] = primaryData[1].replace("^", "");
    trainInfo["trainName"] = primaryData[2];
    trainInfo["sourceStationName"] = primaryData[3];
    trainInfo["sourceStationCode"] = primaryData[4];
    trainInfo["destinationStationName"] = primaryData[5];
    trainInfo["destinationStationCode"] = primaryData[6];
    trainInfo["departureTime"] = primaryData[11];
    trainInfo["arrivalTime"] = primaryData[12];
    trainInfo["travelDuration"] = primaryData[13];
    trainInfo["operatingDays"] = primaryData[14];

    let secondaryData = sections[1].split("~").filter((el) => el !== "");
    trainInfo["trainType"] = secondaryData[11];
    trainInfo["trainId"] = secondaryData[12];
    trainInfo["distance"] = secondaryData[18];
    trainInfo["averageSpeed"] = secondaryData[19];

    return trainInfo as TrainDetailsResponse;
  } catch (err: any) {
    console.warn(err.message);
    return { success: false, error: err.message };
  }
}

// Function to parse data for trains between stations
export function parseBetweenStationsData(rawData: string): TrainsBetweenStationsResponse | { success: boolean; error?: string; data?: any } {
  try {
    let trainInfo: any = {};
    let result: any = {};
    let trainList: any[] = [];
    let trainDetails: any = {};
    let sections = rawData.split("~~~~~~~~");
    let noRoute = sections[0].split("~");
    noRoute = noRoute[5].split("<");

    if (noRoute[0] === "No direct trains found") {
      result["success"] = false;
      result["time_stamp"] = Date.now();
      result["data"] = noRoute[0];
      return result;
    }

    if (
      sections[0] === "~~~~~Please try again after some time." ||
      sections[0] === "~~~~~From station not found" ||
      sections[0] === "~~~~~To station not found"
    ) {
      result["success"] = false;
      result["time_stamp"] = Date.now();
      result["data"] = sections[0].replaceAll("~", "");
      return result;
    }

    sections = sections.filter((el) => el !== "");
    for (let i = 0; i < sections.length; i++) {
      let trainData = sections[i].split("~^");
      if (trainData.length === 2) {
        trainData = trainData[1].split("~").filter((el) => el !== "");
        trainInfo["trainNumber"] = trainData[0];
        trainInfo["trainName"] = trainData[1];
        trainInfo["sourceStationName"] = trainData[2];
        trainInfo["sourceStationCode"] = trainData[3];
        trainInfo["destinationStationName"] = trainData[4];
        trainInfo["destinationStationCode"] = trainData[5];
        trainInfo["fromStationName"] = trainData[6];
        trainInfo["fromStationCode"] = trainData[7];
        trainInfo["toStationName"] = trainData[8];
        trainInfo["toStationCode"] = trainData[9];
        trainInfo["departureTime"] = trainData[10];
        trainInfo["arrivalTime"] = trainData[11];
        trainInfo["travelDuration"] = trainData[12];
        trainInfo["operatingDays"] = trainData[13];
        trainDetails["trainBase"] = trainInfo;
        trainList.push(trainDetails);
        trainInfo = {};
        trainDetails = {};
      }
    }

    result["success"] = true;
    result["time_stamp"] = Date.now();
    result["data"] = trainList;
    return result;
  } catch (err: any) {
    console.warn(err.message);
    return { success: false, error: err.message };
  }
}

export function parseRouteData(rawData: string): TrainRouteResponse | { success: boolean; error?: string; data?: any } {
  try {
    let data = rawData.split("~^");
    let routeList: any[] = [];
    let stationInfo: any = {};
    let result: any = {};

    for (let i = 0; i < data.length; i++) {
      let stationData = data[i].split("~").filter((el) => el !== "");
      stationInfo["sourceStationName"] = stationData[2];
      stationInfo["sourceStationCode"] = stationData[1];
      stationInfo["arrivalTime"] = stationData[3];
      stationInfo["departureTime"] = stationData[4];
      stationInfo["distance"] = stationData[6];
      stationInfo["day"] = stationData[7];
      stationInfo["zone"] = stationData[9];
      routeList.push(stationInfo);
      stationInfo = {};
    }

    result["success"] = true;
    result["time_stamp"] = Date.now();
    result["data"] = routeList;
    return result;
  } catch (err: any) {
    console.warn(err.message);
    return { success: false, error: err.message };
  }
}


export function parsePnrStatus(rawData: string): PnrStatusResponse | { success: boolean; error?: string; data?: any } {
  try {
    let retval: any = {};
    const pattern = /data\s*=\s*({.*?;)/;
    const match = rawData.match(pattern);

    if (!match) {
      throw new Error("PNR data not found");
    }

    const dataString = match[0].slice(7, -1);
    const data = JSON.parse(dataString);

    retval["success"] = true;
    retval["time_stamp"] = Date.now();
    retval["data"] = data;
    return retval;
  } catch (err: any) {
    console.warn(err.message);
    return { success: false, error: err.message };
  }
}