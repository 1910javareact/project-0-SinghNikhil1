import express from 'express';
import { authorization } from '../middleware/authorization-middleware';
import { getAllUser, getUpdateUser, getUserId } from '../services/user-services';
import { loggingMiddleware } from '../middleware/logging-middleware';


//get all users
export const userRouter = express.Router();
 async function controllerGetUsers(req, res) { // the express function
  try {
    const users = await getAllUser();
    res.json(users);
    } catch (e) {
      res.status(e.status).send(e.message);
}
}
userRouter.get('', [ authorization([2]), controllerGetUsers ]);
//get user by id 
userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
        const users = await getUserId(id);
        res.json(users);
        } catch (e) {
            res.status(e.status).send(e.message);
        }

    }
});

//update user
userRouter.patch('',authorization([1]),loggingMiddleware , async (req,res) =>{
  try {
      let {body} = req
      let user = await getUpdateUser(body)
      res.status(200).json(user)
  } catch(e) {
          res.status(e.status).send(e.message)
      }
})