//Declaring the variables for the charts
let data;
let colours;
let chart;
let chart02;
let chart03;
let chart04;
let chart05;
let chart06;

function preload() {
    //Pre-loading in the CSV data from the data folder
    data = loadTable('data/AllYearsCurrentFullDrivingLicense.csv', 'csv', 'header' );
    data2 = loadTable('data/CurrentFullDrivingLicences.csv', 'csv', 'header');;
    data3 = loadTable('data/total-confirmed-deaths-of-covid-19-per-million-people-vs-gdp-per-capita.csv', 'csv', 'header');
    data4 = loadTable('data/top20SpotifySongs2019.csv', 'csv', 'header');
    data5 = loadTable('data/console.csv', 'csv', 'header');
    data6 = loadTable('data/consoleTop10.csv', 'csv', 'header');
    
}

function setup() {
    createCanvas(2400, 1500);
    background(17,20,20);
    noLoop();
    //Creating a colours array from a colour palette generator
    colours = [color('#90B4A2'), color('#F0E394'), color('#F1AA66'), color('#DD6357')];
    /*Initializing the variables declared above^, Creating new objects
    and passing properties into the constructor */
    chart = new BarChart(400,400, "Total No. of people that held a full driving license in 2021", "Total Driving Licenses", "Age Group", 300,600, data2, "Age Group", "Total");
    chart02 = new StackedBarChart(400,400, "Males & Females - full driving license from years 2009 - 2021", "Total Driving Licenses", "Year", 1100, 600, data, "Year", "Male", "Female");
    chart03 = new HorizontalBarChart(400, 400, "Top 15 Spotify songs in 2019", "Songs", "Beats Per Minute", 300, 1300, data4, "Track_Name", "Beats_Per_Minute", "Artist_Name");
    chart04 = new StackedHorizontalBarChart(400, 400, "Top 10 consoles sold per million units around the world", "Consoles", "Sales Per Million", 1100, 1300, data6, "console", "Europe", "North_America", "Rest_of_World", "Japan");
    chart05 = new ScatterplotChart(400,400, "Total confirmed covid deaths per million VS GDP per Capita", "deaths Per Million", "GDP Per Capita", 1800,1300, data3, "dpm", "GDP_Capita", "Country");
    chart06 = new ScatterplotChart(400,400, "Top 30 console sales - Europe VS North America ", "European Console Sales", "North American Console Sales", 1800,600, data5, "Europe", "North_America", "console");
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