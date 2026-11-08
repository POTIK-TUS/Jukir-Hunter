const dummyReports = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        report_count: 5,
        location: 'Tunjungan'
      },
      geometry: {
        type: 'Point',
        coordinates: [112.7378, -7.2575]
      }
    },
    {
      type: 'Feature',
      properties: {
        report_count: 10,
        location: 'Gubeng'
      },
      geometry: {
        type: 'Point',
        coordinates: [112.7508, -7.2654]
      }
    },
    {
      type: 'Feature',
      properties: {
        report_count: 8,
        location: 'Wonokromo'
      },
      geometry: {
        type: 'Point',
        coordinates: [112.7342, -7.2915]
      }
    }
  ]
};

export default dummyReports;