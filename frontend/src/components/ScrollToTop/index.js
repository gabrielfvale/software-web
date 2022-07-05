import { IconButton } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTop = ({ threshold = 400 }) => {
  const [visible, setVisible] = useState(false);
  const btn = useRef();

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    btn.current.blur();
  };

  const handleScroll = () => {
    if (window.scrollY > threshold) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <IconButton
      ref={btn}
      icon={<FaChevronUp />}
      size="md"
      pos="fixed"
      bottom="3rem"
      right="3rem"
      zIndex="99"
      display={visible ? 'flex' : 'none'}
      onClick={handleClick}
    />
  );
};

export default ScrollToTop;
