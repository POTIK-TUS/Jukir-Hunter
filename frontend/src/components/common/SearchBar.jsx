import React from 'react';

const SearchBar = ({ value, onChange, placeholder = "Cari jalan atau area parkir..." }) => {
  return (
    <div className="input-group input-group-lg sj-card p-1">
      <span className="input-group-text bg-transparent border-0 text-muted">📍</span>
      <input
        type="text"
        className="form-control border-0 shadow-none fs-6"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;