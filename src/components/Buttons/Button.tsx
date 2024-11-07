interface ButtonProps {
  children: React.ReactNode;
  type:
    | "primary"
    | "secondary"
    | "outlinedPrimary"
    | "outlinedSecondary"
    | "planePrimary"
    | "planeSecondary"
    | "danger";
  onClick?: (e?: any) => void;
  className?: string;
  disabled?: boolean;
  link?: boolean;
  href?: string;
  target?: string;
}
const ButtonTypesClassNames = {
  primary:
    "bg-secondary border border-2 border-secondary  rounded-lg text-white hover:bg-opacity-70",
  secondary:
    "bg-primary border-primary  border-2 border rounded-lg text-white hover:bg-opacity-70 ",
  outlinedPrimary:
    "rounded-lg text-primary border border-2 border-primary  hover:text-opacity-70 hover:border-opacity-70 ",
  outlinedSecondary:
    "rounded-lg text-secondary border border-2 border-secondary  hover:text-opacity-70 hover:border-opacity-70 ",
  planePrimary:
    "rounded-lg text-primary  hover:text-opacity-70 hover:border-opacity-70 ",
  planeSecondary:
    "rounded-lg text-secondary  hover:text-opacity-70 hover:border-opacity-70 ",
  danger:
    "bg-red-700 border border-2 border-secondary  rounded-lg text-white hover:bg-opacity-70",
};
const Button = ({
  children,
  className,
  onClick,
  type,
  link,
  href,
  disabled,
  target,
}: ButtonProps) => {
  const classNames = `${ButtonTypesClassNames[type]} ${className} font-bold px-4 py-2 transition-colors duration-300 flex items-center align-center justify-center`;
  return (
    <>
      {link ? (
        <a className={classNames} href={href || ""} target={target}>
          {children}
        </a>
      ) : (
        <button className={classNames} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};
export default Button;
