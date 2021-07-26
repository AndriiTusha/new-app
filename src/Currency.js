import React from 'react';

let dataArr = [];

let url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json';
fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out );
  for (let i=0;i<out.length;i++) {
    console.log(out[i]['cc'],out[i]['txt'],out[i]['rate']);
    dataArr.push({
        "sname":out[i]['cc'],
        "fname":out[i]['txt'],
        "rate":out[i]['rate']
    })
}
})
.catch(err => { throw err });
console.log(dataArr);

const Result = () => {
    dataArr.map((place) => (
        <p> dataArr </p>
      ))}



const Currency = () => (
    <Result />  
    
)

export default Currency;
