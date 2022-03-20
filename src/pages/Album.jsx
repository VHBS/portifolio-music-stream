import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from './Carregando';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
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

const AlbumStyled = styled.div`

  .content-favorites {
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(0.5em);
    color: rgb(226, 234, 255, 1);
    box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.2);
    padding: 2em 1em;
    margin: 1em 0;
    border-top: 0.05em solid rgba(255, 255, 255, 0.15);
    border-bottom: 0.05em solid rgba(255, 255, 255, 0.15);
  };
`;

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      favoriteList: [],
      loading: true,
      idSearch: [],
    };
    this.callApiInit = this.callApiInit.bind(this);
    this.verifyChecked = this.verifyChecked.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.callApiInit();
  }

  async handleClick(param, { target: { checked } }) {
    this.setState({ loading: true,
    });
    if (!checked) {
      await removeSong(param);
    } else {
      await addSong(param);
    }
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

  async callApiInit() {
    const { match: { params: { id } } } = this.props;
    const resultApi = await getMusics(id);
    const resultFavApi = await getFavoriteSongs();
    this.setState({
      favoriteList: resultFavApi,
      idSearch: resultApi,
      loading: false,
    });
  }

  render() {
    const { idSearch, loading } = this.state;
    return (
      <div data-testid="page-album">
        <BackgroundImg />
        <AlbumStyled>
        <Header />
          {loading ? <Carregando />
            : (
              <div className="content-favorites">
                <h3 data-testid="artist-name">
                  {`Artista: ${idSearch[0].artistName}`}
                </h3>
                <p data-testid="album-name">
                  Album:
                  {' ' + idSearch[0].collectionName }
                </p>
                {idSearch.filter((music) => music.trackName && music.previewUrl)
                  .map((music, index) => (
                    <div key={ music.artistId + index + music.trackName }>
                      <MusicCard
                        { ... music }
                        trackIdNumber={ Number(music.trackId) }
                        handleClick={ (event) => this.handleClick(music, event) }
                        checked={ this.verifyChecked(music) }
                      />
                    </div>))}
              </div>)}
        </AlbumStyled>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
