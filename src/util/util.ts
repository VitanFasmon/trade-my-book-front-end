const trimString = (
  longString: string | null | undefined,
  length: number = 300
) => {
  (!longString || longString === "") && (longString = "No description");
  return longString.length > length
    ? longString.substring(0, length) + "..."
    : longString;
};
const formatDateString = (dateString: string, fullDate?: boolean): string => {
  const date = new Date(dateString);
  if (!fullDate) {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

function checkScreenSize(size: keyof typeof breakpoints): boolean {
  const minWidth = breakpoints[size];
  if (!minWidth) {
    console.warn(`Invalid screen size: ${size}`);
    return false;
  }

  return window.matchMedia(`(min-width: ${minWidth})`).matches;
}

export { trimString, formatDateString, checkScreenSize };
