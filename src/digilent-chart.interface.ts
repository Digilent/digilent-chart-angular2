export interface Chart {
    highlight(series: any, datapoint: any): any,
    unhighlight(series: any, datapoint: any): any,
    setData(data: any): any,
    setupGrid(): any,
    draw(): any,
    triggerRedrawOverlay(): any,
    width(): any,
    height(): any,
    offset(): any,
    pointOffset(paramObject: any): any,
    resize(): any,
    shutdown(): any,
    getData(): any,
    getAxes(): any,
    getPlaceholder(): any,
    getCanvas(): any,
    getPlotOffset(): any,
    getOptions(): any,
    getActiveXIndex(): any,
    setActiveXIndex(index: number): any,
    getActiveYIndices(): number[],
    setActiveYIndices(indexArray: number[]): any,
    getActiveYAxis(): number,
    setActiveYAxis(axisNum: number): any,
    getSecsPerDivArray(): number[],
    setSecsPerDivArray(secsPerDivArray: number[]): any,
    getVoltsPerDivArray(): number[],
    setVoltsPerDivArray(voltsPerDivArray: number[]): any,
    addCursor(cursorSettings: any): any,
    getCursors(): any,
    setCursor(cursor: any, options: any): any,
    setMultipleCursors(cursorArray: any[], optionsArray: any[]): any,
    removeCursor(cursorObjectToRemove: any): any,
    setTimelineRef(timelineChartRef: any): any,
    getTimelineRef(): any,
    getTimelineUpdate(): any,
    setTimelineUpdate(updateTimeline: boolean): any,
    updateTimelineCurtains(minMaxContainer: any): any,
    hooks: any,
    unbindMoveEvents(): any
}

export interface DataContainer {
    data: Array<number[]>,
    yaxis: number,
    lines: {
        show: boolean
    },
    points: {
        show: boolean
    },
    color?: string
}