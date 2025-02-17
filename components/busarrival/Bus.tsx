import { type Bus } from "@/services/datamall/busarrival";
import DoubleDeckerBus from "@/svg/doubleDeckerBus";
import SingleDeckBus from "@/svg/singleDeckBus";

interface Props {
  bus: Bus;
}

const convertToMins = (date: string) => {
  const currentTime = Date.now();
  const futureTime = new Date(date).getTime();

  const timeInMins = Math.round((futureTime - currentTime) / 1000 / 60);
  return timeInMins < 1 ? "Arriving" : `${timeInMins.toString()}`;
};

const getLoadColor = (type: string) =>
  type === "SEA"
    ? "fill-green-700"
    : type === "SDA"
    ? "fill-orange-400"
    : "fill-red-800";

export default function Bus({ bus }: Props) {
  return (
    <>
      {bus.EstimatedArrival && (
        <span className="flex w-25 justify-between items-center">
          <div className="flex justify-between items-baseline w-full px-3">
            <p className="text-slate-300 text-xs m-0">
              {convertToMins(bus.EstimatedArrival)}
            </p>
            {!isNaN(+convertToMins(bus.EstimatedArrival)) && <span>mins</span>}
          </div>
          {bus.Type === "DD" ? (
            <DoubleDeckerBus
              height={30}
              width={40}
              className={getLoadColor(bus.Load)}
            />
          ) : (
            <SingleDeckBus
              height={30}
              width={40}
              className={getLoadColor(bus.Load)}
            />
          )}
        </span>
      )}
    </>
  );
}
