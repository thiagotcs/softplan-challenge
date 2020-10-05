import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import { gql, useQuery } from '@apollo/client';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { Card } from '../../components';

const { Search } = Input;

const GET_COUNTRIES = gql`
  query Country($first: Int, $offset: Int, $name: String) {
    Country(first: $first, offset: $offset, filter: { name_contains: $name }) {
      _id
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
  const [filters, setFilters] = useState({ first: 8, offset: 0, name: '' });
  const { data, loading, error } = useQuery(GET_COUNTRIES, {
    variables: { ...filters },
  });
  const history = useHistory();

  const onLoadMore = () => setFilters({ ...filters, offset: filters.offset + 1, name: '' });

  const searchCountryByName = (name) => setFilters({ first: 8, offset: 0, name });

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>error..</h1>;

  return (
    <Container fluid>
      <Container>
        <Row justify="center" align="center">
          <Col xs={4} sm={4} lg={10} xl={10}>
            <Search
              placeholder="Encontre um país pelo seu nome..."
              enterButton={<SearchOutlined />}
              style={{ margin: '40px auto ' }}
              size="large"
              onSearch={(value) => searchCountryByName(value)}
            />
          </Col>
        </Row>
        <Row justify="center" align="top">
          {data?.Country.map((country) => (
            <Col xs={2.5} sm={2.5} lg={2.5} xl={6}>
              <Card
                onClick={() => history.push(`/details/${country.alpha2Code}`)}
                countryName={country.name}
                capital={country.capital}
                countryFlag={country.flag.svgFile}
              />
            </Col>
          ))}
        </Row>
        <Row justify="center" style={{ marginTop: 40, marginBottom: 20 }}>
          <Col xs={4} sm={4} lg={3} xl={3}>
            <Button onClick={onLoadMore} type="primary">
              Carregar mais...
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
