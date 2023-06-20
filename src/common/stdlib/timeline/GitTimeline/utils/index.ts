export const convertData = (
  width: number,
  height: number,
  data: {
    start: number;
    end: number;
    offset: number;
  }[],
  rows: number,
  maxIndex: number,
  horizontal?: boolean
) => {
  const numRows = rows;

  const viewboxX = width;
  const viewboxY = height;

  const unitX = Math.floor(viewboxX / (maxIndex + 1));
  const unitY = Math.floor(viewboxY / (numRows + 1));

  const startX = horizontal ? unitX : viewboxX - unitX;
  const startY = horizontal ? viewboxY - unitY : unitY;

  const endX = horizontal ? viewboxX - unitX : viewboxX - unitX;
  const endY = horizontal ? viewboxY - unitY : viewboxY - unitY;

  const convertPoints = (
    offset: number,
    data: ["branch" | "merge", number][],
    horizontal?: boolean
  ) => {
    const points: [number, number][] = [];
    offset *= horizontal ? unitY : unitX;
    for (const action of data) {
      if (action[0] === "branch") {
        points.push(
          horizontal ? [action[1] * unitX, startY] : [startX, action[1] * unitY]
        );
        points.push(
          horizontal
            ? [(action[1] + 0.5) * unitX, startY - offset]
            : [startX - offset, (action[1] + 0.5) * unitY]
        );
        continue;
      }
      // is a merge
      points.push(
        horizontal
          ? [action[1] * unitX, startY - offset]
          : [startX - offset, action[1] * unitY]
      );
      points.push(
        horizontal
          ? [(action[1] + 0.5) * unitX, startY]
          : [startX, (action[1] + 0.5) * unitY]
      );
    }
    return points;
  };

  const convertPath = (points: [number, number][], horizontal?: boolean) => {
    let path = `M ${startX} ${startY}`;

    let oldX = startX;
    let oldY = startY;

    for (const point of points) {
      const [x1, y1] = point;

      if (horizontal) {
        if (y1 === oldY) {
          path += ` L ${x1} ${y1}`;
        } else {
          path += ` C ${oldX + unitX / 4} ${oldY}, ${
            oldX + unitX / 4
          } ${y1}, ${x1} ${y1}`;
        }
      } else {
        if (x1 === oldX) {
          path += ` L ${x1} ${y1}`;
        } else {
          path += ` C ${oldX} ${oldY + unitY / 4}, ${x1} ${
            oldY + unitY / 4
          }, ${x1} ${y1}`;
        }
      }

      oldX = x1;
      oldY = y1;
    }

    // TODO: use oldX/Y instead
    path += ` L ${endX} ${endY}`;

    return path;
  };

  const result = data.map((item, arrIdx) => {
    if (arrIdx === 0) return `M ${startX} ${startY} L ${endX} ${endY}`;

    const data: ["branch" | "merge", number][] = [
      ["branch", item.start - 1],
      ["merge", item.end],
    ];

    return convertPath(
      convertPoints(item.offset, data, horizontal),
      horizontal
    );
  });

  return result;
};
