import React from 'react'
import PropTypes from 'prop-types'

import { imageStyle, description } from './description.css'

const Description = ({ title, overview, imgUrl }) =>
  <div className={description}>
    <div>
      <h1>{title}</h1>
      <p>{overview}</p>
    </div>
    <img className={imageStyle}
      src={imgUrl}
      alt="Poster"
    />
  </div>

Description.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  imgUrl: PropTypes.string
}

export default Description