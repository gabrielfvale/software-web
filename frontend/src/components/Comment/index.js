import {
  Flex,
  Box,
  Heading,
  Text,
  Icon,
  Link,
  IconButton,
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
            marginRight="0.4rem"
            as={AiFillStar}
            color="m180.darkPink"
          />
          <Text fontSize="sm">22/10/2022</Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop="0.5rem">
          <Text fontSize="sm">loved it so much</Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop="0.5rem">
          <Icon
            as={AiFillHeart}
            marginRight="0.2rem"
            color="m180.purple"
            fontSize="20px"
          />

          <Text fontSize="xs">Like it</Text>
          <Link>
            <Icon
              as={FaComment}
              marginLeft="1rem"
              marginRight="0.2rem"
              color="m180.purple"
              fontSize="20px"
            />
          </Link>
          <Text fontSize="xs">Reply</Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Comment;
