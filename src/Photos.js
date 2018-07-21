import React from 'react';

const Photos = props => (
  <ul className="photosList">
    {
      props.photos.map(photos => (
        <li key={photos.id} className="photosList__item">
          <h3 className="photosList__title"> {photos.title.slice(0, 20)}</h3>
          <img
            src={`https://farm${photos.farm}.staticflickr.com/${
              photos.server
              }/${photos.id}_${photos.secret}.jpg}`}
            alt={photos.title} className="photosList__img"
          />
        </li>
      ))}
  </ul>
);

export default Photos;
