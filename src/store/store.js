import {createStore} from "redux";

const store = createStore(function(state,action){
  if(action.type === "changeCategory"){
    return{
      ...state,
        category:action.peyload
    }
  }
  return state;
},{
  category:""

})

export default store;