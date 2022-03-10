// pull from api
d3.json('/api/get_male_data').then(function(data) {

    obesity_male_data = Object.values(data)
    
    // sort data to use for plot
    cntry_list = []
    Obs_pct_list = []
    for (i in obesity_male_data) {
      cntry_list.push(obesity_male_data[i]["cntry_name"])
      Obs_pct_list.push(obesity_male_data[i]["Obs_pct_sum"])
    }
    

// set traces
trace_list = []
for (i in obesity_male_data) {
trace_list.push({
  x: [cntry_list[i]],
  y: [Obs_pct_list[i]],
  name: cntry_list[i],
  type: "bar"
})
}
// saving trace list to data
var data = trace_list;

//set layout
var layout = {
        title:'Obesity data around the Globe',
        xaxis: {
         title: "Countries",
          tickvals: cntry_list,
          ticktext: cntry_list
          
        },
        yaxis: {
          title: "Obesity",
        },
        showlegend:true
      };
// plot chart
Plotly.newPlot('myDiv', data, layout);
})

