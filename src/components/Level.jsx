import Module from './Module.jsx';

function Level({ level }) {
  return (
    <div className="level">
      <h3>{level.title}</h3>
      {level.modules.map(module => (
        <Module key={module.id} module={module} />
      ))}
    </div>
  );
}
export default Level;