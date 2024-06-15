'use client';

import { Property } from '@/app/domain/Property';
import { HeatmapLayerFactory } from '@vgrid/react-leaflet-heatmap-layer';
import { useEffect, useState } from 'react';

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

export default function Heatmap({ properties }: { properties: [number, number, number][] }) {
    const maxPrice = getMaximumPrice(properties);
    function getMaximumPrice(properties: [number, number, number][]) {
        return Math.max(...properties.map((p) => p[2]));
    }
    return (
        <>
            <HeatmapLayer
                points={properties}
                longitudeExtractor={(p) => p[1]}
                latitudeExtractor={(p) => p[0]}
                intensityExtractor={(p) => p[2]}
                max={maxPrice}
                radius={20}
                fitBoundsOnLoad={true}
                fitBoundsOnUpdate={true}
                useLocalExtrema={true}
                opacity={0.9}
            />
        </>

    );
}