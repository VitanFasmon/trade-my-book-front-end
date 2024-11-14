import Typography from "./Typography";
interface AddCommentProps {
  comment: string;
  setComment: (value: string) => void;
}
const AddComment = ({ comment, setComment }: AddCommentProps) => {
  return (
    <div className="">
      <Typography as="h3" variant="h3">
        Add comment (optional)
      </Typography>
      <textarea
        className="border rounded-lg p-2 w-full"
        placeholder="Comment"
        rows={5}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </div>
  );
};
export default AddComment;
