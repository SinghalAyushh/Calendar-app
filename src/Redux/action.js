import axios from 'axios';

import { GET_EVENT} from './type';


//GET EVENT
export const getEVENT = () => (dispatch, getState) => {
    axios.get('http://localhost:4000/event/')
    .then(res => {
      
         
        dispatch({
            type: GET_EVENT,
            EVENT: res.data,
            
        });
       
    }).catch((err) => console.log(err)
    );
};

// DELETE EVENT
export const deleteEVENT = id => () => {
    axios.delete(`http://localhost:4000/event/delete-event/${id}`)
    .then(res => {
        window.location.reload();
       
    }).catch(err => console.log(err));
};

// Edit Event
export const editEVENT = (id,state) => () => {
    axios.put(`http://localhost:4000/event/update-event/${id}`,state)
    .then(res => {
       window.location.reload();
       
    }).catch(err => console.log(err));
};

// ADD EVENT
export const addEVENT = EVENT => () => {
    axios.post("http://localhost:4000/event/create-event/", EVENT)
    .then(res => {
      
        window.location.href ="/";
        
    }).catch((err) => console.log(err)
    );
};