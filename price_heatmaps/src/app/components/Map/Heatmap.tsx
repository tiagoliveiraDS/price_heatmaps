import PropertyData from "../../models/PropertyData";
import { HeatmapLayerFactory } from '@vgrid/react-leaflet-heatmap-layer';

const HeatmapLayer = HeatmapLayerFactory<[number, number, number]>();

export default function Heatmap( {params}: {params: {data: []}}) {

    return (
        <HeatmapLayer
            points={params.data}
            longitudeExtractor={(p) => p[1]}
            latitudeExtractor={(p) => p[0]}
            intensityExtractor={(p) => p[2]}
            max = {1000000}
            radius={20}
        />
    );
}