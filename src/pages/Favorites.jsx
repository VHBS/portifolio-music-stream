import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
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

const FavoritesStyled = styled.div`

  .content-favorites {
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(0.5em);
    color: rgb(226, 234, 255, 1);
    box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.2);
    padding: 2em 1em;
    margin: 1em 0;
    border-top: 0.05em solid rgba(255, 255, 255, 0.15);
    border-bottom: 0.05em solid rgba(255, 255, 255, 0.15);
  }
`;

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteList: [],
    };
    this.initRender = this.initRender.bind(this);
    this.verifyChecked = this.verifyChecked.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.initRender();
  }

  async handleClick(param) {
    this.setState({ loading: true,
    });
    await removeSong(param);
    const listaAtualizada = await getFavoriteSongs();
    this.setState({
      favoriteList: listaAtualizada,
      loading: false,
    });
  }

  verifyChecked = ({ trackId }) => {
    const { favoriteList } = this.state;
    const checkListSongs = favoriteList
      .some((music2) => Number(music2.trackId) === Number(trackId));
    return checkListSongs;
  }

  async initRender() {
    const listSongs = await getFavoriteSongs();
    this.setState({
      favoriteList: listSongs,
      loading: false,
    });
  }

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <BackgroundImg />
        <FavoritesStyled>
        <Header />
        <div className="content-favorites" >
        {loading ? <Carregando />
          : favoriteList.map((music, index) => (
            <div key={ music.artistId + index + music.trackName }>
              <MusicCard
                trackIdNumber={ Number(music.trackId) }
                { ... music }
                handleClick={ (event) => this.handleClick(music, event) }
                checked={ this.verifyChecked(music) }
              />
            </div>))}
            </div>
            </FavoritesStyled>
      </div>
    );
  }
}
