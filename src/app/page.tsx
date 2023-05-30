/**
 * Components
 */
import BlobBg from "@/common/backgrounds/BlobBg";
import MidiPlayer from "@/common/gizmos/MidiPlayer";
import Link from "next/link";

/**
 * Styles
 */
import styles from "./s.module.css";
import Timeline from "@/common/stdlib/timeline";

const Home = ({
  _params,
  _searchParams,
}: {
  _params: { slug: string };
  _searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="relative flex grow min-w-full items-center justify-center">
      <div className="flex flex-col max-w-[1200px] w-full items-center justify-center min-h-screen">
        <div className="flex flex-row justify-evenly w-1/2">
          <Link href="/projects" className={styles.textLink}>
            Projects
          </Link>
          <Link href="/about" className={styles.textLink}>
            About
          </Link>
          <Link href="/dev" className={styles.textLink}>
            Dev
          </Link>
        </div>
        <div className="flex flex-row grow items-center justify-center w-full h-full min-h-[500px]">
          <div className="flex flex-col items-center justify-center font-montserrat w-1/2 min-w-[400px]">
            <div>
              <h1 className="text-8xl">Hello :)</h1>
              <p className="text-2xl">My name is Chuan Hao</p>
              <p>Computer Science @ NUS | Web Developer</p>
            </div>
          </div>
          <div className="relative flex grow h-full justify-center">
            <MidiPlayer />
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-[1200px] w-full items-center justify-center min-h-screen">
        <h2 className="text-2xl">Experience</h2>
        <Timeline
          data={[
            {
              title: "Jr. Solution Developer",
              timeline: "May 2023 - July 2023",
              tags: [
                "Python",
                "Tableau",
                "Salesforce Lightning Components",
                "HTML",
                "JS",
              ],
              preview: "/work/F5.svg",
              description: (
                <p>
                  • Worked with F5&apos;s Global Support Innovation Lab team on
                  the internal management toolings
                  <br />• Created a dashboard to alert Support Engineers about
                  stale support cases <br /> • Worked on migrating various
                  dashboards to Snowflake data sources from Tron
                </p>
              ),
            },
            {
              title: "Software Engineer Intern",
              timeline: "May 2022 - August 2022",
              tags: ["React", "Webpack", "CSS", "Node", "HTML"],
              preview: "/work/shopee.svg",
              description: (
                <p>
                  • Worked on Shopee&apos;s Promotion Front End team on the
                  internal promotion admin portal
                  <br />• Developed batch upload feature for campaign managers
                  to create promotion media in bulk <br /> • Built a JavaScript
                  Rollup bundle size analyzer for Gitlab CI/CD pipeline using
                  DangerJS
                </p>
              ),
            },
            {
              title: "Undergraduate Teaching Assistant",
              timeline: "Aug 2021 - November 2022",
              tags: ["JavaScript", "Java", "C", "SQL"],
              preview: "/work/nus-vertical.jpg",
              description: (
                <p>
                  • Created and went through lecture recaps, tutorial/lab
                  walkthroughs for weekly sessions
                  <br />• Marked and returned feedback on student projects,
                  tutorial assignments and lab submissions
                  <br />• Modules taught: CS1101S Programming Methodology,
                  CS2030S Programming Methodology II,
                  <br />
                  CS2102 Database Systems, CS2100 Computer Organization
                </p>
              ),
            },
            {
              title: "Bachelor of Computing in Computer Science",
              timeline: "Aug 2020 - May 2024",
              tags: [],
              preview: "/work/nus-vertical.jpg",
              description: (
                <p>
                  • Graduating with (projected) First Class Honours, GPA:
                  4.79/5.0
                  <br />• Dean&apos;s List, Academic Year 2022/2023 Semester 1
                  <br />• Dean&apos;s List, Academic Year 2021/2022 Semester 2
                  <br />• Final Year Project: Web Based Implementation of the
                  Java Virtual Machine
                </p>
              ),
            },
          ]}
        />
        <div className="h-[50vh]" />
      </div>
      <BlobBg />
    </div>
  );
};

export default Home;
