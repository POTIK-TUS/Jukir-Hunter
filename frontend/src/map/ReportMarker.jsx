import { Marker, Popup } from 'react-map-gl/maplibre';

const ReportMarker = ({ reports }) => {
  return (
    <>
      {reports.map((report) => (
        <Marker
          key={report.id}
          longitude={report.longitude}
          latitude={report.latitude}
          anchor="bottom"
        >
          <div className="cursor-pointer">
            <div className="h-4 w-4 rounded-full bg-red-600 border-2 border-white shadow-lg" />
          </div>

          <Popup
            longitude={report.longitude}
            latitude={report.latitude}
            anchor="top"
            closeButton={true}
            closeOnClick={false}
          >
            <div className="text-sm">
              <h3 className="font-bold">
                {report.location}
              </h3>

              <p>{report.description}</p>

              <p className="text-gray-500 mt-1">
                {report.date}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default ReportMarker;
