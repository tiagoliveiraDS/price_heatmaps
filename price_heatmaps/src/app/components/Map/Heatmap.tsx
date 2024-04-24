import { Property } from '@/app/models/Property';
import { HeatmapLayerFactory } from '@vgrid/react-leaflet-heatmap-layer';

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

export default function Heatmap( {params}: {params: {properties: Property[]}}) {

    return (
        <HeatmapLayer
            points={params.properties.map((p) => [p.latitude, p.longitude, p.price])}
            longitudeExtractor={(p) => p[1]}
            latitudeExtractor={(p) => p[0]}
            intensityExtractor={(p) => p[2]}
            max = {1000000}
            radius={20}
        />
    );
}