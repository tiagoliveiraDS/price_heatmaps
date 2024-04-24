'use client';

import 'leaflet/dist/leaflet.css';

import dynamic from 'next/dynamic'

import Heatmap from './Heatmap'
 
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {ssr: false})

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {ssr: false})



export default function Map({params}: {params: {data: []}}) {
  //let position = L.latLng(41.146667, -8.604596);

  return (
    <>
      <MapContainer
          center={[41.146667, -8.604596]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
      >
        <div><Heatmap params={{data: params.data}} /></div>
        
        <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}