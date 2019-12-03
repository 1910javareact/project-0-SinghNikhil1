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
        return daoPostReimbersement(post);
    } catch (e) {
        console.log(e);
        
        throw e;
    }

}

// call the daoPatchReimbersement and return the updated post
export async function patchReimbersement(patch) {
    try {
        const post = await daoGetReimbursementsByReimbursementId(patch.reimbursementId);
        for (const key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key];
            }
        }
        return await daoUpdateReimbursement(post);
    } catch (e) {
        
        throw e;
    }

}