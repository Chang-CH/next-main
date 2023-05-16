type PageProps = {
  children: React.ReactNode;
  dotColour?: string;
  bgColour?: string;
  dotRadius?: string;
  dotSpacing?: string;
  style?: React.CSSProperties;
  className?: string;
  otherProps?: {
    [key: string]: string;
  };
};

const BackgroundDots = ({
  children,
  dotColour,
  bgColour,
  dotRadius,
  dotSpacing,
  style,
  className,
  ...otherProps
}: PageProps) => {
  return (
    <div
      {...otherProps}
      className={`${className ?? ""}`}
      style={{
        ...style,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${
          dotColour ?? ""
        }  ${dotRadius ?? "1px"}, ${bgColour ?? ""} 0)`,
        backgroundSize: `${dotSpacing ?? "40px"} ${dotSpacing ?? "40px"}`,
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundDots;
