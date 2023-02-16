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
  slidesPerGroup: 3,
  loop: true,
  // loopFillGroupWithBlank: true,

  navigation: {
    prevEl: '.swiper__button-prev_section_reviews',
    nextEl: '.swiper__button-next_section_reviews',
  },
});


// ---------- Calculator ----------

const formElm = document.querySelector('.form');
const depositAmountInput = formElm.querySelector('#depositAmount');
const depositAmountText = formElm.querySelector('#depositAmountText');

const investmentPeriodInput = formElm.querySelector('#investmentPeriod');
const investmentPeriodText = formElm.querySelector('#investmentPeriodText');

const addedSumInput = formElm.querySelector('#addedSum');
const addedSumText = formElm.querySelector('#addedSumText');

const profitCalcResultsElm = document.querySelector('.profit-calc__results');
const interestRateText = profitCalcResultsElm.querySelector('#interestRateId');
const profitAmountText = profitCalcResultsElm.querySelector('#profitAmountId');
const profitAmountTotalText = profitCalcResultsElm.querySelector('#profitAmountTotalId');

depositAmountText.textContent = depositAmountInput.value;
investmentPeriodText.textContent = investmentPeriodInput.value;
addedSumText.textContent = addedSumInput.value;

depositAmountInput.addEventListener("input", (event) => {
  depositAmountText.textContent = depositAmountInput.value;
  calculateProfit();
});

investmentPeriodInput.addEventListener("input", (event) => {
  investmentPeriodText.textContent = investmentPeriodInput.value;
  calculateProfit();
});

addedSumInput.addEventListener("input", (event) => {
  addedSumText.textContent = addedSumInput.value;
  calculateProfit();
});

const calculateProfit = () => {
  const initialDepositAmount = Number(depositAmountText.textContent);
  const investmentPeriod = Number(investmentPeriodText.textContent);
  const addedSum = Number(addedSumText.textContent);

  const depositAmountTotal = initialDepositAmount + addedSum * (investmentPeriod - 2);

  let interestRate;

  if (depositAmountTotal < 1000000) {
    interestRate = 11;
  } else if (depositAmountTotal < 2000000) {
    interestRate = 12;
  } else if (depositAmountTotal < 3000000) {
    interestRate = 13;
  } else if (depositAmountTotal < 4000000) {
    interestRate = 14;
  } else if (depositAmountTotal < 5000000) {
    interestRate = 15;
  } else if (depositAmountTotal < 6000000) {
    interestRate = 16;
  } else if (depositAmountTotal < 7000000) {
    interestRate = 17;
  } else if (depositAmountTotal < 8000000) {
    interestRate = 18;
  } else {
    interestRate = 19;
  }

  const profitAmount = Math.floor(depositAmountTotal * interestRate / 100 / 12 * investmentPeriod);
  const profitAmountTotal = profitAmount + depositAmountTotal;

  interestRateText.textContent = interestRate;
  profitAmountText.textContent = profitAmount;
  profitAmountTotalText.textContent = profitAmountTotal;
};

calculateProfit();
