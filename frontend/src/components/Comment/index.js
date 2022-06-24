import {
  Flex,
  Box,
  Heading,
  Text,
  Icon,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';

const Comment = () => {
  return (
    <Flex padding="1rem" gap="1rem" width="100%">
      <Box>
        <Flex flexDirection="row" alignItems="center" marginBottom="0.5rem">
          <Heading size="xs">Reviewed by laurazona4</Heading>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Text fontSize="sm">1.0</Text>
          <Icon
            marginLeft="0.4rem"
            marginRight="0.1rem"
            as={AiFillStar}
            color="m180.darkPink"
            fontSize="20px"
          />
          <Icon
            marginLeft="0.1rem"
            marginRight="0.1rem"
            as={AiFillStar}
            color="m180.darkPink"
            fontSize="20px"
          />
          <Icon
            marginLeft="0.1rem"
            marginRight="0.1rem"
            as={AiFillStar}
            color="m180.darkPink"
            fontSize="20px"
          />
          <Icon
            marginLeft="0.1rem"
            marginRight="0.1rem"
            as={AiFillStar}
            color="white"
            fontSize="20px"
          />
          <Icon
            marginLeft="0.2rem"
            marginRight="0.4rem"
            as={AiFillStar}
            color="white"
            fontSize="20px"
          />
          <Text fontSize="sm">22/10/2022</Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop="0.5rem">
          <Text fontSize="sm">loved it so much</Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop="0.5rem">
          <Link display="flex">
            <Icon
              as={AiFillHeart}
              marginRight="0.2rem"
              color="m180.purple"
              fontSize="20px"
            />

            <Text fontSize="xs">Like</Text>
          </Link>

          <Icon
            as={FaComment}
            marginLeft="1rem"
            marginRight="0.2rem"
            color="m180.purple"
            fontSize="20px"
          />

          <Accordion allowToggle display="flex" variant="unstyled">
            <AccordionItem>
              <Box>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize="xs">
                    Reply
                  </Box>
                </AccordionButton>
              </Box>

              <AccordionPanel pb={4}>
                <Textarea
                  variant="filled"
                  fontSize="xs"
                  placeholder="Here is a sample placeholder"
                  width="25rem"
                />
                <Button
                  marginLeft="75%"
                  marginTop="0.5rem"
                  size="sm"
                  fontSize="sm"
                >
                  Send
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Comment;
