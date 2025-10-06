import Header from "../../components/layout/navigation/Header";
import homeMobile from "../../../public/assets/home/background-home-mobile.jpg";
import homeTablet from "../../../public/assets/home/background-home-tablet.jpg";
import homeDesktop from "../../../public/assets/home/background-home-desktop.jpg";
import DisplayButton from "../../components/ui/home/DisplayButton";

function Home() {
  return (
    <>
      <div className="fixed inset-0 -z-10">
        <picture className="absolute -z-10">
          <source
            srcSet={homeMobile}
            type="image/jpeg"
            media="(max-width: 40rem)"
          />
          <source
            srcSet={homeTablet}
            type="image/jpeg"
            media="(max-width: 48rem)"
          />
          <source
            srcSet={homeDesktop}
            type="image/jpeg"
            media="(max-width: 64rem)"
          />
          <img
            src={homeDesktop}
            alt="home"
            className="object-cover min-h-screen min-w-screen"
          />
        </picture>
      </div>
      <Header />
      <main className="">
        <article className="">
          <header className="relative flex flex-col lg:flex-row">
            <div className="z-0 flex flex-col items-center mt-[5.5rem] mx-[1.5rem] pt-[1.5rem] md:pt-[8rem] lg:flex-row md:mx-[2.5rem] md:px-[5.625rem] md:gap-[3.875rem] lg:h-[39.5rem] lg:mx-[10.3125rem]  lg:px-0 lg:pt-[35rem] lg:gap-60">
              <div className=" text-center lg:text-left">
                <h2 className="font-barlow-condensed text-[1rem] tracking-[0.15em] text-blue-300 md:text-[1.75rem] md:tracking-[0.25rem]">
                  SO, YOU WANT TO TRAVEL TO
                </h2>
                <h1 className="font-bellefair text-[5rem] md:text-[9rem]">
                  SPACE
                </h1>
                <p className="font-barlow text-blue-300 text-[0.9375rem] leading-[180%] md:text-[1rem] ">
                  Let’s face it; if you want to go to space, you might as well
                  genuinely go to outer space and not hover kind of on the edge
                  of it. Well sit back, and relax because we’ll give you a truly
                  out of this world experience!
                </p>
              </div>
              <div className="flex items-center justify-center  w-full h-[23.875rem] md:h-auto ">
                <DisplayButton to="/destination">EXPLORE</DisplayButton>
              </div>
            </div>
          </header>
          <footer>
            <img src="../../assets/home" alt="" />
          </footer>
        </article>
      </main>
    </>
  );
}

export default Home;
