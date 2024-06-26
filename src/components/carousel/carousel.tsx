import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.scss';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function SwiperCarousel({ lessonImages }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);

  return (
    <div className="bo-swiper-wrapper">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 absolute top-0 right-0 zIndex-1"
      >
        {lessonImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="rounded-lg" src={image.fields.file.url} alt={image.fields.title} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumbs"
      >
        {lessonImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img className="rounded-lg" src={image.fields.file.url} alt={image.fields.title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}