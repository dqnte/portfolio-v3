const IconButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`IconButton ${className}`}>
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
