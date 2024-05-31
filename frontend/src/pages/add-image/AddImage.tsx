import { ChangeEvent, useState } from 'react';
import { Form, Button, FormControl, Row, Container } from 'react-bootstrap';

import './AddImage.scss';
import WhiteSpace from '../../components/white-space/WhiteSpace';
import useUploadPhoto from '../../utils/uploadPhoto';

function AddImage() {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const mutation = useUploadPhoto();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files){
        setSelectedFile(event.target.files[0]);
      }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(selectedFile);
      if (selectedFile) {
        mutation.mutate(selectedFile)
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" type="reset">
              Reset
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  </>);
}

export default AddImage