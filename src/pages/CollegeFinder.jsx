// Complete Enhanced src/pages/CollegeFinder.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CollegeFinder.css';

// Comprehensive college data
const allColleges = [
  {
    id: 1,
    name: 'Govt. Degree College Srinagar',
    city: 'Srinagar',
    courses: ['B.Sc Physics', 'B.Com', 'BCA', 'BA English', 'M.Sc Mathematics'],
    established: '1975',
    type: 'Government',
    rating: 4.2,
    fees: '₹15,000/year',
    affiliatedTo: 'University of Kashmir',
    facilities: ['Library', 'Computer Lab', 'Sports Ground', 'Cafeteria'],
    naacGrade: 'B++'
  },
  {
    id: 2,
    name: 'Govt. Degree College Baramulla',
    city: 'Baramulla',
    courses: ['BA Political Science', 'B.Com', 'B.Sc Mathematics', 'BA History'],
    established: '1980',
    type: 'Government',
    rating: 4.0,
    fees: '₹12,000/year',
    affiliatedTo: 'University of Kashmir',
    facilities: ['Library', 'Computer Lab', 'Auditorium'],
    naacGrade: 'B+'
  },
  {
    id: 3,
    name: 'IIT Jammu',
    city: 'Jammu',
    courses: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech Mechanical', 'M.Tech', 'PhD'],
    established: '2016',
    type: 'Central University',
    rating: 4.8,
    fees: '₹2,00,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Research Labs', 'Hostels', 'Sports Complex', 'Medical Center'],
    naacGrade: 'A++'
  },
  {
    id: 4,
    name: 'Govt. College for Women, Parade Ground',
    city: 'Jammu',
    courses: ['B.Sc Physics', 'B.Com', 'BCA', 'BA History', 'M.A English'],
    established: '1955',
    type: 'Government',
    rating: 4.1,
    fees: '₹18,000/year',
    affiliatedTo: 'University of Jammu',
    facilities: ['Library', 'Computer Lab', 'Girls Hostel', 'Sports Ground'],
    naacGrade: 'B++'
  },
  {
    id: 5,
    name: 'University of Kashmir',
    city: 'Srinagar',
    courses: ['MBA', 'MCA', 'B.Tech', 'M.Sc', 'PhD', 'Law'],
    established: '1948',
    type: 'State University',
    rating: 4.5,
    fees: '₹45,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Research Centers', 'Multiple Libraries', 'Hostels', 'Medical Facility'],
    naacGrade: 'A+'
  },
  {
    id: 6,
    name: 'University of Jammu',
    city: 'Jammu',
    courses: ['B.Tech', 'MBA', 'B.Com', 'M.Sc', 'Law', 'Medical'],
    established: '1969',
    type: 'State University',
    rating: 4.3,
    fees: '₹35,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Multiple Campuses', 'Research Labs', 'Sports Complex'],
    naacGrade: 'A+'
  },
  {
    id: 7,
    name: 'NIT Srinagar',
    city: 'Srinagar',
    courses: ['B.Tech CSE', 'B.Tech Civil', 'B.Tech Electrical', 'M.Tech'],
    established: '1960',
    type: 'Central University',
    rating: 4.6,
    fees: '₹1,80,000/year',
    affiliatedTo: 'NIT System',
    facilities: ['Modern Labs', 'Hostels', 'Recreation Center'],
    naacGrade: 'A++'
  },
  {
    id: 8,
    name: 'SKIMS Soura',
    city: 'Srinagar',
    courses: ['MBBS', 'MD', 'MS', 'Nursing', 'Paramedical'],
    established: '1982',
    type: 'Medical Institute',
    rating: 4.7,
    fees: '₹50,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Teaching Hospital', 'Research Labs', 'Medical Library'],
    naacGrade: 'A+'
  },
  // NAAC A+ Private Colleges
  {
    id: 9,
    name: 'Shri Mata Vaishno Devi University',
    city: 'Katra',
    courses: ['B.Tech', 'MBA', 'B.Sc', 'M.Sc', 'PhD', 'Architecture'],
    established: '1999',
    type: 'Private University',
    rating: 4.6,
    fees: '₹1,20,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Modern Campus', 'Research Centers', 'Hostels', 'Innovation Lab'],
    naacGrade: 'A+'
  },
  {
    id: 10,
    name: 'Lovely Professional University - Jammu Campus',
    city: 'Jammu',
    courses: ['B.Tech', 'MBA', 'BBA', 'B.Com', 'M.Tech', 'Fashion Design'],
    established: '2020',
    type: 'Private University',
    rating: 4.4,
    fees: '₹1,80,000/year',
    affiliatedTo: 'LPU Punjab',
    facilities: ['Industry Labs', 'Placement Cell', 'Sports Complex', 'Cultural Center'],
    naacGrade: 'A+'
  },
  {
    id: 11,
    name: 'Islamic University of Science & Technology',
    city: 'Awantipora',
    courses: ['B.Tech', 'MBA', 'Medical', 'Law', 'Pharmacy', 'Nursing'],
    established: '2005',
    type: 'Private University',
    rating: 4.5,
    fees: '₹95,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Medical College', 'Engineering Labs', 'Library', 'Mosque'],
    naacGrade: 'A+'
  },
  {
    id: 12,
    name: 'Central University of Kashmir',
    city: 'Ganderbal',
    courses: ['MBA', 'M.Sc', 'MA', 'B.A', 'PhD', 'Law'],
    established: '2009',
    type: 'Central University',
    rating: 4.4,
    fees: '₹25,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Research Centers', 'Digital Library', 'Hostels', 'Auditorium'],
    naacGrade: 'A+'
  },
  {
    id: 13,
    name: 'Baba Ghulam Shah Badshah University',
    city: 'Rajouri',
    courses: ['B.Tech', 'MBA', 'B.Ed', 'M.Sc', 'Law', 'Social Work'],
    established: '2002',
    type: 'State University',
    rating: 4.2,
    fees: '₹40,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Multiple Campuses', 'Computer Labs', 'Library', 'Sports'],
    naacGrade: 'A+'
  },
  {
    id: 14,
    name: 'Cluster University Srinagar',
    city: 'Srinagar',
    courses: ['B.Sc', 'B.Com', 'BA', 'M.Sc', 'MA', 'B.Ed'],
    established: '2016',
    type: 'State University',
    rating: 4.3,
    fees: '₹22,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Multiple Colleges', 'Research Labs', 'Library Network'],
    naacGrade: 'A+'
  },
  {
    id: 15,
    name: 'Sher-e-Kashmir University of Agricultural Sciences',
    city: 'Srinagar',
    courses: ['Agriculture', 'Horticulture', 'Veterinary', 'Forestry', 'Food Technology'],
    established: '1982',
    type: 'State University',
    rating: 4.4,
    fees: '₹30,000/year',
    affiliatedTo: 'Autonomous',
    facilities: ['Research Farms', 'Labs', 'Veterinary Hospital', 'Seed Bank'],
    naacGrade: 'A+'
  }
];

