import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardAlbum = styled.div`
  padding: 0 2em;
  background-color: rgba(0,0,0,0.3);
  backdrop-filter: blur(1em);
  display: flex;
  align-items: center;
  margin: 1em 0.5em;
  width: 20em;
  height: 10em;
  border: 0.1em solid rgba(255, 255, 255, 0.15);
  border-radius: 3px;

  .card-album {
    text-decoration: none;
    opacity: 0.9;
    color: rgba(226, 234, 255, 0.8);
  };

  .card-album:hover {
    color: rgba(226, 234, 255, 1);
    opacity: 1;
  };

  .card-album-content {
    padding: 1em;

    h3 {
      font-weight: 300;
    };

    p {
      font-weight: 600;
      font-size:0.8em
    };
  };
`;

export default class CardAlbumSearch extends Component {
  render() {
    const { collectionName,
      artistName,
      collectionId,
      artworkUrl100,
    } = this.props;
    return (
      <CardAlbum>
        <Link
          className="card-album"
          to={ `/album/${collectionId}` }
          >
          <img src={ artworkUrl100 } alt={ collectionName } />
        </Link>
          <div className="card-album-content">
        <Link
          className="card-album"
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
            <h3>
              Nome do Album:
            </h3>
            <p>
              { collectionName }
            </p>
        </Link>
        <Link
          className="card-album"
          to={ `/album/${collectionId}` }
        >
            <h3>
              Artista:
            </h3>
            <p>
              { artistName }
            </p>
        </Link>
          </div>
      </CardAlbum>
    );
  }
}

CardAlbumSearch.propTypes = {
  collectionName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
