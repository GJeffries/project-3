let MalePct = [];
let FemalePct = [];

for (let i = 0; i < maleResults.length; i++) {
    row = maleResults[i];
    MalePct.push(row.Obs_pct);
};

for (let i = 0; i < femaleResults.length; i++) {
    row = femaleResults[i];
    FemalePct.push(row.female_pct);
};

let trace1 = {
    y: MalePct,
    name: "Male",
    type: "box"
};

let trace2 = {
    y: FemalePct,
    name: "Female",
    type: "box"
};

let data = [trace1, trace2];

let layout = {
    title: 'Obesity(%) Distribution of Data by Gender (2016)',
    font: {
        size: 24,
    },
    xaxis: {
        title: 'Sex',
        
    },
    yaxis: {
        title: 'Obecity(%)',
        automargin: false,
    },
    autosize: true,
    width: 1600,
    height: 800,
    margin: {
        pad: 5,
    },
};

Plotly.newPlot('myDiv', data, layout, {responsive: true});