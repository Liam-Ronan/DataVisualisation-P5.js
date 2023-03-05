let data;
let chart;
let chart02;

function preload() {
    data = loadTable('data/CurrentFullDrivingLicences.csv', 'csv', 'header' );
}

function setup() {
    createCanvas(1000, 1000);
    background(0);
    noLoop()
    //Testing 
    // pixelDensity();
    chart = new BarChart(300,300, "hello", 100,350, data, "Age Group", "Total");
}

function draw() {
    chart.render();
}