import { convertData, convertPath, convertPoints } from "./utils";

export interface TimelineData {
  title: string;
  description: React.ReactNode;
  tags: string[];
  preview: string;
  timeline: string;
}

// eslint-disable-next-line unused-imports/no-unused-vars
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
  const height = 3 * 10;
  const values = convertData(width, height, tempData, 3, 14, true);

  const paths = tempData.map((item, arrIdx) => {
    if (arrIdx === 0)
      return `M ${values.startX} ${values.startY} L ${values.endX} ${values.endY}`;

    const data: ["branch" | "merge", number][] = [
      ["branch", item.start - 1],
      ["merge", item.end],
    ];

    return convertPath(
      values,
      convertPoints(values, item.offset, data, true),
      true
    );
  });

  return (
    <div
      className="w-full h-1/2"
      style={{ height: "300px", width: "1000px", position: "relative" }}
    >
      <div
        style={{
          paddingTop: `${(height / width) * 100}%`,
          backgroundColor: "#ff000033",
          position: "relative",
        }}
      >
        {tempData.map((data, idx) => (
          <button
            style={{
              position: "absolute",
              top: `${100 - ((data.offset + 1) * 100) / 4}%`,
              left: `${((data.start + data.end - 2) * 50) / 15}%`,
              transform: "translate(-10%, -25%)",
            }}
            key={idx}
          >
            {data.role}
          </button>
        ))}
      </div>
      <svg
        height="100%"
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        style={{ zIndex: -1, position: "absolute" }}
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
