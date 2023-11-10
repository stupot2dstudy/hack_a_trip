import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecommendation } from '../../hooks/useRecommendation';

function SearchBarForm() {
    const { setSearchParams, loading } = useRecommendation();
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState('');

    const handleSearchOrKeyPress = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (keyword) {
                // Set the search parameters with the keyword
                setSearchParams({ keyword });
            } else {
                // If no keyword is provided, clear the search parameters
                setSearchParams({});
            }

            // Redirect to the /explore page with the appropriate query parameter
            navigate(`/explore${keyword ? `?keyword=${keyword}` : ''}`);
        }
    };

    return (
        <div className="search-bar-container bg-light p-3">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Busca tu recomendacion"
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyPress={handleSearchOrKeyPress}
                    value={keyword}
                    style={{ width: '60%' }}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSearchOrKeyPress}
                >
                    Buscar
                </button>
            </div>
        </div>
    );
}

export default SearchBarForm;