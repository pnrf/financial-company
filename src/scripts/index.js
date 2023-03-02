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

  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 14,
      // slidesPerGroup: 1,
    },

    1368: {
      slidesPerView: 3,
      spaceBetween: 15,
      // slidesPerGroup: 3,
    }
  },

  loop: true,
  // loopFillGroupWithBlank: true,

  navigation: {
    prevEl: '.swiper__button-prev_section_reviews',
    nextEl: '.swiper__button-next_section_reviews',
  },
});

swiperSectionReviews.width = 339;


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
  profitAmountText.textContent = numberWithSpaces(profitAmount);
  profitAmountTotalText.textContent = profitAmountTotal.toLocaleString();

  return {profitAmount, profitAmountTotal};
};


// ---------- Chart js ----------

// 1. Подготовить массивы с данными для построения графика

const createArr = () => {

  const Arr = [];
  const investmentPeriod = Number(investmentPeriodInput.value);
  let countValue = calculateProfit().profitAmount;

  for (let i=1; i <= investmentPeriod; i++) {
    Arr.push({ month: i, count: Math.floor(countValue / (investmentPeriod - (i - 1))) });
  };

  return Arr;
};

const createArr2 = () => {

  const Arr= [];
  const investmentPeriod = Number(investmentPeriodInput.value);
  let countValue = calculateProfit().profitAmountTotal;

  for (let i=1; i <= investmentPeriod; i++) {
    Arr.push({ month: i, count: Math.floor(countValue / (investmentPeriod - (i - 1))) });
  };

  return Arr;
};

// 2. Создать график
let myChart = null;


const createChart = (data, data2) =>  {
  return myChart = new Chart(
      document.getElementById('acquisitions'),
      {
        type: 'line',
        data: {
          labels: data.map(row => row.month),
          datasets: [
            {
              fill: {
                target: 'origin',
                above: '#EBEFFF',
              },
              label: 'Выплата процентов, ежемесячно',
              data: data.map(row => row.count),
              borderColor: 'rgba(0, 0, 222, 1)',
              pointRadius: 0,
            },
            {
              fill: {
                target: 'origin',
                above: '#E5E5FC',
              },
              label: 'Сумма инвестиций, ежемесячно',
              data: data2.map(row => row.count),
              showLine: true,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: 'rgba(198, 217, 233, 0.5)',
                borderColor: 'grey',
                tickColor: 'transparent'
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              }
            }
          },
          animation: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: false
            },
          },
          elements: {
            line: {
              borderColor: 'rgba(0, 0, 222, 1)',
              borderWidth: '2',
            },
            point: {
              radius: '4',
              borderColor: 'rgba(0, 0, 222, 1)',
              borderWidth: '2',
              pointBackgroundColor: 'rgba(240, 244, 248, 1)',
            }
          }
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
  const data2 = createArr2();
  createChart(data, data2);
};

renderChart();
