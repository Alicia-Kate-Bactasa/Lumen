interface FlavorFilterProps {
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  searchQuery: string
  onSearchChange: (q: string) => void
  selectedFlavorNote: string
  onSelectFlavorNote: (note: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalCount: number
}

const FLAVOR_TAGS = [
  'All Profiles',
  'Deep Umami',
  'Fresh Cream',
  'Night Jasmine',
  'Charred Oak',
  'Sweet Corn',
  'Roasted Hazelnut',
]

const CATEGORIES = ['All', 'Matcha', 'Green Tea', 'Oolong', 'Herbal']

export function FlavorFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedFlavorNote,
  onSelectFlavorNote,
  sortBy,
  onSortChange,
  totalCount,
}: FlavorFilterProps) {
  return (
    <div className="filter-section">
      {/* Category Pills & Search */}
      <div className="filter-primary-row">
        <div className="category-chips">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="search-box">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Search cultivar, region, or notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Flavor Note Quick Filter & Sort */}
      <div className="filter-secondary-row">
        <div className="flavor-notes-wrapper">
          <span className="filter-sublabel">Flavor Accent:</span>
          <div className="flavor-pills">
            {FLAVOR_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`flavor-pill ${selectedFlavorNote === tag ? 'active' : ''}`}
                onClick={() => onSelectFlavorNote(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-meta">
          <span className="results-count">{totalCount} {totalCount === 1 ? 'variety' : 'varieties'}</span>
          <div className="sort-dropdown-wrap">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-select"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
