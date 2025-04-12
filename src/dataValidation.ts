import { z } from "zod";

// Define the expected schema for station status
const StationStatusSchema = z.object({
  station: z.string(),
  trains: z.array(
    z.object({
      name: z.string(),
      time: z.string(),
    })
  ),
});

// Function to validate and parse station status data
export function validateStationStatus(data: any) {
  try {
    return StationStatusSchema.parse(data);
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error("Invalid input");
  }
} 