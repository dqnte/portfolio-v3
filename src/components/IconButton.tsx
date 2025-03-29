const IconButton = ({
  children,
  className,
  hovered,
}: {
  children: React.ReactNode;
  className?: string;
  hovered?: boolean;
}) => {
  return (
    <div className={`IconButton ${className} ${hovered ? "hovered" : ""}`}>
      {children}
      <div className="IconButton__strike">
        <div className="IconButton__strike--outer">
          <div className="IconButton__strike--inner" />
        </div>
      </div>
    </div>
  );
};

export default IconButton;
