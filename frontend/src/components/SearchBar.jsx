import { useState, useCallback } from 'react';

const SearchBar = ({ value, onChange }) => {
  const handleClear = () => onChange('');

  return (
    <div className="relative flex-1 min-w-0">
      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search tasks..."
        className="input-field pl-10 pr-10"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
