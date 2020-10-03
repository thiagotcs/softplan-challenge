import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';

import './styles.css';

const { Meta } = Card;

const CountryCard = ({ countryName, capital, countryFlag, onClick }) => (
  <Card
    hoverable
    className="card"
    cover={<img alt="country flag" className="flag" src={countryFlag} />}
    onClick={onClick}
  >
    <Meta title={countryName} description={capital} />
  </Card>
);

CountryCard.defaultProps = {
  onClick: () => {},
};

CountryCard.propTypes = {
  countryName: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  countryFlag: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default CountryCard;
