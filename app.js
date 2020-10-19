// COMP3220 Final Project
// James Wu, 104038826
//
// 
//

const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const readline = require('readline')


// opens file and logs in console as well as sends GET request 
app.get('/',(req,res) => {
    fs.readFile('./Park Name and Addresses.csv',(err,data) => {
        if (err) throw err;

        console.log(CSVToArray(data.toString()));
        res.send(CSVToArray(data.toString()));
    })
})
app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// .csv parser
// returns array
function CSVToArray( data, delimiter ){
    delimiter = (delimiter || ",");
    var pattern = new RegExp(
        (
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + delimiter + "\\r\\n]*))"),
            "gi"
        );
    var arr = [[]];
    var matches = null;
    while (matches = pattern.exec( data )){
        var matchedDelim = matches[ 1 ];
        if (
            matchedDelim.length &&
            matchedDelim !== delimiter
            ){
            arr.push( [] );
        }
        var matchedValue;
        if (matches[ 2 ]){
            matchedValue = matches[2].replace(
                new RegExp("\"\"","g"),"\""
                );
        } else {
            matchedValue = matches[3];
        }
        arr[arr.length-1].push(matchedValue);
    }
    return(arr);
}