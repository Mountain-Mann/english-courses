function Lesson({ lesson }) {
  return (
    <div className="lesson">
      <h5>{lesson.title}</h5>
      <p>{lesson.content}</p>
    </div>
  );
}
export default Lesson;