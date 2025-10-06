import { useEffect, useState } from "react";
import Header from "../../components/layout/navigation/Header";
import technologyBg from "../../../public/assets/technology/Hi Res Render - 4.jpg";
import type { SpaceData, Technology } from "../../shared/types";

const Technology = () => {
  const [technologys, setTechnologys] = useState<Technology[]>([]);
  const [selected, setSelected] = useState("Launch vehicle");

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
        setTechnologys(data?.technology ?? []);
      } catch (e) {
        if (e instanceof Error && e.name !== "Abort Error") console.error(e);
      }
    };
    load();

    return () => ac.abort();
  }, []);

  const handleSelected = (name: string) => {
    setSelected(name);
  };

  const active = technologys.find((t) => t.name === selected);

  return (
    <>
      <div className="fixed inset-0 -z-10">
        <img
          src={technologyBg}
          alt="technologybg"
          className="object-cover min-h-screen min-w-screen"
        />
      </div>
      <Header />
      <main className="flex lg:justify-end">
        <article className="flex flex-col gap-[1.5rem] lg:w-[84rem]">
          <header className="flex gap-[1.5rem] justify-center md:justify-start  pt-28 md:ms-[2.5rem]">
            <h2 className="font-bold opacity-[25%] font-barlow-condensed tracking-[0.15em] text-[1rem]">
              03
            </h2>
            <h2 className="font-barlow-condensed text-[1rem] tracking-[0.15em] ">
              PICK YOUR DESTINATION
            </h2>
          </header>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem]    ">
            {active && (
              <div className="flex justify-end pt-[4rem] lg:order-2 ">
                <img
                  src={active.images.portrait}
                  alt={active.name}
                  className="object-cover w-lvh h-[16.125rem] md:h-[22.3125rem] lg:w-[38rem] lg:h-[37.5rem]"
                />
              </div>
            )}
            <div className="flex flex-col items-center gap-[2.5rem] lg:flex-row lg:gap-[4rem] lg:order-1 ms-[1.5rem] me-[1.5rem]  md:ms-[2.5rem] md:me-[2.5rem] lg:me-0 ">
              <div className="flex flex-row gap-[1rem] lg:flex-col justify-center md:w-[32rem]  lg:w-[5rem] ">
                {technologys.map((t, i) => {
                  const on = t.name === selected;
                  return (
                    <button
                      key={t.name}
                      onClick={() => handleSelected(t.name)}
                      className={`w-[2.5rem] h-[2.5rem]  rounded-full outline-1 outline-white/25 md:w-[3.5rem] md:h-[3.5rem] lg:w-[5rem] lg:h-[5rem] ${
                        on ? "bg-white text-black" : ""
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {active && (
                <div className="flex flex-col gap-[1.5rem] md:w-[32rem]  lg:w-full">
                  <div className="flex flex-col gap-[1rem]">
                    <h2 className="text-[1.125rem] font-bellefair opacity-50 text-center md:text-[1.5rem] lg:[2rem] lg:text-start">
                      THE TERMINOLOGY...
                    </h2>
                    <h1 className="font-bellefair uppercase text-center text-[1.5rem] md:text-[2.5rem] lg:text-[3.5rem] lg:text-start">
                      {active.name}
                    </h1>
                  </div>
                  <p className="font-barlow text-blue-300 text-center text-[1.125rem] leading-[180%] md:[1rem] lg:text-start ">
                    {active.description}
                  </p>
                </div>
              )}
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default Technology;
