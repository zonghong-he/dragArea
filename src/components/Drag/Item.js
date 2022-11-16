import React from 'react';
import './Item.scss';
const Item = ({ className, content ,draggable}) => {
  return (
    <div className={`item ${className}`} draggable={draggable}>
      <img src={`https://picsum.photos/seed/${content}/200/150`} alt='' />
      <div className="content">
        <h2>{content}</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>
    </div>
  );
};



export default Item;
