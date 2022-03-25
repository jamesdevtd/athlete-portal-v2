import { Dispatch } from "redux"
import { ActionType } from "../action-types"
import { Action } from "../actions/index"

export const signIn = (userData: Object) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SIGNIN,
            payload: userData
        })
    }
}

export const signOut = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SIGNOUT            
        })
    }
}

export const checkUser = (email: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHECK_USER,
            payload: email
        })
    }
}