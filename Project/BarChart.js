
class BarChart {
    //Passing values to the constructor as class properties - Certain values user configurable
    constructor(_chartWidth, _chartHeight, _chartTitle, _chartYLabel, _chartXLabel, _posX, _posY, _data, _xValueText, _yValue) {
        this.chartWidth = _chartWidth;
        this.chartHeight = _chartHeight;
        this.chartTitle = _chartTitle;
        this.chartYLabel = _chartYLabel;
        this.chartXLabel = _chartXLabel;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.yValue = _yValue;

        this.numTicks = 10;
        this.nearestRounded = 100000;
        //Calling the calculateMax method to calculate the max number
        this.maxNum = this.calculateMax();
        this.margin = 10;
        this.gap = 12;
        this.ellipseHeight = 5

        //Getting all rows of data2, equaling to 9
        this.barNumber = this.data.getRowCount();
        //calculating the leftover width
        this.remainingWidth = this.chartWidth - (this.margin * 2) - ((this.barNumber - 1) * this.gap);
        this.barWidth = this.remainingWidth / this.barNumber;
        this.barSpacing = this.barWidth + this.gap;

        //Getting the values for the X-axis
        this.xValueText = this.data.getColumn(_xValueText);

    }

    render() {
        push();
            //Moving the starting co-ordinates to the posX & posY properties passed into the constructor
            translate(this.posX, this.posY);
            this.drawChartTitle();
            //Calling drawYLabel method to write the text on the outside of the Y-Axis
            this.drawYLabel();
            //Calling drawXLabel method to write the text on the Bottom of the X-Axis
            //Calling various methods
            this.drawXLabel();  
            this.drawXAxis();
            this.drawYAxis();
            this.drawBars();
        pop();
    }

    //Drawing the chart title with the string that was passed into the constructor
    drawChartTitle() {
        noStroke();
        textSize(18);
        fill(255);
        textAlign(CENTER, CENTER);
        text(this.chartTitle, this.chartWidth / 2 - this.margin, -this.chartHeight - (this.margin * 6))
    }

    //Drawing the Y-Axis label
    drawYLabel() {
        push()
            translate(-this.margin * 9 - 20, -this.chartHeight / 2);
            textSize(18);
            fill(255)
            textAlign(CENTER, CENTER)
            rotate(PI / 2);
            noStroke();
            fill(255)
            text(this.chartYLabel, 0, 0)
        pop()
    }

    //Drawing the X-Axis label
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
        push()  
            translate(this.margin, 0);
            //Looping through the array and getting the value for each ie: years
            for(let x = 0; x < this.xValueText.length; x++) {
                let val = this.xValueText[x];

                push()
                    translate(x * this.barSpacing + (this.barWidth / 2), 10);
                    rotate(45);
                    fill(255);
                    noStroke();
                    textSize(15);
                    textAlign(LEFT, TOP);
                    text(val, 0, 0);
                pop();
                          
            }
        pop()
    }

    drawYAxis() {
        //Y-axis Line
        stroke(255)
        line(0,0,0,-this.chartHeight);

        for(let y = 0; y < this.numTicks + 1; y++) {
            let tickSpace = -this.chartHeight / this.numTicks;
            stroke(255)
            line(0, tickSpace * y, -10, tickSpace * y);

            //Drawing horizontal grid lines
            stroke(50)
            line(0, tickSpace * y, this.chartWidth, tickSpace * y); 

            //text on ticks/ space between each tick
            //Making the number fixed - dividing num ticks from the max num which was calculated in the calculateMax() method
            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            noStroke();
            fill(255);
            textSize(15);
            textAlign(RIGHT, CENTER)
            text(y * unitSpace, -20, tickSpace*y);
        }
    }

    drawBars() {

        push();
            translate(this.margin, 0);
            for(let x=0; x <  this.barNumber; x++) {
                //Using the colours array
                fill(colours[x % colours.length]);
                //Creating variables for getting specific values from the array
                let val = int(-this.data.rows[x].obj[this.yValue])
                let label = this.data.rows[x].obj[this.yValue];
                console.log(label)
                //Drawing the bars - spaced evenly, at 0, using the assigned bar width & scaling the bars to their values
                rect(x * this.barSpacing, 0, this.barWidth, this.scaler(val));

                //Adding ellipses to the bars for 3D effect
                ellipseMode(CENTER)
                stroke(50)
                //drawing ellipses - spaced evenly like above, scaling the ellipses to the top of each bar, width same as the bar, ellipse height was assigned in the constructor
                ellipse(x * this.barSpacing + (this.barWidth / 2), this.scaler(val) + (-this.barWidth/this.barSpacing), this.barWidth, this.ellipseHeight);

                //Putting the total values above each bar
                fill(255)
                textAlign(CENTER, CENTER);
                textSize(12)
                text(label, x * this.barSpacing + (this.barWidth / 2), this.scaler(val) + -20);
                noStroke();
            
            }
        pop();
        
    }


    calculateMax() {
        // console.log(data.rows[0].obj[this.yValue]);
        // console.log(data.getRowCount());

        //Looping through all rows, checking if this.yValue(assigned above) is greater than the max variable set below, if it is assign max to this.yValue
        let max = 0;
        for(let x = 0; x < this.data.getRowCount(); x++) {
            if(int(this.data.rows[x].obj[this.yValue]) > max) {
                max = int(this.data.rows[x].obj[this.yValue]);
                console.log(max);
            }
        }
        
        //Making sure that max is always less than totalNum
        //Using modulo to always equal the number to be even and rounding the number to nearest rounded assigned above.
        let TotalNum = 1000000;
        for(let x = max; x < TotalNum; x++) {
            if(x % this.numTicks==0 && x % this.nearestRounded==0) {
                max = x;
                break;
            }
        }
        return max;
    }

    // Scaling bars to always be inside the chart height - dividing chartHeight by maxNum, returning the value created from dividing scaleValue by the value passed in
    scaler(_num) {
        let scaleValue = this.maxNum / this.chartHeight;
        return _num / scaleValue;
    }

}