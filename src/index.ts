import express  from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import {  getUserByUsernameAndPassword } from './services/user-services';
import { sessionMiddleware } from './middleware/session-middleware';
import { reimbursementsRouter } from './routers/reimbersement-router';
import { loggingMiddleware } from './middleware/logging-middleware';

const app = express();

app.use(loggingMiddleware);                                                                                     //having info about what people are doing 
app.use(bodyParser.json());                                                                               //conv text to obj and pbj(jason) to text.(username)                               
app.use(sessionMiddleware);                                                                                             // who is logged in 

app.use('/user', userRouter );
app.use('/reimbursements', reimbursementsRouter);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('please have a username and password field');
    }
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user); // its standard to send the logged in user info after the log in
    } catch (e) {
        res.status(e.status).send(e.message);
        console.log(e);
        
    }
});


app.listen(6000, () => {    //in order to read data inside http request. taking bp jason from html req into js object
    console.log('app has started');



});
