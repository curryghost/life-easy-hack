import { type BusStop } from "@/services/datamall/busstops";
import BusArrival from "../busarrival/BusArrival";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface Prop {
  busStop: BusStop;
}

export default function BusList({ busStop }: Prop) {
  return (
    <AccordionItem value={busStop.BusStopCode}>
      <AccordionTrigger>
        <div className="grid grid-cols-3 w-full">
          <p className="font-bold">{busStop.BusStopCode}</p>
          <p>{busStop.RoadName}</p>
          <p>{busStop.Description}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <BusArrival busStop={busStop} />
      </AccordionContent>
    </AccordionItem>
  );
}