export default function CollegeFinder() {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  // Filter and sort colleges
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = [...allColleges];

      // Filter by search term
      if (searchTerm.trim()) {
        filtered = filtered.filter((college) =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.courses.some(course => 
            course.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          college.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by city
      if (cityFilter !== 'All') {
        filtered = filtered.filter((college) => college.city === cityFilter);
      }

      // Filter by type
      if (typeFilter !== 'All') {
        filtered = filtered.filter((college) => college.type === typeFilter);
      }

      // Sort colleges
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'rating':
            return b.rating - a.rating;
          case 'fees':
            return parseInt(a.fees.replace(/[₹,]/g, '')) - parseInt(b.fees.replace(/[₹,]/g, ''));
          case 'established':
            return parseInt(b.established) - parseInt(a.established);
          default:
            return 0;
        }
      });

      setColleges(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, cityFilter, typeFilter, sortBy]);

  // Get unique values for filters
  const uniqueCities = ['All', ...new Set(allColleges.map(c => c.city))];
  const uniqueTypes = ['All', ...new Set(allColleges.map(c => c.type))];

  // Loading component
  const LoadingSkeleton = () => (
    <div className="college-card loading-skeleton">
      <div className="card-image skeleton-shimmer"></div>
      <div className="card-content">
        <div className="skeleton-line skeleton-shimmer" style={{ height: '24px', marginBottom: '8px' }}></div>
        <div className="skeleton-line skeleton-shimmer" style={{ height: '16px', width: '60%', marginBottom: '16px' }}></div>
        <div className="skeleton-box skeleton-shimmer" style={{ height: '60px', marginBottom: '16px' }}></div>
        <div className="skeleton-line skeleton-shimmer" style={{ height: '40px' }}></div>
      </div>
    </div>
  );

  const handleClearFilters = () => {
    setSearchTerm('');
    setCityFilter('All');
    setTypeFilter('All');
    setSortBy('name');
  };

  return (
    <div className="college-finder-page">
      {/* Enhanced Header */}
      <header className="finder-header">
        <div className="header-content">
          <h1>
            <span className="header-icon">🎓</span>
            Find Your Perfect College
          </h1>
          <p>Discover and explore the best educational institutions in Jammu & Kashmir that align with your career aspirations.</p>
        </div>
        
        {/* Advanced Filter Bar */}
        <div className="filter-section">
          <div className="filter-bar">
            <div className="search-input-container">
              <input
                type="search"
                placeholder="🔍 Search colleges, courses, or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  ✕
                </button>
              )}
            </div>
            
            <select 
              value={cityFilter} 
              onChange={(e) => setCityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">📍 All Cities</option>
              {uniqueCities.slice(1).map(city => (
                <option key={city} value={city}>📍 {city}</option>
              ))}
            </select>
            
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">🏛️ All Types</option>
              {uniqueTypes.slice(1).map(type => (
                <option key={type} value={type}>🏛️ {type}</option>
              ))}
            </select>

            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">📝 Sort by Name</option>
              <option value="rating">⭐ Sort by Rating</option>
              <option value="fees">💰 Sort by Fees</option>
              <option value="established">📅 Sort by Year</option>
            </select>
          </div>

          {/* Active Filters & Stats */}
          <div className="filter-stats">
            <div className="results-count">
              {!isLoading && (
                <span className="count-badge">
                  {colleges.length} college{colleges.length !== 1 ? 's' : ''} found
                </span>
              )}
            </div>
            
            {(searchTerm || cityFilter !== 'All' || typeFilter !== 'All') && (
              <button onClick={handleClearFilters} className="clear-filters-btn">
                🔄 Clear All Filters
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Results Section */}
      <main className="results-section">
        {isLoading ? (
          <div className="results-grid">
            {Array(6).fill(0).map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : colleges.length > 0 ? (
          <>
            <div className="results-grid">
              {colleges.map((college, index) => (
                <div 
                  className="college-card" 
                  key={college.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="card-image">
                    <div className="college-initial">{college.name.charAt(0)}</div>
                    <div className="card-overlay">
                      <div className="rating">
                        <span className="star">⭐</span>
                        {college.rating}
                      </div>
                      <div className="established">
                        Est. {college.established}
                      </div>
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="college-name">{college.name}</h3>
                    <p className="location">
                      📍 {college.city} • {college.type}
                    </p>
                    
                    <div className="college-details">
                      <div className="detail-row">
                        <span className="detail-label">Affiliated to:</span>
                        <span className="detail-value">{college.affiliatedTo}</span>
                      </div>
                      <div className="detail-row fees-row">
                        <span className="detail-label">Annual Fees:</span>
                        <span className="detail-value fees-amount">{college.fees}</span>
                      </div>
                    </div>

                    <div className="courses-section">
                      <h4 className="courses-title">Available Courses:</h4>
                      <div className="courses-list">
                        {college.courses.slice(0, 4).map((course, index) => (
                          <span className="course-tag" key={index}>{course}</span>
                        ))}
                        {college.courses.length > 4 && (
                          <span className="course-tag more-courses">
                            +{college.courses.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="facilities-preview">
                      <span className="facilities-label">Facilities:</span>
                      <span className="facilities-text">
                        {college.facilities.slice(0, 2).join(', ')}
                        {college.facilities.length > 2 && '...'}
                      </span>
                    </div>

                    <div className="card-actions">
                      <Link to={`/college/${college.id}`} className="details-btn">
                        <span>View Details</span>
                        <span className="btn-icon">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <div className="no-results-icon">🔍</div>
              <h3>No colleges found</h3>
              <p>We couldn't find any colleges matching your current search criteria.</p>
              <div className="no-results-suggestions">
                <p>Try:</p>
                <ul>
                  <li>Searching for different courses or specializations</li>
                  <li>Expanding your location preferences</li>
                  <li>Adjusting your institution type filters</li>
                </ul>
              </div>
              <button onClick={handleClearFilters} className="reset-btn">
                🔄 Reset All Filters
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Statistics Footer */}
      {!isLoading && colleges.length > 0 && (
        <footer className="finder-stats">
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">{allColleges.length}</span>
              <span className="stat-label">Total Colleges</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{uniqueCities.length - 1}</span>
              <span className="stat-label">Cities</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{uniqueTypes.length - 1}</span>
              <span className="stat-label">Institution Types</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {Math.round(allColleges.reduce((acc, col) => acc + col.rating, 0) / allColleges.length * 10) / 10}
              </span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}