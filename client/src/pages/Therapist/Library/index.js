import { useState, useEffect } from 'react';
import Title from '../../../components/Title';
import { Dropdown } from '../../../components/Inputs';
import { Basic, Expandable } from '../../../components/Cards';
import { Row, Col } from '../../../components/Grid';

import { decideBorder } from '../../../helpers';

import { useAuth } from '../../../context/auth';

import { Contents } from '../../../api-calls';

const Library = () => {
  const [contents, setContents] = useState([]);
  const [filter, setFilter] = useState({});

  const { user } = useAuth();

  const contentToView = contents.length > 0;

  const handleSelect = () => {};

  const decideStreamable = (type, path) => {
    if (['VIDEO', 'AUDIO'].includes(type) && path) {
      return true;
    }
    return false;
  };

  const filterContent = (categories, type) => {
    let passFilter = true;

    if (filter.category && !categories?.includes(filter.category)) {
      passFilter = false;
    }
    if (filter.type && filter.type !== type) {
      passFilter = false;
    }

    return passFilter;
  };

  return (
    <>
      <Title boldSection="Library" lightSection="My" />
      <Row mb="4">
        <Col w={[4, 6, 4]} mb="4">
          <Dropdown
            placeholder="Select one..."
            options={[]}
            handleChange={handleSelect}
            label="Filter by category"
          />
        </Col>
        <Col w={[4, 6, 4]} mb="4">
          <Dropdown
            placeholder="Select one..."
            options={[]}
            handleChange={handleSelect}
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
