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
  return timeInMins < 1 ? "Arr" : `${timeInMins.toString()} mins`;
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
        <span className="flex w-25 justify-between">
          <p>{convertToMins(bus.EstimatedArrival)}</p>
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
