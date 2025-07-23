
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
export default function App() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/promo-20_7441c713-b8bc-4549-b169-67001e3b91e1_1920x.png?v=1750840298"
            className="object-contain"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            alt=""
            src="https://digital-world-2.myshopify.com/cdn/shop/files/promo-21_94c561f6-4c50-4a5f-8868-0c7b804bc550_1920x.png?v=1750840379"
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}