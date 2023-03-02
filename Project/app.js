let data;
let chart;

function preload() {
    data = loadTable('data/CurrentFullDrivingLicences.csv', 'csv', 'header' );
}

function setup() {
    createCanvas(800, 800);
    background(0);
    pixelDensity()
    chart = new BarChart(400,400, "hello", 250,550, data);
}

function draw() {
    chart.render();
}