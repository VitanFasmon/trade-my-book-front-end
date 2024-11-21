import Button from "./buttons/Button";
import RoundedContainer from "./RoundedContainer";

interface SortProps {
  sortOption: string;
  setSortOption: (option: string) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  className?: string;
  onChange?: () => void;
}
const Sort = ({
  sortOption,
  setSortOption,
  sortDirection,
  setSortDirection,
  className,
  onChange,
}: SortProps) => {
  return (
    <div className={`flex flex-row gap-2 ${className} `}>
      <RoundedContainer className="bg-lightGray">
        <select
          value={sortOption}
          onChange={(e) => {
            setSortOption(e.target.value);
            onChange && onChange();
          }}
          className="bg-lightGray text-secondary font-bold"
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
      </RoundedContainer>
      <Button
        type="outlinedSecondary"
        className="bg-lightGray"
        onClick={() => {
          sortDirection == "desc"
            ? setSortDirection("asc")
            : setSortDirection("desc");
          onChange && onChange();
        }}
      >
        {sortDirection == "desc" ? "▼" : "▲"}
      </Button>
    </div>
  );
};
export default Sort;
