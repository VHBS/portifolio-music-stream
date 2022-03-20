import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';
import styled from 'styled-components';
import backgroundImage from '../images/5.jpg';

const LoginStyle = styled.main`
  position: fixed;
  z-index: -1;
  background-position:center;
  background-repeat:no-repeat;
  background-size:  cover;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(41, 41, 41, 0)),
  url(${backgroundImage});
  display: flex;
  flex-direction: column;

  .input-container {
    width: 33%;
    height: 100px;
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(0.2em);
    padding: 1em 2em;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: justify;
    margin: auto;
    color: rgb(226, 234, 255, 1);
    box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.2);
    border: 0.12em solid rgba(255, 255, 255, 0.15);
    border-radius: 3px;


    span {
      text-align: center;
      font-size: 1em;
    };

    input {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 0.5em 0.5em;
      border-radius: 3px;
    };
    
    input:focus {
      outline:1px solid rgb(116, 0, 184);
      -webkit-box-shadow: 0px 0px 5px  rgb(116, 0, 184);
      box-shadow: 0px 0px 5px  rgb(116, 0, 184);
    };

    button {
      background-color: rgb(116, 0, 184);
      color: rgb(226, 234, 255, 1);
      padding: 0.5em 0;
      font-weight: 500;
      border-radius: 3px;
    };

    button:hover {
      cursor: pointer;
      font-weight: 600;
    };

    button:disabled {
      background-color: rgba(105, 109, 108, 0.281);
      color: rgba(0, 0, 0, 0.3);
      cursor: not-allowed;
      font-weight: 500;
    };

    button:disabled:hover {
      transform: scale(1);
    };
  };
`;
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      inputName: '',
      checkDisable: true,
    };
    this.inputCheckLength = this.inputCheckLength.bind(this);
    this.clickEnter = this.clickEnter.bind(this);
    this.renderFunction = this.renderFunction.bind(this);
  }

  inputCheckLength({ target: { value } }) {
    const minVal = 3;
    this.setState({
      inputName: value,
      checkDisable: value.length < minVal,
    });
  }

  async clickEnter() {
    const { inputName } = this.state;
    const { history } = this.props;
    this.setState({
      loading: true,
    });
    await createUser({ name: inputName });
    history.push('/search');
  }

  renderFunction() {
    const { checkDisable, loading } = this.state;
    if (loading) {
      return <Carregando />;
    } return (
      <div className="input-container" data-testid="page-login">
        <span>Insira seu Login</span>
        <input
          type="text"
          data-testid="login-name-input"
          onChange={ this.inputCheckLength }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ checkDisable }
          onClick={ this.clickEnter }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    return (
      <LoginStyle>
        {this.renderFunction()}
      </LoginStyle>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
