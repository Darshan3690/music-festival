import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Music, Star, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { artists, stages, festivalInfo, schedule } from '../data/festivalData';
import './Home.css';

const Home = () => {
  const featuredArtists = artists.filter(artist => artist.featured).slice(0, 6);
  const dayColors = ['#6366f1', '#ec4899', '#f59e0b'];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="floating-elements">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="floating-note" style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}>♪</div>
            ))}
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={16} />
            <span>Gujarat's Biggest Music Festival</span>
          </div>
          
          <h1 className="hero-title animate-fade-in">
            <span className="title-line">MARWADI</span>
            <span className="title-line gradient">MUSIC FESTIVAL</span>
            <span className="title-year">2026</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in">
            3 Days • 7 Stages • 50+ Artists • Unlimited Memories
          </p>
          
          <div className="hero-info animate-fade-in">
            <div className="info-item">
              <Calendar size={20} />
              <span>Feb 14-16, 2026</span>
            </div>
            <div className="info-item">
              <MapPin size={20} />
              <span>Marwadi University, Rajkot</span>
            </div>
          </div>
          
          <div className="hero-buttons animate-fade-in">
            <Link to="/artists" className="btn btn-primary">
              Explore Artists
              <ArrowRight size={18} />
            </Link>
            <Link to="/schedule" className="btn btn-secondary">
              View Schedule
            </Link>
          </div>
          
          <div className="hero-stats animate-fade-in">
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Artists</span>
            </div>
            <div className="stat">
              <span className="stat-number">7</span>
              <span className="stat-label">Stages</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Days</span>
            </div>
            <div className="stat">
              <span className="stat-number">100K+</span>
              <span className="stat-label">Expected</span>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Days Overview */}
      <section className="section days-section">
        <div className="container">
          <h2 className="section-title">3 Days of Pure Magic</h2>
          <p className="section-subtitle">Each day brings a unique theme and unforgettable experiences</p>
          
          <div className="days-grid">
            {Object.entries(schedule).map(([key, day], index) => (
              <div key={key} className="day-card" style={{ '--accent-color': dayColors[index] }}>
                <div className="day-number">Day {index + 1}</div>
                <h3 className="day-title">{day.title.split(' - ')[1]}</h3>
                <p className="day-date">{day.date}</p>
                <p className="day-theme">{day.theme}</p>
                <div className="day-artists">
                  <Users size={16} />
                  <span>{artists.filter(a => a.day === index + 1).length} Artists</span>
                </div>
                <Link to={`/schedule?day=${index + 1}`} className="day-link">
                  View Lineup <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Artists</h2>
          <p className="section-subtitle">Witness performances from the biggest names in music</p>
          
          <div className="featured-grid">
            {featuredArtists.map((artist, index) => (
              <Link to={`/artists/${artist.id}`} key={artist.id} className="featured-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="featured-image">
                  <img src={artist.image} alt={artist.name} />
                  <div className="featured-overlay">
                    <span className="badge badge-pink">Day {artist.day}</span>
                  </div>
                </div>
                <div className="featured-info">
                  <h3>{artist.name}</h3>
                  <p className="featured-genre">{artist.genre}</p>
                  <div className="featured-meta">
                    <span><Clock size={14} /> {artist.time}</span>
                    <span><MapPin size={14} /> {artist.stage}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="section-action">
            <Link to="/artists" className="btn btn-gradient">
              View All 50 Artists
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stages Preview */}
      <section className="section stages-section">
        <div className="container">
          <h2 className="section-title">7 Unique Stages</h2>
          <p className="section-subtitle">From massive main stage to intimate acoustic settings</p>
          
          <div className="stages-preview">
            {stages.slice(0, 4).map((stage, index) => (
              <div key={stage.id} className="stage-preview-card" style={{ '--stage-color': stage.color }}>
                <div className="stage-preview-image">
                  <img src={stage.image} alt={stage.name} />
                  <div className="stage-preview-overlay">
                    <span className="stage-capacity">{stage.capacity} capacity</span>
                  </div>
                </div>
                <div className="stage-preview-info">
                  <h3>{stage.name}</h3>
                  <p>{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-action">
            <Link to="/stages" className="btn btn-primary">
              Explore All Stages
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section highlights-section">
        <div className="container">
          <h2 className="section-title">Festival Highlights</h2>
          <p className="section-subtitle">More than just music - it's an experience</p>
          
          <div className="highlights-grid">
            {festivalInfo.highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <Star className="highlight-icon" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Don't Miss Out!</h2>
            <p>Early bird tickets are selling fast. Secure your spot at Gujarat's biggest music celebration.</p>
            <div className="cta-buttons">
              <a href="#tickets" className="btn btn-gradient">
                Get Your Tickets Now
                <ArrowRight size={18} />
              </a>
              <Link to="/schedule" className="btn btn-secondary">
                View Full Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
