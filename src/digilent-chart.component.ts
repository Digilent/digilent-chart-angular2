import { Component, Output, Input, EventEmitter } from '@angular/core';

//Interfaces
import { Chart, DataContainer } from './digilent-chart.interface';

//JS Files
import '../js/jquery1.8.3.min.js';
import '../js/jquery.flot.js';
import '../js/jquery.flot.axislabels.js';
import '../js/jquery.flot.canvas.js';
import '../js/jquery.flot.cursors.js';
import '../js/jquery.flot.resize.js';
import '../js/jquery.flot.symbol.js';
import '../js/jquery.flot.timelinechart.js';
import '../js/jquery.flot.tooltip.js';
import '../js/jquery.flot.zoompan.js';

declare var $: any;

@Component({
    selector: 'digilent-chart',
    template: `
        <div [id]="chartId"></div>
    `
})

export class DigilentChart {
    @Output() chartLoad: EventEmitter<any> = new EventEmitter();
    @Input() chartId: string;
    @Input() flotOptions: any;
    @Input() chartType: 'standard'|'log'|'semilogX'|'semilogY';
    public digilentChart: Chart;
    private initialChartLoad: boolean = true;

    constructor() { }

    ngAfterViewInit() {
        console.log('View Init');
        let plotArea = $('#' + this.chartId);
        plotArea.css({
            width: '100%',
            height: '100%'
        });
        if (this.digilentChart == undefined) {
            this.createChart();
        }
    }

    

    createChart(data?: DataContainer[]) {
        console.log('creating digilent chart under id: ' + this.chartId);
        data = data == undefined ? [] : data;
        if (this.chartId == undefined || this.flotOptions == undefined) {
            setTimeout(() => {
                console.log('trying to create chart again');
                this.createChart();
            }, 200);
            return;
        }
        this.digilentChart = $.plot("#" + this.chartId, data, this.flotOptions);
        this.setNearestPresetSecPerDivVal();
        if (this.initialChartLoad) {
            this.initialChartLoad = false;
            this.chartLoad.emit();
        }
    }

    setData(dataToDraw: DataContainer[], autoscale?: boolean) {
        if (autoscale) {
            this.createChart(dataToDraw);
            return;
        }
        this.digilentChart.setData(dataToDraw);
        this.digilentChart.setupGrid();
        this.digilentChart.draw();
        this.setNearestPresetSecPerDivVal();
    }

    refreshChart(dataToDraw?: DataContainer[]) {
        this.createChart(dataToDraw);
        this.setNearestPresetSecPerDivVal();
    }

    setNearestPresetSecPerDivVal() {
        let getAxes = this.digilentChart.getAxes();
        let newSecPerDivVal = (getAxes.xaxis.max - getAxes.xaxis.min) / 10;
        let secsPerDivArray = this.digilentChart.getSecsPerDivArray();
        let count = 0;
        while (secsPerDivArray[count] < newSecPerDivVal && count < secsPerDivArray.length) {
            count++;
        }
        this.digilentChart.setActiveXIndex(count);
    }
}
