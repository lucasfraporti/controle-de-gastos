function fazGet(url){
    const request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
};

function getValores(url){
    const data = fazGet(url);
    const entradas = JSON.parse(data);
    return entradas[0].total_sum;
};


console.log(getValores("http://localhost:3001/get/profit"));

let abc = getValores("http://localhost:3001/get/profit")
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'c'],
        datasets: [{
            label: '# of Votes',
            data: [567, 233, 111, 111, 466, 454, abc],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});