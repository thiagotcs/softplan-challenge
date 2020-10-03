import React from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import './styles.css';

const GET_COUNTRY_DETAILS = gql`
  query Country($country: String!) {
    Country(alpha2Code: $country) {
      name
      capital
      area
      population
      flag {
        svgFile
      }
      topLevelDomains {
        name
      }
    }
  }
`;

export default () => {
  const { country } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { country },
  });

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>Error.</h1>;

  return (
    <div className="container">
      <div className="box">
        <img className="flag" alt="country flag" src={data?.Country[0].flag.svgFile} />
        <h1>{data?.Country[0].name}</h1>
        <h2>Capital: {data?.Country[0].capital}</h2>
        <h3>Area: {data?.Country[0].area} km2</h3>
        <h3>Population: {data?.Country[0].population}</h3>
        <h4>Top Level Domain: {data?.Country[0].topLevelDomains[0].name}</h4>
      </div>
    </div>
  );
};
