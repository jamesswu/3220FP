// COMP3220 Final Project
// James Wu, 104038826
//
// 
//

const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const { allowedNodeEnvironmentFlags } = require('process')
const readline = require('readline')


app.set('view engine', 'ejs');
// opens file and logs in console as well as sends GET request 
app.get('/',(req,res) => {
    res.render('pages/index');
})
app.get('/3dayparkinginfraction',(req,res) => {
    fs.readFile('./3DayParkingInfraction_YTD.csv',(err,data) => {
        if (err) throw err;
        const dataArray = CSVToArray(data.toString());

        var str
        var i
        for (i = 0; i < 9; i++) {
            str += dataArray[1][i];
            if (i < 5) {
                str+=" ";
            }
        }
        console.log(str);
        res.send(str);
    })
})
app.get('/garbagenotcollected',(req,res) => {
    fs.readFile('./GarbageNotCollected_YTD.csv',(err,data) => {
        if (err) throw err;
        const dataArray = CSVToArray(data.toString());

        var str
        var i
        for (i = 0; i < 9; i++) {
            str += dataArray[1][i];
            if (i < 5) {
                str+=" ";
            }
        }
        console.log(str);
        res.send(str);
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