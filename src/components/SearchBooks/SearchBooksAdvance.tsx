interface SearchBooksProps {
  searchTitle: string;
  searchAuthor: string;
  setSearchTitle: (term: string) => void;
  setSearchAuthor: (term: string) => void;
  onKeyUp?: () => void;
}

const SearchBooksAdvance = ({
  searchTitle,
  searchAuthor,
  setSearchTitle,
  setSearchAuthor,
  onKeyUp,
}: SearchBooksProps) => {
  return (
    <section className="flex sm:flex-row flex-col gap-4 w-full sm:items-start items-center">
      <input
        type="text"
        placeholder="Author"
        value={searchAuthor}
        onKeyUp={onKeyUp}
        onChange={(e) => setSearchAuthor(e.target.value)}
        className="border-2 border-secondary rounded-lg p-2 sm:w-fit w-full text-primary font-bold placeholder:text-gray placeholder:font-bold bg-lightGray"
      />
      <input
        type="text"
        placeholder="Title"
        value={searchTitle}
        onKeyUp={onKeyUp}
        onChange={(e) => setSearchTitle(e.target.value)}
        className="border-2 border-secondary rounded-lg p-2 w-full text-primary font-bold placeholder:text-gray placeholder:font-bold bg-lightGray "
      />
    </section>
  );
};

export default SearchBooksAdvance;
