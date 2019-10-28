
export const SUCCESS_MSG='SUCCESS_QUERY'

export const ERROR_MSG='ERROR'

const init_state={
    posts:[],
    sendErr:null
}

var Msgqueue=[]
export function postReducer(state=init_state,action) {
    switch (action.type) {
        case SUCCESS_MSG:
            Msgqueue=Msgqueue.concat(action.payload)
            return {...state,Msg:Msgqueue}
        case ERROR_MSG:
            return {...state,Msg:"failToSendMsg"}
        default:
            return state
    }
}
