const MapLegend = () => {
  const legends = [
    { color: '#00FFFF', label: 'Rendah' },
    { color: '#00FF00', label: 'Mulai meningkat' },
    { color: '#FFFF00', label: 'Sedang' },
    { color: '#FF8000', label: 'Tinggi' },
    { color: '#FF0000', label: 'Sangat tinggi' }
  ];

  return (
    <div className="absolute bottom-5 left-5 z-10 bg-white p-4 rounded-xl shadow-lg">
      <h3 className="font-bold text-sm mb-3">
        Intensitas Laporan
      </h3>

      <div className="space-y-2">
        {legends.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-xs text-gray-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegend;
