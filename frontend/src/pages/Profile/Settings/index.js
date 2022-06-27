import React, { useState } from 'react';
import { Box, Text, Divider, Button } from '@chakra-ui/react';
import TextInput from './components/TextInput';

const Settings = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');

  return (
    <Box marginX="15rem" paddingY="1.5rem">
      <Text mb={'0.5rem'} fontWeight={'medium'}>
        ACCOUNT SETTINGS
      </Text>
      <Divider />
      <Box width="50%" maxWidth="40rem" justifyContent={'flex-end'}>
        <Text my={'1rem'} fontWeight={'medium'} fontSize="sm">
          Profile Settings
        </Text>
        <TextInput title="Username" value={userName} onChange={setUserName} />
        <Box display={'flex'} gap={'1rem'}>
          <TextInput
            title="First Name"
            value={firstName}
            onChange={setFirstName}
          />
          <TextInput
            title="Last Name"
            value={lastName}
            onChange={setLastName}
          />
        </Box>
        <TextInput title="Email address" value={email} onChange={setEmail} />
        <TextInput title="Country" value={country} onChange={setCountry} />
        <TextInput title="Bio" value={bio} onChange={setBio} isTextArea />
        <Box flex={1} display="flex" justifyContent="flex-end">
          <Button
            fontSize="sm"
            fontWeight="medium"
            colorScheme="m180.pink"
            padding="0.5rem"
            mt="1rem"
          >
            SAVE CHANGES
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
