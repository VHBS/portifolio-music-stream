import React, { Component } from 'react';
import CardAlbumSearch from '../components/CardAlbumSearch';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
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
`

const StyledDiv = styled.div`
  .input-container {
    background-color: rgba(0,0,0,0.7);
    backdrop-filter: blur(0.2em);
    color: rgb(226, 234, 255, 1);
    box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.5);
    top: 1em;
    margin: 1em 3em;
    display:flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    border: 0.1em solid rgba(255, 255, 255, 0.15);
    border-radius: 3px;
    

    label {
      text-align: center;
      margin: 1em 0 0;
    };

    input {
      background-color: rgba(255, 255, 255, 0.8);
      padding: 0.5em 0.5em;
    border-radius: 3px 0 0 3px;

    };
    
    input:focus {
      outline:1px solid rgb(116, 0, 184);
      -webkit-box-shadow: 0px 0px 5px  rgb(116, 0, 184);
      box-shadow: 0px 0px 5px  rgb(116, 0, 184);
    };

    .input-button {
      margin: 1em;
    };

    button {
      background-color: rgb(116, 0, 184);
      color: rgb(226, 234, 255, 1);
      padding: 0.5em 1em;
      font-weight: 500;
    border-radius: 0 3px 3px 0;

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
  };

  .result-container {
    background-color: rgba(0,0,0,0.3);
    backdrop-filter: blur(0.5em);
    color: rgb(226, 234, 255, 1);
    box-shadow: 0em 0em 2em 1em rgba(0, 0, 0, 0.2);
    padding: 2em 1em;
    margin: 1em 0;
    border-top: 0.05em solid rgba(255, 255, 255, 0.15);
    border-bottom: 0.05em solid rgba(255, 255, 255, 0.15);

  };

  .result-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    color: rgba(226, 234, 255, 1);
    max-width: 80em;
    margin: 0 auto;
  };
`;

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchResult: [],
      loading: false,
      inputSearch: '',
      checkLength: true,
    };
    this.checkInputLength = this.checkInputLength.bind(this);
  }

  async checkInputLength({ target: { value } }) {
    const minVal = 2;
    const checkInput = value.length < minVal;
    this.setState({
      inputSearch: value,
      checkLength: checkInput,
    });
  }

  async callApi() {
    const { inputSearch } = this.state;
    this.setState({
      loading: true,
    });
    const resultadoApi = await searchAlbumsAPI(inputSearch);
    this.setState({
      loading: false,
      searchResult: resultadoApi,
    });
  }

  render() {
    const { inputSearch, checkLength, loading, searchResult } = this.state;
    return (
      <div>

        <BackgroundImg />
      <StyledDiv data-testid="page-search">
        <Header />
        {loading ? (<Carregando />)
          : (
            <div className="content-container">
              <div className="input-container">
                <label htmlFor="artist-input">
                  Procurar por banda ou artista:
                </label>
                <div className="input-button">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    id="artist-input"
                    onChange={ this.checkInputLength }
                    />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ checkLength }
                  onClick={ async () => this.callApi() }
                  >
                  Pesquisar
                </button>
                    </div>
              </div>
              <div className="result-container">
                <h4>
                  Resultado de álbuns de:
                  {'  '}
                  { inputSearch }
                </h4>
                <div className="result-cards">
                {searchResult.length > 0 ? (searchResult.map((album) => (
                    <CardAlbumSearch
                      key={ album.collectionId }
                      { ... album }
                      />
                ))) : (<p>Nenhum álbum foi encontrado</p>)}
                </div>
              </div>
            </div>
          )}
      </StyledDiv>
    </div>
    );
  }
}
