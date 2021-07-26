import React from 'react';
import './Rates.css';

class Rates extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                    'date': '',
                    'currency': []
                }
        }

        componentDidMount() {
            this.getRate();
        }

        getRate = () => {
            let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
            fetch(url)
                .then(res => res.json())
                .then((res) => {
                    this.setState({ date: res[0].exchangedate });
                    let result = [];
                    for(let i = 0; i < res.length; i++) {
                        result.push ({ 'sname': res[i]['cc'], 'fname': res[i]['txt'], 'rate': res[i]['rate'] });
                    };
                    this.setState({currency : result});
                })
                .catch(err => { throw err });
        }

        render() {
            return(
                 <div className="Rates-container">
                    <h1 className="Rates-title"> Official exchange rates (to UAH ) for date: { this.state.date } </h1>
                    <ul className="Rates-list">
                        {Object.values(this.state.currency).map( (item, key) => (
                        <li key={key} className="Rates-list-item"> <span className = "Rates-currency-code">{item['sname']}</span> <span className="Rates-currency-name">{item['fname']}</span> <span className="Rates-currency-rate">{item['rate']}</span> </li>
                         ))} 
                    </ul>
                 </div>
                ) 
            }
        }
        export default Rates;