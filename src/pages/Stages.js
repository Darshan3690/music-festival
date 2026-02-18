import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Music, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { stages, artists } from '../data/festivalData';
import './Stages.css';

const Stages = () => {
  const [expandedStage, setExpandedStage] = useState(null);

  const getStageArtists = (stageName) => {
    return artists.filter(a => a.stage === stageName);
  };

  const toggleStage = (stageId) => {
    setExpandedStage(expandedStage === stageId ? null : stageId);
  };

  return (
    <div className="stages-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Festival Stages</h1>
          <p className="page-subtitle">7 unique stages designed for unforgettable experiences</p>
        </div>
      </section>

      {/* Stages Map Overview */}
      <section className="stages-overview section">
        <div className="container">
          <div className="stages-map">
            {stages.map((stage, index) => (
              <div 
                key={stage.id}
                className="map-stage"
                style={{
                  '--stage-color': stage.color,
                  '--delay': `${index * 0.1}s`
                }}
              >
                <div className="map-marker">
                  <MapPin size={24} />
                </div>
                <span>{stage.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stages List */}
      <section className="stages-list section">
        <div className="container">
          <div className="stages-grid">
            {stages.map((stage, index) => {
              const stageArtists = getStageArtists(stage.name);
              const isExpanded = expandedStage === stage.id;

              return (
                <div 
                  key={stage.id}
                  className={`stage-card ${isExpanded ? 'expanded' : ''}`}
                  style={{ 
                    '--stage-color': stage.color,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className="stage-header">
                    <div className="stage-image">
                      <img src={stage.image} alt={stage.name} />
                      <div className="stage-overlay">
                        <div className="stage-number">Stage {stage.id}</div>
                      </div>
                    </div>
                  </div>

                  <div className="stage-body">
                    <h2 className="stage-name">{stage.name}</h2>
                    <p className="stage-description">{stage.description}</p>

                    <div className="stage-stats">
                      <div className="stat">
                        <Users size={18} />
                        <span>{stage.capacity} capacity</span>
                      </div>
                      <div className="stat">
                        <Music size={18} />
                        <span>{stageArtists.length} artists</span>
                      </div>
                    </div>

                    <div className="stage-features">
                      <h4>Features</h4>
                      <div className="features-list">
                        {stage.features.map((feature, idx) => (
                          <span key={idx} className="feature-tag">{feature}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      className="toggle-artists"
                      onClick={() => toggleStage(stage.id)}
                    >
                      {isExpanded ? (
                        <>Hide Artists <ChevronUp size={18} /></>
                      ) : (
                        <>Show All Artists <ChevronDown size={18} /></>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="stage-artists">
                        <h4>Performing Artists</h4>
                        <div className="artists-timeline">
                          {[1, 2, 3].map(day => {
                            const dayArtists = stageArtists.filter(a => a.day === day);
                            if (dayArtists.length === 0) return null;
                            
                            return (
                              <div key={day} className="day-group">
                                <h5>Day {day}</h5>
                                <div className="day-artists">
                                  {dayArtists.sort((a, b) => {
                                    const timeA = parseInt(a.time.replace(':', ''));
                                    const timeB = parseInt(b.time.replace(':', ''));
                                    return timeA - timeB;
                                  }).map(artist => (
                                    <Link 
                                      to={`/artists/${artist.id}`}
                                      key={artist.id}
                                      className="timeline-artist"
                                    >
                                      <img src={artist.image} alt={artist.name} />
                                      <div className="artist-info">
                                        <span className="name">{artist.name}</span>
                                        <span className="time">
                                          <Clock size={12} />
                                          {artist.time}
                                        </span>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stage Legend */}
      <section className="legend-section section">
        <div className="container">
          <h2 className="section-title">Stage Guide</h2>
          <p className="section-subtitle">Find your perfect vibe</p>

          <div className="legend-grid">
            {stages.map(stage => (
              <div 
                key={stage.id}
                className="legend-item"
                style={{ '--stage-color': stage.color }}
              >
                <div className="legend-color"></div>
                <div className="legend-info">
                  <h4>{stage.name}</h4>
                  <p>Capacity: {stage.capacity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stages;
