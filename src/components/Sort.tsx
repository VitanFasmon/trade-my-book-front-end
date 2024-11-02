import Button from "./Buttons/Button";

interface SortProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
}
const Sort = ({
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection,
}: SortProps) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        type="outlinedSecondary"
        onClick={() => {
          sortDirection == "desc"
            ? setSortDirection("asc")
            : setSortDirection("desc");
        }}
      >
        {sortDirection == "desc" ? "▼" : "▲"}
      </Button>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="border-2 border-secondary rounded-lg p-2 bg-white text-secondary font-bold"
        aria-label="sort by"
      >
        <option className=" font-bold" value="title">
          Title
        </option>
        <option className=" font-bold" value="author">
          Author
        </option>
        <option className=" font-bold" value="date_added">
          Date added
        </option>
        <option className=" font-bold" value="published_date">
          Published Date
        </option>
        <option className=" font-bold" value="condition">
          Condition
        </option>
      </select>
    </div>
  );
};
export default Sort;
