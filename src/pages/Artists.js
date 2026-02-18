import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Clock, MapPin, Users, Music, Star, X } from 'lucide-react';
import { artists, stages } from '../data/festivalData';
import './Artists.css';

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const genres = [...new Set(artists.map(a => a.genre))];
  const stageNames = stages.map(s => s.name);

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           artist.genre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDay = selectedDay === 'all' || artist.day === parseInt(selectedDay);
      const matchesGenre = selectedGenre === 'all' || artist.genre === selectedGenre;
      const matchesStage = selectedStage === 'all' || artist.stage === selectedStage;
      
      return matchesSearch && matchesDay && matchesGenre && matchesStage;
    });
  }, [searchTerm, selectedDay, selectedGenre, selectedStage]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDay('all');
    setSelectedGenre('all');
    setSelectedStage('all');
  };

  const activeFiltersCount = [selectedDay, selectedGenre, selectedStage].filter(f => f !== 'all').length + (searchTerm ? 1 : 0);

  return (
    <div className="artists-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">All Artists</h1>
          <p className="page-subtitle">
            Discover 50 incredible artists performing across 3 days at MMF 2026
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-bar">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search artists or genres..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={() => setSearchTerm('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <button 
              className={`filter-toggle ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="filter-count">{activeFiltersCount}</span>
              )}
            </button>
          </div>

          {showFilters && (
            <div className="filters-panel">
              <div className="filter-group">
                <label>Day</label>
                <div className="filter-options">
                  <button 
                    className={selectedDay === 'all' ? 'active' : ''}
                    onClick={() => setSelectedDay('all')}
                  >
                    All Days
                  </button>
                  <button 
                    className={selectedDay === '1' ? 'active' : ''}
                    onClick={() => setSelectedDay('1')}
                  >
                    Day 1
                  </button>
                  <button 
                    className={selectedDay === '2' ? 'active' : ''}
                    onClick={() => setSelectedDay('2')}
                  >
                    Day 2
                  </button>
                  <button 
                    className={selectedDay === '3' ? 'active' : ''}
                    onClick={() => setSelectedDay('3')}
                  >
                    Day 3
                  </button>
                </div>
              </div>

              <div className="filter-group">
                <label>Genre</label>
                <select 
                  value={selectedGenre} 
                  onChange={(e) => setSelectedGenre(e.target.value)}
                >
                  <option value="all">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Stage</label>
                <select 
                  value={selectedStage} 
                  onChange={(e) => setSelectedStage(e.target.value)}
                >
                  <option value="all">All Stages</option>
                  {stageNames.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
              </div>

              {activeFiltersCount > 0 && (
                <button className="clear-filters" onClick={clearFilters}>
                  <X size={16} />
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          <div className="results-info">
            Showing <strong>{filteredArtists.length}</strong> of <strong>{artists.length}</strong> artists
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="artists-grid-section">
        <div className="container">
          <div className="artists-grid">
            {filteredArtists.map((artist, index) => (
              <Link 
                to={`/artists/${artist.id}`} 
                key={artist.id} 
                className={`artist-card ${artist.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${(index % 12) * 0.05}s` }}
              >
                <div className="artist-image">
                  <img src={artist.image} alt={artist.name} />
                  <div className="artist-overlay">
                    <div className="overlay-badges">
                      <span className="badge badge-primary">Day {artist.day}</span>
                      {artist.featured && (
                        <span className="badge badge-orange">
                          <Star size={12} /> Featured
                        </span>
                      )}
                    </div>
                    <button className="view-profile">View Profile</button>
                  </div>
                </div>
                <div className="artist-info">
                  <h3 className="artist-name">{artist.name}</h3>
                  <p className="artist-genre">{artist.genre}</p>
                  <div className="artist-details">
                    <span className="detail">
                      <Clock size={14} />
                      {artist.time}
                    </span>
                    <span className="detail">
                      <MapPin size={14} />
                      {artist.stage}
                    </span>
                  </div>
                  <div className="artist-followers">
                    <Users size={14} />
                    {artist.followers} followers
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArtists.length === 0 && (
            <div className="no-results">
              <Music size={60} />
              <h3>No artists found</h3>
              <p>Try adjusting your filters or search term</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Artists;
