import { Box } from "@chakra-ui/react";
import type { Reply as IReply } from "../types/reply";
import { Reply } from "./Reply";

interface ReplyListProps {
  replies: IReply[];
}

export const ReplyList = ({ replies }: ReplyListProps) => {
  return (
    <div>
      {replies?.map((reply: IReply) => (
        <Box key={reply.id} my="2">
          <Reply reply={reply} />
        </Box>
      ))}
    </div>
  );
};
