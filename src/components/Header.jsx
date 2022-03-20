import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';
import styled from 'styled-components';

const StyledHeader = styled.main`
  background-color: rgba(0,0,0,0.7);
  backdrop-filter: blur(2em);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  color: rgb(226, 234, 255, 1);
  box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.2);
  border-bottom: 0.05em solid rgba(255, 255, 255, 0.15);
  padding: 1em;

  .links-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
  };

  .img-profile {
    width: 50px;
    border-radius: 50%;
  };

  h1 {
    font-size: 1.5em;
  };

  .link {
    text-decoration: none;
    color: rgb(226, 234, 255, 0.8);
    padding: 0 1em 0 0;
  }

  .separate{
    text-decoration: none;
    color: rgb(226, 234, 255, 0.8);
    padding: 0 1em 0 0;
  }

  .link:hover {
    color: rgb(226, 234, 255, 1);
  }
`;

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
      image: '',
    };
    this.renderFunc = this.renderFunc.bind(this);
  }

  componentDidMount() {
    this.renderFunc();
  }

  async renderFunc() {
    const { name, image } = await getUser();
    this.setState({
      name,
      loading: false,
      image,
    });
  }

  render() {
    const { loading, name, image } = this.state;
    return (
      loading
        ? (<Carregando />)
        : (
          <StyledHeader data-testid="header-component">
          <div className="links-container">
            <div className="links-content">
              <Link className="link" data-testid="link-to-search" to="/search">
                Search
              </Link>
              <span className="separate">|</span>
              <Link className="link" data-testid="link-to-favorites" to="/favorites">
                Favorites
              </Link>
              <span className="separate">|</span>
              <Link className="link" data-testid="link-to-profile" to="/profile">
                Profile
              </Link>
            </div>
            <h1 data-testid="header-user-name">{ name }</h1>
            </div>
            <img className="img-profile" src={ image } alt={ name } />
            </StyledHeader>
        )
    );
  }
}
