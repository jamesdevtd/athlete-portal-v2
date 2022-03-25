import { ActionType } from "../action-types/index"
import { Action } from "../actions"

const initialState = '';

const reducer = (state: any = initialState, action: Action): any => {
    switch (action.type){
        case ActionType.SIGNIN:
            state = action.payload;
            return state;
        case ActionType.SIGNOUT:
            state = null;
            return state;
        case ActionType.CHECK_USER:
            return state;
        default:
            return state
    }
}

export default reducer