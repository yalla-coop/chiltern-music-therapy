import { useEffect, useState } from 'react';

import Title from '../../../components/Title';
import { BasicInput, Textarea } from '../../../components/Inputs';
import FileUpload from '../../../components/FileUpload';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import { Row, Col } from '../../../components/Grid';
import Modal from '../../../components/Modal';
import * as T from '../../../components/Typography';

import { useAuth } from '../../../context/auth';

import validate from '../../../validation/schemas/account';

import { roles, content } from './../../../constants';

import { Users, Media } from '../../../api-calls';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
  contactEmail: '',
  contactNumber: '',
  // file upload
  uploadedFileInfo: {
    id: null,
    name: '',
    key: '',
    bucketRegion: '',
    bucket: '',
    fileType: '',
    new: false,
    uploadedToS3: false,
    size: 0,
  },
};

const MyAccount = () => {
  const [accountDetails, setAccountDetails] = useState(initState);
  const [errors, setErrors] = useState({});
  const [updateAttempt, setUpdateAttempt] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // file upload
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);

  const { user, setUser } = useAuth();

  const {
    firstName,
    lastName,
    email,
    bio,
    contactEmail,
    contactNumber,
    uploadedFileInfo,
    profilePhotoMediaId,
  } = accountDetails;

  const handleInput = (value, type) => {
    setAccountDetails({ ...accountDetails, [type]: value });
  };

  const cleanEmail = (email) => email.toLowerCase().trim();

  const validateForm = () => {
    try {
      validate({
        role: roles.THERAPIST,
        email: cleanEmail(email),
        firstName,
        lastName,
        bio,
        contactEmail,
      });
      setErrors({ validationErrs: {} });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ validationErrs: error.inner });
      }
      return false;
    }
  };

  const handleUpdate = async () => {
    setUpdating(true);
    const { error, data } = await Users.updateAccount({
      email: cleanEmail(email),
      firstName,
      lastName,
      bio,
      contactEmail: contactEmail ? cleanEmail(contactEmail) : '',
      contactNumber,
      uploadedFileInfo,
      role: user.role,
      profilePhotoMediaId,
    });
    if (error) {
      if (error.statusCode === 409) {
        setErrors({ validationErrs: { email: error.message } });
      } else {
        setErrors({ httpError: error.message });
      }
    } else {
      setUser(data);
      setIsModalVisible(true);
    }
    setUpdating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateAttempt(true);

    const isValid = validateForm();
    if (isValid) {
      handleUpdate();
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

  useEffect(() => {
    if (updateAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails]);

  useEffect(() => {
    const getTherapistInfo = async () => {
      const { data, error } = await Users.getAccountInfo();

      if (!error) {
        setAccountDetails(data);

        if (data.profileImage && data.profileImage.key) {
          getMediaUrl(data.profileImage);
        }
      } else {
        setErrors({
          ...errors,
          getUserInfoError: 'Error loading account details',
        });
      }
    };
    if (user.id) {
      getTherapistInfo();
    }
  }, [user.id]);

  // get image url once upload is done
  useEffect(() => {
    if (uploadedFileInfo && uploadedFileInfo.uploadedToS3) {
      return getMediaUrl(uploadedFileInfo);
    }
  }, [uploadedFileInfo]);

  return (
    <>
      <Title lightSection="My" boldSection="Account" mb="8" />
      <Row mb="6" mbT="5">
        <Col w={[4, 8, 8]}>
          <T.H3 weight="bold">Account Details</T.H3>
        </Col>
        <Col w={[4, 6, 4]} mt="4">
          <T.P color="error">{errors?.getUserInfoError}</T.P>
        </Col>
      </Row>
      <Row>
        <Col w={[4, 6, 4]} mb="5">
          <BasicInput
            label="First Name"
            handleChange={(val) => handleInput(val, 'firstName')}
            value={firstName}
            error={errors?.validationErrs?.firstName}
          />
        </Col>
        <Col w={[4, 6, 4]} mb="5">
          <BasicInput
            label="Last Name"
            handleChange={(val) => handleInput(val, 'lastName')}
            value={lastName}
            error={errors?.validationErrs?.lastName}
          />
        </Col>
      </Row>
      <Row mb="8" mbT="6">
        <Col w={[4, 6, 4]}>
          <BasicInput
            label="Email"
            handleChange={(val) => handleInput(val, 'email')}
            value={email}
            error={errors?.validationErrs?.email}
          />
        </Col>
      </Row>
      <Row mb="6" mbT="5">
        <Col w={[4, 8, 8]}>
          <T.H3 weight="bold">Profile</T.H3>
        </Col>
      </Row>
      <Row mb="6" mbT="5">
        <Col w={[4, 6, 4]} jc="center" mb="5">
          <Avatar
            status={
              !mediaUrl || fileUploading || mediaLoading ? 'loading' : 'ready'
            }
            image={mediaUrl}
            w={128}
            wT={120}
          />
          <T.P color="error" style={{ width: '100%' }}>
            {errors?.getImageError}
          </T.P>
          <FileUpload
            category={content.fileCategories.image}
            error={fileUploadError}
            setError={setFileUploadError}
            setFileInfo={(val) => handleInput(val, 'uploadedFileInfo')}
            fileInfo={uploadedFileInfo}
            uploading={fileUploading}
            setUploading={setFileUploading}
            mt="4"
          />
        </Col>
        <Col w={[4, 6, 4]}>
          <Textarea
            label="Biography"
            placeholder="Tell your clients a little bit about you..."
            rows={5}
            value={bio}
            handleChange={(val) => handleInput(val, 'bio')}
            error={errors.bio}
          />
        </Col>
      </Row>
      <Row mb="8" mbT="6">
        <Col w={[4, 6, 4]} mb="5">
          <BasicInput
            label="Contact email"
            handleChange={(val) => handleInput(val, 'contactEmail')}
            value={contactEmail}
            error={errors?.validationErrs?.contactEmail}
          />
        </Col>
        <Col w={[4, 6, 4]} mb="5">
          <BasicInput
            label="Contact number"
            handleChange={(val) => handleInput(val, 'contactNumber')}
            value={contactNumber}
            error={errors?.validationErrs?.contactNumber}
          />
        </Col>
      </Row>
      <Row mb="8">
        <Col w={[4, 6, 4]}>
          <Button
            text="Save changes"
            onClick={handleSubmit}
            loading={updating}
          />
        </Col>
      </Row>
      <Modal
        visible={isModalVisible}
        type="saveChangesSuccess"
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default MyAccount;
