import { daoUpdateReimbursement, daoGetReimbursementsByReimbursementId } from "../repository/reimbursement-dao"


export function getReimbursementsByStatusId(statusId: number) {
    try {
        return getReimbursementsByStatusId(statusId)
    } catch (e) {
        throw e
    }
}


export function getReimbursementsByUserId(userId: number) {
    try {
        return getReimbursementsByUserId(userId)
    } catch (e) {
        throw e
    }

}


export function postReimbersement(post) {
    try {
        return daoGetReimbursementsByReimbursementId(post)
    } catch (e) {
        throw e
    }

}


export async function patchReimbersement(patch) {
    try {
        let post = await getReimbursementsByStatusId(patch.reimbursementId)
        for (let key in post) {
            if (patch.hasOwnProperty(key)) {
                post[key] = patch[key]
            }
        }
        return await daoUpdateReimbursement(post)
    } catch (e) {
        throw e
    }

}

