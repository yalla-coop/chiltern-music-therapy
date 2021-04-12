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
  const [mediaUrl, setMediaUrl] = useState(null);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [therapistBio, setBiography] = useState('');
  const [useMainBio, setUseMainBio] = useState(false);
  const [errors, setErrors] = useState({});

  const { user, setUser } = useAuth();

  const handleClick = () => {
    try {
      validate({
        therapistBio,
        useMainBio,
      });
      setErrors({});
      submitStep({ therapistBio, useMainBio });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors({ ...error.inner });
      }
      return false;
    }
  };

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
    setMediaLoading(true);
    const { data, error } = await Users.getAccountInfo();

    if (!error) {
      setMediaLoading(false);
      if (data.profileImage && data.profileImage.key) {
        getMediaUrl(data.profileImage);
      } else {
        setMediaLoading(false);
        setErrors({ ...errors, getImageError: 'Error loading image' });
      }
    }
  };

  useEffect(() => {
    if (user.id) {
      getTherapistInfoImageURL();
    }
  }, [user.id]);
  useEffect(() => {
    if (useMainBio) {
      setBiography('');
    }
  }, [useMainBio]);

  const handleChange = () => setUseMainBio(!useMainBio);

  return (
    <>
      <Row mt={6}>
        <Col w={[4, 4, 4]} jcM="center">
          <Avatar
            status={!mediaUrl || mediaLoading ? 'loading' : 'ready'}
            image={mediaUrl}
            w="180"
            wT="120"
          />
          <T.P color="error" style={{ width: '100%' }}>
            {errors?.getImageError}
          </T.P>
        </Col>
        <Col w={[4, 6, 6]} mtM={6}>
          <Textarea
            label="Would you like to include your biography for your client to see?"
            placeholder="Tell your clients a little bit about you..."
            value={therapistBio}
            handleChange={setBiography}
            name="biography"
            error={errors.therapistBio}
            rows={5}
            mb={4}
            disabled={useMainBio}
          />
          <Checkbox
            checked={useMainBio}
            handleChange={handleChange}
            label="Use my main biography"
          />
        </Col>
      </Row>

      <Row mt={8} mtT={6}>
        <Col w={[4, 6, 4]}>
          <Button text="Next" handleClick={handleClick} />
        </Col>
      </Row>
    </>
  );
};

export default Step4;
