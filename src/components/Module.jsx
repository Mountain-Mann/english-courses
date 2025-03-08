import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function Module({ module }) {
  // Assume courseId and levelId are passed or derived from the first lesson
  const courseId = module.lessons[0]?.courseId || '1'; // Fallback to '1' if not passed
  const levelId = module.lessons[0]?.levelId || 'A1-A2';

  return (
    <div className="module">
      <div className="module-nav">
        <Link to={`/courses/${courseId}`}>Back to Course</Link>
      </div>
      <h4>{module.title}</h4>
      <ul>
        {module.lessons.map(lesson => (
          <li key={lesson.id}>
            <Link to={`/courses/${lesson.courseId}/${lesson.levelId}/${module.id}/${lesson.id}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

Module.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    levelId: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Module;