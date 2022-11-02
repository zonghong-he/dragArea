import { useEffect, useState } from 'react';
import './DragArea.scss';

const DragArea = () => {
  const [data, setData] = useState([]);
  const [draged, setDraged] = useState(null);

  const clearOverItem =(overItem)=>{
    if (!overItem) return;
    overItem.classList.remove("before");
    overItem.classList.remove("after");
    overItem = null;
  }
  const dragStartHandler = (e) => {
    console.log('dragStart');
    e.target.classList.add('draged');
    setDraged(e.target);
  };
  const dragEndHandler = (e) => {
    console.log('dragEnd');
    e.target.classList.remove('draged');
    setDraged(null);
  };
  const dragOverHandler = (e) => {
    const overItem = e.target
    if (draged === overItem || !overItem.className.includes("item")) return;
    console.log("offset",e.nativeEvent.offsetX);
    console.log("width",overItem.clientWidth);
    if(e.nativeEvent.offsetX > overItem.clientWidth/2){
      clearOverItem(overItem)
      overItem.classList.add("after")
    }else{
      clearOverItem(overItem)
      overItem.classList.add("before")
    }    
  };
  const dragLeaveHandler = (e)=>{
    clearOverItem(e.target)
  }

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
    >
      {data.map((i) => {
        return (
          <div className="item" key={i} draggable="true">
            <h1>{i}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default DragArea;
