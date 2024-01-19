import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

const MainBannerPage = () => {
  return (
    <div className='banner_wrap'>
      <div className='banner_contents'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 5500 }}
          navigation
          style={{ "--swiper-navigation-color": "#ffffff" }}>
          <SwiperSlide><img src='/image/1.jpg' width={"100%"} height={600} /></SwiperSlide>
          <SwiperSlide><img src='/image/2.jpg' width={"100%"} height={600} /></SwiperSlide>
          <SwiperSlide><img src='/image/3.jpg' width={"100%"} height={500} /></SwiperSlide>
          <SwiperSlide><img src='/image/4.jpg' width={"100%"} height={500} /></SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default MainBannerPage