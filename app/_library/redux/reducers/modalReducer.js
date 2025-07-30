const initialState = {
    show:false
}
export const nameModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "name_modal" : return {...state, show:action.payload}        
        default: return state
    }
}
export const aboutMeModalReducer = (state = initialState, action)=>{
    switch(action.type){
        case "about_me_modal" : return {...state, show:action.payload}        
        default: return state
    }
}

