import React, { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import SmallWhiteSpace from '../../components/white-space/SmallWhiteSpace';
import User from '../../interfaces/User';
import addUser from '../../utils/addUser';
import { Link } from 'react-router-dom';

interface State {
  username: string;
  password: string;
  confirmPassword: string;
  passwordMatch: boolean;
  showModal: boolean;
  modalMessage: string;
}

class Register extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      passwordMatch: true,
      showModal: false,
      modalMessage: ''
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    if (username === '' || password === '' || confirmPassword === '') {
      this.setState({ showModal: true, modalMessage: 'All fields must be filled out' });
    } else if (password !== confirmPassword) {
      this.setState({ passwordMatch: false, showModal: true, modalMessage: 'Passwords do not match' });
    } else {
      this.setState({ passwordMatch: true });
      const user: User = { username, password };
      const status = await addUser(user);
      if (status === 201) {
        this.setState({ showModal: true, modalMessage: 'User added successfully' });
      } else {
        this.setState({ showModal: true, modalMessage: 'Error adding user' });
      }
    }
  }


  handleClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { showModal, modalMessage } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} style={{ margin: '60px' }}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter username" name="username" onChange={this.handleInputChange} />
        </Form.Group>

        <SmallWhiteSpace />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
        </Form.Group>

        <SmallWhiteSpace />

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" onChange={this.handleInputChange} />
        </Form.Group>

        <SmallWhiteSpace />

        <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
          Register
        </Button>
        <Link to="/login" className="btn btn-secondary">
          Go back to login page
        </Link>

        <Modal show={showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
}

export default Register;
