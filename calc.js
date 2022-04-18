const express = require('express')
const ExpressError = require('./errorClass')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/mean', (req,res)=>{
    try{
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        let numsAsStrings = req.query.nums.split(',');
        let numsAsInts = []
        for(num of numsAsStrings){
            numsAsInts.push(parseInt(num))
        }

        let sum = 0;
        for(num of numsAsInts){
            sum = sum + num
            console.log(sum)
        }
        mean = sum / numsAsStrings.length
        let result = {
            operation: "mean",
            result: mean
        }
        if(result.result == null) throw new ExpressError('Not valid nums', 400)

        return res.send(result);
    }catch(e){
        next(e)
    }
})


app.get('/median', (req,res)=>{
   
    let numsAsStrings = req.query.nums.split(',');
    let numsAsInts = []
    for(num of numsAsStrings){
        numsAsInts.push(parseInt(num))
    }
    numsAsInts.sort((a, b) => a - b);
    let middleIndex = Math.floor(numsAsInts.length / 2);
    let median;
    if (numsAsInts.length % 2 === 0) {
        median = (numsAsInts[middleIndex] + numsAsInts[middleIndex - 1]) / 2;
      } else {
        median = numsAsInts[middleIndex];
      }

      let result = {
        operation: "median",
        result: median
    }

    return res.send(result);

       
})



app.get('/mode', (req,res)=>{
   
    let numsAsStrings = req.query.nums.split(',');
    let numsAsInts = []
    for(num of numsAsStrings){
        numsAsInts.push(parseInt(num))
    }
    
    freqCounter = numsAsStrings.reduce(function(acc, next) {
        acc[next] = (acc[next] || 0) + 1;
        return acc;
      }, {});

      let count = 0;
      let mostFrequent;

      for (let key in freqCounter) {
        if (freqCounter[key] > count) {
          mostFrequent = key;
          count = freqCounter[key];
        }
      }
    

      let result = {
        operation: "mode",
        result: mode
    }

    return res.send(result);

       
})


app.use((error,req,res,next)=>{
    res.status(error.status).send(error.msg)
})










app.listen(3000, function(){
    console.log('app on port 3000')
})