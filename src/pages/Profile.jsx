import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
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

const ProfileStyled = styled.div`

  .profile-content {
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

  .profile-item {
    display: flex;
    justify-content: space-between;
    margin: 0.5em 0;

    p {
      font-weight: 300;
    };
  };

  .profile-img {
    width: 200px;
    border-radius: 50%;
  };

  .profile-edit-button {
    margin-top: 1em;
    text-decoration: none;
    background-color: rgb(116, 0, 184);
    color: rgb(226, 234, 255, 1);
    padding: 0.5em 1em;
    font-weight: 500;
    border-radius: 3px;
  };
  
  .profile-edit-button:hover {
    cursor: pointer;
    font-weight: 600;
  };

  .profile-box {
    min-width: 20em;
    display: flex;
    flex-direction: column;
  };
`;

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usuario: {},
    };
    this.gettingUser = this.gettingUser.bind(this);
  }

  componentDidMount() {
    this.gettingUser();
  }

  async gettingUser() {
    const user = await getUser();
    this.setState({
      loading: false,
      usuario: user,
    });
  }

  render() {
    const { usuario: { name, email, description, image }, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <BackgroundImg />
        <ProfileStyled>
          <Header />
          {loading ? <Carregando />
            : (
              <div className="profile-content">
                <div className="profile-box">
                  <div className="profile-item">
                    <p>Usuário:</p>
                    <span>{name}</span>
                  </div>
                  <div className="profile-item">
                    <p>Email:</p>
                    <span>{email}</span>
                  </div>
                  <div className="profile-item">
                    <p>Descrição:</p>
                    <span>{description}</span>
                  </div>
                  </div>
                  <img
                    className="profile-img"
                    data-testid="profile-image"
                    src={ image }
                    alt={ name }
                    />
                  <Link className="profile-edit-button" to="/profile/edit">Editar perfil</Link>
              </div>
            )}
          </ProfileStyled>
      </div>
    );
  }
}
