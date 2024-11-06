interface RoundedContainerProps {
  children: React.ReactNode;
  borderWidth?: string;
  color?: "primary" | "secondary";
  className?: string;
}
const RoundedContainer = ({
  children,
  borderWidth = "-2",
  color = "secondary",
  className = "",
}: RoundedContainerProps) => {
  return (
    <div
      className={` border${borderWidth} rounded-xl p-2 border-${color} ${className}`}
    >
      {children}
    </div>
  );
};
export default RoundedContainer;
