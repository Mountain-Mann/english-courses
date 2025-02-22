import Level from './Level.jsx';

function Course({ course }) {
  return (
    <div className="course">
      <h2>{course.title}</h2>
      {course.levels.map(level => (
        <Level key={level.id} level={level} />
      ))}
    </div>
  );
}
export default Course;