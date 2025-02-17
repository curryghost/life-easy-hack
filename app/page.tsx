import BusLists from "@/components/buslists/busLists";

export default function Home() {
  return (
    <div className="flex flex-col w-md mx-auto gap-5 items-center">
      <h1 className="text-3xl font-bold mt-10">Bus App</h1>
      <main>
        <BusLists />
      </main>
    </div>
  );
}
