import Image from "next/image";
import styles from "./s.module.css";

export interface TimelineData {
  title: string;
  description: React.ReactNode;
  tags: string[];
  preview: string;
  timeline: string;
}
const Timeline = ({ data }: { data: TimelineData[] }) => {
  return (
    <div className="w-full">
      {data.map((entry, index) => {
        return (
          <>
            <div className={styles.card} key={index}>
              {entry.preview ? (
                <Image
                  className={styles.image}
                  src={entry.preview}
                  alt={entry.title}
                  width={200}
                  height={200}
                />
              ) : null}
              <div className={styles.cardBody}>
                <h2 className="text-2xl font-bold">{entry.title}</h2>
                <p>{entry.timeline}</p>
                <div className="flex flex-row mr-auto justify-center items-center">
                  {entry.tags.map((name: string, index: number) => (
                    <p
                      key={index}
                      className="bg-gray-700 rounded-full mr-1 px-3"
                    >
                      {name}
                    </p>
                  ))}
                </div>
                <div className="w-full">{entry.description}</div>
              </div>
            </div>
            {index < data.length - 1 ? (
              <div className={styles.connector} />
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default Timeline;
