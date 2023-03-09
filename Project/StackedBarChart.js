
class StackedBarChart {
    constructor(_chartWidth, _chartHeight, _chartTitle, _chartYLabel, _chartXLabel, _posX, _posY, _data,_xValueText, _stackOne, _stackTwo) {
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

        this.ellipseHeight = 5
        this.numTicks = 10;
        this.nearestRounded = 100000;
        this.maxNum = this.calculateMax();
        this.margin = 10;
        this.gap = 12;

        this.barNumber = this.data.getRowCount();
        this.remainingWidth = this.chartWidth - (this.margin * 2) - ((this.barNumber - 1) * this.gap);
        this.barWidth = this.remainingWidth / this.barNumber;
        this.barSpacing = this.barWidth + this.gap;

        this.xValueText = this.data.getColumn(_xValueText);

    }

    render() {
        noFill();
        stroke(255);
        
        push();
            translate(this.posX, this.posY);
            this.drawChartTitle()
            //Calling drawYLabel method to write the text on the outside of the Y-Axis
            this.drawYLabel();
            //Calling drawXLabel method to write the text on the Bottom of the X-Axis
            this.drawXLabel(); 
            this.drawLabels()
            this.drawStackTotal();   
            this.drawXAxis();
            this.drawYAxis();
            this.drawBars();
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
            translate(-this.margin * 9 - 20, -this.chartHeight / 2);
            textSize(18);
            textAlign(CENTER, CENTER)
            fill(255)
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
        rect(this.chartWidth / 7 + (this.margin * 4), 65, 15,10);
        fill(255)
        text(this.data.columns[2], this.chartWidth / 7 + (this.margin * 6.5), 72);
        
        fill(colours[1]);
        noStroke();
        rect(this.chartWidth / 2 + (this.margin * 4), 65, 15,10);
        noFill();
        fill(255);
        text(this.data.columns[3], this.chartWidth / 4 + (this.margin * 16.5),  72);
    }

    drawStackTotal() {
        for(let i = 0; i < this.barNumber; i++) {
            let label = this.data.rows[i].obj.Total;

            push()
                translate(i * this.barSpacing + (this.barWidth / 2), -this.scaler(label) + -20)
                fill(255);
                rotate(-45);
                textAlign(LEFT, CENTER);
                textSize(12);
                noStroke()
                text(label, 0, 10);
            pop()
        }
    }

    drawBars() {

        push();
            translate(this.margin, 0);
            
            for(let x=0; x <  this.barNumber; x++) {
                /* console.log(genders); */
                fill(colours[0]);
                rect(x * this.barSpacing, 0, this.barWidth, -this.scaler(this.data.rows[x].obj[this.stackOne]));

                for(let i = 0; i < this.barNumber; i++) {
                    let secondStackYPos = -this.scaler(this.data.rows[i].obj[this.stackOne])
                    let secondStackYScale = -this.scaler(this.data.rows[i].obj[this.stackTwo])

                    fill(colours[1]);
                    rect(i * this.barSpacing, secondStackYPos, this.barWidth, secondStackYScale);

                    ellipseMode(CENTER)
                    stroke(50)
                    ellipse(i * this.barSpacing + (this.barWidth / 2), -this.scaler(this.data.rows[i].obj[this.stackTwo]) + -this.scaler(this.data.rows[i].obj[this.stackOne]) + (-this.barWidth/this.barSpacing), this.barWidth, this.ellipseHeight);

                    stroke(50)
                    ellipse(i * this.barSpacing + (this.barWidth / 2), -this.scaler(this.data.rows[i].obj[this.stackOne]) + (-this.barWidth/this.barSpacing), this.barWidth, this.ellipseHeight);

                }
                
            }
        pop();
        
    }

    drawXAxis() {
        //X-axis Line
        line(0, 0, this.chartWidth, 0);

        push();
            translate(this.margin, 0);
            
            for(let x = 0; x < this.xValueText.length; x++) {
                let val = this.xValueText[x];

                push()
                    translate(x * this.barSpacing + (this.barWidth / 2), 10);
                    rotate(45);
                    fill(255)
                    noStroke();
                    textSize(15)
                    textAlign(LEFT, TOP)
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

            stroke(50)
            line(0, ySpace * y, this.chartWidth, ySpace * y);
            

            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            noStroke();
            fill(255);
            textSize(15);
            textAlign(RIGHT, CENTER)
            text(y * unitSpace, -20, ySpace*y);

        }
    }

    calculateMax() {

        let max = 0;
        for(let x = 0; x < this.data.getRowCount(); x++) {
            if(int(this.data.rows[x].obj.Total) > max) {
                max = int(this.data.rows[x].obj.Total);
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

    scaler(_num) {
        let scaleValue = this.maxNum / this.chartHeight;
        return _num / scaleValue;
    }

}