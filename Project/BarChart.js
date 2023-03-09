
class BarChart {
    constructor(_chartWidth, _chartHeight, _name, _posX, _posY, _data,_xValueText, _yValue) {
        this.chartWidth = _chartWidth;
        this.chartHeight = _chartHeight;
        this.name = _name;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.yValue = _yValue;

        this.numTicks = 10;
        this.nearestRounded = 100000;
        this.maxNum = this.calculateMax();
        this.margin = 10;
        this.gap = 12;
        this.ellipseHeight = 5

        this.barNumber = this.data.getRowCount();
        this.remainingWidth = this.chartWidth - (this.margin * 2) - ((this.barNumber - 1) * this.gap);
        this.barWidth = this.remainingWidth / this.barNumber;
        this.barSpacing = this.barWidth + this.gap;

        this.xValueText = this.data.getColumn(_xValueText);

    }

    render() {
        push();
            translate(this.posX, this.posY);
            this.drawXAxis();
            this.drawYAxis();
            this.drawBars();
        pop();
    }

    drawXAxis() {
        //X-axis Line
        stroke(255);
        line(0, 0, this.chartWidth, 0);
        push()  
            translate(this.margin, 0);
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

        for(let y = 1; y < this.numTicks + 1; y++) {
            let ySpace = -this.chartHeight / this.numTicks;
            stroke(255)
            line(0, ySpace * y, -10, ySpace * y);

            //Drawing horizontal grid lines
            stroke(175)
            line(0, ySpace * y, this.chartWidth, ySpace * y); 

            //text on ticks/ space between each tick
            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            noStroke();
            fill(255);
            textSize(15);
            textAlign(RIGHT, CENTER)
            text(y * unitSpace, -20, ySpace*y);
        }
    }

    drawBars() {

        push();
            translate(this.margin, 0);
            for(let x=0; x <  this.barNumber; x++) {
                let val = int(-this.data.rows[x].obj[this.yValue])
                rect(x * this.barSpacing, 0, this.barWidth, this.scaler(val));

                ellipseMode(CENTER)
                stroke(100)
                ellipse(x * this.barSpacing + (this.barWidth / 2), this.scaler(val) + (-this.barWidth/this.barSpacing), this.barWidth, this.ellipseHeight);
            }
        pop();
        
    }


    calculateMax() {
        // console.log(data.rows[0].obj[this.yValue]);
        // console.log(data.getRowCount());


        let max = 0;
        for(let x = 0; x < this.data.getRowCount(); x++) {
            if(int(this.data.rows[x].obj[this.yValue]) > max) {
                max = int(this.data.rows[x].obj[this.yValue]);
                // console.log(max);
            }
        }
        
        let TotalNum = 1000000;
        for(let x = max; x < TotalNum; x++) {
            if(x % this.numTicks==0 && x % this.nearestRounded==0) {
                max = x;
                break;
            }
        }
        return max;
    }

    // Scaling bars to always be inside the chart height - dividing chartHeight by maxNum, returning the passed _num divided by scale value
    scaler(_num) {
        let scaleValue = this.maxNum / this.chartHeight;
        return _num / scaleValue;
    }

}