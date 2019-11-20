import express from 'express'
import bodyParser from 'body-parser';

const app = express()


app.use(bodyParser.json())

app.listen(1997,()=>{
    console.log('app has started');


    
})
