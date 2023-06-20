import { convertData } from "./utils";

export interface TimelineData {
  title: string;
  description: React.ReactNode;
  tags: string[];
  preview: string;
  timeline: string;
}
const GitTimeline = ({ data }: { data: TimelineData[] }) => {
  const tempData = [
    {
      company: "NUS",
      role: "student",
      start: 1,
      end: 14,
      color: "#f5165d",
      offset: 0,
    },

    {
      company: "NUS",
      role: "Teaching Assistant",
      start: 3,
      end: 9,
      color: "#b40471",
      offset: 1,
    },
    {
      company: "Shopee",
      role: "SWE",
      start: 7,
      end: 9,
      color: "#7716f5",
      offset: 2,
    },
    {
      company: "F5",
      role: "SWE",
      start: 11,
      end: 13,
      color: "#3086e9",
      offset: 1,
    },
  ];

  // TODO: set this as prop
  const width = 100;
  const height = 35;
  const paths = convertData(width, height, tempData, 3, 14, true);

  return (
    <div className="w-full h-1/2" style={{ height: "400px" }}>
      <button
        style={{
          position: "absolute",
          top: "40%",
          left: "45%",
          backgroundColor: "black",
          borderRadius: "10px",
        }}
      >
        sample text
      </button>
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ zIndex: -1 }}
      >
        {paths
          .map((path1, idx) => (
            <path
              d={path1}
              key={idx}
              stroke={tempData[idx].color}
              fill="transparent"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))
          .reverse()}
      </svg>
    </div>
  );
};

export default GitTimeline;
