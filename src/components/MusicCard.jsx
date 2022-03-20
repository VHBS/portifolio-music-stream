import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MusicCardStyled = styled.div`
  margin: 0.5em auto;
  display: flex;
  max-width: 80em;
  background-color: rgba(0,0,0,0.7);
  justify-content: space-evenly;
  align-items: center;
  padding: 1em;
  border: 0.1em solid rgba(255, 255, 255, 0.15);

  .artist-name {
    width: 10em;
  }

  .music-name {
    width: 10em;
  };

  .artist-music {
    width: 40em;

  }

  audio {
  color: rgb(226, 234, 255, 1);
  
  };

  audio::-webkit-media-controls-panel {
    background-color: rgb(128, 128, 128);
  };

  .checkbox {
    width: 6em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  };
`;

export default class MusicCard extends Component {
  render() {
    const { trackName,
      previewUrl,
      handleClick,
      checked,
      trackIdNumber,
      artistName,
    } = this.props;

    return (
      <MusicCardStyled>
        <p className="artist-music">{ artistName } - { trackName }</p>
        {/* <p className="music-name">{ trackName }</p> */}
        {/* <p className="artist-name">Artista: { artistName }</p>
        <p className="music-name">{ trackName }</p> */}
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div className="checkbox">
        <label
          htmlFor={ trackIdNumber }
          >
          Favorita
          </label>
          <input
            onChange={ handleClick }
            data-testid={ `checkbox-music-${trackIdNumber}` }
            type="checkbox"
            id={ trackIdNumber }
            checked={ checked }
            />
        </div>
      </MusicCardStyled>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackIdNumber: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
