import { useEffect, useState } from "react";
import destinationBg from "../../../public/assets/crew/Hi Res Render - 3.jpg";
import Header from "../../components/layout/navigation/Header";
import type { SpaceData, Crew } from "../../shared/types";

const Crew = () => {
  const [crews, setCrews] = useState<Crew[]>([]);
  const [selected, setSelected] = useState<string>("Douglas Hurley");

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
        setCrews(data?.crew ?? []);
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

  const active = crews.find((c) => c.name === selected);

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
        <article className="mx-[1.5rem] md:mx-[2.5rem] lg:w-[69.375rem]">
          <header className="flex gap-[1.5rem] justify-center md:justify-start pt-28 ">
            <h2 className="font-bold opacity-[25%] font-barlow-condensed tracking-[0.15em] text-[1rem]">
              02
            </h2>
            <h2 className="font-barlow-condensed text-[1rem] tracking-[0.15em] ">
              PICK YOUR DESTINATION
            </h2>
          </header>
          <section className="grid grid-cols-1 gap-[2rem] lg:gap-[4rem] lg:grid-cols-2">
            <div className="flex flex-col gap-[1.5rem] lg:justify-center lg:relative ">
              {active && (
                <div className="flex flex-col gap-[1.5rem] py-[2.5rem] ">
                  <div className="flex flex-col gap-[.5rem]">
                    <p className="opacity-50 text-white font-bellefair text-[1.125rem md:text-[1.5rem] lg:text-[2rem] text-center lg:text-start uppercase">
                      {active.role}
                    </p>
                    <h1 className="font-bellefair text-[1.5rem] text-center uppercase md:text-[40px] lg:text-[3.5rem] lg:text-start">
                      {active.name}
                    </h1>
                  </div>
                  <p className="font-barlow text-[.9375rem] tracking-[180%] text-center text-blue-300 md:text-[1rem] lg:text-[1.125rem] lg:text-start">
                    {active.bio}
                  </p>
                </div>
              )}
              <div className="flex flex-row justify-center gap-[1rem] lg:gap-[2.5rem] lg:justify-start  lg:absolute lg:bottom-0">
                {crews.map((c) => {
                  const on = c.name === selected;
                  return (
                    <button
                      key={c.name}
                      role="tab"
                      aria-selected={on}
                      aria-controls=""
                      onClick={() => handleSelected(c.name)}
                      className={`bg-white rounded-full w-[.625rem] h-[.625rem] lg:w-[.9375rem] lg:h-[.9375rem] ${
                        on ? "" : " opacity-[17.44%]"
                      }`}
                    ></button>
                  );
                })}
              </div>
            </div>
            {active && (
              <picture className="flex justify-center">
                <source srcSet={active.images.webp} type="image/webp" />

                <source srcSet={active.images.png} type="image/jpeg" />

                <img
                  src={active.images.png}
                  alt={active.name}
                  className="w-[16.9544rem] h-[21.25rem] md:w-[27.925rem] md:h-[35rem] lg:w-[33.7094rem] lg:h-[42.25rem] mask-b-from-50% mask-b-to-100%"
                />
              </picture>
            )}
          </section>
        </article>
      </main>
    </>
  );
};

export default Crew;
