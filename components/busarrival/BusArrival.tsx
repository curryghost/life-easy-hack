"use client";
import { getBusArrivalByCodeAction } from "@/actions/busaction";
import { type BusArrival } from "@/services/datamall/busarrival";
import { BusStop } from "@/services/datamall/busstops";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Bus from "./Bus";

interface Prop {
  busStop: BusStop;
}

export default function BusArrival({ busStop }: Prop) {
  const [buses, setBuses] = useState<BusArrival[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBusArrivalByCodeAction(busStop.BusStopCode).then((res) => {
      setBuses(res);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!isLoading
        ? buses.map((bus) => (
            <div key={bus.ServiceNo} className="grid grid-cols-4">
              <p>{bus.ServiceNo}</p>
              {bus.NextBus && <Bus bus={bus.NextBus} />}
              {bus.NextBus2 && <Bus bus={bus.NextBus2} />}
              {bus.NextBus3 && <Bus bus={bus.NextBus3} />}
            </div>
          ))
        : Array(5)
            .keys()
            .toArray()
            .map((i) => (
              <div key={i} className="grid grid-cols-4 gap-5 opacity-70">
                <Skeleton className="w-12 h-6 rounded-full" />
                <Skeleton className="w-full h-6 my-1 rounded-full" />
                <Skeleton className="w-full h-6 my-1 rounded-full" />
                <Skeleton className="w-full h-6 my-1 rounded-full" />
              </div>
            ))}
    </>
  );
}
