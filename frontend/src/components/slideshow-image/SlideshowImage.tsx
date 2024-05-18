// import React, { useEffect, useRef } from 'react';
// import { Card } from 'react-bootstrap';

// function SlideshowImage(props: {images: string[]}) {
//   const images = props.images
//   const [src, setSrc] = React.useState(images[0]);
//   const intervalRef = useRef<number>();

//   const startSlideshow = () => {
//     let index = 0;
//     intervalRef.current = setInterval(() => {
//       index = (index + 1) % images.length;
//       setSrc(images[index]);
//     }, 1000);
//   };

//   const stopSlideshow = () => {
//     clearInterval(intervalRef.current);
//     setSrc(images[0]);
//   };

//   return (
//     <Card.Img variant="top"
//       src={src}
//       onMouseEnter={startSlideshow}
//       onMouseLeave={stopSlideshow}
//     />
//   );
// }

// export default SlideshowImage;

import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function SlideshowImage(props: {images: string[]}) {
  const images = props.images;
  const [src, setSrc] = useState(images[0]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId: number;

    if (isHovering) {
      intervalId = setInterval(() => {
        index = (index + 1) % images.length;
        setSrc(images[index]);
      }, 1000);
    } else {
      setSrc(images[0]);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [images, isHovering]);

  return (
    <Card.Img variant="top"
      src={src}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    />
  );
}

export default SlideshowImage;
