import { ChangeEvent, useState } from 'react';
import { Form, Button, FormControl, Row, Container, Modal } from 'react-bootstrap';

import './AddImage.scss';
import WhiteSpace from '../../components/white-space/WhiteSpace';
import useUploadPhoto from '../../utils/uploadPhoto';

function AddImage() {
  const [loggedIn] = useState<String | null>(localStorage.getItem('jwt'));
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccesModal, setShowSuccesModal] = useState(false);

  const handleShowSuccessModal = () => {
    setShowSuccesModal(true);
  };

  const mutation = useUploadPhoto(handleShowSuccessModal);

  const handleError = () => {
    setShowErrorModal(true);
  };


  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleCloseSuccesModal = () => {
    setShowSuccesModal(false)
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(selectedFile);
    if (selectedFile && loggedIn) {
      mutation.mutate({file: selectedFile, token: loggedIn}, {
        onError: handleError,
      })
    }
  };

  return (<>
    <WhiteSpace />
    <Container>
      <Row>
        <div className="col-md-12 text-center">
          <h3 className="animate-charcter">Send kicks!</h3>
        </div>
      </Row>
      <WhiteSpace />
      <Row>
        <div className='add-image'>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <FormControl type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button 
              variant="primary" 
              type="submit" 
              disabled={loggedIn ? false : true}
            >
              {loggedIn ? "Submit" : "Sing in to upload"}
            </Button>
            <Button variant="primary" type="reset">
              Reset
            </Button>
          </Form>
        </div>
      </Row>
    </Container>

    {/* Error Modal */}
    <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`error`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseErrorModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

    {/* Succes Modal */}
    <Modal show={showSuccesModal} onHide={handleCloseSuccesModal}>
      <Modal.Header closeButton>
        <Modal.Title>Succes</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Image added succesfully`}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseSuccesModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>);
}

export default AddImage