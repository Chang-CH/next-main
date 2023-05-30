"use client";

import Image from "next/image";
import { useState } from "react";

export interface CarouselData {
  image: string;
  icon?: string;
  bg?: string;
  title: string;
  subtitle?: string;
  labels?: string[];
  content: JSX.Element;
  links?: { url: string; text: string }[];
}

export type CarouselDS = CarouselData[];

const FancyCarousel = ({
  source,
  style,
  className,
  ...rest
}: {
  source: CarouselDS;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const [selected, _setSelected] = useState(0);
  // {source.map((data) => {
  //     return (
  //         <div>
  //             {data.bg ? <Image src={data.bg} alt={data.title} fill /> : null}
  //             <div>
  //                 <h3 className="">{data.title}</h3>
  //                 {data?.subtitle ? <h4>{data.subtitle}</h4> : null}
  //                 {data.labels}
  //                 {data.content}
  //                 {data.links?.map((link) => {
  //                     return <p>{link.text}</p>
  //                 })}
  //             </div>
  //         </div>
  //     )
  // })}
  return (
    <div
      style={style}
      className={`flex gap-[3vmin] ${className ?? ""}`}
      {...rest}
    >
      {source.map((data, index) => {
        return (
          <div
            key={index}
            className={`relative w-[${index === selected ? 16 : 10}vmin] h-[${
              index === selected ? 18 : 15
            }vmin] min-w-${index === selected ? 10 : 10} min-h-${
              index === selected ? 20 : 16
            } bg-white shadow-md opacity-80`}
          >
            {data.image ? (
              <Image
                src={data.image}
                alt={data.title}
                fill
                style={{ objectFit: "cover" }}
              />
            ) : (
              <p>{data.title}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FancyCarousel;
