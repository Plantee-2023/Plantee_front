import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';

const MainBannerPage = () => {
  const banners = [
    { src: '/image/banner/MainBanner_01.png', link: 'http://localhost:3000/plant' },
    { src: '/image/banner/MainBanner_02.png', link: 'http://localhost:3000/recipe' },
    { src: '/image/banner/MainBanner_03.png', link: 'http://localhost:3000/magazine/magazineList' },
    { src: '/image/banner/MainBanner_04.png', link: 'http://localhost:3000/plant/test' },
  ];

  return (
    <div className='banner_wrap'>
      <div className='banner_contents'>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 5500 }}
          navigation
          style={{ "--swiper-navigation-color": "#707070" }}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <a href={banner.link} rel="noopener noreferrer">
                <img src={banner.src} width={"100%"} height={600} alt={`Banner ${index + 1}`} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default MainBannerPage