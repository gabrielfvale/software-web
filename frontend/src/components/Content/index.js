import { Box } from '@chakra-ui/react';

const Content = ({ children, ...rest }) => {
  return (
    <Box
      paddingY="1rem"
      sx={{
        '@media only screen and (max-width: 768px)': {
          paddingX: '1rem',
        },
        '@media only screen and (min-width: 768px)': {
          paddingX: '7.5rem',
        },
        '@media only screen and (min-width: 1280px)': {
          paddingX: '15rem',
        },
        '@media only screen and (min-width: 1920px)': {
          paddingX: '20rem',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Content;
