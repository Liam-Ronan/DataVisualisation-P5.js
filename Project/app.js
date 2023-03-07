let data;
let chart;
let chart02;
let chart03;
let chart04;
let chart05;

function preload() {
    data = loadTable('data/AllYearsCurrentFullDrivingLicense.csv', 'csv', 'header' );
    data2 = loadTable('data/CurrentFullDrivingLicences.csv', 'csv', 'header');
}

function setup() {
    createCanvas(1800, 1200);
    background(100,100,100);
    noLoop()
    //Testing 
    // pixelDensity();
    chart = new BarChart(400,400, "hello", 100,450, data, "Year", "Total");
    chart02 = new StackedBarChart(400,400, "Hello", 700, 450, data, "Year", "Total");
    chart03 = new HorizontalBarChart(400, 400, "Hello", 100, 1000, data, "Year", "Total");
    chart04 = new StackedHorizontalBarChart(400, 400, "Hello", 700, 1000, data, "Year", "Total");
    chart05 = new ScatterplotChart(400,400, "Hello", 1250,750, data, "Year", "Total");
}

function draw() {
    chart.render();
    chart02.render();
    chart03.render();
    chart04.render();
    chart05.render();
}