import { FaGithub, FaLinkedin } from "react-icons/fa";

/**
 * Styles
 */
import styles from "./s.module.css";

/**
 * Components
 */
import BlobBg from "@/common/backgrounds/BlobBg";
import MidiPlayer from "@/common/gizmos/MidiPlayer";
import Timeline from "@/common/stdlib/timeline/SimpleTimeline";
import TurboCard from "@/common/stdlib/card/TurboCard";

const Home = () => {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.bodyContainer}>
        {/* <div className={styles.divLinks}>
          <Link href="/projects" className={styles.textLink}>
            Projects
          </Link>
          <Link href="/random" className={styles.textLink}>
            Random
          </Link>
        </div> */}
        <div className={styles.splashContainer}>
          <div className={styles.splashText}>
            <div>
              <h1 className="text-8xl">Hello :)</h1>
              <p className={styles.h2}>My name is Chuan Hao</p>
              <p>I write JavaScript not tragedies</p>
              <div className="flex flex-row">
                <a
                  href="https://www.linkedin.com/in/chuan-hao-c-57b096208/"
                  className="mr-3"
                >
                  <FaLinkedin size={28} />
                </a>
                <a href="https://github.com/Chang-CH">
                  <FaGithub size={28} />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.divGizmo}>
            <MidiPlayer />
          </div>
        </div>
      </div>
      <div className={styles.divExperience}>
        <h2 className={styles.h2}>Experience</h2>
        <Timeline
          data={[
            {
              title: "Jr. Solution Developer",
              timeline: "May 2023 - July 2023",
              tags: ["Python", "Tableau", "SQL", "Snowflake"],
              preview: "/work/F5.svg",
              description: (
                <p>
                  • Worked with F5&apos;s Global Support Innovation Lab team on
                  the internal management tools
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
                  to bulk create promotion media <br /> • Built a JavaScript
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
        <div className={styles.divExperience}>
          <h2 className={styles.h2}>Projects</h2>
          <div className={styles.divProjects}>
            <TurboCard className={styles.cardProject}>
              <h3 className={styles.titleProject}>
                <strong>mfe-proxy</strong>
              </h3>
              <p>proxy to local or remote micro front ends on the go</p>
            </TurboCard>
            <TurboCard className={styles.cardProject}>
              <h3 className={styles.titleProject}>
                <strong>draw2p</strong>
              </h3>
              <p>drawing collaboration app using p2p WebRTC</p>
            </TurboCard>
            <TurboCard className={styles.cardProject}>
              <h3 className={styles.titleProject}>
                <strong>Hireside</strong>
              </h3>
              <p>
                Instant price estimates for renovation works from web scraped
                data
              </p>
            </TurboCard>
            <TurboCard className={styles.cardProject}>
              <h3 className={styles.titleProject}>
                <strong>Others</strong>
              </h3>
              <p>Gizmos, websites, and other random stuff</p>
            </TurboCard>
          </div>
        </div>
        <div style={{ height: "30vh" }} />
      </div>
      <BlobBg />
    </div>
  );
};

export default Home;
