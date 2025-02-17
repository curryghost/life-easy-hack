import { Effect } from "effect";
import { datamallGet, datamallServiceLayer } from "./datamall";

export interface BusArrivalResponse {
  "odata.metadata": string;
  BusStopCode: string;
  Services: BusArrival[];
}

export interface BusArrival {
  ServiceNo: string;
  Operator: string;
  NextBus?: Bus;
  NextBus2?: Bus;
  NextBus3?: Bus;
}

export interface Bus {
  OriginCode: string;
  DestinationCode: string;
  EstimatedArrival: string;
  Monitored: number;
  Latitude: number;
  Longitude: number;
  VisitNumber: number;
  Load: string;
  Feature: string;
  Type: String;
}

export const getBusArrivalByCode = (busStopCode: string) =>
  datamallGet<BusArrivalResponse>(
    `/v3/BusArrival?BusStopCode=${busStopCode}`
  ).pipe(
    Effect.andThen((res) => res.Services),
    Effect.provide(datamallServiceLayer),
    Effect.runPromise
  );
