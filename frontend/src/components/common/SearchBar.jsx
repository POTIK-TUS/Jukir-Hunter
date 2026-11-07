
import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder }) => {
    const [keyword, setKeyword] = React.useState('');

    // Auto Search dengan debounce 500ms
    React.useEffect(() => {
        const timer = setTimeout(() => {
            onSearch?.(keyword.trim());
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword, onSearch]);

    // Menghapus pencarian
    const handleClear = () => {
        setKeyword('');
    };

    return (
        <div className="w-100">
            <div className="input-group bg-white border rounded-3 shadow-sm overflow-hidden">

                {/* Search Icon */}
                <span className="input-group-text bg-white border-0">
                    <Search size={20} className="text-secondary" />
                </span>

                {/* Input */}
                <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder={placeholder}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                {/* Clear Button */}
                {keyword && (
                    <button
                        type="button"
                        className="btn bg-white border-0 text-secondary"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <X size={18} />
                    </button>
                )}

            </div>
        </div>
    );
};

export default SearchBar;
