// App.jsx
import Course from './components/Course.jsx';
import coursesData from './data/courses.json';

function App() {
  return (
    <div className="app">
      <h1>My English Courses</h1>
      {coursesData.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}
export default App;