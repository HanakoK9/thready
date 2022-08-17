import {
  useDisclosure,
  Button,
  Box,
  ScaleFade,
  Text,
  Divider,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Flex,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { TbMessageCircle2 } from "react-icons/tb";

const ReplyCard = () => {
  return (
    <>
      <Box maxW="md" ml="20" overflow="hidden">
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
            <Icon as={TbMessageCircle2} cursor="pointer" w={6} h={6} />
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
    </>
  );
};

const Replies = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton>
            <Text
              // onClick={onToggle}
              color="blue.400"
              ml="14"
              cursor="pointer"
            >
              view replies
            </Text>
          </AccordionButton>
          <AccordionPanel pb={4}>
            <ReplyCard />
            <ReplyCard />
            <ReplyCard />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      {/* <Divider my="2" /> */}
    </>
  );
};

export default Replies;
