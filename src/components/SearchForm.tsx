import { useState, SubmitEvent, ChangeEvent } from "react";

interface SearchFormProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  minLength?: number;
}

export interface SearchFilters {
  category: string;
  includeArchived: boolean;
}

export function SearchForm({
  onSearch,
  minLength = 3,
}: Readonly<SearchFormProps>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [includeArchived, setIncludeArchived] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (query.trim().length < minLength) {
      setError(`Search query must be at least ${minLength} characters`);
      return;
    }

    setError("");
    onSearch(query.trim(), { category, includeArchived });
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear error when user starts typing
    if (error && value.trim().length >= minLength) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="search-form">
      <h2>Search</h2>

      <div>
        <label htmlFor="search-input">Search Query:</label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter search term..."
          data-testid="search-input"
        />
      </div>

      <div>
        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-testid="category-select"
        >
          <option value="all">All</option>
          <option value="articles">Articles</option>
          <option value="videos">Videos</option>
          <option value="podcasts">Podcasts</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={includeArchived}
            onChange={(e) => setIncludeArchived(e.target.checked)}
            data-testid="archived-checkbox"
          />Include Archived
        </label>
      </div>

      {error && (
        <p data-testid="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <button type="submit" data-testid="submit-btn">
        Search
      </button>
    </form>
  );
}
