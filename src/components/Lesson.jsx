import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Quiz from './Quiz.jsx';
import LettersGrid from './LettersGrid.jsx';
import WordsGrid from './WordsGrid.jsx';
import MatchingExercise from './MatchingExercise.jsx';
import DragDropExercise from './DragDropExercise.jsx';
import ListenChooseExercise from './ListenChooseExercise.jsx';

function Lesson({ lesson, allLessons }) {
  const navigate = useNavigate();

  const currentIndex = allLessons.findIndex(l => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="lesson-content">
      <Link to={`/courses/${lesson.courseId}/${lesson.levelId}/${lesson.moduleId}`}>
        Back to Module
      </Link>
      <h2>{lesson.title}</h2>
      {lesson.content && (
        <div
          className="lesson-intro"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      )}
      {lesson.letters && <LettersGrid letters={lesson.letters} />}
      {lesson.words && <WordsGrid words={lesson.words} />}
      {lesson.exercises && (
        <div className="lesson-exercises">
          {lesson.exercises.map((exercise, index) => (
            <div key={index}>
              {exercise.type === 'matching' && <MatchingExercise {...exercise} />}
              {exercise.type === 'dragDrop' && <DragDropExercise {...exercise} />}
              {exercise.type === 'listenChoose' && <ListenChooseExercise {...exercise} />}
            </div>
          ))}
        </div>
      )}
      {lesson.quiz && <Quiz questions={lesson.quiz} />}
      {lesson.video && (
        <div className="lesson-video">
          <video controls src={lesson.video}>
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      {lesson.printable && (
        <a href={lesson.printable} download>Download Printable</a>
      )}
      <div className="lesson-navigation">
        {prevLesson && (
          <button
            // to={`/courses/${prevLesson.courseId}/${prevLesson.levelId}/${prevLesson.moduleId}/${prevLesson.id}`}
            onClick={() => handleNavigate(`/courses/${prevLesson.courseId}/${prevLesson.levelId}/${prevLesson.moduleId}/${prevLesson.id}`)}
            className="lesson-nav-button prev"
          >
            Previous Lesson
          </button>
        )}
        {nextLesson && (
          <button
            // to={`/courses/${nextLesson.courseId}/${nextLesson.levelId}/${nextLesson.moduleId}/${nextLesson.id}`}
            onClick={() => handleNavigate(`/courses/${nextLesson.courseId}/${nextLesson.levelId}/${nextLesson.moduleId}/${nextLesson.id}`)}
            className="lesson-nav-button next"
          >
            Next Lesson
          </button>
        )}
      </div>
    </div>
  );
}

Lesson.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    video: PropTypes.string,
    moduleId: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    levelId: PropTypes.string.isRequired,
    printable: PropTypes.string,
    letters: PropTypes.arrayOf(PropTypes.shape({
      letter: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string,
      sound: PropTypes.string,
    })),
    words: PropTypes.arrayOf(PropTypes.shape({
      word: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      word_audio: PropTypes.string.isRequired,
    })),
    quiz: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      audio: PropTypes.string,
      prompt: PropTypes.string.isRequired,
      correct: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string).isRequired,
    })),
    exercises: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      pairs: PropTypes.arrayOf(PropTypes.shape({
        letter: PropTypes.string.isRequired,
        word: PropTypes.string.isRequired,
      })),
      items: PropTypes.arrayOf(PropTypes.shape({
        letter: PropTypes.string.isRequired,
        word: PropTypes.string.isRequired,
      })),
      questions: PropTypes.arrayOf(PropTypes.shape({
        audio: PropTypes.string.isRequired,
        correct: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
      })),
    })),
  }).isRequired,
  allLessons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    levelId: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
  })).isRequired,
};

export default Lesson;