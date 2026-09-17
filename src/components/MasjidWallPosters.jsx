import React, { useState } from 'react';
import { 
  MapPin, 
  X, 
  CheckCircle2, 
  QrCode
} from 'lucide-react';
import './MasjidWallPosters.css';

const POSTERS = [
  {
    id: 1,
    image: '/posters/real_poster_1.jpg',
    title: 'Jama Masjid',
    location: 'Mosque Entrance Wall',
    category: 'Verified ConnectMasjid Poster',
    description: 'Official ConnectMasjid prayer timing board and QR poster affixed to the main mosque entrance wall.'
  },
  {
    id: 2,
    image: '/posters/real_poster_2.jpg',
    title: 'Madina Mosque',
    location: 'Courtyard Pillar',
    category: 'Verified ConnectMasjid Poster',
    description: 'Mosque wall poster featuring QR code for live Adhan and daily Jamat timing updates.'
  },
  {
    id: 3,
    image: '/posters/real_poster_3.jpg',
    title: 'Masjid Al-Noor',
    location: 'Notice Bulletin Board',
    category: 'Verified ConnectMasjid Poster',
    description: 'Notice board display facilitating quick digital access to mosque prayer schedules and notices.'
  },
  {
    id: 4,
    image: '/posters/real_poster_4.jpg',
    title: 'City Mosque',
    location: 'Archway Entrance',
    category: 'Verified ConnectMasjid Poster',
    description: 'Entrance pillar poster providing live QR code scanning for worshippers entering the mosque.'
  },
  {
    id: 5,
    image: '/posters/real_poster_5.jpg',
    title: 'Markaz Masjid',
    location: 'Main Prayer Hall Gate',
    category: 'Verified ConnectMasjid Poster',
    description: 'Official daily Salah timing poster affixed at the main prayer hall entrance.'
  },
  {
    id: 6,
    image: '/posters/real_poster_6.jpg',
    title: 'Central Jamia Masjid',
    location: 'Community Wall',
    category: 'Verified ConnectMasjid Poster',
    description: 'Wall poster showcasing daily Salah timings and ConnectMasjid app features.'
  },
  {
    id: 7,
    image: '/posters/real_poster_7.jpg',
    title: 'Masjid Al-Taqwa',
    location: 'Wudu Area Entrance',
    category: 'Verified ConnectMasjid Poster',
    description: 'Wall notice display allowing community members to scan and follow live announcements.'
  },
  {
    id: 8,
    image: '/posters/real_poster_8.jpg',
    title: 'Masjid Bilal',
    location: 'Main Gate Pillar',
    category: 'Verified ConnectMasjid Poster',
    description: 'Printed prayer schedule board affixed to the primary entrance pillar.'
  },
  {
    id: 9,
    image: '/posters/real_poster_9.jpg',
    title: 'Masjid Al-Falah',
    location: 'Outer Courtyard Wall',
    category: 'Verified ConnectMasjid Poster',
    description: 'Community poster affixed on outer courtyard wall for daily musallies.'
  }
];

// Duplicate array for infinite seamless looping ticker
const DUPLICATED_POSTERS = [...POSTERS, ...POSTERS, ...POSTERS];

export default function MasjidWallPosters() {
  const [selectedPoster, setSelectedPoster] = useState(null);

  return (
    <section className="masjid-posters-section" id="masjid-posters" aria-label="Photos of posters on masjid walls">
      {/* Infinite Train Marquee Wrapper */}
      <div className="masjid-posters-marquee-container">
        <div className="masjid-posters-marquee-track">
          {DUPLICATED_POSTERS.map((poster, index) => (
            <div 
              key={`${poster.id}-${index}`} 
              className="poster-card-jitter"
              onClick={() => setSelectedPoster(poster)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedPoster(poster)}
            >
              {/* Poster Photo Container */}
              <div className="poster-card-image-box">
                <img 
                  src={poster.image} 
                  alt={`${poster.title} poster on masjid wall`} 
                  className="poster-card-img"
                  loading="lazy"
                />
              </div>

              {/* Card Footer Row */}
              <div className="poster-card-meta">
                <div className="poster-card-avatar">
                  <img src="/applogo.jpeg" alt="ConnectMasjid Logo" />
                </div>
                <div className="poster-card-info">
                  <h3 className="poster-card-title">{poster.title}</h3>
                  <p className="poster-card-sub">{poster.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPoster && (
        <div className="poster-lightbox-overlay" onClick={() => setSelectedPoster(null)}>
          <div className="poster-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="poster-lightbox-close" 
              onClick={() => setSelectedPoster(null)} 
              aria-label="Close photo preview"
            >
              <X size={20} />
            </button>

            <div className="poster-lightbox-content">
              <div className="poster-lightbox-media">
                <img src={selectedPoster.image} alt={selectedPoster.title} />
              </div>

              <div className="poster-lightbox-details">
                <div className="lightbox-eyebrow">
                  <CheckCircle2 size={14} color="#00b83b" />
                  <span>ConnectMasjid Verified Mosque Poster</span>
                </div>
                <h3>{selectedPoster.title}</h3>
                <p className="lightbox-location">
                  <MapPin size={15} color="#00b83b" />
                  {selectedPoster.location}
                </p>
                <div className="lightbox-category">
                  <QrCode size={16} color="#0f172a" />
                  <span>{selectedPoster.category}</span>
                </div>
                <p className="lightbox-desc">{selectedPoster.description}</p>
                
                <div className="lightbox-actions">
                  <button className="lightbox-btn-primary" onClick={() => setSelectedPoster(null)}>
                    Done Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
