import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Title from '../../../components/Title';
import { BasicInput } from '../../../components/Inputs';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import { Row, Col } from '../../../components/Grid';
import Modal from '../../../components/Modal';

import { navRoutes } from '../../../constants';

import { useAuth } from '../../../context/auth';

import validate from '../../../validation/schemas/account';

import { roles } from './../../../constants';

import { Users } from '../../../api-calls';

const initState = {
  firstName: '',
  lastName: '',
  email: '',
};

const MyAccount = () => {
  const [accountDetails, setAccountDetails] = useState(initState);
  const [errors, setErrors] = useState({});
  const [updateAttempt, setUpdateAttempt] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user, setUser } = useAuth();

  const handleInput = (value, type) => {
    setAccountDetails({ ...accountDetails, [type]: value });
  };

  const cleanEmail = (email) => email.toLowerCase().trim();

  const validateForm = () => {
    try {
      validate({
        role: roles.CLIENT,
        email: cleanEmail(email),
        firstName,
        lastName,
        mobileNumber,
        contactNumber,
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
      contactNumber,
      mobileNumber,
      role: user.role,
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

  useEffect(() => {
    if (updateAttempt) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails]);

  useEffect(() => {
    if (user.id) {
      const { firstName, lastName, email, contactNumber, mobileNumber } = user;
      setAccountDetails({
        firstName: firstName[0],
        lastName: lastName[0],
        email,
        contactNumber,
        mobileNumber,
      });
    }
  }, [user, user.id]);

  const {
    firstName,
    lastName,
    email,
    contactNumber,
    mobileNumber,
  } = accountDetails;

  return (
    <>
      <Title lightSection="My" boldSection="Account" />

      <Row>
        <Col w={[4, 6, 4]} mb="6" mbT="5">
          <BasicInput
            label="First Initial"
            handleChange={(val) => handleInput(val, 'firstName')}
            value={firstName}
            error={errors?.validationErrs?.firstName}
          />
        </Col>
        <Col w={[4, 6, 4]} mb="6" mbT="5">
          <BasicInput
            label="Last Initial"
            handleChange={(val) => handleInput(val, 'lastName')}
            value={lastName}
            error={errors?.validationErrs?.lastName}
          />
        </Col>
      </Row>

      <Row>
        <Col w={[4, 6, 4]} mb="6" mbT="5">
          <BasicInput
            label="Contact Number"
            handleChange={(val) => handleInput(val, 'contactNumber')}
            value={contactNumber}
            error={errors?.validationErrs?.contactNumber}
            placeholder="Contact number"
          />
        </Col>
        <Col w={[4, 6, 4]} mb="6" mbT="5">
          <BasicInput
            label="Mobile Number"
            handleChange={(val) => handleInput(val, 'mobileNumber')}
            value={mobileNumber}
            error={errors?.validationErrs?.mobileNumber}
            placeholder="Mobile number (optional)"
          />
        </Col>
      </Row>
      <Row mb="7" mbT="6">
        <Col w={[4, 6, 4]}>
          <BasicInput
            label="Email"
            handleChange={(val) => handleInput(val, 'email')}
            value={email}
            error={errors?.validationErrs?.email}
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
      <Row>
        <Col w={[4, 6, 4]}>
          <Link to={navRoutes.CLIENT.DELETE_ACCOUNT}>
            <Icon
              text="Delete account"
              icon="bin"
              color="gray9"
              width="18"
              height="16"
              weight="regular"
            />
          </Link>
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
