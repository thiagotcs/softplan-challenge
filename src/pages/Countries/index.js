import React from 'react';
import { useHistory } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Row, Col } from 'antd';

import './styles.css';

import { Card } from '../../components';

const GET_COUNTRIES = gql`
  query {
    Country {
      name
      alpha2Code
      capital
      flag {
        svgFile
      }
    }
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES);
  const history = useHistory();

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>error..</h1>;

  return (
    <div className="container">
      <Row gutter={[24, 16]}>
        {data?.Country.map((country) => (
          <Col xs={{ span: 12 }} sm={{ span: 12 }} lg={{ span: 6 }} xl={{ span: 6 }}>
            <Card
              onClick={() => history.push(`/details/${country.alpha2Code}`)}
              countryName={country.name}
              capital={country.capital}
              countryFlag={country.flag.svgFile}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
