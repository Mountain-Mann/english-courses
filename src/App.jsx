import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Course from './components/Course.jsx';
import Module from './components/Module.jsx';
import Lesson from './components/Lesson.jsx';
import coursesData from './data/courses.json';

function ScrollToTop({ contentRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
      console.log('ScrollToTop reset .content for:', pathname);
    }
  }, [pathname, contentRef]);

  return null;
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const contentRef = useRef(null);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  console.log('coursesData at render:', coursesData); // debug

  return (
    <BrowserRouter>
      <ScrollToTop contentRef={contentRef} />
      <div className="header">
        <Link to="/" title="Home">⌂</Link>
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? '✕' : '☰'}
        </button>
        <button title="User Account">👤</button>
      </div>
      <div className="app">
        <Sidebar
          isOpen={isSidebarOpen}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="content" ref={contentRef}>
          <Routes>
            <Route path="/" element={<Home coursesData={coursesData} />} />
            {coursesData.map(course => (
              <Route
                key={course.id}
                path={`/courses/${course.id}`}
                element={<Course course={course} />}
              />
            ))}
            {coursesData.flatMap(course =>
              course.levels.flatMap(level =>
                level.modules.map(module => (
                  <Route
                    key={`${course.id}-${level.id}-${module.id}`}
                    path={`/courses/${course.id}/${level.id}/${module.id}`}
                    element={<Module module={module} courseId={course.id} />}
                  />
                ))
              )
            )}
            {coursesData.flatMap(course =>
              course.levels.flatMap(level =>
                level.modules.flatMap(module =>
                  module.lessons.map(lesson => (
                    <Route
                      key={lesson.id}
                      path={`/courses/${course.id}/${lesson.levelId}/${lesson.moduleId}/${lesson.id}`}
                      element={<Lesson lesson={lesson} allLessons={module.lessons} />}
                    />
                  ))
                )
              )
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function Home({ coursesData }) {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Welcome to Your English Journey</h1>
        <p>Learn English step-by-step with interactive lessons and practical exercises.</p>
      </div>
      <div className="course-preview">
        <h2>Explore Our Courses</h2>
        <ul>
          {coursesData.slice(0, 3).map(course => (
            <li key={course.id}>
              <Link to={`/courses/${course.id}`}>
                <h3>{course.title}</h3>
                <p>Start your {course.title.toLowerCase()} adventure today!</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;