// import dynamic from "next/dynamic";

import TurboCard from "@/common/stdlib/card/TurboCard";

// const VueButton = dynamic(() => import("vueButton/VueButton"), {
//   suspense: true,
// });

const Dev = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <p>a</p>
      <TurboCard>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
        <p>lorem ipsum dolor sit amet</p>
      </TurboCard>
      {/* <VueButton /> */}
    </div>
  );
};

export default Dev;
