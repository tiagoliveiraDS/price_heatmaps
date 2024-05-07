'use client';

import 'leaflet/dist/leaflet.css';

import dynamic from 'next/dynamic'

import { Property } from '@/app/models/Property';
import styles from './Map.module.css';
import { useMapEvents } from 'react-leaflet/hooks'
import { useState } from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })

const Heatmap = dynamic(() => import('./Heatmap'), { ssr: false })

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

  return { mean_lat, mean_long };
}


function Adjust({ properties, setFilteredProperties }: { properties: Property[], setFilteredProperties: Function }) {
  const map = useMapEvents({
    zoomend: () => {
      const bounds = map.getBounds();
      const updatedProperties = properties.filter(property =>
        bounds.contains([property.latitude, property.longitude])
      );
      setFilteredProperties(updatedProperties);
      console.log(updatedProperties.length);
    }
  });

  return null;
}

export default function Map({ params }: { params: { properties: Property[] } }) {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(params.properties);

  let centroid = get_centroid(params.properties);
  if (!centroid) {
    centroid = { mean_lat: 41.146667, mean_long: -8.604596 };
  }

  return (
    <>
      <MapContainer
        center={[centroid.mean_lat, centroid.mean_long]}
        zoom={11}
        className={styles.map}
        minZoom={2}
        
      >
        <Adjust 
          properties={params.properties}
          setFilteredProperties={setFilteredProperties} />
        <Heatmap params={{ properties: params.properties }} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
}