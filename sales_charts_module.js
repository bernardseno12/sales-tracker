export default class Graph{
    constructor(labels, itemData) {
        this.labels = labels;
        this.itemData = itemData;
    }
    
    drawGraph(canvas, backgroundColor1, chartType) {
        if (!(canvas instanceof HTMLCanvasElement)) {
            console.error('Invalid canvas element provided.');
            return null;
        }

        const data = {
            labels: this.labels,
            datasets: [{
                data: this.itemData,
                backgroundColor: [backgroundColor1, 'red', 'blue', 'orange'],
            }]
        };

        const config = {
            type: chartType,
            data: data,
        };

        const chart = new Chart(canvas, config);
        return chart;
    }
}