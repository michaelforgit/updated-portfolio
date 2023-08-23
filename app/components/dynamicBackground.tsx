"use client"
import { useEffect, useState, useRef } from 'react';

const DynamicBackground = () => {
  const numImages = 20;

  const [imageIndex, setImageIndex] = useState(1);
  const prevScrollY = useRef(0);

  const preloadImages = () => {
    for (let i = 1; i <= numImages; i++) {
      const img = new Image();
      img.src = `/${String(i).padStart(5, '0')}.jpg`;
    }
  };
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    console.log( currentScrollY )
    if (currentScrollY > prevScrollY.current) {
      // Scrolling down
      // Increment image index or loop back to the first image if needed
      setImageIndex(prevIndex => (prevIndex % numImages) + 1);
    } else if (currentScrollY < prevScrollY.current) {
      // Scrolling up
      // Decrement image index or loop back to the last image if needed
      setImageIndex(prevIndex => (prevIndex === 1) ? numImages : prevIndex - 1);
    }
    prevScrollY.current = currentScrollY;
  };
  useEffect(() => {
    preloadImages();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative z-[-1]">
      <div
        style={{
          backgroundImage: `url('/carGif/${String(imageIndex).padStart(5, '0')}.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          height: '100vh',
          width: '100vw',
          position: 'fixed',
        }}
      >
      </div>
    </div>
  );
};

export default DynamicBackground;
