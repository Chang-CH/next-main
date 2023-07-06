import ProjectCard from "./components/Card";
import draw2p from "./assets/draw2p.png";
import mfe from "./assets/mfe.png";
import hireside from "./assets/hireside.png";
import styles from "./s.module.css";

const Projects = () => {
  return (
    <div className={styles.root}>
      <div className={styles.titleDiv}>
        <h1 className={styles.title}>Projects</h1>
      </div>
      <ProjectCard
        preview={mfe}
        title="mfe-proxy"
        description="Avoid hardcoding port numbers for remote webpack micro front ends in development."
        tech={["NodeJs", "Websocket", "Webpack", "Module Federation"]}
        link="https://www.npmjs.com/package/@chang-ch/mfe-proxy"
        source="https://github.com/Chang-CH/mfe-proxy"
      />
      <ProjectCard
        preview={draw2p}
        title="Draw2P"
        description="Peer to peer Google Drawings. Communicates via WebRTC, drawing done with canvas."
        tech={["React", "Ant Design", "Vite"]}
        link="https://chang-ch.github.io/draw2p/"
        source="https://github.com/Chang-CH/draw2p"
      />
      <ProjectCard
        preview={hireside}
        title="Hireside"
        description="Renovation work price estimator. Shortlisted for NUS Venture Initiation Programme 2021."
        tech={["React", "NextJS", "DynamoDB", "AWS"]}
        link="https://www.hireside.co"
      />
    </div>
  );
};

export default Projects;
