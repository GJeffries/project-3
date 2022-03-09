// pull from api
d3.json(`/api/get_data`).then(function(data) {

    obesity_data = Object.values(data)
    
    // sort data to use for plot
    id_list = []
    Country_list = []
    Latitude_list = []
    Longitude_list = []
    yr_id_list = []
    Pct_obesity_list = []
    Sex_list = []
    for (i in obesity_data) {
      id_list.push(obesity_data[i]["id"])
      Country_list.push(obesity_data[i]["country"])
      Latitude_list.push(obesity_data[i]["Latitude"])
      Longitude_list.push(obesity_data[i]["Longitude"])
      yr_id_list.push(obesity_data[i]["yr_id"])
      Pct_obesity_list.push(obesity_data[i]["Pct_obesity"])
      Sex_list.push(obesity_data[i]["Sex"])
    }
    
    // set traces
    Cntry_list = []
    for (i in obesity_data) {
    Cntry_list.push({
      x: [Country_list[i]],
      y: [Pct_obesity_list[i]],
      type: "bar",
      //marker: {
        //color: colors_list[i],
      //}
    })
    }
    
    // set chart data
    var data = Cntry_list;
    
    // set layout
    //var layout = {
    //  title:'Obesity data around the Globe',
    //  xaxis: {
    //    title: "Countries",
    //    tickvals: Country_list,
    //    ticktext: Country_list,
        
    //  },
      var layout = {
        title:'Obesity data around the Globe',
        xaxis: {
          title: "Countries",
          tickvals: data.Country,
          ticktext: data.Country,
          
        },
      yaxis: {
        title: "Obesity",
        tickvals: data.Pct_obesity,
        ticktext: data.Pct_obesity,
      },
      showlegend:true
    };
    
    // plot chart
    Plotly.newPlot('myDiv', data, layout);
    
    })