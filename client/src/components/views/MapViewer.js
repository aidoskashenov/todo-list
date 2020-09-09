import React, { useEffect, useState } from "react"

import { Map, Marker, TileLayer, Popup } from "react-leaflet"

export const MapViewer = () => {
  const [coords, setCoords] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      // Just putting in 'success' CB and assuming that user will allow, etc.
      ({coords: {latitude, longitude}}) => {
      setCoords([latitude, longitude])
    })
  })

  return coords.length ? (
    <Map center={coords} zoom={12}>
      <Marker position={coords} />
      <Popup position={coords}>
        <div>
          <h2>Landmark Name</h2>
          <p>My House!</p>
        </div>
      </Popup>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </Map>
  ) : null
}
