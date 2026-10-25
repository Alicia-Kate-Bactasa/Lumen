import { useState } from 'react'
import type { Product } from '../types/product'
import { SampaguitaStar, LilyPetal, FloralWatermark } from './FloralIcons'

interface ReviewItem {
  id: number
  author: string
  location: string
  teaName: string
  teaCategory: string
  rating: number
  title: string
  comment: string
  date: string
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 1,
    author: 'Aria S.',
    location: 'Makati',
    teaName: 'Ceremonial Matcha',
    teaCategory: 'Matcha',
    rating: 5,
    title: 'Silky emerald foam & zero bitterness',
    comment:
      'Whisks into the most vibrant jade green froth with natural floral sweetness. It brings clean morning clarity without any jitters. Truly artisanal quality.',
    date: '2 days ago',
  },
  {
    id: 2,
    author: 'Carlos M.',
    location: 'Cebu',
    teaName: 'Roasted Hojicha',
    teaCategory: 'Hojicha',
    rating: 5,
    title: 'The coziest roasted aroma',
    comment:
      'The toasted hazelnut and warm caramel notes make the best evening latte. Incredibly gentle on the stomach and so comforting after a long day.',
    date: '1 week ago',
  },
  {
    id: 3,
    author: 'Elena R.',
    location: 'Quezon City',
    teaName: 'Classic Spring Sencha',
    teaCategory: 'Sencha',
    rating: 5,
    title: 'Crisp, dewy & refreshing',
    comment:
      'Tastes like fresh morning dew on spring tea leaves. Clean and bright with a delicate lingering sweetness that refreshes the whole afternoon.',
    date: '2 weeks ago',
  },
  {
    id: 4,
    author: 'Mira K.',
    location: 'BGC, Taguig',
    teaName: 'Toasted Rice Genmaicha',
    teaCategory: 'Genmaicha',
    rating: 5,
    title: 'Satisfying toasty rice notes',
    comment:
      'The balance of popped brown rice aroma and vibrant green tea is superb. Delicious alongside light snacks or brewed iced during warm days.',
    date: '3 weeks ago',
  },
]

interface ReviewsSectionProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function ReviewsSection({ products, onSelectProduct }: ReviewsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredReviews =
    activeCategory === 'All'
      ? REVIEWS_DATA
      : REVIEWS_DATA.filter((r) => r.teaCategory === activeCategory)

  const handleReviewTeaClick = (teaName: string) => {
    const match = products.find((p) => p.name.toLowerCase() === teaName.toLowerCase())
    if (match) {
      onSelectProduct(match)
    }
  }

  return (
    <section className="reviews-section" aria-label="Customer Reviews">
      <div className="reviews-container">
        {/* Header */}
        <div className="section-intro">
          <div className="botanical-eyebrow">
            <SampaguitaStar size={15} className="badge-flower" />
            <span>Customer Experiences</span>
            <LilyPetal size={15} className="badge-flower" />
          </div>
          <h2 className="section-main-heading">Notes from Matcha Lovers</h2>
          <p className="section-description">
            Read heartfelt thoughts from tea lovers who enjoy our artisanal matcha and whole-leaf botanicals every morning.
          </p>

          {/* Filter Pills */}
          <div className="review-filters">
            {['All', 'Matcha', 'Hojicha', 'Sencha', 'Genmaicha'].map((cat) => (
              <button
                key={cat}
                type="button"
                className={`review-filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Scalloped cards grid */}
        <div className="reviews-grid">
          {filteredReviews.map((review) => (
            <article key={review.id} className="review-scallop-card">
              <FloralWatermark className="card-watermark-bg" />

              <div className="review-card-header">
                <div className="review-stars-row" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <SampaguitaStar key={i} size={15} className="star-filled" />
                  ))}
                </div>
                <span className="review-date-text">{review.date}</span>
              </div>

              <h3 className="review-headline">{review.title}</h3>
              <p className="review-body-text">{review.comment}</p>

              {/* Sweeping Petal-Curve Horizontal Divider */}
              <div className="sweeping-petal-divider" aria-hidden="true" />

              <div className="review-card-footer">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.author}</span>
                  <span className="reviewer-location">{review.location} &bull; Verified Order</span>
                </div>

                <button
                  type="button"
                  className="review-tea-link"
                  onClick={() => handleReviewTeaClick(review.teaName)}
                  title={`View details for ${review.teaName}`}
                >
                  <span>{review.teaName}</span>
                  <i className="bi bi-arrow-up-right"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
