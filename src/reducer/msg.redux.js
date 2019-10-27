
export const SUCCESS_MSG='SUCCESS_QUERY'

export const ERROR_MSG='ERROR'

const init_state={
    Msg:[],
    sendErr:null
}

var Msgqueue=[]
export function sendMsgReducer(state=init_state,action) {
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
