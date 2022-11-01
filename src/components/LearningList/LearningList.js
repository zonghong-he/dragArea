import { Link } from 'react-router-dom';
import './LearningList.scss';

const LearningList = () => {
  return (
    <>
      <ul className="learning-list">
        <li><Link to="/drag">Drag</Link></li>
      </ul>
    </>
  );
};

export default LearningList;
