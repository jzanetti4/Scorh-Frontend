/*
this file is the redux to store the state of tasks
basic there are three states
1.create a new task
2.create a procedure from message tab
3.fail state when create tasks failure
4.fail state when create procedure failure
 */

export const SUCCESS_TASK = 'SUCCESS_TASK'
export const ERROR_TASK = 'ERROR_TASK'
export const SUCCESS_PROCEDURE = 'SUCCESS_PROCEDURE'
export const ERROR_PROCEDURE = 'ERROR_PROCEDURE'
export const SUCCESS_EDIT_PROCEDURE = "SUCCESS_EDIT_PROCEDURE"
export const SUCCESS_DELETE_PROCEDURE = "SUCCESS_DELETE_PROCEDURE"


const init_state = {
    tasks: {},
    taskErr: null,
    procedureErr: null
}

var TasksList = {}
var id = 0
var procedureId = 0

export function createTaskReducer(state = init_state, action) {
    switch (action.type) {

        case SUCCESS_TASK:
            TasksList[id] = action.payload
            id++
            return {...state, tasks: TasksList}

        case SUCCESS_PROCEDURE: {
            // console.log('groupid is', groupId, "procedure is ", detail, "title is", title)
            // console.log('tasksList is,', TasksList)

            let {groupId, title, procedure} = action.payload
            let procedureEntity = {procedureId: procedureId, title: title, procedure: procedure, time: "11:11"}
            TasksList[groupId].procedures = TasksList[groupId].procedures.concat(procedureEntity)
            procedureId++
            return {...state, tasks: TasksList}
        }

        case SUCCESS_EDIT_PROCEDURE: {
            let {groupId, title, procedure, procedureId} = action.payload
            console.log('groupid is', groupId, "procedure is ", procedure, "title is", title, "procedureId i=", procedureId)
            for (let index in TasksList[groupId].procedures) {
                console.log('TasksList[groupId].procedures is', TasksList[groupId].procedures)
                console.log("procedure is,", TasksList[groupId].procedures[index])
                console.log("procedure.id is",TasksList[groupId].procedures[index].procedureId)
                console.log("procedureId is", procedureId)
                if (TasksList[groupId].procedures[index].procedureId == procedureId) {
                    console.log('yes!')
                    TasksList[groupId].procedures[index].title = title,
                        TasksList[groupId].procedures[index].procedure = procedure
                }
            }
            return {...state, tasks: TasksList}
        }

        case SUCCESS_DELETE_PROCEDURE:{
            console.log('SUCCESS_DELETE_PROCEDURE payload is,',action.payload)
            console.log("before delete dataframe is",TasksList)
            let {groupId,procedureId}=action.payload
            for (let index in TasksList[groupId].procedures) {
                if (TasksList[groupId].procedures[index]!=null && procedureId==TasksList[groupId].procedures[index].procedureId) {

                    // TasksList[groupId].procedures=[
                    //     ...TasksList[groupId].procedures.slice(0,index),
                    //     ...TasksList[groupId].procedures.slice(index+1)
                    // ]

                    TasksList[groupId].procedures[index].title = "null",
                        TasksList[groupId].procedures[index].procedure = "null"
                }
            }
            console.log("after delete dataframe is",TasksList)
            return {...state, tasks: TasksList}

        }

        case ERROR_TASK:
            return {...state, Msg: "failToCreateTask"}

        default:
            return state
    }
}


// tasks={
//     groupId:{
//     title:"string",
//     desc:"string",
//     owner:"string",
//     procedures:
//      [   {
//          procedureId:"number",
//          procedure:"string",
//          time:"11:11"
//          },
//          {
//          procedureId:null,
//          title:null
//          procedure:null,
//          time:"11:11"
//          }
//
//
//      ]}
// }


