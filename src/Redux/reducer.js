import { GET_EVENT } from './type.js';

const initialState = {
    EVENT:[]
};

export default function reducer (state = initialState, action) {
    switch(action.type) {
        case GET_EVENT:
            return {
                ...state, 
                EVENT: action.EVENT
              
            };
        
        default:
            return state;
    }
}