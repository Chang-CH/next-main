import ProjectCard from "./components/Card";
import draw2p from "./draw2p.png";
import hireside from "./hireside.png";

const Projects = () => {
  return (
    <div className="flex flex-col justify-center items-center">
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
