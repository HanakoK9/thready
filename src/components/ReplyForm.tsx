import { useState } from "react";
import type { Reply } from "@prisma/client";
import { Avatar, Box, Button, HStack, Input } from "@chakra-ui/react";

interface ReplyFormProps {
  autoFocus?: boolean;
  buttonText?: string;
  initialValue?: string;
  loading: boolean;
  error?: string;
  onSubmit: (message: string) => Promise<Reply | void>;
}

export const ReplyForm = ({
  autoFocus = false,
  buttonText = "Reply",
  error,
  initialValue = "",
  loading,
  onSubmit,
}: ReplyFormProps) => {
  const [message, setMessage] = useState(initialValue);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSubmit(message).then(() => {
      setMessage("");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <HStack m="4">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

          <Input
            autoFocus={autoFocus}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tweet your reply"
            border="none"
          />

          <Button disabled={!!loading} borderRadius="3xl" px="6" bg="#1A8CD8">
            {loading ? "..." : buttonText}
          </Button>
        </HStack>
        {/* <Center my="4">
          <Button
            onClick={() => signIn("twitter")}
            w="container.lg"
            borderRadius="3xl"
            px="6"
            bg="#1A8CD8"
          >
            Login to reply
          </Button>
        </Center> */}
        <Box mt="2" color="red.500">
          {error}
        </Box>
      </form>
    </>
  );
};
