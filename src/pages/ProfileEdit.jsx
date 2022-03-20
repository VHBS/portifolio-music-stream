import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import styled from 'styled-components';
import backgroundImage from '../images/1.jpg';

const BackgroundImg = styled.div`
  position: fixed;
  z-index: -1;
  background-repeat:no-repeat;
  background-size:  cover;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgb(41, 41, 41, 1)),
  url(${backgroundImage});
  margin: 0 auto;
`;

const ProfileEditStyled = styled.div`
  
  .profile-edit-content {
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(0.5em);
    color: rgb(226, 234, 255, 1);
    box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.2);
    padding: 2em 1em;
    margin: 1em 0;
    border-top: 0.05em solid rgba(255, 255, 255, 0.15);
    border-bottom: 0.05em solid rgba(255, 255, 255, 0.15);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  };

  button {
    background-color: rgb(116, 0, 184);
    color: rgb(226, 234, 255, 1);
    padding: 0.5em 1em;
    font-weight: 500;
    border-radius: 3px;
  };

  button:hover {
    cursor: pointer;
    font-weight: 600;
    }

  button:disabled {
    background-color: rgba(105, 109, 108, 0.281);
    color: rgba(0, 0, 0, 0.3);
    cursor: not-allowed;
    font-weight: 500;
    }

  .profile-edit-box {
    width: 25em;
  };

  .profile-edit-inputs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1em 0;

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

    label {
      font-weight: 300;
    }
  };
`;

export default class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
      disabledButton: true,
    };
    this.gettingUser = this.gettingUser.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.verifyDisabledButton = this.verifyDisabledButton.bind(this);
  }

  componentDidMount() {
    this.gettingUser();
  }

  async gettingUser() {
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user,
    }, () => {
      this.verifyDisabledButton();
    });
  }

  verifyDisabledButton() {
    const { usuario: { name, email, image, description } } = this.state;
    const arrayInputs = [name, email, image, description];
    const includesTrue = email.includes('@' && '.com');
    const arrayTrue = arrayInputs.every((input) => input.length > 0);
    if (includesTrue && arrayTrue) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  inputChange({ target: { id, value } }) {
    this.setState((state) => ({
      usuario: {
        ...state.usuario, [id]: value },
    }), () => this.verifyDisabledButton());
  }

  async clickSaveButton() {
    const { usuario: { name, email, image, description } } = this.state;
    this.setState({
      loading: true,
    });
    await updateUser({ name, email, image, description });
    // this.setState({ loading: false });
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const { disabledButton,
      loading,
      usuario: { name, email, image, description },
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <BackgroundImg />
        <ProfileEditStyled>
        <Header />
        {loading ? <Carregando />
          : (
            <div className="profile-edit-content">
              <div className="profile-edit-box">
                <div className="profile-edit-inputs">
                  <label htmlFor="name">Name:</label>
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    defaultValue={ name }
                    placeholder="Nome"
                    onChange={ this.inputChange }
                    id="name"
                  />
                </div>
                <div className="profile-edit-inputs">
                  <label htmlFor="email">Email:</label>
                  <input
                    data-testid="edit-input-email"
                    type="text"
                    defaultValue={ email }
                    placeholder="Email"
                    onChange={ this.inputChange }
                    id="email"
                  />
                </div>
                <div className="profile-edit-inputs">
                  <label htmlFor="description">Descrição:</label>
                  <input
                    data-testid="edit-input-description"
                    type="text"
                    defaultValue={ description }
                    placeholder="Descrição"
                    onChange={ this.inputChange }
                    id="description"
                  />
                </div>
                <div className="profile-edit-inputs">
                  <label htmlFor="image">Imagem (url):</label>
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    defaultValue={ image }
                    placeholder="Url da Imagem"
                    onChange={ this.inputChange }
                    id="image"
                  />
                </div>
              </div>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ disabledButton }
                  onClick={ () => this.clickSaveButton() }
                >
                  Salvar
                </button>
              </div>
          )}
          </ProfileEditStyled>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
