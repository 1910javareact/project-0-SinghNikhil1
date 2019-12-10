import { daoUpdateReimbursement, daoGetReimbursementsByReimbursementId, daoPostReimbersement, daoGetReimbursementsByUserId, daoGetReimbursementsByStatusId } from "../repository/reimbursement-dao"


export function getReimbursementsByStatusId(statusId: number) {
    try {
        return daoGetReimbursementsByStatusId(statusId);
    } catch (e) {
        throw e;
    }
}

// call the daoGetReimbursementsByUserId and return the data once it's collected
export function getReimbursementsByUserId(userId: number) {
    try {
        return daoGetReimbursementsByUserId(userId);
    } catch (e) {
        throw e;
    }

}

// call the daoPostReimbersement and return the post
export function postReimbersement(post) {
    try {
        return daoPostReimbersement(post);//passing to the dao and returning to the router 
    } catch (e) {
        console.log(e);
        
        throw e;
    }

}

// call the daoPatchReimbersement and return the updated post
export async function patchReimbersement(patch) {                                      //user sended us yo be updated 
    try {
        const post = await daoGetReimbursementsByReimbursementId(patch.reimbursementId);// values which are already inthe database                 calling this function from the dao
        for (const key in post) {
            if (patch.hasOwnProperty(key)) {
                console.log(patch[key]);
                
                post[key] = patch[key];
            }
        }
        return await daoUpdateReimbursement(post);
    } catch (e) {
        console.log(e);
        
        throw e;
    }

}