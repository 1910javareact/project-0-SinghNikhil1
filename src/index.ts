import express  from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import {  getUserByUsernameAndPassword } from './services/user-services';
import { sessionMiddleware } from '../middleware/session-middleware';
import { reimbursementRouter } from './routers/reimbersement-router';

const app = express();


app.use(bodyParser.json());
app.use(sessionMiddleware);

app.use('/user', userRouter );
app.use('/reimbursements', reimbursementRouter);

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    if (!username || !password ) {
        res.status(400).send('please have a username and password field');
    }
    try {
        const user = getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user); // its standard to send the logged in user info after the log in
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});


app.listen(1997, () => {
    console.log('app has started');



});
