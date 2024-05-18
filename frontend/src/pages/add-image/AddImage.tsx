import { ChangeEvent, useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';

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
  </>);
}

export default AddImage