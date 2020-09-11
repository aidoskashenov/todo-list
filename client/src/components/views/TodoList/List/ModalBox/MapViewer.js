import PropTypes from 'prop-types';
import React from "react"

import { Map, Marker, TileLayer, Popup } from "react-leaflet"

export const MapViewer = ({location, text}) => {
  return (
    <Map center={location} zoom={9}>
      <Marker position={location} />
      <Popup position={location}>
        <div>
          <h2>Addl. Info</h2>
          <p>{text}</p>
        </div>
      </Popup>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  )
}

MapViewer.propTypes = {
  location: PropTypes.array,
  text: PropTypes.string
}

