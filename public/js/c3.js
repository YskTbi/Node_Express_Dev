var resList;
var xhr = new XMLHttpRequest();
xhr.open("GET","http://172.25.21.56:3000/api");
xhr.addEventListener("load", function(e){
    resList = JSON.parse(xhr.responseText);
    console.log(resList);
});
xhr.send();
setTimeout("c3Set()", 500);
function c3Set(){
    var chart = c3.generate({
    bindto: '#chart',
    axis: {
        x: {
            show: false,
            padding: {
               left: 0.15,
               right:0.1
            }
        },
        y: {
           label: {
             text: 'connected',
             position: 'outer-middle',
           }
        },
        color: {
          pattern: ['#27ae60', '#2980b9']
        }
    },
    data: {
        x:'x',
        columns: resList["columns"],
        type: 'line',
        colors: {
            testa: '#27ae60',
            testg: '#2980b9'
        }
    },
    grid: {
       x: {
          lines: resList["lines"]
           },
       y: {
          lines: [
                 {value: 0}
                 ],
                 show: true,
       }
    }
    });
    var chart_bar = c3.generate({
    bindto: '#bar',
    axis: {
        x: {
            show: false,
            padding: {
               left: 0.15,
               right:0.1
            }
        },
        y: {
           label: {
             text: 'connected',
             position: 'outer-middle',
           }
        }
    },
    data: {
          x:'x',
          columns: resList["columns"],
          type: 'bar',
          colors: {
              testa: '#27ae60',
              testg: '#2980b9'
          }
    },
    grid: {
       x: {
          lines: resList["lines"]
           },
       y: {
          lines: [
                 {value: 0}
                 ],
                 show: true,
       }
    }
    });
  }
