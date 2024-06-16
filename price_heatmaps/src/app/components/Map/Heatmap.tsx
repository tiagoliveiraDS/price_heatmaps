'use client';

import { HeatmapLayerFactory } from '@vgrid/react-leaflet-heatmap-layer';
const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

export default function Heatmap({ properties }: { properties: [number, number, number][] }) {
        return (
        <>
            <HeatmapLayer
                points={properties}
                longitudeExtractor={(p) => p[1]}
                latitudeExtractor={(p) => p[0]}
                intensityExtractor={(p) => p[2]}
                radius={20}
                fitBoundsOnLoad={true}
                fitBoundsOnUpdate={true}
                useLocalExtrema={true}
                opacity={0.9}
            />
        </>

    );
}