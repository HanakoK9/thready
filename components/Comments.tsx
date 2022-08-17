import {
  useDisclosure,
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Divider,
  Text,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { TbMessageCircle2 } from "react-icons/tb";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import Replies from "./Replies";

const Comments = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { data: messages, isLoading } = trpc.useQuery(["guestbook.getAll"]);

  // if (isLoading) return <div>Fetching messages...</div>;

  return (
    <>
      <Box maxW="lg" overflow="hidden">
        <Box p="4">
          <Box display="flex">
            <Avatar
              name="Bhupesh Pradhan"
              src="https://pbs.twimg.com/profile_images/1441399914282426377/6JSnYSXg_400x400.jpg"
            />
            <Flex flexDirection="column">
              <HStack mx="2">
                <strong>Bhupesh Pradhan</strong>
                <Text color="gray.400">@bhupeshpr25 &bull; 17h</Text>
              </HStack>
              <HStack mx="2">
                <Text color="gray.400">Replying to</Text>
                <Text color="#1A8CD8">@bhupeshpr25</Text>
              </HStack>
            </Flex>
          </Box>

          {/* limit no.of lines (use textarea for input?) */}
          <Text ml="14" mt="1" fontSize="sm" lineHeight="tight">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            similique beatae blanditiis odio dicta dolores minima repellat qui
            eos amet dolor consequuntur vel laboriosam illo, quibusdam quia et
            hic numquam.
          </Text>
        </Box>

        {/* <Divider /> */}

        <HStack py="2" ml="10" spacing="10" justify="space-evenly">
          <Flex>
            <Icon
              as={TbMessageCircle2}
              cursor="pointer"
              onClick={onOpen}
              w={6}
              h={6}
            />
            <Text ml="2">1</Text>
          </Flex>
          <Flex>
            <Icon cursor="pointer" as={AiOutlineRetweet} w={6} h={6} />
            <Text ml="2">9</Text>
          </Flex>
          <Flex>
            <Icon cursor="pointer" as={AiOutlineHeart} w={6} h={6} />
            <Text ml="2">27</Text>
          </Flex>
          <Icon as={FiShare} w={6} h={6} />
        </HStack>
      </Box>

      <Replies />

      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box p="2">
              <Box display="flex">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                <Divider
                  h="36"
                  mt="12"
                  ml="5"
                  variant="solid"
                  position="absolute"
                  orientation="vertical"
                />
                <Flex mx="2" bg="blackAlpha.400">
                  <strong>Bhupesh Pradhan</strong>
                  <Text color="gray.400">@bhupeshpr25 &bull; 17h</Text>
                </Flex>
              </Box>

              {/* limit no.of lines (use textarea for input?) */}
              <Text ml="14" mt="1" fontSize="sm" lineHeight="tight">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates similique beatae blanditiis odio dicta dolores minima
                repellat qui eos amet dolor consequuntur vel laboriosam illo,
                quibusdam quia et hic numquam.
              </Text>
              <HStack ml="14" mt="4">
                <Text>Replying to</Text>
                <Text color="#1A8CD8">@bhupeshpr25</Text>
              </HStack>

              <HStack mt="4">
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />

                {/* default */}
                {/* <Text>Login to reply</Text> */}

                {/* logged in */}
                <Input placeholder="Tweet your reply" border="none" />
              </HStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} borderRadius="3xl" px="6" bg="#1A8CD8">
              Reply
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Comments;
