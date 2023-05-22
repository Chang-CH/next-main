import BackgroundDots from "@/components/backgrounds/dots";
import MidiPlayer from "@/components/gizmos/Midi";

const Home = ({
  _params,
  _searchParams,
}: {
  _params: { slug: string };
  _searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  // console.log(searchParams);
  // if (searchParams?.viewport === "mobile")

  return (
    <BackgroundDots
      dotColour="#ccc"
      bgColour="#fff"
      dotRadius="2px"
      dotSpacing="40px"
      className="flex grow min-h-screen min-w-full items-center justify-center"
    >
      <div className="flex flex-col max-w-[1200px] w-full items-center justify-center min-h-[500px]">
        <div className="flex flex-row grow items-center justify-center w-full h-screen min-h-[500px]">
          <div className="flex flex-col items-center justify-center font-montserrat w-1/2 min-w-[400px]">
            <div>
              <h1 className="text-8xl">Hello :)</h1>
              <p className="text-2xl">My name is Chuan Hao</p>
              <p>Computer Science @ NUS | Web Developer</p>
            </div>
          </div>
          <div className="relative flex grow h-full items-center">
            <MidiPlayer />
          </div>
        </div>
      </div>
    </BackgroundDots>
  );
};

export default Home;
