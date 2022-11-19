function fazGet(url){
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

function getWithIndex(url){
    const data = fazGet(url);
    const entradas = JSON.parse(data);
    return entradas;
};

var fahrenheit = getWithIndex('http://localhost:3001/operations')

let values_operation = [];
let date_operations = [];

var data_operacoes = fahrenheit.map(function(elem){
    console.log((elem.data_operation).split("T")[0].split("-").reverse().join("/"));
    date_operations.push((elem.data_operation).split("T")[0].split("-").reverse().join("/"));
});

var valores_operacoes = fahrenheit.map(function(elem){
    values_operation.push(elem.preco_operation)
});


var options = {
        series: [{
        name: "Gasto",
        data: values_operation
    }],
        chart: {
        height: 400,
        width: 600,
        type: 'line',
        zoom: {
        enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: 'Gastos por dia',
        align: 'left'
    },
    grid: {
        row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
        },
    },
    xaxis: {
        categories: date_operations,
    },
    responsive: [
        {
          breakpoint: 1000,
          options: {
            plotOptions: {
              bar: {
                horizontal: false
              }
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    var options2 = {
      series: [44, 55, 13, 43, 22],
      chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 400,
          width: 600,
          type: 'line',
          zoom: {
          enabled: false
          }},
        legend: {
          position: 'bottom'
        }
      }
    }]
    };

var options3 = {
    series: [44, 55, 41, 17, 15],
    chart: {
    width: 380,
    type: 'donut',
    dropShadow: {
      enabled: true,
      color: '#111',
      top: -1,
      left: 3,
      blur: 3,
      opacity: 0.2
    }
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true
          }
        }
      }
    }
  },
  labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
  dataLabels: {
    dropShadow: {
      blur: 3,
      opacity: 0.8
    }
  },
  fill: {
  type: 'pattern',
    opacity: 1,
    pattern: {
      enabled: true,
      style: ['verticalLines', 'squares', 'horizontalLines', 'circles','slantedLines'],
    },
  },
  states: {
    hover: {
      filter: 'none'
    }
  },
  theme: {
    palette: 'palette2'
  },
  title: {
    text: "Favourite Movie Type"
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

    var chart = new ApexCharts(document.querySelector("#spark1"), options);
    var chart2 = new ApexCharts(document.querySelector("#spark2"), options2);
    var chart3 = new ApexCharts(document.querySelector("#spark3"), options3);
    chart.render();
    chart2.render();
    chart3.render();