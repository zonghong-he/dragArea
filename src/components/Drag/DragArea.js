import { useEffect, useState } from 'react';
import './DragArea.scss';

const DragArea = () => {
  const [data, setData] = useState([]);
  let draged;

  const getOverItem = (e) => {
    if (e.target.className.includes('item')) return e.target;
    if (e.target.offsetParent.className.includes('item'))
      return e.target.offsetParent;
    return null;
  };
  const clearOverItem = (e) => {
    const overItem = getOverItem(e);
    if (overItem) {
      overItem.classList.remove('before');
      overItem.classList.remove('after');
    }
  };
  const dragStartHandler = (e) => {
    e.target.classList.add('draged');
    draged = e.target;
  };
  const dragEndHandler = (e) => {
    e.target.classList.remove('draged');
    draged = null;
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
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
    const overItem = getOverItem(e);
    console.log(e);
    if (!overItem || overItem === draged) return;

    //drag drop資料
    const overItemContent = +overItem.children[0].innerText;
    const dragedContent = +draged.children[0].innerText;

    const direction = overItem.className.includes('after') ? 'after' : 'before';

    const overItemIndex = data.findIndex(
      (item) => item.content === overItemContent
    );
    const dragedIndex = data.findIndex(
      (item) => item.content === dragedContent
    );

    const newData = [];
    //拖曳目標插入指定位置
    for (let i = 0; i < data.length; i++) {
      if (i === dragedIndex) continue;
      if (direction === 'before' && i === overItemIndex) {
        newData.push({ content: dragedContent, animation: false });
        newData.push(data[i]);
        continue;
      }
      newData.push(data[i]);
      if (i > dragedIndex && i <= overItemIndex)
        newData[newData.length - 1].animation = true;
      if (i === overItemIndex)
        newData.push({ content: dragedContent, animation: false });
    }
    // overItem.classList.add('change');
    console.log(newData);

    setData(newData);
    clearOverItem(e);
  };

  useEffect(() => {
    const array = [];
    for (let i = 1; i < 11; i++) {
      array.push({ content: i, animation: false });
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
      onAnimationEnd={(e) => {
        console.log('anime end');
        const newData = data.map((item) => {
          item.animation = false;
          return item;
        });
        console.log(newData);
        setData(newData)
      }}
    >
      {data.map((item) => {
        return (
          <div
            className={`item ${item.animation ? 'change' : ''}`}
            key={item.content}
            draggable={!item.animation}
          >
            <h1>{item.content}</h1>
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