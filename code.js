function loadMap(){
    var layout = {
  title:'Today cases and deaths'
  };
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200){
          const today=get_today(this.response)
          const table=getTable(this.response);
          //const rate=get_percents(this.response);
          const bigData=getSunburst(this.response);
            Plotly.newPlot('table', table)
            Plotly.newPlot('chart',today,layout)
            Plotly.newPlot("sunburst",bigData[0],bigData[1])
        }
    };
    xhttp.open("GET", "/data");
    xhttp.send();
}
function get_today(string){
    const parse=JSON.parse(string);
    let todayCases=[];
    let todayDeaths=[];
    let country=[];
    for(i in parse){
        console.log(parse[i])
        todayCases.push(parse[i]["todayCases"]);
        todayDeaths.push(parse[i]["todayDeaths"]);
        country.push(i);
    }
    var trace1 = {
        x: country,
        y: todayCases,
        mode: 'markers',
        name: 'Today Cases'
      };
    var trace2 = {
        x: country,
        y: todayDeaths,
        mode: 'markers',
        name: 'Today Deaths'
    };
    return [trace1,trace2]
}
function getSunburst(string){
    const parse=JSON.parse(string);
    let label=[]
    let parent=[]
    let id=[];
    for (i in parse){
        label.push(i.toString())
        id.push(i.toString())
        parent.push("")
    }

    for (i in parse){
        label.push("Total Cases: "+ parse[i]["cases"].toString())
        label.push("Total Deaths: "+parse[i]["deaths"].toString())
        label.push("Total Recovered:"+parse[i]["recovered"].toString())
        label.push("Death Rate:"+(parseInt(parse[i]["deaths"])/parseInt(parse[i]["cases"])*100).toFixed(2).toString()+"%")
        label.push("Recovered Rate:"+(parseInt(parse[i]["recovered"])/parseInt(parse[i]["cases"])*100).toFixed(2).toString()+"%")
        parent.push(i)
        parent.push(i)
        parent.push(i)
        parent.push(i)
        parent.push(i)
        id.push(i+"-cases");
        id.push(i+"-deaths");
        id.push(i+"-recovered");
        id.push(i+"-deathRated");
        id.push(i+"-recoveredRate");
    }
    var data = [{
  type: "sunburst",
  ids:id,
  labels: label,
  parents: parent,
  outsidetextfont: {size: 20, color: "#377eb8"},
  // leaf: {opacity: 0.4},
  marker: {line: {width: 2}},
}];

var layout = {
  margin: {l: 0, r: 0, b: 0, t:0},
  sunburstcolorway:["#636efa","#ef553b","#00cc96"],
};
  return [data,layout]
}
function getTable(string){
  const parse=JSON.parse(string);
    let country=[];
    let list=[[],[],[],[],[]]
    for(i in parse){
        country.push(i)
    }
    for(i in parse){
        list[0].push(parse[i]["cases"])
        list[1].push(parse[i]["todayCases"]);
        list[2].push(parse[i]["deaths"]);
        list[3].push(parse[i]["todayDeaths"]);
        list[4].push(parse[i]["recovered"])
    }
  var headerColor = "grey";
  var rowEvenColor = "lightgrey";
  var rowOddColor = "white";
  var values = [country,list[0],list[1],list[2],list[3],list[4]]
  var data = [{
  type: 'table',
  header: {
    values: [["<b>Country</b>"], ["<b>Cases</b>"],
				 ["<b>TodayCases</b>"], ["<b>Deaths</b>"], ["<b>todayDeaths</b>"],["<b>Recovered</b>"]],
    align: "center",
    line: {width: 1, color: 'black'},
    fill: {color: headerColor},
    font: {family: "Arial", size: 12, color: "white"}
  },
  cells: {
    values: values,
    align: "center",
    line: {color: "black", width: 1},
    fill: {color: headerColor},
    font: {family: "Arial", size: 11, color: ["white"]}
  }
}]
    return data;
}
// function get_percents(string){
//   let parse=JSON.parse(string);
//       let country=[];
//     let deathRate=[];
//     let recoveredRate=[];
//     for(i in parse){
//         country.push(i)
//         deathRate.push((parseInt(parse[i]["deaths"])/parseInt(parse[i]["cases"])*100).toFixed(2))
//         recoveredRate.push((parseInt(parse[i]["recovered"])/parseInt(parse[i]["cases"])*100).toFixed(2))
//     }
//     var data = [{
//   values: deathRate,
//   labels: country,
//   domain: {column: 0},
//   name: 'Death Rate',
//   hoverinfo: 'label+percent+name',
//   hole: .4,
//   type: 'pie'
// },{
//   values: recoveredRate,
//   labels: country,
//   text: 'CO2',
//   textposition: 'inside',
//   domain: {column: 1},
//   name: 'Recovered Rate',
//   hoverinfo: 'label+percent+name',
//   hole: .4,
//   type: 'pie'
// }];
// var layout = {
//   title: 'Rate',
//   annotations: [
//     {
//       font: {
//         size: 20
//       },
//       showarrow: false,
//       text: 'Deaths',
//       x: 0.17,
//       y: 0.5
//     },
//     {
//       font: {
//         size: 20
//       },
//       showarrow: false,
//       text: 'Recovered',
//       x: 0.82,
//       y: 0.5
//     }
//   ],
//   height: 1200,
//   width: 1400,
//   showlegend: false,
//   grid: {rows: 1, columns: 2}
// };
// return [data,layout]
// }