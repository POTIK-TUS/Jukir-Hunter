import Map, { NavigationControl, ScaleControl } from 'react-map-gl/maplibre';
import HeatMap from './HeatMap';
import ReportMarker from './ReportMarker';
import MapLegend from './MapLegend';

const MapContainer = ({ data, reports }) => {
    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
            <Map 
                initialViewState={{
                    bounds: [
                    [112.60, -7.40],
                    [112.85, -7.15]
                ],
                fitBoundsOptions: { padding: 40 }
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style.json"
            >
                <HeatMap data={data} />
                <ReportMarker reports={reports} />
                <NavigationControl />
                <ScaleControl />
            </Map>
            <MapLegend />   
        </div>
    );
}
export default MapContainer;