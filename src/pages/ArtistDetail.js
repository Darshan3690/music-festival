import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Calendar, Users, Globe, Music, Play, Instagram, Twitter, Youtube, Share2 } from 'lucide-react';
import { artists, stages } from '../data/festivalData';
import './ArtistDetail.css';

const ArtistDetail = () => {
  const { id } = useParams();
  const artist = artists.find(a => a.id === parseInt(id));
  
  if (!artist) {
    return (
      <div className="not-found">
        <h2>Artist not found</h2>
        <Link to="/artists" className="btn btn-primary">Back to Artists</Link>
      </div>
    );
  }

  const stage = stages.find(s => s.name === artist.stage);
  const sameStageArtists = artists.filter(a => a.stage === artist.stage && a.id !== artist.id).slice(0, 3);
  const sameDayArtists = artists.filter(a => a.day === artist.day && a.id !== artist.id).slice(0, 4);
  const dayNames = ['', 'February 14, 2026', 'February 15, 2026', 'February 16, 2026'];

  return (
    <div className="artist-detail-page">
      {/* Hero Section */}
      <section className="artist-hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${artist.image})` }}>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container">
          <Link to="/artists" className="back-link">
            <ArrowLeft size={20} />
            Back to Artists
          </Link>

          <div className="artist-hero-content">
            <div className="artist-hero-image">
              <img src={artist.image} alt={artist.name} />
              {artist.featured && (
                <div className="featured-badge">⭐ Featured Artist</div>
              )}
            </div>

            <div className="artist-hero-info">
              <div className="artist-badges">
                <span className="badge badge-primary">Day {artist.day}</span>
                <span className="badge badge-pink">{artist.genre}</span>
              </div>

              <h1 className="artist-title">{artist.name}</h1>
              
              <p className="artist-bio">{artist.bio}</p>

              <div className="artist-meta">
                <div className="meta-item">
                  <Calendar size={18} />
                  <span>{dayNames[artist.day]}</span>
                </div>
                <div className="meta-item">
                  <Clock size={18} />
                  <span>{artist.time} ({artist.duration})</span>
                </div>
                <div className="meta-item">
                  <MapPin size={18} />
                  <span>{artist.stage}</span>
                </div>
                <div className="meta-item">
                  <Users size={18} />
                  <span>{artist.followers} followers</span>
                </div>
                <div className="meta-item">
                  <Globe size={18} />
                  <span>{artist.country}</span>
                </div>
              </div>

              <div className="artist-actions">
                <a href="#" className="btn btn-gradient">
                  <Play size={18} />
                  Listen Now
                </a>
                <button className="btn btn-secondary">
                  <Share2 size={18} />
                  Share
                </button>
              </div>

              <div className="social-links">
                <a href="#" className="social-link"><Instagram size={22} /></a>
                <a href="#" className="social-link"><Twitter size={22} /></a>
                <a href="#" className="social-link"><Youtube size={22} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Details */}
      <section className="performance-section section">
        <div className="container">
          <h2 className="section-title">Performance Details</h2>
          
          <div className="performance-grid">
            <div className="performance-card main-card">
              <div className="card-icon">
                <Calendar size={30} />
              </div>
              <div className="card-content">
                <h3>Date & Time</h3>
                <p className="card-value">{dayNames[artist.day]}</p>
                <p className="card-detail">{artist.time} - {artist.duration}</p>
              </div>
            </div>

            <div className="performance-card" style={{ '--accent': stage?.color || '#6366f1' }}>
              <div className="card-icon">
                <MapPin size={30} />
              </div>
              <div className="card-content">
                <h3>Stage</h3>
                <p className="card-value">{artist.stage}</p>
                <p className="card-detail">Capacity: {stage?.capacity}</p>
              </div>
            </div>

            <div className="performance-card">
              <div className="card-icon">
                <Music size={30} />
              </div>
              <div className="card-content">
                <h3>Genre</h3>
                <p className="card-value">{artist.genre}</p>
                <p className="card-detail">Get ready for an amazing show!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage Info */}
      {stage && (
        <section className="stage-info-section section">
          <div className="container">
            <h2 className="section-title">About the Stage</h2>
            
            <div className="stage-card" style={{ '--stage-color': stage.color }}>
              <div className="stage-image">
                <img src={stage.image} alt={stage.name} />
              </div>
              <div className="stage-details">
                <h3>{stage.name}</h3>
                <p className="stage-desc">{stage.description}</p>
                <div className="stage-features">
                  {stage.features.map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <Link to="/stages" className="stage-link">
                  View All Stages →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Same Stage Artists */}
      {sameStageArtists.length > 0 && (
        <section className="related-section section">
          <div className="container">
            <h2 className="section-title">Also at {artist.stage}</h2>
            <p className="section-subtitle">Other artists performing at the same stage</p>
            
            <div className="related-grid">
              {sameStageArtists.map(a => (
                <Link to={`/artists/${a.id}`} key={a.id} className="related-card">
                  <div className="related-image">
                    <img src={a.image} alt={a.name} />
                    <div className="related-time">{a.time}</div>
                  </div>
                  <div className="related-info">
                    <h4>{a.name}</h4>
                    <p>{a.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Same Day Artists */}
      <section className="related-section section">
        <div className="container">
          <h2 className="section-title">More on Day {artist.day}</h2>
          <p className="section-subtitle">Other artists performing on {dayNames[artist.day]}</p>
          
          <div className="related-grid four-cols">
            {sameDayArtists.map(a => (
              <Link to={`/artists/${a.id}`} key={a.id} className="related-card">
                <div className="related-image">
                  <img src={a.image} alt={a.name} />
                  <div className="related-time">{a.time}</div>
                </div>
                <div className="related-info">
                  <h4>{a.name}</h4>
                  <p>{a.stage}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="section-action">
            <Link to={`/schedule?day=${artist.day}`} className="btn btn-primary">
              View Full Day {artist.day} Schedule
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArtistDetail;
