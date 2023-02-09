import '../styles/index.css';

import Swiper, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ------------ swiper (slider)------------

const swiperSectionIntro = new Swiper(".swiper_section_intro", {
  modules: [Navigation, Pagination],

  direction: 'horizontal',
  loop: true,
  loopFillGroupWithBlank: true,

  navigation: {
    prevEl: '.swiper__button-prev_section_intro',
    nextEl: '.swiper__button-next_section_intro',
  },

  pagination: {
    el: ".swiper-pagination_section_intro",
    type: 'bullets',
    clickable: true,
  },

  // breakpoints: {
  //   320: {
  //     slidesPerView: 1,
  //     spaceBetween: 10,
  //     slidesPerGroup: 1,
  //   },

  //   678: {
  //     slidesPerView: 2,
  //     spaceBetween: 20,
  //     slidesPerGroup: 2,
  //   }
  // }
});

const swiperSectionReviews = new Swiper(".swiper-section-reviews", {
  modules: [Navigation],

  slidesPerView: 3,
	spaceBetween: 15,
  slidesPerGroup: 2,
  loop: true,
  loopFillGroupWithBlank: true,

  navigation: {
    nextEl: '.swiper__button-next_section_reviews',
    prevEl: '.swiper__button-prev_section_reviews',
  },
});
