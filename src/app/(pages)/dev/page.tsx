// import dynamic from "next/dynamic";

import GitTimeline from "@/common/stdlib/timeline/GitTimeline";

// const VueButton = dynamic(() => import("vueButton/VueButton"), {
//   suspense: true,
// });

const Dev = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>a</p>
      <GitTimeline data={[]} />
      {/* <VueButton /> */}
    </div>
  );
};

export default Dev;
