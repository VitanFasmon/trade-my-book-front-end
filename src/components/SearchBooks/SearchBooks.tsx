interface SearchBooksProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
const SearchBooks = ({ searchTerm, setSearchTerm }: SearchBooksProps) => {
  return (
    <input
      type="text"
      placeholder="Search books by title, author, or category"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border-2 border-secondary rounded-lg p-2 w-full h-full text-secondary font-bold placeholder:text-gray placeholder:font-bold"
    />
  );
};
export default SearchBooks;
