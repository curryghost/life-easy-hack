import { Effect } from "effect";
import {
  BusResponse,
  datamallGet,
  DatamallService,
  datamallServiceLayer,
} from "./datamall";

const BUS_STOPS_SKIP_TIMES = 10;

export interface BusStop {
  BusStopCode: string;
  RoadName: string;
  Description: string;
  Latitude: number;
  Longitude: number;
}

const getBusStopsSkipBy = (
  times: number = BUS_STOPS_SKIP_TIMES
): Effect.Effect<BusStop[], string, DatamallService>[] =>
  times < 0
    ? []
    : [
        datamallGet<BusResponse<BusStop[]>>(
          `/BusStops?$skip=${times * 500}`
        ).pipe(Effect.andThen((res) => res.value)),
        ...getBusStopsSkipBy(--times),
      ];

export const getBusStops = (latitude: number, longitude: number) =>
  Effect.all(getBusStopsSkipBy()).pipe(
    Effect.andThen((busStopsArray) => busStopsArray.flat()),
    Effect.andThen((busStops) =>
      sortNearestBusStops({ lat: latitude, lon: longitude }, busStops)
    ),
    Effect.andThen((sortedBusStops) => sortedBusStops.slice(0, 100)),
    Effect.provide(datamallServiceLayer),
    Effect.runPromise
  );

type Coordinate = { lat: number; lon: number };

function haversineDistance(coord1: Coordinate, coord2: Coordinate): number {
  const toRad = (angle: number) => (angle * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

function sortNearestBusStops(userLocation: Coordinate, busStops: BusStop[]) {
  return busStops
    .map((stop) => ({
      ...stop,
      distance: haversineDistance(userLocation, {
        lat: stop.Latitude,
        lon: stop.Longitude,
      }),
    }))
    .sort((a, b) => a.distance - b.distance); // Sort by distance
}
