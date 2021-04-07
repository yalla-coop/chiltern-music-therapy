import { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import { Dropdown } from '../../../components/Inputs';
import { Basic, Expandable } from '../../../components/Cards';
import { Row, Col } from '../../../components/Grid';

import { decideBorder } from '../../../helpers';

import { useAuth } from '../../../context/auth';

import { Contents } from '../../../api-calls';

const typeOptions = [
  { label: 'All', value: 'ALL' },
  { label: 'Video', value: 'VIDEO' },
  { label: 'Audio', value: 'AUDIO' },
  { label: 'Document', value: 'DOCUMENT' },
];

const Library = () => {
  const [contents, setContents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filter, setFilter] = useState({});

  const { user } = useAuth();

  const contentToView = contents.length > 0;

  const handleSelect = (e, filterType) => {
    setFilter({ ...filter, [filterType]: e });
  };

  const decideStreamable = (type, path) => {
    if (['VIDEO', 'AUDIO'].includes(type) && path) {
      return true;
    }
    return false;
  };

  const filterContent = (categories, type) => {
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

    return passFilter;
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
        const allCats = data.map((cat) => cat.text);
        setCategories(allCats);
        setCategoryOptions(allCats.map((cat) => ({ label: cat, value: cat })));
      }
    };

    if (user.id) {
      getContent();
      getCategories();
    }
  }, [user.id]);

  return (
    <>
      <Title boldSection="Library" lightSection="My" />
      <Row mb="4">
        <Col w={[4, 6, 4]} mb="4">
          <Dropdown
            placeholder="Select one..."
            options={categoryOptions}
            handleChange={(e) => handleSelect(e, 'category')}
            label="Filter by category"
          />
        </Col>
        <Col w={[4, 6, 4]} mb="4">
          <Dropdown
            placeholder="Select one..."
            options={typeOptions}
            handleChange={(e) => handleSelect(e, 'type')}
            label="Filter by type"
          />
        </Col>
      </Row>
      <Row>
        {contentToView ? (
          contents
            .filter(({ categories, type }) => filterContent(categories, type))
            .map(({ type, path, ...content }, index) => (
              <Col w={[4, 6, 4]} mb="4" key={index}>
                <Expandable
                  borderColor={decideBorder(type)}
                  content={{
                    download: path,
                    streamable: decideStreamable(type, path),
                    ...content,
                    type: type?.toLowerCase(),
                    path,
                  }}
                  withDate
                  actions
                />
              </Col>
            ))
        ) : (
          <Col w={[4, 6, 4]}>
            <Basic>No content to show</Basic>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Library;
