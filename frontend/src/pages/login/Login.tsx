import React, { ChangeEvent, FormEvent, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import SmallWhiteSpace from '../../components/white-space/SmallWhiteSpace';
import callLogin from '../../utils/callLogin';

interface State {
  username: string;
  password: string;
  showModal: boolean;
  modalMessage: string;
}

const Login = () => {
  const [state, setState] = React.useState<State>({
    username: '',
    password: '',
    showModal: false,
    modalMessage: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate("/");
    }
  }, [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const user = { username: state.username, password: state.password };
    const result = await callLogin(user);
    if (result.status === 200) {
      localStorage.setItem('jwt', result.data);
      window.location.reload()
    } else {
      setState({
        ...state,
        showModal: true,
        modalMessage: 'Login failed'
      });
    }
  }

  const handleClose = () => {
    setState({
      ...state,
      showModal: false
    });
  }

  return (
    <Form onSubmit={handleSubmit} style={{ margin: '60px' }}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="text"
          placeholder="Enter username" 
          name="username" 
          value={state.username} 
          onChange={handleInputChange} 
        />
      </Form.Group>
      <SmallWhiteSpace />
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={state.password} 
          onChange={handleInputChange} 
        />
      </Form.Group>
      <SmallWhiteSpace />
      <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
        Submit
      </Button>
      <Link to="/register" className="btn btn-secondary">
        Register
      </Link>
      <Modal show={state.showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{state.modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default Login;
