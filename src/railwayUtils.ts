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

// Additional utility functions can be added here for other types of responses. 
