
class StackedHorizontalBarChart {
    constructor(_chartWidth, _chartHeight, _chartTitle, _chartYLabel, _chartXLabel, _posX, _posY, _data,_yValueText,  _stackOne, _stackTwo, _stackThree, _stackFour) {
        this.chartWidth = _chartWidth;
        this.chartHeight = _chartHeight;
        this.chartTitle = _chartTitle;
        this.chartYLabel = _chartYLabel;
        this.chartXLabel = _chartXLabel;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.stackOne = _stackOne;
        this.stackTwo = _stackTwo;
        this.stackThree = _stackThree;
        this.stackFour = _stackFour;

        this.ellipseHeight = 5
        this.numTicks = 10;
        this.nearestRounded = 10;
        this.maxNum = this.calculateMax();
        this.margin = 10;
        this.gap = 12;

        this.barNumber = this.data.getRowCount();
        this.remainingWidth = this.chartHeight - (this.margin * 2) - ((this.barNumber - 1) * this.gap);
        this.barWidth = this.remainingWidth / this.barNumber;
        this.barSpacing = this.barWidth + this.gap;

        this.yValueText = this.data.getColumn(_yValueText);
    }

    render() {
        push() 
            translate(this.posX, this.posY)
            this.drawChartTitle();
            //Calling drawYLabel method to write the text on the outside of the Y-Axis
            this.drawYLabel();
            //Calling drawXLabel method to write the text on the Bottom of the X-Axis
            this.drawXLabel();  
            this.drawLabels();
            this.drawXAxis();
            this.drawYAxis();
            this.drawBars();
        pop()
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
            translate(-this.margin * 18 - 20, -this.chartHeight / 2);
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

    drawLabels() {

        fill(colours[0]);
        textSize(12)
        textAlign(LEFT, CENTER)
        noStroke();
        rect(0, 50, 15,10);
        fill(255)
        text(this.data.columns[2], 20, 57);
        
        fill(colours[1]);
        noStroke();
        rect(100, 50, 15,10);
        noFill();
        fill(255);
        text(this.data.columns[1], 120, 57);
      
        fill(colours[2]);
        noStroke();
        rect(240, 50, 15,10);
        noFill();
        fill(255);
        text(this.data.columns[4], 260, 57);

        fill(colours[3]);
        noStroke();
        rect(390, 50, 15,10);
        noFill();
        fill(255);
        text(this.data.columns[3], 410, 57);
    }

    drawXAxis() {
        stroke(255);
        line(0, 0, this.chartWidth, 0);

        push()  
            for(let x = 0; x < this.numTicks + 1; x++) {
                let xSpace = this.chartWidth / this.numTicks;
                stroke(255)
                line(xSpace * x, 0, xSpace * x, 10);

                stroke(50)
                line(xSpace * x, 0, xSpace * x, -this.chartHeight);

              
                let unitSpace = (this.maxNum / this.numTicks).toFixed();
                noStroke()
                fill(255)
                textSize(10)
                textAlign(CENTER, CENTER)
                text(x * unitSpace, xSpace * x, 25);
               
            }
        pop();

    }

    drawYAxis() {
        stroke(255);
        line(0,0,0,-this.chartHeight);

        let reversed = this.yValueText.reverse();
        for(let y = 0; y < reversed.length; y++) {
            let ySpace = -this.chartHeight / this.barNumber;
            let val = reversed[y];
            // console.log(val)


            //text on ticks/ space between each tick
            noStroke();
            fill(255);
            textSize(15);
            textAlign(RIGHT, CENTER)
            text(val, -20, ySpace * (y + 0.8));
        }
    }

    drawBars() {
        push()
            translate(0, -this.chartHeight);
            rotate(1.57)
            
            for(let x=0; x <  this.barNumber; x++) {
                /* console.log(genders); */
                fill(colours[0]);
                //Drawing first stack
                let firstStackYScale = -this.scaler(this.data.rows[x].obj[this.stackOne])
                let stackXPos = x * this.barSpacing
                rect(stackXPos, 0, this.barWidth, firstStackYScale);
                
                this.drawStacks();
                
            }
        pop()
    }

    drawStacks() {
        for(let i = 0; i < this.barNumber; i++) {

            /////////////////////////////////////////////////////////
            //Setting up variables to make this section of code more readable.
            //Stack positions and scale values
            let secondStackYPos = -this.scaler(this.data.rows[i].obj[this.stackOne]);
            let secondStackYScale = -this.scaler(this.data.rows[i].obj[this.stackTwo]);

            let thirdStackYPos = secondStackYPos + secondStackYScale;
            let thirdStackYScale = -this.scaler(this.data.rows[i].obj[this.stackThree]);

            let stackXPos = i * this.barSpacing;

            /* Adding together previous stack positions and scales to achieve the fourth stack */
            let fourthStackYPos = secondStackYPos + secondStackYScale + thirdStackYScale
            let fourthStackYScale = -this.scaler(this.data.rows[i].obj[this.stackFour])
            //////////////////////////////////////////////////////////


            /////////////////////////////////////////////////////////
            //Drawing the actual rectangles at the assigned positions.
            //Using the colours array declared and initialized in the app.js file
            fill(colours[1]);
            rect(stackXPos, secondStackYPos, this.barWidth, secondStackYScale);
           
            fill(colours[2]);
            rect(stackXPos, thirdStackYPos, this.barWidth, thirdStackYScale);

            fill(colours[3]);
            rect(stackXPos, fourthStackYPos , this.barWidth, fourthStackYScale);
            /////////////////////////////////////////////////////////

            
            /////////////////////////////////////////////////////////
            //Drawing the ellipses on the end of each stack to represent the stacked design
            //Using the variables created above to scale the ellipses to the Y co-ordinates
            fill(colours[0]);
            stroke(50)
            ellipse(stackXPos + (this.barWidth / 2), secondStackYPos, this.barWidth, this.ellipseHeight);

            fill(colours[1]);
            stroke(50)
            ellipse(stackXPos + (this.barWidth / 2), thirdStackYPos, this.barWidth, this.ellipseHeight);

            fill(colours[2]);
            stroke(50)
            ellipse(stackXPos + (this.barWidth / 2), thirdStackYPos + thirdStackYScale, this.barWidth, this.ellipseHeight);

            fill(colours[3]);
            stroke(50)
            ellipse(stackXPos + (this.barWidth / 2), fourthStackYPos + fourthStackYScale, this.barWidth, this.ellipseHeight);
            //////////////////////////////////////////////////////////
        }
    }

    calculateMax() {
        let max = 0;

        for(let x = 0; x < this.data.getRowCount(); x++) {
            if(int(this.data.rows[x].obj.Global) > max) {
                max = int(this.data.rows[x].obj.Global);
                console.log(max);
            }
        }

        let totalNum = 1000000;
        for(let x = max; x < totalNum; x++) {
            if(x % this.numTicks==0 && x % this.nearestRounded==0) {
                max = x;
                break;
            }
        }
        return max;
    }

    scaler(_num) {
        let scaleValue = this.maxNum / this.chartWidth;
        return _num / scaleValue;
    }
    
}