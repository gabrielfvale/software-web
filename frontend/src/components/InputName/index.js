import { Heading, Input, Box } from '@chakra-ui/react';

const InputName = ({ text = '' }) => {
  return (
    <Box>
      <Heading fontSize="sm" marginLeft="0.3rem" marginBottom="0.5rem">
        {text}
      </Heading>
      <Input
        variant="filled"
        width="20rem"
        fontSize="xs"
        marginBottom="0.5rem"
      />
    </Box>
  );
};

export default InputName;
