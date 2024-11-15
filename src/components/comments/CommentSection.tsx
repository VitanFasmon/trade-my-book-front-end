import { useEffect, useState } from "react";
import { CommentData, PublicUserData, TradeData } from "../../types/dataTypes";
import { fetchUserDataById, getCommentsByTradeId } from "../../data/apiService";
import { getTimeDifference } from "../../util/util";
import useAuthStore from "../../store/useAuthStore";
import Typography from "../Typography";

interface CommentSectionProps {
  trade: TradeData;
  refresh?: boolean;
}
const CommentSection = ({ trade, refresh }: CommentSectionProps) => {
  const [comments, setComments] = useState<CommentData[] | null>(null);
  const { user } = useAuthStore();
  const [otherUser, setOtherUser] = useState<PublicUserData | null>(null);
  const getComments = async () => {
    try {
      const response = await getCommentsByTradeId(trade.trade_id);
      if (!response.data) return;
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const getOtherUserData = async () => {
    try {
      const otherUserId =
        trade.user_from === user?.user_id ? trade.user_to : trade.user_from;
      const response = await fetchUserDataById(otherUserId);
      setOtherUser(response.data || null);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getComments();
    getOtherUserData();
  }, [refresh]);
  return (
    <>
      {comments?.length ? (
        <section className="flex flex-col gap-4 w-full max-w-[800px] max-h-96 h-fit overflow-auto bg-white p-2 border-primary border-b border-t">
          {comments?.map((comment) => {
            return (
              <div className="border p-2 rounded-xl" key={crypto.randomUUID()}>
                <div className="flex flex-row gap-2 justify-between">
                  <Typography as="p" variant="p" className="font-bold">
                    {user?.user_id == comment.user_id ? "You" : otherUser?.name}
                  </Typography>
                  <p>{getTimeDifference(new Date(comment.date_posted))}</p>
                </div>
                <p>{comment.content}</p>
              </div>
            );
          })}
        </section>
      ) : (
        <></>
      )}
    </>
  );
};
export default CommentSection;
