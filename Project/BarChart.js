
class BarChart {
    constructor(_chartWidth, _chartHeight, _name, _posX, _posY, _data) {
        this.chartWidth = _chartWidth;
        this.chartHeight = _chartHeight;
        this.name = _name;
        this.posX = _posX;
        this.posY = _posY;
        this.data = _data;
        this.numTicks = 10;
        this.nearestRounded = 100000;
        this.maxNum = this.calculateMax();
        this.margin = 10;
        this.gap = 15;
    }

    render() {
        noFill();
        stroke(255)
        
        push();
            translate(this.posX, this.posY);
            this.drawXAxis();
            this.drawYAxis();
            this.drawBars();
        pop();
    }

    drawBars() {
        let barNum = this.data.getRowCount();
        let remainingWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.gap);
        let barWidth = remainingWidth / barNum;
        let barSpacing = barWidth + this.gap;

        push();
        translate(this.margin, 0);
        for(let x=0; x < barNum; x++) {
            let val = int(-this.data.rows[x].obj.Total)
            rect(x * barSpacing, 0, barWidth, this.scaler(val));
        }
        pop();
        
    }

    drawXAxis() {
        //X-axis Line
        line(0, 0, this.chartWidth, 0);

        let barNum = this.data.getRowCount();
        let remainingWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.gap);
        let barWidth = remainingWidth / barNum;
        let barSpacing = barWidth + this.gap;

        push();
        translate(this.margin, 0);
        let labelArray = this.data.getColumn("Age Group");
        for(let x = 0; x < labelArray.length; x++) {
            let val = labelArray[x];
            fill(255)
            noStroke();
            textSize(6)
            textAlign(CENTER, TOP)
            text(val, x * barSpacing + (barWidth/2), 20);
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
            

            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            noStroke();
            fill(255);
            textSize(15);
            textAlign(RIGHT, CENTER)
            text(y * unitSpace, -20, ySpace*y);
        }
    }

    calculateMax() {
        console.log(data.rows[0].obj.Total);
        console.log(data.getRowCount());


        let max = 0;
        for(let x = 0; x < this.data.getRowCount(); x++) {
            if(int(this.data.rows[x].obj.Total) > max) {
                max = int(this.data.rows[x].obj.Total);
                console.log(max);
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

    scaler(_num) {
        let scaleValue = this.maxNum / this.chartHeight;
        return _num / scaleValue;
    }

}