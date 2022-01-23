import { USER_ACCOUNT, USER_ROLE } from "../actionType/userRole";

const initialState={
    role:'',
    profile:{}
}

export default function userRoleReducer(state=initialState,action){
    switch (action.type) {
        case USER_ROLE:
            return{
                ...state,
                role:action.payload
            }
        case USER_ACCOUNT:
            return{
                ...state,
                profile:action.payload

            }
        default:
            return state
    }
}