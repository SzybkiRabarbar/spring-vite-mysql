import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselItem from '../../interfaces/CarouselItem';


function TextCarousel(props: {carouselItems: CarouselItem[]}) {

  // State to manage the active slide index
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle slide change
  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
      {props.carouselItems.map((item) => (
        <Carousel.Item key={item.id}>
          <div style={{ height: "300px" }}></div>
          <Carousel.Caption>
            <h3 style={{color: "black"}}>{item.title}</h3>
            <p>{item.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default TextCarousel