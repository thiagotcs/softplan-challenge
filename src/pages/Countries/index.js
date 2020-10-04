import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-awesome-styled-grid';
import { gql, useQuery } from '@apollo/client';
import { Button } from 'antd';

import { Card } from '../../components';

const GET_COUNTRIES = gql`
  query Country($first: Int, $offset: Int) {
    Country(first: $first, offset: $offset) {
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
  const [filters, setFilters] = useState({ first: 8, offset: 0 });
  const { data, loading, error, fetchMore } = useQuery(GET_COUNTRIES, {
    variables: { ...filters },
  });
  const history = useHistory();

  useEffect(() => {
    fetchMore({
      variables: {
        ...filters,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return { Country: [...fetchMoreResult.Country] };
      },
    });
  }, [filters]);

  const onLoadMore = () => setFilters({ ...filters, offset: filters.offset + 1 });

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>error..</h1>;

  return (
    <Container fluid>
      <Container>
        <Row justify="center" align="center">
          {data?.Country.map((country) => (
            <Col xs={12} sm={12} lg={2.5} xl={6}>
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
