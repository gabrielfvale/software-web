import { Heading, Input, Box } from '@chakra-ui/react';

const InputName = ({ text = '' }) => {
  return (
    <Box>
      <Heading fontSize="sm" marginLeft="0.3rem" marginBottom="0.5rem">
        {text}
      </Heading>
      <Input width="20rem" fontSize="xs" marginBottom="0.5rem" bg="white" />
    </Box>
  );
};

export default InputName;
