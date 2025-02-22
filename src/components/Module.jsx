import Lesson from './Lesson.jsx';

function Module({ module }) {
  return (
    <div className="module">
      <h4>{module.title}</h4>
      {module.lessons.map(lesson => (
        <Lesson key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
export default Module;