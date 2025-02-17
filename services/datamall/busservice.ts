import { Effect } from "effect";
import { BusResponse, datamallGet, datamallServiceLayer } from "./datamall";

export interface BusService {
  ServiceNo: string;
  Operator: string;
  Direction: string;
  Category: string;
  OriginCode: string;
  DestinationCode: string;
  AM_Peak_Freq: string;
  PM_Peak_Freq: string;
  PM_Offpeak_Freq: string;
  LoopDesc?: string;
}

export const getBusServiceByCode = (code: string) =>
  datamallGet<BusResponse<BusService[]>>(
    `/BusServices?BusStopCode=${code}`
  ).pipe(
    Effect.andThen((busServices) => busServices.value),
    Effect.provide(datamallServiceLayer),
    Effect.runPromise
  );
