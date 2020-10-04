import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { gql, useQuery, useApolloClient } from '@apollo/client';
import { Modal, Button, Input, notification } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import './styles.css';

const GET_COUNTRY_DETAILS = gql`
  query Country($country: String!) {
    Country(alpha2Code: $country) {
      _id
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
  const [values, setValues] = useState({});
  const [visible, setVisible] = useState(false);
  const { country } = useParams();
  const history = useHistory();
  const { data, loading, error } = useQuery(GET_COUNTRY_DETAILS, {
    variables: { country },
  });
  const client = useApolloClient();
  const { cache } = client;

  if (loading) return <h1>loading...</h1>;
  if (error) return <h1>Error.</h1>;

  const submitValues = () => {
    if (!values.name || !values.capital || !values.area || !values.population) {
      return false;
    }
    cache.modify({
      id: cache.identify(data?.Country[0]),
      fields: {
        name() {
          return values.name;
        },
        capital() {
          return values.capital;
        },
        area() {
          return values.area;
        },
        population() {
          return values.population;
        },
      },
    });
    notification.open({
      message: 'País Alterado!',
      description: 'Os dados do país foram alterados com sucesso.',
      placement: 'bottomRight',
      type: 'success',
    });
    return setVisible(false);
  };

  return (
    <>
      <div className="container">
        <div className="box">
          <img className="flag" alt="country flag" src={data?.Country[0].flag.svgFile} />
          <h1>{data?.Country[0].name}</h1>
          <h2>Capital: {data?.Country[0].capital}</h2>
          <h3>Area: {data?.Country[0].area} km2</h3>
          <h3>Population: {data?.Country[0].population}</h3>
          <h4>Top Level Domain: {data?.Country[0].topLevelDomains[0].name}</h4>
        </div>
        <Button onClick={() => setVisible(true)} className="edit-button" type="primary">
          <EditOutlined />
          Editar País
        </Button>
        <Button onClick={() => history.push('/')}>Voltar</Button>
      </div>
      <Modal
        title={data?.Country[0].name}
        visible={visible}
        onOk={submitValues}
        onCancel={() => setVisible(false)}
      >
        <Input
          name="name"
          className="input"
          onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          value={values.name}
          placeholder="Nome do País"
        />
        <Input
          name="capital"
          value={values.capital}
          onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          className="input"
          placeholder="Capital do País"
        />
        <Input
          name="area"
          value={values.area}
          onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          className="input"
          placeholder="Área do País"
        />
        <Input
          name="population"
          value={values.population}
          onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          className="input"
          placeholder="População do País"
        />
      </Modal>
    </>
  );
};
