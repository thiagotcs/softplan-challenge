import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

const { Meta } = Card;

const CountryCard = ({ countryName, capital, countryFlag }) => (
  <Card hoverable cover={<img alt="country flag" src={countryFlag} />}>
    <Meta title={countryName} description={capital} />
  </Card>
);

CountryCard.propTypes = {
  countryName: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  countryFlag: PropTypes.string.isRequired,
};

export default CountryCard;
