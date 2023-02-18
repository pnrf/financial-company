import '../styles/index.css';

import Chart from 'chart.js/auto'

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

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

depositAmountText.textContent = numberWithSpaces(depositAmountInput.value);
investmentPeriodText.textContent = investmentPeriodInput.value;
addedSumText.textContent = numberWithSpaces(addedSumInput.value);

depositAmountInput.addEventListener("input", (event) => {
  depositAmountText.textContent = numberWithSpaces(depositAmountInput.value);
  calculateProfit();
  renderChart();
});

investmentPeriodInput.addEventListener("input", (event) => {
  investmentPeriodText.textContent = investmentPeriodInput.value;
  calculateProfit();
  renderChart();
});

addedSumInput.addEventListener("input", (event) => {
  addedSumText.textContent = numberWithSpaces(addedSumInput.value);
  calculateProfit();
  renderChart();
});

const calculateProfit = () => {
  const initialDepositAmount = Number(depositAmountInput.value);
  const investmentPeriod = Number(investmentPeriodInput.value);
  const addedSum = Number(addedSumInput.value);

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
  profitAmountText.textContent = profitAmount.toLocaleString();
  profitAmountTotalText.textContent = profitAmountTotal.toLocaleString();

  return profitAmount;
};


// ---------- Chart js ----------

// 1. Подготовить массив с данными для построения графика

const createArr = () => {

  const Arr = [];
  const investmentPeriod = Number(investmentPeriodInput.value);
  let countValue = calculateProfit();

  for (let i=0; i <= investmentPeriod; i++) {
    Arr.push({ month: i, count: Math.floor(countValue / (investmentPeriod - i)) });
  };

  console.log(Arr);
  return Arr;
};

// 2. Создать график
let myChart = null;


const createChart = (data) =>  {
  return myChart = new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.month),
          datasets: [
            {
              label: 'Выплата процентов, ежемесячно',
              data: data.map(row => row.count)
            }
          ]
        }
      }
    );
};

// 3. Отрисовать график на странице

async function renderChart() {
  if (myChart) {
    myChart.destroy();
  };

  const data = createArr();
  createChart(data);
};

renderChart();
