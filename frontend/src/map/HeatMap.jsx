import { Source, Layer } from 'react-map-gl/maplibre';

const HeatMap = ({ data }) => {
  const heatmapLayer = {
    id: 'heatmap',
    type: 'heatmap',
    source: 'reports',
    paint: {
        'heatmap-weight': 1,

        // Intensitas heatmap
        'heatmap-intensity': 1,

        // Radius pengaruh titik
        'heatmap-radius': 30,

        // Transparansi
        'heatmap-opacity': 0.8,

        // Gradasi warna
        'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(0, 0, 255, 0)',
        0.2, '#00FFFF',
        0.4, '#00FF00',
        0.6, '#FFFF00',
        0.8, '#FF8000',
        1, '#FF0000'
        ]
    },
    layout: {
        'visibility': 'visible'
    }
  };

    return (
        <Source id="reports" type="geojson" data={data}>
            <Layer {...heatmapLayer} />
        </Source>
    );
}
export default HeatMap;