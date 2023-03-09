
class HorizontalBarChart {
    constructor(_chartWidth, _chartHeight, _chartTitle, _chartYLabel, _chartXLabel, _posX, _posY, _data,_yValueText, _xValue, _label) {
        this.chartWidth = _chartWidth;
        this.chartHeight = _chartHeight;
        this.chartTitle = _chartTitle;
        this.chartYLabel = _chartYLabel;
        this.chartXLabel = _chartXLabel;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.xValue = _xValue;
        this.label = _label;

        this.numTicks = 10;
        this.nearestRounded = 100;
        this.maxNum = this.calculateMax();
        this.margin = 10;
        this.gap = 12;
        this.ellipseHeight = 5

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
            this.drawChartTitle();
             //Calling drawYLabel method to write the text on the outside of the Y-Axis
             this.drawYLabel();
             //Calling drawXLabel method to write the text on the Bottom of the X-Axis
             this.drawXLabel();  
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
            translate(-this.margin * 15 - 40, -this.chartHeight / 2);
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
        stroke(255);
        line(0, 0, this.chartWidth, 0);

        for(let x = 0; x < this.numTicks + 1; x++) {
            let xSpace = this.chartWidth / this.numTicks;
            stroke(255)
            line(xSpace * x, 0, xSpace * x, 10);

            stroke(50)
            line(xSpace * x, 0, xSpace * x, -this.chartHeight);

            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            noStroke()
            fill(255)
            textSize(12)
            textAlign(CENTER, CENTER)
            text(x * unitSpace, xSpace * x, 25);  

        }

    }

    drawYAxis() {
        stroke(255);
        line(0,0,0,-this.chartHeight);

        let reversed = this.yValueText.reverse();
        for(let y = 0; y < reversed.length; y++) {
            let ySpace = -this.chartHeight / this.barNumber;
            let val = reversed[y];

            //text on ticks/ space between each tick
            noStroke();
            fill(255);
            textSize(12);
            textAlign(RIGHT, CENTER)
            text(val, -15, ySpace * (y + 0.85));
        }
    }

    drawBars() {
        push()
            translate(0, -this.chartHeight);
            rotate(1.57)
            for(let x = 0; x < this.barNumber; x++) {
                let value = int(-this.data.rows[x].obj[this.xValue]);
                let label = this.data.rows[x].obj[this.label];
                // console.log(label)
                fill(colours[x % colours.length]);
                rect(x * this.barSpacing, 0, this.barWidth, this.scaler(value));

                ellipseMode(CENTER)
                stroke(50)
                ellipse(x * this.barSpacing + (this.barWidth / 2), this.scaler(value) + (-this.barWidth/this.barSpacing), this.barWidth, this.ellipseHeight);

                push()
                translate(x * this.barSpacing + (this.barWidth / 2), this.scaler(value)/2)
                    fill(0)
                    rotate(-45.55)
                    textAlign(CENTER, CENTER);
                    textSize(12)
                    text(label, 0,0);
                    noStroke()
                pop()
            }
        pop()
    }

    calculateMax() {
        // console.log(data.rows[0].obj[this.xValue]);

        let max = 0;
        for(let x = 0; x < this.data.getRowCount(); x++) {
            if(int(this.data.rows[x].obj[this.xValue]) > max) {
                max = int(this.data.rows[x].obj[this.xValue]);
                console.log(max);
            }
        }
        
        let TotalNum = 1000;
        for(let x = max; x < TotalNum; x++) {
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