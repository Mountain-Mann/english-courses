import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import coursesData from '../data/courses.json';

function Sidebar({ isOpen, isDarkMode, setIsDarkMode, setIsSidebarOpen }) {
  const [openCourses, setOpenCourses] = useState({});
  const [openLevels, setOpenLevels] = useState({});
  const [openModules, setOpenModules] = useState({});

  const toggleCourse = (courseId) => {
    setOpenCourses(prev => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const toggleLevel = (levelId) => {
    setOpenLevels(prev => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  const toggleModule = (moduleId) => {
    setOpenModules(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile (max-width: 768px)
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className='sidebar-header'>
        <h3>Courses</h3>
        <button
          className="theme-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☼' : '☽'}
        </button>
      </div>
      <ul>
        {coursesData.map(course => (
          <li key={course.id}>
            <div className="sidebar-item" onClick={() => toggleCourse(course.id)}>
              <Link to={`/courses/${course.id}`} onClick={(e) => { e.stopPropagation(); handleLinkClick() }}>
                {/* className={({ isActive }) => (isActive ? 'active' : '')} */}
                {course.title}
              </Link>
              <span className="dropdown-arrow">{openCourses[course.id] ? '▼' : '▶'}</span>
            </div>
            {openCourses[course.id] && course.levels && (
              <ul className="sidebar-subnav level">
                {course.levels.map(level => (
                  <li key={level.id}>
                    <div className="sidebar-item" onClick={() => toggleLevel(level.id)}>
                      <span>{level.title}</span>
                      <span className="dropdown-arrow">{openLevels[level.id] ? '▼' : '▶'}</span>
                    </div>
                    {openLevels[level.id] && (
                      <ul className="sidebar-subnav module">
                        {level.modules.map(module => (
                          <li key={module.id}>
                            <div className="sidebar-item" onClick={() => toggleModule(module.id)}>
                              <Link to={`/courses/${course.id}/${level.id}/${module.id}`} onClick={(e) => { e.stopPropagation(); handleLinkClick()}}>
                                {module.title}
                              </Link>
                              <span className="dropdown-arrow">{openModules[module.id] ? '▼' : '▶'}</span>
                            </div>
                            {openModules[module.id] && module.lessons && (
                              <ul className="sidebar-subnav lesson">
                                {module.lessons.map(lesson => (
                                  <li key={lesson.id}>
                                    <Link to={`/courses/${course.id}/${lesson.levelId}/${lesson.moduleId}/${lesson.id}` } onClick={handleLinkClick}>
                                      {lesson.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired,
};

export default Sidebar;