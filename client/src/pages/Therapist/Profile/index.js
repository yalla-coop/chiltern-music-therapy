import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Title from '../../../components/Title';
import { Col, Row } from '../../../components/Grid';
import { Textarea, BasicInput } from '../../../components/Inputs';
import * as T from '../../../components/Typography';
import FileUpload from '../../../components/FileUpload';
import Button from '../../../components/Button';
import Avatar from '../../../components/Avatar';

import { cleanEmail } from '../../../helpers';

import { TherapistClients, Media, Users } from '../../../api-calls';

import { THERAPIST } from '../../../constants/nav-routes';
import { content } from './../../../constants';

import { profile as validate } from '../../../validation/schemas';

const fileState = {
  // file upload
  id: null,
  name: '',
  key: '',
  bucketRegion: '',
  bucket: '',
  fileType: '',
  new: false,
  uploadedToS3: false,
  size: 0,
};

const Profile = () => {
  const [fileUploadError, setFileUploadError] = useState(null);
  const [uploadedFileInfo, setUploadedFileInfo] = useState(fileState);
  const [fileUploading, setFileUploading] = useState(false);
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);

  const history = useHistory();

  const validateForm = () => {
    try {
      validate({
        email: cleanEmail(email),
        contactNumber,
        bio,
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

  const getMediaUrl = async (file) => {
    setMediaLoading(true);
    const { data, error: _error } = await Media.getMediadURL({
      key: file.key,
      bucket: file.bucket,
    });
    if (!_error) {
      setMediaLoading(false);
      setMediaUrl(data);
    } else {
      setMediaLoading(false);
      setErrors({ ...errors, getImageError: 'Error loading image' });
    }
  };

  const handleSubmit = async (e) => {
    const isValid = validateForm();
    if (isValid) {
      const { data, error } = await Users.createTherapistProfile({
        contactEmail: email ? cleanEmail(email) : '',
        bio,
        contactNumber,
        uploadedFileInfo,
      });
      if (data) {
        history.push(THERAPIST.DASHBOARD);
      }
    }
  };

  // get image url once upload is done
  useEffect(() => {
    if (uploadedFileInfo && uploadedFileInfo.uploadedToS3) {
      return getMediaUrl(uploadedFileInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFileInfo]);

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
            value={bio}
            handleChange={setBio}
            error={errors.bio}
          />
        </Col>
        <Col
          w={[4, 6, 4]}
          style={{ paddingTop: !uploadedFileInfo.uploadedToS3 && 16 }}
          jc="center"
        >
          {mediaUrl && uploadedFileInfo.uploadedToS3 && (
            <Avatar
              status={
                !mediaUrl || fileUploading || mediaLoading ? 'loading' : 'ready'
              }
              image={mediaUrl}
              w={128}
              wT={120}
            />
          )}
          <FileUpload
            error={fileUploadError}
            setError={setFileUploadError}
            setFileInfo={setUploadedFileInfo}
            fileInfo={uploadedFileInfo}
            uploading={fileUploading}
            setUploading={setFileUploading}
            category={content.fileCategories.image}
            mt="4"
          />
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
