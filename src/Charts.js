import React from 'react';
import ReactDOM from 'react-dom';
import './Charts.css';
import { Line } from 'react-chartjs-2';

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'currenciesName': [],
            'choosenCurrenciesData': [],
            'results': []
        };
        this.getDataforCharts = this.getDataforCharts.bind(this);
        this.showChartAfterClick = this.showChartAfterClick.bind(this);
    }

    componentDidMount() {
        this.getCurrencyName();
    }
    

    getCurrencyName = () => {
        let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
        fetch(url)
            .then(res => res.json())
            .then((res) => {
                let result = [];
                for(let i = 0; i < res.length; i++) {
                    result.push (res[i]['cc']);
                };
                this.setState({currenciesName : result});
            })
            .catch(err => { throw err });
    }


    getDataforCharts = (e) => {
        this.todayDay = (new Date()).getDate();
        let arr = [];
        for (let i=1; i<this.todayDay;i++) {
            let str = '0';
            i<10 ? str +=i : str = i.toString();
            let specUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${e.target.value}&date=202103${str}&json`;
            fetch(specUrl)
            .then(res => res.json())
            .then((res) => {
                this.setState ({  choosenCurrenciesData : {'date' : res[0].exchangedate , 'rate' : res[0].rate} }
                , ()=>{arr.push (this.state.choosenCurrenciesData)});
            })
            .catch(err => { throw err });
           
        };   
        this.setState({results: arr});
    }
    
    showChartAfterClick () {
        let arrResult = this.state.results;
        let dateRes = [];
        dateRes = arrResult.map( (value) => value.date );
        let rateRes = [];
        rateRes = arrResult.map( (value) => value.rate );
        
        const options = {
            scales: {

              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          };
            ReactDOM.render (
                <div>
                   <Line data={{
                       labels: dateRes,
                       datasets: [
                         {
                           label: 'day rates',
                           data: rateRes,
                           fill: false,
                           backgroundColor: 'rgb(255, 99, 132)',
                           borderColor: 'rgba(255, 99, 132, 0.2)',
                         },
                       ],
                   }} options={options} />
                  </div> ,
                  document.getElementById('chart')
            )
    }
    
    render () {  
        return (
        <div className="Charts-container">
            <form className="Charts-form-container" name="currencies-form">
            <h1 className="Charts-form-title">Please choose currency</h1>
                <select onChange={this.getDataforCharts} className="Charts-form-list">
                    {this.state.currenciesName.map( (item, index)=> (
                        <option key={index} value={item}>{item}</option>
                    ) )}
                </select>
            </form>
            <table className="Charts-table-container">
                    <caption className="Charts-table-title">Data and rate for choosen currency</caption>
                    <tbody>
                    {this.state.results.map( (item, index) => {
                        return (
                    
                    <tr className="Charts-table-row" key={index}>
                        <td className = "Charts-table-cell Charts-table-cell_date">{item.date}</td>
                        <td className = "Charts-table-cell Charts-table-cell_rate">{item.rate}</td>
                    </tr>
                   
                    )
                    }  )}
                     </tbody>
            </table>
            <div className="Charts-diagram-container">
                <h2 className="Charts-diagram-title">The chart below (sorry, but I can`t to resolve it completely)</h2>
                <button onClick={this.showChartAfterClick}>Show chart</button>
                <div id="chart"></div>
            </div>
        </div>
        )
    }
};
export default Charts;


// export function SimpleLineChart (props) {
//   console.log(props);
//   const options = {
//     scales: {
//       yAxes: [
//         {
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };
   
//     return (
//         <div>
//            <Line data={{
//                labels: [props.data.date],
//                datasets: [
//                  {
//                    label: '# of Votes',
//                    data: [props.data.rate],
//                    fill: false,
//                    backgroundColor: 'rgb(255, 99, 132)',
//                    borderColor: 'rgba(255, 99, 132, 0.2)',
//                  },
//                ],
//            }} options={options} />
//           </div>
//     )
//  };