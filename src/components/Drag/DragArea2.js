import { useEffect, useState } from 'react';
import './DragArea.scss';
import Item from './Item';

const DragArea = () => {
  const [data, setData] = useState([]);
  const [draged, setDraged] = useState(null);
  const [isAnimate, setIsAnimate] = useState(false);

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
    const target = getOverItem(e);
    target.classList.add('draged');
    setDraged(target);
  };
  const dragEndHandler = (e) => {
    const target = getOverItem(e);
    target.classList.remove('draged');
    setDraged(null);
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    const overItem = getOverItem(e);
    if (!overItem || draged === overItem || isAnimate) return;
    
    const overItemContent = +overItem.querySelector("h2").innerText
    const dragedContent = +draged.querySelector("h2").innerText

    const overItemIndex = data.findIndex(
      (item) => item.content === overItemContent
    );
    const dragedIndex = data.findIndex(
      (item) => item.content === dragedContent
    );
    const newData = [];
    //拖曳目標插入指定位置
    for (let i = 0; i < data.length; i++) {
      console.log(newData);
      if (i === dragedIndex) continue;
      if (i < dragedIndex + 1 && i >= overItemIndex && i === overItemIndex) {
        newData.push({ content: dragedContent, animation: '' });
        newData.push(data[i]);
        newData[newData.length - 1].animation = 'left-in';
        continue;
      }
      newData.push(data[i]);
      console.log(i);
      //移動動畫
      if (i > dragedIndex && i <= overItemIndex) {
        newData[newData.length - 1].animation = 'right-in';
      }
      if (i < dragedIndex && i >= overItemIndex) {
        newData[newData.length - 1].animation = 'left-in';
      }

      if (i === overItemIndex)
        newData.push({ content: dragedContent, animation: '' });
    }

    setData(newData);
    clearOverItem(e);
  };
  const dragLeaveHandler = (e) => {
    clearOverItem(e);
  };
  const dropHandler = (e) => {
    const overItem = getOverItem(e);
    if (!overItem || overItem === draged) return;

    //drag drop資料
  };
  const animationEndHandler = (e) => {
    const newData = data.map((item) => {
      item.animation = '';
      return item;
    });
    setData(newData);
    setIsAnimate(false);
  };

  useEffect(() => {
    const array = [];
    for (let i = 1; i < 11; i++) {
      array.push({ content: i, animation: '' });
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
      onAnimationEnd={animationEndHandler}
      onAnimationStart={() => {
        setIsAnimate(true);
      }}
    >
      {data.map((item) => {
        return (
          <Item
            key={item.content}
            className={item.animation}
            draggable={!item.animation}
            content={item.content}
            data-key={item.content}
          />
        );
      })}
    </div>
  );
};

export default DragArea;
