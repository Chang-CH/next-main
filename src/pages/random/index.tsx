import DotsBg from "@/common/backgrounds/BackgroundDots";
import BlobBg from "@/common/backgrounds/BlobBg";
import BrutalistCard from "@/common/stdlib/card/BrutalistCard";
import TurboCard from "@/common/stdlib/card/TurboCard";
import { useState } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Dev = () => {
  const [background, setBackground] = useState<number>(0);

  const backgrounds = [
    <DotsBg
      key="0"
      dotColour="#444"
      bgColour="#111"
      style={{ zIndex: -995 }}
    />,
    <BlobBg key="1" />,
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>It did say random</h1>
      <p>¯\_(ツ)_/¯</p>
      <div className="flex justify-center text-center p-5">
        <h2>Cards</h2>
        <div className="flex flex-row">
          <TurboCard style={{ width: "300px", height: "300px" }}>
            <h3>Border gradient</h3>
            <p>Rotating border gradient on hover</p>
          </TurboCard>
          <BrutalistCard
            style={{
              width: "300px",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h3>Brutalist card</h3>
            <p>Solid box shadow</p>
          </BrutalistCard>
        </div>
      </div>
      <div className="flex flex-row w-full h-1/3 min-h-[300px] relative">
        <button
          onClick={() => {
            setBackground(bg => (bg - 1 < 0 ? backgrounds.length - 1 : bg - 1));
          }}
        >
          <FaArrowCircleLeft />
        </button>
        <h2 className="m-auto">Backgrounds</h2>
        <button
          onClick={() => {
            setBackground(bg => (bg + 1) % backgrounds.length);
          }}
        >
          <FaArrowCircleRight />
        </button>
        {backgrounds[background]}
      </div>
      <DotsBg dotColour="#000" bgColour="#333" />
    </div>
  );
};

export default Dev;
