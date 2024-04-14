const API_BASE_URL = 'https://api.kinopoisk.dev';
const API_KEY = process.env.REACT_APP_API_TOKEN; // Ensure this is set in your .env files

/**
 * Fetches movies from the Kinopoisk API based on provided search criteria.
 *
 * @param {Object} params - The search criteria and pagination options.
 * @returns {Promise<Object>} - The search result.
 */
export const fetchMoviesWithFilters = async (params) => {
    // Construct the query parameters string
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page);
    if (params.limit) queryParams.append('limit', params.limit);
    if (params.selectFields && params.selectFields.length) {
        params.selectFields.forEach(selectedField => queryParams.append('selectFields', selectedField));
    }
    if (params.year) queryParams.append('year', params.year);
    if (params.ageRating) queryParams.append('ageRating', params.ageRating);
    if (params.country) queryParams.append('countries.name', params.country);
    if (params.sortField && params.sortField.length) {
        queryParams.append('sortField', params.sortField.join(','));
    }
    if (params.sortType && params.sortType.length) {
        queryParams.append('sortType', params.sortType.join(','));
    }
    if (params.id && params.id.length) {
        queryParams.append('id', params.id.join(','));
    }

    const url = `${API_BASE_URL}/v1.4/movie?${queryParams.toString()}`;

    // Make the API call
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        },
    });

    // Check for API response errors
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
    }

    return response.json();
};

/**
* Searches movies by title.
* 
* @param {string} query - The search query for movie titles.
* @param {number} [page=1] - The page of results to retrieve.
* @param {number} [limit=10] - The number of results per page.
* @returns {Promise<Object>} - The search result.
*/
export const searchMoviesByTitle = async (query, page = 1, limit = 10) => {
    const queryParams = new URLSearchParams();
    if (page) queryParams.append('page', page);
    if (limit) queryParams.append('limit', limit);
    if (query) queryParams.append('query', query);
    
    const url = `${API_BASE_URL}/v1.4/movie/search?${queryParams.toString()}`;

    // Make the API call
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        },
    });

    // Check for API response errors
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
    }

    // Parse the JSON response
    return response.json();
};

/**
* Fetches details for a single movie by its ID.
* 
* @param {string} movieId - The ID of the movie to fetch details for.
* @returns {Promise<Object>} - The detailed information of the movie.
*/
export const fetchMovieDetails = async (movieId) => {
    const url = `${API_BASE_URL}/v1.4/movie/${movieId}?token=${API_KEY}`;

    // Make the API call
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY, // Using the X-API-KEY header for authentication
        },
    });

    // Check for API response errors
    if (!response.ok) {
        throw new Error(`API responded with status ${response.status}: ${response.statusText}`);
    }

    // Parse and return the JSON response
    return response.json();
};

    