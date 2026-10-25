import type { TeaCategory } from '../types/product'
import { SampaguitaStar } from './FloralIcons'

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
    <div className="filter-panel pill-filter-panel">
      {/* Category Selection Bar */}
      <div className="filter-group">
        <div className="filter-label-wrap">
          <SampaguitaStar size={13} className="filter-star-icon" />
          <span className="filter-label">Botanical Category</span>
        </div>
        <div className="category-button-row">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-pill pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              {cat === 'All' ? 'All Botanical Teas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search and Secondary Controls */}
      <div className="filter-controls-row">
        {/* Search */}
        <div className="search-field-container pill-search-container">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            placeholder="Search matcha, floral notes, or origin..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-field pill-input"
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
          <span className="filter-sublabel">Aroma & Taste:</span>
          <div className="taste-pill-row">
            {TASTE_OPTIONS.map((taste) => (
              <button
                key={taste}
                type="button"
                className={`taste-pill pill-btn ${selectedTaste === taste ? 'active' : ''}`}
                onClick={() => onSelectTaste(taste)}
              >
                {taste}
              </button>
            ))}
          </div>
        </div>

        {/* Results count & Sort */}
        <div className="filter-right-tools">
          <span className="count-label pill-tag">
            {totalCount} {totalCount === 1 ? 'tea' : 'teas'}
          </span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-dropdown pill-select"
          >
            <option value="featured">Artisanal Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  )
}
