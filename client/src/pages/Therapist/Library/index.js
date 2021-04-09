import { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import { Dropdown } from '../../../components/Inputs';
import { Basic, Expandable } from '../../../components/Cards';
import { Row, Col } from '../../../components/Grid';
import Modal from '../../../components/Modal';

import { decideBorder } from '../../../helpers';

import { useAuth } from '../../../context/auth';

import { userRoles } from '../../../constants/data-types';

import { Contents, Users } from '../../../api-calls';

import * as T from '../../../components/Typography';

const typeOptions = [
  { label: 'All', value: 'ALL' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Audio', value: 'AUDIO' },
  { label: 'Document', value: 'DOCUMENT' },
];

const Library = () => {
  const [contents, setContents] = useState([]);
  const [viewNum, setViewNum] = useState(10);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filter, setFilter] = useState({});
  const [filteredContents, setFilteredContents] = useState([]);
  const [therapistOptions, setTherapistOptions] = useState([]);
  const [contentToEdit, setContentToEdit] = useState('');
  const [contentToDelete, setContentToDelete] = useState('');
  const [editingErrors, setEditingErrors] = useState({});
  const [modalToShow, setModalToShow] = useState('');
  const [updating, setUpdating] = useState(false);

  const { user } = useAuth();

  const contentToView = filteredContents.length > 0;

  const handleSelect = (e, filterType) => {
    setFilter({ ...filter, [filterType]: e });
  };

  const decideStreamable = (type, path) => {
    if (['VIDEO', 'AUDIO'].includes(type) && path) {
      return true;
    }
    return false;
  };

  const removeContent = (id) => {
    setModalToShow('removeContent');
    setContentToDelete(id);
  };

  const confirmRemove = async (action) => {
    if (action === 'removeCompletely') {
      setModalToShow('removeCompletely');
    } else {
      setUpdating(true);
      const { data, error } = await Contents.removeContentFromLibrary({
        id: contentToDelete,
      });
      if (error) {
        console.log('err');
      } else {
        setContents(data);
      }
      setUpdating(false);
    }
  };

  const removeCompletely = () => {
    // function to completely remove content
  };

  const editContent = (contentId) => {
    console.log(
      'Clear away formstate in case stuff frmo another card they didnt save'
    );
    // setContentToEdit(contentId);
  };

  const cancelChanges = () => {
    console.log('Clear away formstate');
    setContentToEdit('');
  };

  useEffect(() => {
    const getContent = async () => {
      const { data, error } = await Contents.getLibraryContent();

      if (!error) {
        setContents(data);
      }
    };

    const getCategories = async () => {
      const { data, error } = await Contents.getCategories();

      if (!error) {
        const allCats = data.map(({ text }) => ({ label: text, value: text }));
        setCategoryOptions([{ label: 'All', value: 'ALL' }, ...allCats]);
      }
    };

    const getTherapists = async () => {
      const { data, error } = await Users.getTherapists();

      if (!error) {
        const allTherapists = data.map(({ firstName, lastName, id }) => ({
          label: `${firstName} ${lastName}`,
          value: id,
        }));
        setTherapistOptions([{ label: 'All', value: 'ALL' }, ...allTherapists]);
      }
    };

    if (user.id) {
      getContent();
      getCategories();

      if ([userRoles.SUPER_ADMIN, userRoles.ADMIN].includes(user.role)) {
        getTherapists();
      }
    }
  }, [user.id, user.role]);

  useEffect(() => {
    const filtered = contents.filter(
      ({ categories, type, therapistUserId }) => {
        let passFilter = true;

        if (
          filter.category &&
          !categories?.includes(filter.category) &&
          filter.category !== 'ALL'
        ) {
          passFilter = false;
        }
        if (filter.type && filter.type !== type && filter.type !== 'ALL') {
          passFilter = false;
        }
        if (
          filter.therapist &&
          filter.therapist !== therapistUserId &&
          filter.therapist !== 'ALL'
        ) {
          passFilter = false;
        }

        return passFilter;
      }
    );

    setFilteredContents(filtered);
  }, [filter, contents]);

  return (
    <>
      {[userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(user?.role) ? (
        <Title boldSection="Content" lightSection="All" />
      ) : (
        <Title boldSection="Library" lightSection="My" />
      )}
      <Row mb="4">
        <Col w={[4, 6, 4]} mb="4">
          <Dropdown
            placeholder="Select one..."
            options={categoryOptions}
            handleChange={(e) => handleSelect(e, 'category')}
            label="Filter by category"
            allowClear={false}
          />
        </Col>
        <Col w={[4, 6, 4]} mb="4">
          <Dropdown
            placeholder="Select one..."
            options={typeOptions}
            handleChange={(e) => handleSelect(e, 'type')}
            label="Filter by type"
            allowClear={false}
          />
        </Col>
        {[userRoles.ADMIN, userRoles.SUPER_ADMIN].includes(user?.role) && (
          <Col w={[4, 6, 4]} mb="4">
            <Dropdown
              placeholder="Select one..."
              options={therapistOptions}
              handleChange={(e) => handleSelect(e, 'therapist')}
              label="Filter by therapist"
              allowClear={false}
            />
          </Col>
        )}
      </Row>
      <Row mb="4">
        {contentToView ? (
          filteredContents
            .slice(0, viewNum)
            .map(({ type, path, id, categories, ...content }, index) => (
              <Col w={[4, 6, 4]} mb="4" key={index}>
                <Expandable
                  borderColor={decideBorder(type)}
                  content={{
                    download: path,
                    streamable: decideStreamable(type, path),
                    categories: categories.filter((cat) => cat !== null),
                    ...content,
                    type: type?.toLowerCase(),
                    path,
                  }}
                  remove={() => removeContent(id)}
                  edit={() => editContent(id)}
                  onCancel={cancelChanges}
                  withDate
                  actions
                  editing={contentToEdit === id}
                  errors={editingErrors}
                  library
                />
              </Col>
            ))
        ) : (
          <Col w={[4, 6, 4]}>
            <Basic>No content to show</Basic>
          </Col>
        )}
      </Row>
      {viewNum < filteredContents.length && (
        <Row>
          <Col w={[4, 12, 12]} jc="flex-start" jcT="center">
            <T.Link
              weight="bold"
              to={false}
              mt={6}
              underline
              onClick={() => setViewNum((_old) => _old + 10)}
            >
              View more
            </T.Link>
          </Col>
        </Row>
      )}
      <Modal
        type="removeContent"
        visible={modalToShow === 'removeContent'}
        setIsModalVisible={(e) => !e && setModalToShow('')}
        parentFunc={confirmRemove}
        closeOnOK={false}
      />
      <Modal
        type="removeCompletely"
        visible={modalToShow === 'removeCompletely'}
        setIsModalVisible={(e) => !e && setModalToShow('')}
        parentFunc={removeCompletely}
        closeOnOK={false}
      />
    </>
  );
};

export default Library;
