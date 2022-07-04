import { Flex } from '@chakra-ui/react';

import Comment from '../Comment';
import CommentList from 'components/CommentList';
import Pagination from 'components/Pagination';
import { useState } from 'react';

const CommentSection = ({
  page = 1,
  commentList = {},
  showReply = true,
  onChangePage = () => {},
  onSendComment = () => {},
}) => {
  const [description, setDescription] = useState();

  return (
    <Flex w="100%" flexDir="column" alignItems="center" marginTop="0.5rem">
      {showReply && (
        <Comment
          description={description}
          onChange={e => setDescription(e.target.value)}
          onSend={() => {
            onSendComment(description);
            setDescription('');
          }}
        />
      )}
      <CommentList data={commentList?.results} />
      <Pagination
        page={page}
        total_pages={commentList?.total_pages || 1}
        onClick={onChangePage}
        showGoTo
      />
    </Flex>
  );
};

export default CommentSection;
