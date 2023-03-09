
class ScatterplotChart {
    //Passing values to the constructor as class properties - Certain values user configurable
    constructor(_chartWidth, _chartHeight, _chartTitle, _chartYLabel, _chartXLabel, _posX, _posY, _data, _yValue, _xValue, _showLabels) {
        this.chartWidth = _chartWidth;
        this.chartHeight = _chartHeight;
        this.chartTitle = _chartTitle;
        this.chartYLabel = _chartYLabel;
        this.chartXLabel = _chartXLabel;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.showLabels = _showLabels;
        
        //Calling a calculate method to calculate total of each column
        this.maxXNum = this.calculateXYNum(this.xValue);
        this.maxYNum = this.calculateXYNum(this.yValue);
       
        //initializing Chart properties
        this.numTicks = 10;
        this.margin = 10;
        this.gap = 7;
        this.pointNumber = this.data.getRowCount();
        this.pointRemainingWidth = this.chartWidth - (this.margin * 2) - (this.pointNumber - 1) * this.gap;
        this.pointWidth = this.pointRemainingWidth / this.pointNumber;
        this.pointSpacing = this.pointWidth + this.gap;


        // for(let i = 0; i < this.data.getRowCount(); i++) {
        //     console.log(this.data.rows[i].obj[this.showLabels])
        // }
    }

    //Render method translates to the positions assigned with posX and posY - calls other methods
    render() {
        push();
            translate(this.posX, this.posY);
            this.drawChartTitle();
            this.drawChartTitle();
            //Calling drawYLabel method to write the text on the outside of the Y-Axis
            this.drawYLabel();
            //Calling drawXLabel method to write the text on the Bottom of the X-Axis
            this.drawXLabel(); 
            this.drawXAxis();
            this.drawYAxis();
            this.drawPoints();
        pop();
    }

    drawChartTitle() {
        noStroke();
        textSize(18);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.chartTitle, this.chartWidth / 2 - this.margin, -this.chartHeight - (this.margin * 6))
    }

    drawYLabel() {
        push()
            translate(-this.margin * 7 - 20, -this.chartHeight / 2);
            textSize(18);
            fill(255)
            textAlign(CENTER, CENTER)
            rotate(PI / 2);
            noStroke();
            fill(255)
            text(this.chartYLabel, 0, 0)
        pop()
    }

    drawXLabel() {
        noStroke();
        textSize(18);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.chartXLabel, this.chartWidth / 2 - this.margin, 110)
    }

    drawXAxis() {
        //X-axis Line
        stroke(255);
        line(0, 0, this.chartWidth, 0);

        for(let x = 0; x < this.numTicks + 1; x++) {
            let xTickSpace = this.chartWidth / this.numTicks;
            stroke(255);
            line(xTickSpace * x, 0, xTickSpace * x, 10);

            //Drawing horizontal lines across the chart
            stroke(50)
            line(xTickSpace * x, 0, xTickSpace * x, -this.chartHeight);

            //Calculating the number each tick will go across as, aligning text, sizing text etc.
            let unitSpace = (this.maxXNum / this.numTicks).toFixed();
            noStroke()
            fill(255)
            textSize(12)
            textAlign(CENTER, CENTER)
            text(x * unitSpace, xTickSpace * x, 25);
            
        }
            
    }

    drawYAxis() {
        //Y-axis line
        stroke(255);
        line(0,0,0,-this.chartHeight)

        for(let y = 0; y < this.numTicks + 1; y++) {
            let yTickSpace = -this.chartHeight / this.numTicks;
            stroke(255)
            line(0, yTickSpace * y, -10, yTickSpace * y)

            //Drawing Vertical grid lines
            stroke(50)
            line(0, yTickSpace * y, this.chartWidth, yTickSpace * y); 

            //Converting the numbers to be fixed numbers, aligning text, sizing text etc.
            let unitSpace = (this.maxYNum / this.numTicks).toFixed();
            noStroke();
            fill(255);
            textSize(12)
            textAlign(RIGHT, CENTER)
            text(y * unitSpace, -20, yTickSpace * y)
            
        }
    }

    //Scaling the ellipses on the X-axis
    scaleXData(_num) {
        return map(_num, 0, this.maxXNum,0,this.chartWidth);
    }

    //Scaling the ellipses on the Y-axis
    scaleYData(_num) {
        return map(_num, 0, this.maxYNum,0,-this.chartHeight);
    }

    //Method to draw ellipses
    drawPoints() {
        translate(0,0);

        //Looping through all the rows of data
        for(let i = 0; i < this.pointNumber; i++) {
            fill(colours[i % colours.length]);
            /* Calling the scale method, specifying the data that will be passed, and
            returns a map as the X & Y co-ordinates*/
            ellipse(this.scaleXData(this.data.rows[i].obj[this.xValue]), this.scaleYData(this.data.rows[i].obj[this.yValue]), this.pointWidth, this.pointWidth);

            push()
                fill(255);
                textSize(8);
                textAlign(CENTER, CENTER);
                translate(this.scaleXData(this.data.rows[i].obj[this.xValue]) - 10, this.scaleYData(this.data.rows[i].obj[this.yValue]));
                text(this.data.rows[i].obj[this.showLabels], 10, -15);
            pop()
            
        }
    }

    /* Method to calculate the total number from each dataset(_xValue, _yValue) that was passed in
    as a parameter in the constructor. Returns max value for each^ */
    calculateXYNum(_num) {
        let max = Math.max(...this.data.getColumn(_num));
        console.log(max)

        return max;
    }

}