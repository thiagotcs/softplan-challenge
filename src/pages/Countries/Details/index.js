import React from 'react';
import { useParams } from 'react-router-dom';

export default () => {
  const { country } = useParams();

  return <h1>{country}</h1>;
};
