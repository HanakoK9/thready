import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTweet } from "../hooks/useTweet";
import { trpc } from "../utils/trpc";
import type { Reply as IReply } from "../types/reply";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiArrowDownLeft, FiShare, FiTrash } from "react-icons/fi";
import { TbMessageCircle2, TbPencil } from "react-icons/tb";
import { ReplyForm } from "./ReplyForm";
import { ReplyList } from "./ReplyList";

const dateFormatter = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
});

interface ReplyProps {
  reply: IReply;
}

export const Reply = ({ reply }: ReplyProps) => {
  const { id, message, user, createdAt, likeCount, likedByMe } = reply;

  const { isOpen, onToggle } = useDisclosure();

  const router = useRouter();
  const { data: session } = useSession();

  const { getReplies } = useTweet();

  const { invalidateQueries } = trpc.useContext();
  const createReply = trpc.useMutation(["protectedTweet.postReply"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      // await invalidateQueries(['post.getById', ({
      //   id: postId
      // })]);
    },
  });

  const updateReply = trpc.useMutation(["protectedTweet.updateReply"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      // await invalidateQueries(['post.getById', ({
      //   id: postId
      // })]);
    },
  });

  const deleteReply = trpc.useMutation(["protectedTweet.deleteReply"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      // await invalidateQueries(['post.getById', ({
      //   id: postId
      // })]);
    },
  });

  const toggleReplyLike = trpc.useMutation(["protectedTweet.toggleLike"], {
    async onSuccess() {
      // Refetches posts after a comment is added
      // await invalidateQueries(['post.getById', ({
      //   id: postId
      // })]);
    },
  });

  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const childReplies = getReplies(id);

  const handleReply = async (message: string) => {
    return await createReply
      .mutateAsync({
        message,
        parentId: id,
      })
      .then(() => {
        setIsReplying(false);
      });
  };

  const handleReplyEdit = async (message: string) => {
    return await updateReply
      .mutateAsync({
        replyId: id,
        message,
      })
      .then(() => {
        setIsEditing(false);
      });
  };

  const handleReplyDelete = async () => {
    return await deleteReply.mutateAsync({
      replyId: id,
    });
  };

  const handleToggleReplyLike = async () => {
    if (!session) return;

    return await toggleReplyLike.mutateAsync({
      replyId: id,
    });
  };

  return (
    <>
      <Box key={id} maxW="md" ml="20" overflow="hidden">
        <Box p="4">
          <Box display="flex">
            <Avatar
              name="avatar"
              src="https://pbs.twimg.com/profile_images/1441399914282426377/6JSnYSXg_400x400.jpg"
            />
            <Flex flexDirection="column">
              <HStack mx="2">
                <strong>{user.name}</strong>
                <Text color="gray.400">
                  @bhupeshpr25 &bull; {dateFormatter.format(createdAt)}
                </Text>
              </HStack>
              <HStack mx="2">
                <Text color="gray.400">Replying to</Text>
                <Text color="#1A8CD8">@bhupeshpr25</Text>
              </HStack>
            </Flex>
          </Box>

          {isEditing ? (
            <ReplyForm
              autoFocus
              buttonText="Update"
              initialValue={message}
              onSubmit={handleReplyEdit}
              loading={false}
            />
          ) : (
            <Text ml="14" mt="1" fontSize="sm" lineHeight="tight">
              {message}
            </Text>
          )}
        </Box>

        {/* <Divider /> */}

        <HStack py="2" ml="10" spacing="10" justify="space-evenly">
          <Flex>
            <Icon as={TbMessageCircle2} cursor="pointer" w={6} h={6} />
            <Text ml="2">1</Text>
          </Flex>
          <Flex>
            <Icon cursor="pointer" as={AiOutlineRetweet} w={6} h={6} />
            <Text ml="2">9</Text>
          </Flex>
          <Flex>
            <IconButton
              onClick={handleToggleReplyLike}
              icon={likedByMe ? <AiFillHeart /> : <AiOutlineHeart />}
              aria-label={likedByMe ? "Unlike" : "Like"}
              color="red.700"
              w={6}
              h={6}
            >
              {likeCount}
            </IconButton>
          </Flex>
          {session && (
            <IconButton
              onClick={() => setIsReplying((prev) => !prev)}
              icon={<FiArrowDownLeft />}
              aria-label="Reply"
              isActive={isReplying}
              color="blue.700"
            />
          )}
          {user.id === session?.user?.id && (
            <>
              <IconButton
                onClick={() => setIsEditing((prev) => !prev)}
                icon={<TbPencil />}
                aria-label="Edit"
                isActive={isEditing}
                color="teal.700"
              />
              <IconButton
                onClick={handleReplyDelete}
                icon={<FiTrash />}
                aria-label="Delete"
                color="purple.700"
              />
            </>
          )}
          <Icon as={FiShare} w={6} h={6} />
          {isReplying && (
            <Box mt="1" ml="3">
              <ReplyForm
                autoFocus
                buttonText="Reply"
                onSubmit={handleReply}
                loading={false}
              />
            </Box>
          )}
        </HStack>
      </Box>

      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Text onClick={onToggle} color="blue.400" ml="14" cursor="pointer">
              view replies
            </Text>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ReplyList replies={childReplies} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
