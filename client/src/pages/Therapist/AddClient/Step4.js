import { useState, useEffect } from 'react';

import { Row, Col } from '../../../components/Grid';
import * as T from '../../../components/Typography';
import { Textarea, Checkbox } from '../../../components/Inputs';
import Button from '../../../components/Button';
import { step4 as validate } from '../../../validation/schemas/addClient';
import Avatar from '../../../components/Avatar';

import { Users, Media } from '../../../api-calls';

import { useAuth } from '../../../context/auth';

const Step4 = ({ submitStep }) => {
  const [biography, setBiography] = useState('');
  const [useMeanBio, setUseMeanBio] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const { user, setUser } = useAuth();

  const handleClick = () => {
    try {
      validate({
        biography,
        useMeanBio,
      });
      setErrors({});
      submitStep({ biography, useMeanBio });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };

  const handleChange = () => setUseMeanBio(!useMeanBio);

  const getMediaUrl = async (file) => {
    const { data, error: _error } = await Media.getMediadURL({
      key: file.key,
      bucket: file.bucket,
    });
    if (!_error) {
      setMediaUrl(data);
    }
  };

  const getTherapistInfoImageURL = async () => {
    const { data, error } = await Users.getAccountInfo();

    if (!error) {
      if (data.profileImage && data.profileImage.key) {
        getMediaUrl(data.profileImage);
      } else {
        setErrors({ ...errors, getImageError: 'Error loading image' });
      }
    }
  };

  useEffect(() => {
    if (user.id) {
      getTherapistInfoImageURL();
    }
  }, [user.id]);

  return (
    <>
      <Row mt={6}>
        <Col w={[4, 4, 4]} jcT="center">
          <Avatar status={!mediaUrl ? 'loading' : 'ready'} image={mediaUrl} />
          <Col w={[4, 6, 4]}>
            <T.P color="error">{errors?.getImageError}</T.P>
          </Col>
        </Col>
        <Col w={[4, 6, 6]} mtT={6}>
          <Textarea
            label="Would you like to include your biography for your client to see?"
            placeholder="Tell your clients a little bit about you..."
            value={biography}
            handleChange={setBiography}
            name="biography"
            error={errors.biography}
            rows={5}
            mb={4}
          />
          <Checkbox
            checked={useMeanBio}
            handleChange={handleChange}
            label="Use my main biography"
          />
        </Col>
      </Row>

      <Row mt={8} mtT={6}>
        <Col w={[4, 4, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step4;
