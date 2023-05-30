import BackgroundDots from "@/common/backgrounds/BackgroundDots";

const InnerPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full min-h-screen justify-center items-center">
      <div className="w-full max-w-[800px]">{children}</div>
      <BackgroundDots dotColour="#444" bgColour="#111" />
    </div>
  );
};

export default InnerPage;
