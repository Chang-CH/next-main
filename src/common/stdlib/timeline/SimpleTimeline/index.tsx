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
    <div style={{ width: "100%" }}>
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
                <h2 className={styles.title}>{entry.title}</h2>
                <p>{entry.timeline}</p>
                <div className={styles.tagDiv}>
                  {entry.tags.map((name: string, index: number) => (
                    <p key={index} className={styles.tag}>
                      {name}
                    </p>
                  ))}
                </div>
                <div style={{ width: "100%" }}>{entry.description}</div>
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
