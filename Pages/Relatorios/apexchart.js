// DATA CAROUSEL
var util = {
  qs(sel, ctx){ 
    return (ctx || document).querySelector(sel);
  },
  qsa(sel, ctx){
    return Array.from((ctx || document).querySelectorAll(sel));
  }
};

class DateCarousel {
  constructor(el) {
    this.element = el;
    this.prevButton = util.qs(".date-carousel-prev", el);
    this.input = util.qs(".date-carousel-input",el);
    this.nextButton = util.qs(".date-carousel-next",el);
    this.input.valueAsDate = new Date();
    this.prevButton.addEventListener("click",this.prev.bind(this));
    this.nextButton.addEventListener("click",this.next.bind(this));
  }
  
  prev(){
    this.input.stepDown();
  }
  
  next() {
    this.input.stepUp();
  }  
}
util.qsa('.date-carousel').forEach(function(el){ new DateCarousel(el) });

//pegando a troca de data do carousel  

document.getElementById("dataprev").addEventListener("click", charts);
document.getElementById("datanext").addEventListener("click", charts);



var mes;
var ano;



function datanext() {
  let data = document.getElementById("datacarousel").value;
  let dataString = data.split('-') // Retornará ['09', '2022']
  mes = dataString[1]
  ano = dataString[0]
  }


//id firebase
const iduser = window.localStorage.getItem('id');

//gets

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


//graficos




function charts(){

  datanext();

  // gráfico 1 (linha) - saída
  var fahrenheit = getWithIndex("http://localhost:3001/chartsaida?id_user="+iduser+"&mes="+mes+"&ano="+ano)


  let values_operation = [];
  let date_operations = [];

var valores_operacoes_enter = fahrenheit_enter.map(function(elem){
  values_operation_enter.push(elem.preco_operation.toFixed())
});


  var data_operacoes = fahrenheit.map(function(elem){
      // console.log((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
      date_operations.push((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
  });

  var valores_operacoes = fahrenheit.map(function(elem){
      values_operation.push(elem.preco_operation)
  });

  // gráfico 3 (linha) - entrada
  var fahrenheit_enter = getWithIndex("http://localhost:3001/chartentrada?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  // console.log(fahrenheit_enter)

  let values_operation_enter = [];
  let date_operations_enter = [];

  var data_operacoes_enter = fahrenheit_enter.map(function(elem){
    // console.log((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
    date_operations_enter.push((elem.datas_saida).split("T")[0].split("-").reverse().join("/"));
  });

  var valores_operacoes_enter = fahrenheit_enter.map(function(elem){
    values_operation_enter.push(elem.preco_operation.toFixed())
  });

  // gráfico 2 (pizza) - saída
  var pizza_exit = getWithIndex("http://localhost:3001/chartcategorysaida?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  // console.log(pizza_exit)

  let values_operation_pizza_exit = [];
  let category_operations_pizza_exit = [];

  var categoria_operacoes_pizza_exit = pizza_exit.map(function(elem){
    category_operations_pizza_exit.push((elem.category));
  });

  var valores_operacoes_pizza_exit = pizza_exit.map(function(elem){
    values_operation_pizza_exit.push(elem.qtd)
  });

  // gráfico 4 (pizza) - entrada
  var pizza_enter = getWithIndex("http://localhost:3001/chartcategoryentrada?id_user="+iduser+"&mes="+mes+"&ano="+ano)
  // console.log(pizza_enter)

  let values_operation_pizza_enter = [];
  let category_operations_pizza_enter = [];

  var categoria_operacoes_pizza_enter = pizza_enter.map(function(elem){
    category_operations_pizza_enter.push((elem.category));
  });

  var valores_operacoes_pizza_enter = pizza_enter.map(function(elem){
    values_operation_pizza_enter.push(elem.qtd)
  });

  var options = {
    series: [{
    name: "Gasto",
    data: values_operation
  }],
      chart: {
      // height: 400,
      // width: 600,
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
    series: values_operation_pizza_exit,
    chart: {
    width: 380,
    type: 'pie',
  },
  labels: category_operations_pizza_exit,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        // height: 400,
        // width: 600,
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

  var chart = new ApexCharts(document.querySelector("#spark1"), options);
  var chart2 = new ApexCharts(document.querySelector("#spark2"), options2);
  chart.render();
  chart2.render();

  // mais gráficos

  var options3 = {
      series: [{
      name: "Entrada",
      data: values_operation_enter
  }],
      chart: {
      // height: 400,
      // width: 600,
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
      text: 'Entradas por dia',
      align: 'left'
  },
  grid: {
      row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
      },
  },
  xaxis: {
      categories: date_operations_enter,
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

  var options4 = {
    series: values_operation_pizza_enter,
    chart: {
    width: 380,
    type: 'pie',
  },
  labels: category_operations_pizza_enter,
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        // height: 400,
        // width: 600,
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

  var chart3 = new ApexCharts(document.querySelector("#spark3"), options3);
  var chart4 = new ApexCharts(document.querySelector("#spark4"), options4);
  chart3.render();
  chart4.render();


}


charts();