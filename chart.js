// const globalTaskArray = require('./index.js');

const dropdown = document.querySelector('.dropdown');
const select = dropdown.querySelector('.select');
const caret = dropdown.querySelector('.caret');
const menu = dropdown.querySelector('.menu');
const options = dropdown.querySelectorAll('.menu li');
const selected = dropdown.querySelector('.selected');

select.addEventListener('click', () => { // if the drop down menu is clicked then
  select.classList.toggle('select-clicked'); // the select-clicked class will be applied to the select class
  caret.classList.toggle('caret-rotate'); // the caret will be rotated which will be applied to the caret class
  menu.classList.toggle('menu-open'); // options will be displayed which will be applied to the menu class
});

options.forEach(option => { // for each option
  option.addEventListener('click', () => { // if an option is clicked
    selected.innerText = option.innerText; // swap the text of the already selected option with the newly clicked option
    select.classList.remove('select-clicked'); // reverts back to original styling
    caret.classList.remove('caret-rotate'); // reverts back to original caret
    menu.classList.remove('menu-open'); //  reverts back to closed menu (no options shown)

    options.forEach(opt => {
      opt.classList.remove('active');
    });
    option.classList.add('active');
  });
});

// setup for timeline chart
const data = {
  datasets: [{
    label: 'Task Timeline',
    data: [],
    backgroundColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 0.2)'
    ],
    borderColor: [
      'rgba(255, 26, 104, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)',
      'rgba(0, 0, 0, 1)'
    ],
    borderWidth: 1,
    borderSkipped: false,
    borderRadius: 12,
    barPercentage: 0.5
  }]
};

for(let i = 0; i<globalTaskArray.length; i++){
  data.datasets[0].data.push({
    x: [globalTaskArray[i].assignedDate, globalTaskArray[i].dueDate], 
    y: globalTaskArray[i].name
  });
};

const currentday = {
  id: 'currentday',
  afterDatasetsDraw(chart, args, pluginOptions){
    const {ctx, data, chartArea: {top, bottom, left, right}, scales: {x, y}} = chart;
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(1, 1, 122, 1)';
    ctx.setLineDash([6,6]);
    ctx.moveTo(x.getPixelForValue(new Date()), top);
    ctx.lineTo(x.getPixelForValue(new Date()), bottom);
    ctx.stroke();
    ctx.setLineDash([]);
  }
};

// config 
const config = {
  type: 'bar',
  data,
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        position: 'top',
        type: 'time',
        time: {
          unit: 'day'
        },
        min: '2023-12-01',
        max: '2023-12-31'
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  },
  plugins: [currentday]
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);

// Instantly assign Chart.js version
const chartVersion = document.getElementById('chartVersion');
chartVersion.innerText = Chart.version;