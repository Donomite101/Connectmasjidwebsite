import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FEATURED = {
  quote: 'Connect Masjid is an outstanding platform for the Muslim community. It helps users stay informed about prayer times, masjid announcements, Islamic events, and important updates. The app is simple, reliable, and very beneficial. Highly recommended for every Muslim family.',
  name: 'Babu Pinjari',
  role: 'Verified Google Play User • 14 Aug 2026',
  badge: 'Google Play Verified Review',
  initials: 'BP',
};

const REVIEWS = [
  {
    name: 'Babu Pinjari',
    role: 'Verified User • 14 Aug 2026',
    badge: 'Google Play',
    initials: 'BP',
    quote: 'Connect Masjid is an outstanding platform for the Muslim community. It helps users stay informed about prayer times, masjid announcements, Islamic events, and important updates. The app is simple, reliable, and very beneficial. Highly recommended for every Muslim family.',
  },
  {
    name: 'Usman Sayed',
    role: 'Verified User • 20 Aug 2026',
    badge: 'Google Play',
    initials: 'US',
    quote: 'very accurate prayer time of my local maajid all announcement mentioned very helpefull .excellent, good, all time are accurate. sun rise and sun set.',
  },
  {
    name: 'Yunus Shaikh',
    role: 'Verified User • 01 Sep 2026',
    badge: 'Google Play',
    initials: 'YS',
    quote: 'MashaAllah, it is a very unique and excellent app. All the features like Tasbeeh, Qibla, Nazam tracker, stickers, and Notification features are really very good!',
  },
];

export default function Reviews() {
  return (
    <section className="reviews-v2" id="reviews" aria-label="Community testimonials">
      <div className="reviews-eyebrow">Real User Testimonials</div>
      <h2 className="reviews-heading-v2">
        Loved by Masjids &amp;<br />
        <span className="accent-text">Communities</span>
      </h2>

      {/* Large featured dark review */}
      <div className="featured-review" role="blockquote">
        <div className="featured-review-bg-quote" aria-hidden="true">&ldquo;</div>
        <p className="featured-review-text">
          &ldquo;{FEATURED.quote}&rdquo;
        </p>
        <div className="featured-review-author">
          <div className="review-avatar" aria-hidden="true">
            {FEATURED.initials}
          </div>
          <div>
            <div className="review-author-name">{FEATURED.name}</div>
            <div className="review-author-role">{FEATURED.role}</div>
          </div>
          <span className="review-mosque-badge">
            <CheckCircle2 size={13} color="#00b83b" />
            {FEATURED.badge}
          </span>
        </div>
      </div>

      {/* Review grid */}
      <div className="reviews-grid-v2">
        {REVIEWS.map((rev, i) => (
          <div key={i} className="review-card-v2" role="article">
            <div>
              <div className="review-stars-v2" aria-label="5 star rating">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="review-text-v2">&ldquo;{rev.quote}&rdquo;</p>
            </div>
            <div className="review-author-v2">
              <div>
                <div className="review-author-name-v2">{rev.name}</div>
                <div className="review-author-role-v2">{rev.role}</div>
              </div>
              <span className="review-badge-v2">
                <CheckCircle2 size={12} color="#00b83b" />
                {rev.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
