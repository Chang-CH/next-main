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
          className="object-cover h-[300px]"
          src={props.preview}
          alt={props.title}
        />
      ) : null}
      <div className="w-full mt-5">
        <h2 className="text-2xl font-bold">{props.title}</h2>
        <div className="flex flex-row mr-auto justify-center items-center">
          {props.tech.map((name: string, index: number) => (
            <p key={index} className="bg-gray-700 rounded-full mr-1 px-3">
              {name}
            </p>
          ))}
        </div>
        <p className="w-full">{props.description}</p>
        <div className="flex flex-row ml-auto mt-auto">
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
