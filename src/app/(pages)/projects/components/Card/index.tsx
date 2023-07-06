import { Button } from "@/common/stdlib";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import styles from "./s.module.css";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";

interface ProjectCardProps {
  preview: StaticImageData;
  tech: Array<string>;
  title: string;
  description: string;
  link?: string;
  source?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  return (
    <div className={styles.card}>
      {props.preview ? (
        <Image
          className={styles.preview}
          src={props.preview}
          alt={props.title}
        />
      ) : null}
      <div className={styles.divContent}>
        <h2 className={styles.title}>{props.title}</h2>
        <div className={styles.divtech}>
          {props.tech.map((name: string, index: number) => (
            <p key={index} className={styles.tag}>
              {name}
            </p>
          ))}
        </div>
        <p className={styles.description}>{props.description}</p>
        <div className={styles.divLinks}>
          {props.link ? (
            <Link href={props.link}>
              <Button>
                <AiOutlineSearch />
                View
              </Button>
            </Link>
          ) : null}
          {props.source ? (
            <a href={props.source}>
              <Button>
                <AiFillGithub />
                Source
              </Button>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
