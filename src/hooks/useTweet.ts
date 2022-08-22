import { Reply } from "../types/reply";
import { trpc } from "../utils/trpc";
import { useMemo } from "react";

export const useTweet = () => {
  // const post = trpc.useQuery(["post.getById", { id }]);

  const replies = trpc.useQuery("")

  const repliesByParentId = useMemo(() => {
    if (replies === null) return null;

    const group: { [key: string]: Reply[] } = {};

    replies.data?((reply) => {
      group[reply.parentId!] ||= [];
      group[reply.parentId!]?.push(reply);
    })

    return group;
  }, [replies]);

  const getReplies = (parentId: string) => {
    return repliesByParentId?.[parentId] || [];
  };

  return {
    rootReplies: repliesByParentId?.["null"] || [],
    getReplies,
  };
};
