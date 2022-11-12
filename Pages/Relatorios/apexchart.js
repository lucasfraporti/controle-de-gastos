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
        height: 500,
        width: 700,
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

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();