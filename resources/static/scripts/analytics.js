const xmlHttp = new XMLHttpRequest();
const ctx = document.getElementById("chart").getContext("2d");
const options = {
    type: "line",
    data: {
        labels: [
            "60 Minutes ago",
            "54 Minutes ago",
            "48 Minutes ago",
            "42 Minutes ago",
            "36 Minutes ago",
            "30 Minutes ago",
            "24 Minutes ago",
            "18 Minutes ago",
            "12 Minutes ago",
            "6 Minutes ago",
            "Now"
        ],
        datasets: []
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
            yAxes: [{
                ticks: {
                    max: 1,
                    beginAtZero: true
                }
            }]
        },
        legend: legendOptions
    }
}
const chart = new Chart(ctx, options);
let inVersion = "none";

function getMax(data) {
    let max = 0;
    for (let i in data) {
        if (Math.ceil(Math.max.apply(Math, data[i].data) / timeTestRoundOn) * timeTestRoundOn > max)
            max = Math.ceil(Math.max.apply(Math, data[i].data) / timeTestRoundOn) * timeTestRoundOn;
    }
    return max;
}

function version(id) {
    document.getElementById("browserTitle").innerHTML = "Visits per version from " + id;
    document.getElementById("browserTitle").style.cursor = "pointer";
    Array.from(document.getElementsByClassName("tr")).forEach((list) => list.style.display = "none");
    document.getElementById(id).style.display = "inline-block";
    inVersion = id;
}

function browser() {
    document.getElementById("browserTitle").innerHTML = "Visits per browser";
    document.getElementById("browserTitle").style.cursor = "inherit";
    document.getElementById(inVersion).style.display = "none";
    Array.from(document.getElementsByClassName("tr")).forEach((list) => list.style.display = "inline-block");
    inVersion = "none";
}

function chartgen(data) {
    chart.ctx = document.getElementById("chart").getContext("2d");
    chart.data.datasets = data;
    chart.options.scales.yAxes[0].ticks.max = getMax(data);
    chart.update();
}

function request() {
    let data;
    xmlHttp.open("GET", "/analytics/data");
    xmlHttp.onload = () => {
        data = JSON.parse(xmlHttp.response);
        document.getElementById("memoryOut").innerHTML = data.memoryText + data.memoryProgress;
        document.getElementById("healthOut").innerHTML = data.errorProgress;
        document.getElementById("extraOut").innerHTML = data.extra;
        if (data.browser == "denied") {
            document.getElementById("browser").remove();
        } else {
            document.getElementById("browserOut").innerHTML = data.browser;
        }
        if (inVersion != "none")
            version(inVersion);
        chartgen(data.chartData);
    };
    xmlHttp.send(null);
}

setInterval(() => request(), interval);
request();