import { Link } from "react-router-dom";

function Level({ level, courseId }) {
  return (
    <div className="level">
      <h3>{level.title}</h3>
      <ul>
        {level.modules.map(module => (
          <li key={module.id}>
            <Link to={`/courses/${courseId}/${level.id}/${module.id}`}>
              {module.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Level;