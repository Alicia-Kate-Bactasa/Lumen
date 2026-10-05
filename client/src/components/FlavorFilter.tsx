import type { TeaCategory } from '../types/product'

interface FlavorFilterProps {
  selectedCategory: TeaCategory
  onSelectCategory: (category: TeaCategory) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedTaste: string
  onSelectTaste: (taste: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  totalCount: number
}

const TASTE_OPTIONS = [
  'All Tastes',
  'Warm & Toasty',
  'Fresh & Sweet',
  'Rich & Creamy',
  'Smooth',
]

const CATEGORY_LIST: TeaCategory[] = [
  'All',
  'Matcha',
  'Hojicha',
  'Genmaicha',
  'Sencha',
  'Black Tea',
  'Milk Tea',
]

export function FlavorFilter({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  selectedTaste,
  onSelectTaste,
  sortBy,
  onSortChange,
  totalCount,
}: FlavorFilterProps) {
  return (
    <div className="filter-panel">
      {/* Category Selection Bar */}
      <div className="filter-group">
        <span className="filter-label">Choose your tea:</span>
        <div className="category-button-row">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat === 'All' ? 'All Teas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Secondary Controls */}
      <div className="filter-controls-row">
        {/* Search */}
        <div className="search-field-container">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            placeholder="Search teas by name or taste..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-field"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search text"
            >
              <i className="bi bi-x-circle-fill"></i>
            </button>
          )}
        </div>

        {/* Taste Pills */}
        <div className="taste-filter-group">
          <span className="filter-sublabel">Taste:</span>
          <div className="taste-pill-row">
            {TASTE_OPTIONS.map((taste) => (
              <button
                key={taste}
                type="button"
                className={`taste-pill ${selectedTaste === taste ? 'active' : ''}`}
                onClick={() => onSelectTaste(taste)}
              >
                {taste}
              </button>
            ))}
          </div>
        </div>

        {/* Results count & Sort */}
        <div className="filter-right-tools">
          <span className="count-label">
            {totalCount} {totalCount === 1 ? 'tea' : 'teas'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-dropdown"
          >
            <option value="featured">Featured First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}
