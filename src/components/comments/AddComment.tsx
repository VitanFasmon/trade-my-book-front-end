import Typography from "../Typography";
interface AddCommentProps {
  comment: string;
  setComment: (value: string) => void;
}
const AddComment = ({ comment, setComment }: AddCommentProps) => {
  return (
    <div className="w-full flex flex-col gap-2 items-center  border-lightGray rounded-xl">
      <Typography as="h3" variant="h3">
        Add comment
      </Typography>
      <textarea
        className="border rounded-lg p-2 w-full bg-white"
        placeholder="Comment"
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};
export default AddComment;
