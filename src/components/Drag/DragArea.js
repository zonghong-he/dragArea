import { useEffect, useState } from 'react';
import './DragArea.scss';

const DragArea = () => {
  const [data, setData] = useState([]);

  let draged

  const getOverItem = (e) => {
    if (e.target.className.includes('item')) return e.target;
    if (e.target.offsetParent.className.includes('item'))
      return e.target.offsetParent;
    return null;
  };
  const clearOverItem = (e) => {
    const overItem = getOverItem(e)
    if (overItem) {     
      overItem.classList.remove('before');
      overItem.classList.remove('after');      
    }    
  };  
  const dragStartHandler = (e) => {
    e.target.classList.add('draged');
    draged = e.target
  };
  const dragEndHandler = (e) => {
    e.target.classList.remove('draged');
    draged = null
  };
  const dragOverHandler = (e) => {
    const overItem = getOverItem(e);
    if (!overItem || draged === overItem) return;

    //判斷滑鼠在拖曳區域前半或後半
    if (e.nativeEvent.layerX > overItem.clientWidth / 2) {
      clearOverItem(e);
      overItem.classList.add('after');
    } else {
      clearOverItem(e);
      overItem.classList.add('before');
    }   
  };
  const dragLeaveHandler = (e) => {
    clearOverItem(e);
  };
  const dropHandler = (e) => {
    clearOverItem(e);
  };

  useEffect(() => {
    const array = [];
    for (let i = 1; i < 11; i++) {
      array.push(i);
    }
    setData(array);
  }, []);

  return (
    <div
      className="wrap"
      onDragStart={dragStartHandler}
      // onDrag={dragHandler}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      {data.map((i) => {
        return (
          <div className="item" key={i} draggable="true">
            <h1>{i}</h1>
            <div>
              <h2>test</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DragArea;
