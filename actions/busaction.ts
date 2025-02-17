"use server";

import { getBusArrivalByCode } from "@/services/datamall/busarrival";
import { getBusStops } from "@/services/datamall/busstops";

export const getBusStopsAction = async (
  latitude: number,
  longitude: number
) => {
  return getBusStops(latitude, longitude);
};

export const getBusArrivalByCodeAction = (busStopCode: string) =>
  getBusArrivalByCode(busStopCode);
