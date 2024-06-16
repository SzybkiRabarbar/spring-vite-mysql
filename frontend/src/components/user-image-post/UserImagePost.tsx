import React, { useState } from 'react';
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap';
import UserImageContent, {Comment_} from '../../interfaces/UserImageContent';
import "./UserImagePost.scss";

function UserImagePost(props: { content: UserImageContent }) {
  const [loggedIn] = useState<String | null>(localStorage.getItem('jwt'));
  const { content } = props;
  const [comments, setComments] = useState<Comment_[]>(content.comments);
  const [newComment, setNewComment] = useState<string>('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleSentComment = (_e: React.FormEvent<HTMLFormElement>) => {
    if (loggedIn) {

    } else if (newComment === '') {
      
    } else {
      const comment = {
        id: comments.length,
        userName: '',
        content: newComment
      }
      setComments([...comments, comment])
    }
  };

  return (
    <Container className="border-style">
      <Row>
        <Col>
          <Image src={content.imageUri} alt="User Image" fluid />
        </Col>
        <Col>
          <Row>
            <h4>Author: {content.userName}</h4>
          </Row>
          <Row className="border-style comment-section">
            {content.comments.map((comment) => (
              <div 
                key={comment.id} 
                className="border-style comment" 
              >
                <span style={{fontWeight: "bold"}}>
                  {`${comment.userName}: `} 
                </span>
                {comment.content}
              </div>
            ))}
          </Row>
          <Row>
            <Form onSubmit={handleSentComment}>
              <Form.Control
                type="text"
                placeholder="Type your comment..."
                value={newComment}
                onChange={handleCommentChange}
                style={{ width: '100%' }}
              />
              <Button type="submit" style={{ width: '100%' }}
                disabled={loggedIn ? false : true}
              >
                {loggedIn ? 'Comment' : 'Sing in to comment!'}
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default UserImagePost;
