"use client";

import { getBusStopsAction } from "@/actions/busaction";
import { type BusStop } from "@/services/datamall/busstops";
import { Accordion } from "@radix-ui/react-accordion";
import { useEffect, useState } from "react";
import BusList from "./busList";

export default function BusLists() {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.navigator.geolocation.getCurrentPosition(({ coords }) => {
      getBusStopsAction(coords.latitude, coords.longitude).then((res) => {
        setBusStops(res);
        setIsLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    const spinner = document.getElementById("spinner") as HTMLDialogElement;
    isLoading ? spinner.showModal() : spinner.close();
  }, [isLoading]);

  return (
    <Accordion className="w-lg" type="single" collapsible>
      {busStops.map((busStop) => (
        <BusList key={busStop.BusStopCode} busStop={busStop} />
      ))}
    </Accordion>
  );
}
