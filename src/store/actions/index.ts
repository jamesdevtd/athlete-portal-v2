import { ActionType } from "../action-types/index"

interface SignInAction {
    type: ActionType.SIGNIN,
    payload: Object
}

interface SignOutAction {
    type: ActionType.SIGNOUT
}

interface CheckUserAction {
    type: ActionType.CHECK_USER
    payload: string
}

export type Action = SignInAction | SignOutAction | CheckUserAction;