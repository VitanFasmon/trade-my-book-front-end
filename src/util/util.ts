const trimString = (
  longString: string | null | undefined,
  length: number = 300
) => {
  (!longString || longString === "") && (longString = "No description");
  return longString.length > length
    ? longString.substring(0, length) + "..."
    : longString;
};
function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
  });
}

export { trimString, formatDateString };
