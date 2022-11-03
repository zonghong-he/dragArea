import { useEffect, useState } from 'react';
import './DragArea.scss';

const DragArea = () => {
  const [data, setData] = useState([]);
  const [draged, setDraged] = useState(null);

  const clearOverItem = (e) => {
    if (e.target.className.includes("item")){
      const overItem = e.target
      overItem.classList.remove('before');
      overItem.classList.remove('after');
      return
    }
    if(e.target.offsetParent.className.includes("item")){
      const overItem = e.target.offsetParent
      overItem.classList.remove('before');
      overItem.classList.remove('after');
      return
    }
    
  };
  const dragStartHandler = (e) => {
    // console.log('dragStart');
    e.target.classList.add('draged');
    setDraged(e.target);
  };
  const dragEndHandler = (e) => {
    // console.log('dragEnd');
    e.target.classList.remove('draged');
    setDraged(null);
  };
  const dragOverHandler = (e) => {
    // console.log(e);
    let overItem = e.target;
    if (draged === overItem) return;
    if (overItem.className.includes('item')) {
      if (e.nativeEvent.offsetX > overItem.clientWidth / 2) {
        clearOverItem(e);
        overItem.classList.add('after');
      } else {
        clearOverItem(e);
        overItem.classList.add('before');
      }
    } else if (overItem.offsetParent.className.includes('item')) {
      overItem = overItem.offsetParent;
      if (e.nativeEvent.layerX > overItem.clientWidth / 2) {
        clearOverItem(e);
        overItem.classList.add('after');
      } else {
        clearOverItem(e);
        overItem.classList.add('before');
      }
    }
    // console.log('offset', e.nativeEvent.offsetX);
    // console.log('width', overItem.clientWidth);
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
