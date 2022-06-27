import { Box, Text, Input, Textarea } from '@chakra-ui/react';

const TextInput = ({ title, value, onChange, isTextArea }) => {
  const handleChange = event => onChange(event.target.value);

  return (
    <Box mb="1rem" flex={1}>
      <Text mb="0.5rem" fontWeight="medium" fontSize="xs">
        {title}
      </Text>
      {isTextArea ? (
        <Textarea
          value={value}
          onChange={handleChange}
          size="sm"
          bg="m180.darkBeige"
          boxShadow="lg"
        />
      ) : (
        <Input
          value={value}
          onChange={handleChange}
          size="sm"
          bg="m180.darkBeige"
          boxShadow="lg"
        />
      )}
    </Box>
  );
};

export default TextInput;
