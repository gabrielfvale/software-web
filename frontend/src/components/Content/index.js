import { Box } from '@chakra-ui/react';

const Content = ({ children, ...rest }) => {
  return (
    <Box
      paddingY="1rem"
      sx={{
        '@media (min-width: 480px)': {
          paddingX: '1rem',
        },
        '@media (min-width: 768px)': {
          paddingX: '7.5rem',
        },
        '@media (min-width: 1280px)': {
          paddingX: '15rem',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Content;
