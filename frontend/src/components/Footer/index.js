import { Text, HStack, Icon } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import Content from '../Content';
import Link from '../Link';

const Footer = () => {
  const links = [
    {
      text: 'About',
      href: '/about',
    },
    {
      text: 'Help',
      href: '/',
    },
    {
      text: 'Terms',
      href: '/',
    },
    {
      text: 'Contact',
      href: '/',
    },
  ];

  return (
    <Content
      bg="m180.darkBeige"
      width="100%"
      height="8rem"
      position="absolute"
      bottom="0"
    >
      <HStack>
        {links.map(link => (
          <Link
            key={link.text}
            href={link.href}
            color="m180.darkPink"
            fontSize="sm"
          >
            {link.text}
          </Link>
        ))}
      </HStack>
      <Text fontSize="xs">
        Filmit Limited. Made with <Icon as={AiFillHeart} /> by fans.
      </Text>
    </Content>
  );
};

export default Footer;
