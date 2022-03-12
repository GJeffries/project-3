// pull from api
d3.json('/api/get_gender/Male').then(function(Maledata) {

  obesity_data_male = Object.values(Maledata)
  
  // sort data to use for plot
  cntry_list = []
  Obs_pct_list = []
  for (i in obesity_data_male) {
    cntry_list.push(obesity_data_male[i]["cntry_name"])
    Obs_pct_list.push(obesity_data_male[i]["Obs_pct_sum"])
  }
  
// set traces
trace_list_male = []
for (i in obesity_data_male) {
trace_list_male.push({
x: [cntry_list[i]],
y: [Obs_pct_list[i]],
name: cntry_list[i],
type: "bar"
})
}
// saving trace list to data
var data_male = trace_list_male;
console.log(data_male)

//set layout
var layout = {
      title:'Top 20 Countries in Male Obesity',
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
//plot chart
Plotly.newPlot('myDiv', data_male, layout);
})

d3.json('/api/get_gender/Female').then(function(Femaledata) {

  obesity_data_female = Object.values(Femaledata)
  
  // sort data to use for plot
  cntry_list = []
  Obs_pct_list = []
  for (i in obesity_data_female) {
    cntry_list.push(obesity_data_female[i]["cntry_name"])
    Obs_pct_list.push(obesity_data_female[i]["Obs_pct_sum"])
  }
  
// set traces
trace_list_female = []
for (i in obesity_data_female) {
trace_list_female.push({
x: [cntry_list[i]],
y: [Obs_pct_list[i]],
name: cntry_list[i],
type: "bar"
})
}
// saving trace list to data
var data_female = trace_list_female;
console.log(data_female)

//set layout
var layout = {
      title:'Top 20 Countries in Female Obesity',
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
Plotly.newPlot('myDiv', data_female, layout);
})
genders=['Male', 'Female']

function init() {
  var data=[{
      values: data,
      labels: genders,
      type: "bar"
  }];
  var layout = {
      height: 600,
      width: 400
  }
  Plotly.newPlot('myDiv', data, layout);
}
d3.selectAll("#selDataset").on("change", getData);

function getData() {
  var dropdownMenu=d3.select("#selDataset");
  var dataset = dropdownMenu.property("value");
  var data=[];
  console.log("data: ", data);
  
  if (dataset == "Male"){
      data = Male;
  }
  else if (dataset == "Female"){
      data = Female;
  }

  Plotly.restyle("bar", "value", [data]);
}
init ();

  