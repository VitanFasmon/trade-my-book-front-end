import React from "react";

type Tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

interface TypographyProps {
  as?: Tag;
  variant?: Tag;
  children?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<Tag, string> = {
  h1: "font-bold text-4xl md:text-5xl lg:text-6xl",
  h2: "font-bold text-3xl md:text-4xl",
  h3: "font-semibold text-2xl",
  h4: "font-medium text-xl",
  h5: " text-lg",
  h6: "text-base",
  p: "text-base",
  span: " text-sm",
};

const Typography: React.FC<TypographyProps> = ({
  as: Tag = "p",
  children,
  variant = "p",
  className = "",
}) => {
  const variantClass = variantClasses[variant];

  return (
    <Tag className={`${variantClass} ${className} font-sans`}>{children}</Tag>
  );
};

export default Typography;
