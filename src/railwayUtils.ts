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

// Additional utility functions can be added here for other types of responses. 
