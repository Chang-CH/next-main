import { CarouselDS } from "@/components/common/FancyCarousel";

export const experience: CarouselDS = [
  {
    image: "/work/f5.svg",
    bg: "/work/f5.svg",
    title: "Jr. Solution Developer",
    subtitle: "F5\nMay 2023 - Aug 2023",
    content: (
      <>
        <ul>
          <li>
            <p>Worked with F5&apos;s Global Support team</p>
          </li>
        </ul>
      </>
    ),
  },
  {
    image: "/work/shopee.svg",
    bg: "/work/shopee.svg",
    title: "Software Engineer Intern",
    subtitle: "Shopee\nMay 2022 - Aug 2022",
    content: (
      <>
        <ul>
          <li>
            <p>
              Worked in Shopee&apos;s Promotion Front End team on the internal
              promotion admin portal
            </p>
          </li>
          <li>
            <p>
              Developed promotion media batch upload with CSV parsing and
              validation to streamline campaign managers&apos; workflow
            </p>
          </li>
          <li>
            <p>
              Built a JavaScript Rollup bundle size analyzer for Gitlab CI/CD
              pipeline using DangerJS
            </p>
          </li>
        </ul>
      </>
    ),
  },
  {
    image: "/work/nus-vertical.jpg",
    bg: "/work/nus.jpg",
    title: "Undergraduate Teaching Assistant",
    subtitle: "National University of Singapore\nAug 2021 - Nov 2022",
    content: (
      <>
        <ul>
          <li>
            <p>
              Created and went through lecture recaps, tutorial/lab walkthroughs
              for weekly sessions
            </p>
          </li>
          <li>
            <p>
              Modules taught: CS1101S Programming Methodology, CS2030S
              Programming Methodology II, CS2102 Database Systems, CS2100
              Computer Organization
            </p>
          </li>
        </ul>
      </>
    ),
  },
];
