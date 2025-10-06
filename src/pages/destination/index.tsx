import { useEffect, useState } from "react";
import Header from "../../components/layout/navigation/Header";
import destinationBg from "../../../public/assets/destination/Hi Res Render - 2.jpg";
import type { SpaceData, Destination } from "../../shared/types";

export default function Destination() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selected, setSelected] = useState<string>("Moon");

  useEffect(() => {
    const ac = new AbortController();

    const load = async () => {
      try {
        const res = await fetch("/data/data.json", {
          cache: "no-store",
          signal: ac.signal,
        });
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data: SpaceData = await res.json();
        setDestinations(data?.destinations ?? []);
      } catch (e) {
        if (e instanceof Error && e.name !== "AbortError") console.error(e);
      }
    };
    load();

    return () => ac.abort();
  }, []);

  const handleSelected = (name: string) => {
    setSelected(name);
  };

  const active = destinations.find((d) => d.name === selected);
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          src={destinationBg}
          alt="destinationbg"
          className="object-cover min-h-screen min-w-screen"
        />
      </div>
      <Header />
      <main className="flex justify-center">
        <article className="flex flex-col gap-[1.5rem] mx-[1.5rem] md:mx-[2.5rem] md:w-[32.125rem] lg:w-[69.375rem] lg:gap-36">
          <header className="flex gap-[1.5rem] justify-center md:justify-start  pt-28">
            <h2 className="font-bold opacity-[25%] font-barlow-condensed tracking-[0.15em] text-[1rem]">
              01
            </h2>
            <h2 className="font-barlow-condensed text-[1rem] tracking-[0.15em] ">
              PICK YOUR DESTINATION
            </h2>
          </header>
          <section className="grid grid-cols-1 gap-[2rem]  lg:grid-cols-2 ">
            {active && (
              <section
                id={`panel-${active.name}`}
                role="tabpanel"
                aria-labelledby={active.name}
              >
                <picture className="w-full h-[12.6875rem] md:h-[24rem] flex justify-center items-center ">
                  <source srcSet={active.images.webp} type="image/webp" />

                  <source srcSet={active.images.png} type="image/jpeg" />

                  <img
                    src={active.images.png}
                    alt={active.name}
                    className="w-[9.375rem] h-auto md:w-[18.75rem] md:h-[18.75rem] lg:w-[30rem]  lg:h-[30rem]"
                  />
                </picture>
              </section>
            )}
            <div className="flex flex-col gap-[24px]">
              <div
                role="tablist"
                aria-label="destination"
                className="flex flex-row gap-[2rem] justify-center lg:justify-start"
              >
                {destinations.map((d) => {
                  const on = d.name === selected;
                  return (
                    <button
                      key={d.name}
                      role="tab"
                      aria-selected={on}
                      aria-controls={`panel-${d.name}`}
                      onClick={() => handleSelected(d.name)}
                      className={`font-barlow-condensed text-[.875rem] tracking-[0.15em] uppercase h-[2rem]  ${
                        on ? "border-b-[.1875rem] border-white" : ""
                      }`}
                    >
                      {d.name}
                    </button>
                  );
                })}
              </div>
              {active && (
                <section
                  id={`panel-${active.name}`}
                  role="tabpanel"
                  aria-labelledby={active.name}
                  className="flex flex-col gap-[24px] "
                >
                  <h1 className="font-bellefair leading-none  text-[3.5rem] text-center uppercase md:text-[5rem] lg:text-[6rem] lg:text-start">
                    {active.name}
                  </h1>

                  <p className="text-center text-[.9375rem] leading-[180%] text-blue-300 lg:text-start">
                    {active.description}
                  </p>
                  <div className="bg-white h-[.0625rem] opacity-[25%]"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 text-center gap-[1.5rem] lg:text-start">
                    <div className="flex flex-col gap-[.75rem]">
                      <p className="font-barlow-condensed text-[.875rem] tracking-[.125rem] text-blue-300">
                        AVG. DISTANCE
                      </p>
                      <p className="font-bellefair text-[1.75rem] uppercase">
                        {active.distance}
                      </p>
                    </div>
                    <div className="flex flex-col gap-[.75rem]">
                      <p className="font-barlow-condensed text-[.875rem] tracking-[.125rem] text-blue-300">
                        EST.TRAVELTIME
                      </p>
                      <p className="font-bellefair text-[1.75rem] uppercase">
                        {active.travel}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
