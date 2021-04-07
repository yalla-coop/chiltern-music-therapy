import Title from '../../../components/Title';
import { Col, Row } from '../../../components/Grid';
import { Textarea, BasicInput } from '../../../components/Inputs';
import * as T from '../../../components/Typography';
import FileUpload from '../../../components/FileUpload';
import Button from '../../../components/Button';
import { useState } from 'react';
import { cleanEmail } from '../../../helpers';
import { TherapistClients } from '../../../api-calls';
import { THERAPIST } from '../../../constants/nav-routes';
import { profile as validate } from '../../../validation/schemas';
import { useHistory } from 'react-router';

const Profile = () => {
  const [fileUploadError, setFileUploadError] = useState(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState({});
  const [fileUploading, setFileUploading] = useState(false);
  const [email, setEmail] = useState('');
  const [biography, setBiography] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const validateForm = () => {
    try {
      validate({
        email: cleanEmail(email),
        contactNumber,
        biography,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };

  const handleSubmit = async (e) => {
    const isValid = validateForm();
    if (isValid) {
      const { data, error } = await TherapistClients.updateTherapiesProfile({
        updates: { email, biography, contactNumber },
      });
      if (data) {
        history.push(THERAPIST.DASHBOARD);
      }
    }
  };
  return (
    <div style={{ maxWidth: 1065 }}>
      <Title boldSection="profile" lightSection="Your" />
      <Row mb={7}>
        <Col w={[4, 12, 6]}>
          <T.P color="gray8">
            Please start by adding your biography, profile pic and contact
            information. You can complete your profile now or come back later to
            add/edit this content
          </T.P>
        </Col>
      </Row>
      <Row mb={7}>
        <Col w={[4, 6, 4]}>
          <Textarea
            label="Your biography"
            placeholder="Tell your clients a little bit about you..."
            rows={5}
            value={biography}
            handleChange={setBiography}
            error={errors.biography}
          />
        </Col>
        <Col w={[4, 6, 4]} style={{ paddingTop: 32 }}>
          {/* <FileUpload
            error={fileUploadError}
            setError={setFileUploadError}
            setFileInfo={setUploadedFileInfo}
            fileInfo={uploadedFileInfo}
            uploading={fileUploading}
            setUploading={setFileUploading}
            category="application"
          /> */}
        </Col>
      </Row>
      <Row mb={8}>
        <Col w={[4, 6, 4]}>
          <BasicInput
            label="Your contact email"
            placeholder="Email..."
            name="email"
            value={email}
            handleChange={setEmail}
            error={errors.email}
          />
        </Col>
        <Col w={[4, 6, 4]}>
          <BasicInput
            label="Your contact number"
            placeholder="Mobile number (Optional)"
            name="contactNumber"
            value={contactNumber}
            handleChange={setContactNumber}
            error={errors.contactNumber}
          />
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]}>
          <Button handleClick={handleSubmit} text="Save" />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
