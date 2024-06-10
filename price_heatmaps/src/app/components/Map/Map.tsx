'use client';

import 'leaflet/dist/leaflet.css';

import dynamic from 'next/dynamic'

import { Property } from '@/app/domain/Property';
import styles from './Map.module.css';
import { useMapEvents } from 'react-leaflet/hooks'
import { Key, use, useEffect, useState } from 'react';
import Image from 'next/image';
import { Marker, Popup } from 'react-leaflet';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })

const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })

const Heatmap = dynamic(() => import('./Heatmap'), { ssr: false })

interface DuplicateCoords {
  latitude: number;
  longitude: number;
  count: number;
}

interface Centroid {
  mean_lat: number;
  mean_long: number;
}

export default function DataMap({ properties }: { properties: Property[] }) {
  const [visiblePropertiesAccToZoom, setVisiblePropertiesAccToZoom] = useState<any>(undefined);
  const [showMarkers, setShowMarkers] = useState(true);
  const [propertiesWithoutDuplicatesCoords, setPropertiesWithoutDuplicatesCoords] = useState<[number, number, number][] | undefined>(undefined);
  const [centroid, setCentroid] = useState<Centroid>({ mean_lat: 41.146665, mean_long: -8.604594 });
  const [duplicates, setDuplicates] = useState<DuplicateCoords[] | undefined>(undefined);

  // load the properties and calculate the duplicates and the centroid at the end of the component mount
  useEffect(() => {
    if (properties) {
      const { uniqueProperties, duplicatedCoords } = removeDuplicatesAndGetCoords(properties);
      setDuplicates(duplicatedCoords);
      setPropertiesWithoutDuplicatesCoords(uniqueProperties);

      if (propertiesWithoutDuplicatesCoords) {
        const centroidRes = getCentroid(propertiesWithoutDuplicatesCoords);
        setCentroid(centroidRes);
      }
    } else {
      noProperties();
    }
  }, [properties]);

  const toggleMarkers = () => {
    setShowMarkers(!showMarkers);
  }

  function noProperties() {
    return (<div>No data</div>);
  }

  // Média
  function removeDuplicatesAndGetCoords(properties: Property[]): { uniqueProperties: [number, number, number][], duplicatedCoords: DuplicateCoords[] } {
    const seen = new Map<string, { count: number, totalPrice: number }>();
    const uniqueProperties: [number, number, number][] = [];
    const duplicatedCoords: DuplicateCoords[] = [];
  
    if (properties) {
      for (const property of properties) {
        const key = `${property.latitude},${property.longitude}`;
        if (seen.has(key)) {
          const entry = seen.get(key)!;
          entry.count += 1;
          entry.totalPrice += property.price;
        } else {
          seen.set(key, { count: 1, totalPrice: property.price });
        }
      }
  
      seen.forEach((value, key) => {
        const [latitude, longitude] = key.split(",").map(Number);
        const avgPrice = value.totalPrice / value.count;
        uniqueProperties.push([latitude, longitude, avgPrice]);
        
        if (value.count > 1) {
          duplicatedCoords.push({ latitude, longitude, count: value.count });
        }
      });
    }
  
    return { uniqueProperties, duplicatedCoords };
  }

  // get the centroid of the properties
  function getCentroid(properties: [number, number, number][]) {
    let lats: number[] = [];
    let longs: number[] = [];

    for (var property of properties) {
      let latitude = property[0];
      let longitude = property[1];

      lats.push(latitude);
      longs.push(longitude);
    }

    const centroid: Centroid = { mean_lat: 0, mean_long: 0 };
    centroid.mean_lat = lats.reduce((a, b) => a + b, 0) / lats.length;
    centroid.mean_long = longs.reduce((a, b) => a + b, 0) / longs.length;

    return centroid;
  }

  // adjust the properties shown on the map according to the zoom level
  function Adjust({ properties, setFilteredProperties }: { properties: Property[], setFilteredProperties: Function }) {
    const map = useMapEvents({
      zoomend: () => {
        const bounds = map.getBounds();
        const updatedProperties = properties.filter(property =>
          bounds.contains([property.latitude, property.longitude])
        );
        setFilteredProperties(updatedProperties);
      }
    });

    return null;
  }

  return (
    <>
      {!duplicates || !propertiesWithoutDuplicatesCoords ? <div>Loading...</div> :
        duplicates.length === 0 && propertiesWithoutDuplicatesCoords.length === 0 ? <div>No properties in this region</div> :
        <>
          <MapContainer
            center={[centroid.mean_lat, centroid.mean_long]}
            zoom={11}
            className={styles.map}
            minZoom={2}
          >
            <Adjust
              properties={properties}
              setFilteredProperties={setVisiblePropertiesAccToZoom} />
            <Heatmap
              properties={propertiesWithoutDuplicatesCoords} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {showMarkers && duplicates.map((property: DuplicateCoords, index: number) => (
              <Marker key={index} position={[property.latitude, property.longitude]}>
                <Popup>
                  <div>
                    <p>There are {property.count} properties at this point</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          <button className={styles.button} onClick={toggleMarkers}>{showMarkers ? 'Hide' : 'Show'} Markers</button>
          <Image src="/scale3.png" alt="Scale" width={400} height={50} className={styles.image} />
        </>
      }
    </>
  );
}