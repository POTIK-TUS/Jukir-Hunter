
import React, { useState, useEffect } from 'react';
import SearchBar from '../components/common/SearchBar';
import axios from 'axios';
import MapContainer from '../map/MapContainer';

const API_URL = 'http://127.0.0.1:8000/api/reports';

const PetaParkirPage = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data dari FastAPI
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(API_URL);

        // Mengambil features dari GeoJSON
        const features = response.data.features;

        // Mengubah GeoJSON menjadi format yang digunakan React
        const formattedReports = features.map((feature) => {
          const properties = feature.properties;
          const coordinates = feature.geometry.coordinates;

          return {
            id: properties.report_id,

            latitude: coordinates[1],
            longitude: coordinates[0],

            jenis_pelanggaran: properties.category,
            keterangan: properties.description,

            status: properties.status,
            district: properties.district,

            reported_amount: properties.reported_amount,
            created_at: properties.created_at
          };
        });

        setReports(formattedReports);
        setFilteredReports(formattedReports);

      } catch (err) {
        console.error('Gagal mengambil laporan:', err);
        setError('Gagal menghubungkan ke server API.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Fitur pencarian
  const handleSearch = (keyword) => {
    if (!keyword) {
      setFilteredReports(reports);
      return;
    }

    const search = keyword.toLowerCase();

    const filtered = reports.filter((report) =>
      report.keterangan?.toLowerCase().includes(search) ||
      report.jenis_pelanggaran?.toLowerCase().includes(search) ||
      report.district?.toLowerCase().includes(search)
    );

    setFilteredReports(filtered);
  };

  return (
    <div className="container py-5">

      <h2 className="fw-bold mb-4 text-center">
        Peta Lokasi & Status Parkir
      </h2>

      <SearchBar
        onSearch={handleSearch}
        placeholder="Cari wilayah atau pelanggaran..."
      />

      <div className="mb-4"></div>

      {loading && (
        <p className="text-center">
          Memuat data laporan...
        </p>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="text-muted">
            Menampilkan {filteredReports.length} laporan
          </p>

          {/* Peta menggunakan data dari API */}
          <MapContainer reports={filteredReports} />

          <h4 className="fw-bold mb-3 mt-4">
            Daftar Status Laporan Area Parkir
          </h4>

          <div className="row g-3">
            {filteredReports.map((report) => (
              <div key={report.id} className="col-md-6">

                <div className="docker-card p-3 d-flex justify-content-between align-items-center">

                  <div>
                    <h6 className="fw-bold mb-1">
                      {report.jenis_pelanggaran}
                    </h6>

                    <p className="text-muted small mb-1">
                      {report.keterangan}
                    </p>

                    <small className="text-muted">
                      {report.district}
                    </small>

                    <br />

                    <small className="text-primary">
                      Koordinat: {report.latitude}, {report.longitude}
                    </small>
                  </div>

                  <span className={`badge ${
                    report.status === 'verified'
                      ? 'bg-success'
                      : report.status === 'pending'
                        ? 'bg-warning text-dark'
                        : 'bg-danger'
                  }`}>
                    {report.status}
                  </span>

                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default PetaParkirPage;
