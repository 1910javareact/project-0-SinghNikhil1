import express from "express"
import { authorization } from "../middleware/authorization-middleware"
import { getReimbursementsByStatusId, getReimbursementsByUserId, patchReimbersement } from "../services/reimbersement-services"

export const reimbursementRouter = express.Router()
//get reimbursement by status
reimbursementRouter.get('/status/:statusId', authorization([1]),
    async (req, res) => {
        let statusId = +req.params.statusId
        if (isNaN(statusId)) {
            res.status(400).send('Invalid statusId')
        } else {
            try {
                let reimbursements = await getReimbursementsByStatusId(statusId)
                res.json(reimbursements)
            } catch (e) {
                res.status(e.status).send(e.message)
            }
        }
    })
//get reimbursement by user

reimbursementRouter.get('/author/userId/:userId',authorization([1]), async (req,res) =>{
    let userId = +req.params.userId
    if(isNaN(userId)){
        res.status(400).send('Invalid ID')
    }
    else{
        try{
            let reimbursements = await getReimbursementsByUserId(userId)
        res.json(reimbursements)
        }catch(e){
            res.status(e.status).send(e.message)
        }

    }

})

//submit reimbursement

    reimbursementRouter.post('', authorization([1,2,3]), async (req, res)=>{
        let {body} = req
        let singleReimbursement = {
            author: req.session.user.userId,
            amount: body.amount,
            description: body.description,
            type: body.type
        }
        for(let key in singleReimbursement){
            if(!singleReimbursement[key]){
                res.status(400).send('Please include all fields')
            }
        }
        try{
            let newReimbursement = await patchReimbersement(singleReimbursement)
          res.status(201).json(newReimbursement)
        }
        catch(e){
           res.status(e.status).send(e.message)
        }
    })

    reimbursementRouter.patch('', authorization([1]),
    async (req, res) => {
        let { body } = req
        let patch = {
            reimbursementId: body.reimbursementId,
            resolver: req.session.user.userId,
            status: body.status
        }
        for (let key in patch) {
            if (!patch[key]) {
                res.status(400).send('Please include a status and reimbursement Id')
            }
        }
        try {
            let newPost = await patchReimbersement(patch)
            res.status(201).json(newPost)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    })