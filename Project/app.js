//Declaring the variables for the charts
let data;
let chart;
let chart02;
let chart03;
let chart04;
let chart05;
let chart06;

function preload() {
    //Pre-loading in the CSV data from the data folder
    data = loadTable('data/AllYearsCurrentFullDrivingLicense.csv', 'csv', 'header' );
    data2 = loadTable('data/CurrentFullDrivingLicences.csv', 'csv', 'header');
    data3 = loadTable('data/StudentsLeinsterDublin.csv', 'csv', 'header');
    data4 = loadTable('data/total-confirmed-deaths-of-covid-19-per-million-people-vs-gdp-per-capita.csv', 'csv', 'header');
    data5 = loadTable('data/top20SpotifySongs2019.csv', 'csv', 'header');
    
}

function setup() {
    createCanvas(1900, 1300);
    background(100,100,100);
    noLoop();
    /*Initializing the variables declared above^, Creating new objects
    and passing properties into the constructor */
    chart = new BarChart(400,400, "hello", 250,500, data2, "Age Group", "Total");
    chart02 = new StackedBarChart(400,400, "Hello", 850, 500, data, "Year", "Total");
    chart03 = new HorizontalBarChart(400, 400, "Hello", 250, 1200, data5, "Track_Name", "Beats_Per_Minute");
    chart04 = new StackedHorizontalBarChart(400, 400, "Hello", 850, 1200, data, "Year", "Total");
    chart05 = new ScatterplotChart(400,400, "Hello", 1450,1200, data4, "dpm", "GDP_Capita");
    chart06 = new ScatterplotChart(400,400, "Hello", 1450,500, data5, "Speechiness", "Liveness", "Artist_Name");
}


function draw() {
    //Calling the render method for each chart to render the charts
    chart.render();
    chart02.render();
    chart03.render();
    chart04.render();
    chart05.render();
    chart06.render();
}