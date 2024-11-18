import { Address } from "../types/dataTypes";

const trimString = (
  longString: string | null | undefined,
  length: number = 300
) => {
  (!longString || longString === "") && (longString = "No description");
  return longString.length > length
    ? longString.substring(0, length) + "..."
    : longString;
};
const formatDateString = (
  dateString: string,
  fullDate?: boolean,
  time?: boolean
): string => {
  const date = new Date(dateString);
  if (!fullDate) {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
    });
  }
  if (!time) {
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
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

const getTimeDifference = (date: Date): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 7));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInDays < 2) {
    return `${diffInDays} day ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString("en-GB"); // Format: dd:mm:yyyy
  }
};

const numberRatingToStars = (number: number): string | null => {
  if (number < 0 || number > 5) {
    return null;
  }

  const fullStars = Math.floor(number);
  const halfStar = number % 1 >= 0.25 ? "⯪" : "";

  const stars = "★".repeat(fullStars) + halfStar;

  const emptyStars = "☆".repeat(5 - fullStars - (halfStar ? 1 : 0));

  return stars + emptyStars;
};
const formatAddress = (address: Address) => {
  return `${address.route} ${address.street_number}, ${address.postal_code} ${address.locality}, ${address.country}`;
};

export {
  trimString,
  formatDateString,
  checkScreenSize,
  getTimeDifference,
  numberRatingToStars,
  formatAddress,
};
