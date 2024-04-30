'use client';

import 'leaflet/dist/leaflet.css';

import dynamic from 'next/dynamic'

import Heatmap from './Heatmap'
import { Property } from '@/app/models/Property';
import styles from './Map.module.css';
 
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), {ssr: false})

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), {ssr: false})

function get_centroid(properties: Property[]) {
  let lats: number[] = [];
  let longs: number[] = [];

  for (var property of properties) {
    let latitude = property.latitude;
    let longitude = property.longitude;

    lats.push(latitude);
    longs.push(longitude);
  }

  let mean_lat = lats.reduce((a, b) => a + b, 0) / lats.length;
  let mean_long = longs.reduce((a, b) => a + b, 0) / longs.length;

  return {mean_lat, mean_long};
}



export default function Map({params}: {params: {properties: Property[]}}) {
  let centroid = get_centroid(params.properties);
  if (!centroid) {
    centroid = {mean_lat: 41.146667, mean_long: -8.604596};
  }
  return (
    <>
      <MapContainer
          center={[centroid.mean_lat, centroid.mean_long]}
          zoom={11}
          className={styles.map}
      >
        <div><Heatmap params={{properties: params.properties}} /></div>
        
        <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}