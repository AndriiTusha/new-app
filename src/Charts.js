import React from 'react';
import './Charts.css';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts';

class Charts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'currenciesName': [],
            'choosenCurrenciesData': [],
            'result': [],
            'labels': [],
            'rates': []
        };
        this.getDataforCharts = this.getDataforCharts.bind(this);
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
        let labelsArr = [];
        let ratesArr = [];
        for (let i=1; i<this.todayDay;i++) {
            let str = '0';
            i<10 ? str +=i : str = i.toString();
            let specUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${e.target.value}&date=202103${str}&json`;
            fetch(specUrl)
            .then(res => res.json())
            .then((res) => {
                this.setState ({  choosenCurrenciesData : {'date' : res[0].exchangedate , 'rate' : res[0].rate} }, ()=>{
                     arr.push (this.state.choosenCurrenciesData);
                     arr.map ( ( key ) => {
                         labelsArr.push(key.date);
                         ratesArr.push(key.rate);                 
                    });
                });
            })
            .catch(err => { throw err });
           
        };  
        this.state.labels = labelsArr;
        this.state.rates = ratesArr;
        this.state.result = arr;
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
                    {this.state.result.map( (item, index) => {
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
                <div>
                    <SimpleLineChart data={this.state.result} />
                </div>
            </div>  
        </div>
        )
    }
};

export default Charts;

export function SimpleLineChart (props) {
    
         console.log(props.data);
   
    return (
        <div>
             <LineChart data={[props.data]} width={450} height={400} margin={{ top: 50, bottom: 50, left:50, right:50}}>
               <XAxis dataKey='Date'/>
               <YAxis label='Rate'/>
               <Line type="monotone" dataKey="rate" stroke="#001529" activeDot={{r: 5}}/>
               <Tooltip/>
          </LineChart>
          </div>
    )
 };