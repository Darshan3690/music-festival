import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { artists, stages, schedule } from '../data/festivalData';
import './Schedule.css';

const Schedule = () => {
  const [searchParams] = useSearchParams();
  const initialDay = searchParams.get('day') ? parseInt(searchParams.get('day')) : 1;
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedStage, setSelectedStage] = useState('all');

  const dayInfo = {
    1: schedule.day1,
    2: schedule.day2,
    3: schedule.day3
  };

  const dayColors = {
    1: '#6366f1',
    2: '#ec4899',
    3: '#f59e0b'
  };

  const filteredArtists = useMemo(() => {
    let filtered = artists.filter(a => a.day === selectedDay);
    if (selectedStage !== 'all') {
      filtered = filtered.filter(a => a.stage === selectedStage);
    }
    return filtered.sort((a, b) => {
      const timeA = parseInt(a.time.replace(':', ''));
      const timeB = parseInt(b.time.replace(':', ''));
      return timeA - timeB;
    });
  }, [selectedDay, selectedStage]);

  const groupedByStage = useMemo(() => {
    const grouped = {};
    filteredArtists.forEach(artist => {
      if (!grouped[artist.stage]) {
        grouped[artist.stage] = [];
      }
      grouped[artist.stage].push(artist);
    });
    return grouped;
  }, [filteredArtists]);

  const timeSlots = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];

  return (
    <div className="schedule-page">
      {/* Header */}
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Festival Schedule</h1>
          <p className="page-subtitle">Plan your perfect festival experience</p>
        </div>
      </section>

      {/* Day Selector */}
      <section className="day-selector-section">
        <div className="container">
          <div className="day-selector">
            <button 
              className="day-nav"
              onClick={() => setSelectedDay(prev => prev > 1 ? prev - 1 : 3)}
            >
              <ChevronLeft size={24} />
            </button>

            <div className="day-tabs">
              {[1, 2, 3].map(day => (
                <button
                  key={day}
                  className={`day-tab ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                  style={{ '--day-color': dayColors[day] }}
                >
                  <span className="day-label">Day {day}</span>
                  <span className="day-date">{dayInfo[day].date.split(',')[0]}</span>
                  <span className="day-theme">{dayInfo[day].theme}</span>
                </button>
              ))}
            </div>

            <button 
              className="day-nav"
              onClick={() => setSelectedDay(prev => prev < 3 ? prev + 1 : 1)}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="current-day-info" style={{ '--accent': dayColors[selectedDay] }}>
            <Calendar size={24} />
            <div>
              <h2>{dayInfo[selectedDay].title}</h2>
              <p>{dayInfo[selectedDay].date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stage Filter */}
      <section className="stage-filter-section">
        <div className="container">
          <div className="stage-filter">
            <Filter size={18} />
            <span>Filter by Stage:</span>
            <div className="stage-pills">
              <button
                className={`stage-pill ${selectedStage === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedStage('all')}
              >
                All Stages
              </button>
              {stages.map(stage => (
                <button
                  key={stage.id}
                  className={`stage-pill ${selectedStage === stage.name ? 'active' : ''}`}
                  onClick={() => setSelectedStage(stage.name)}
                  style={{ '--stage-color': stage.color }}
                >
                  {stage.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="schedule-section">
        <div className="container">
          {/* Timeline View */}
          <div className="schedule-timeline">
            {/* Time Column */}
            <div className="time-column">
              <div className="column-header">Time</div>
              {timeSlots.map(time => (
                <div key={time} className="time-slot">
                  {time}
                </div>
              ))}
            </div>

            {/* Stage Columns */}
            {Object.entries(groupedByStage).map(([stageName, stageArtists]) => {
              const stage = stages.find(s => s.name === stageName);
              return (
                <div key={stageName} className="stage-column" style={{ '--stage-color': stage?.color || '#6366f1' }}>
                  <div className="column-header">
                    <MapPin size={16} />
                    {stageName}
                  </div>
                  <div className="stage-events">
                    {stageArtists.map(artist => {
                      const startHour = parseInt(artist.time.split(':')[0]);
                      const startMin = parseInt(artist.time.split(':')[1]);
                      const duration = parseInt(artist.duration);
                      const startOffset = startHour >= 15 ? startHour - 15 : startHour + 9;
                      const top = (startOffset * 80) + (startMin / 60 * 80);
                      const height = (duration / 60) * 80;

                      return (
                        <Link
                          to={`/artists/${artist.id}`}
                          key={artist.id}
                          className="schedule-event"
                          style={{
                            top: `${top}px`,
                            height: `${height}px`
                          }}
                        >
                          <div className="event-time">
                            <Clock size={12} />
                            {artist.time}
                          </div>
                          <div className="event-name">{artist.name}</div>
                          <div className="event-genre">{artist.genre}</div>
                          <div className="event-duration">{artist.duration}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* List View */}
          <div className="schedule-list">
            <h3 className="list-title">
              All Performances - Day {selectedDay}
              <span className="count">{filteredArtists.length} shows</span>
            </h3>
            
            <div className="list-grid">
              {filteredArtists.map((artist, index) => {
                const stage = stages.find(s => s.name === artist.stage);
                return (
                  <Link
                    to={`/artists/${artist.id}`}
                    key={artist.id}
                    className="list-item"
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      '--stage-color': stage?.color || '#6366f1'
                    }}
                  >
                    <div className="list-time">
                      <span className="time">{artist.time}</span>
                      <span className="duration">{artist.duration}</span>
                    </div>
                    <div className="list-image">
                      <img src={artist.image} alt={artist.name} />
                    </div>
                    <div className="list-info">
                      <h4>{artist.name}</h4>
                      <p className="genre">{artist.genre}</p>
                      <p className="stage">
                        <MapPin size={14} />
                        {artist.stage}
                      </p>
                    </div>
                    <div className="list-arrow">→</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
