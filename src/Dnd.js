import React from "react";
import axios from "axios"

import {Modal, ModalHeader, ModalBody,Button } from "reactstrap";
import {connect} from "react-redux"
import { getEVENT} from './Redux/action'
import NewOrdersForm from './components/NewOrdersForm'

import BigCalendar from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';


import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

import { Link } from "react-router-dom";


BigCalendar.momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

 class Dnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
      modal: false,
      create: false,
      id:"",
      eventarray:null,
      loading: true,
      start:"",
      add: false,
      show: false,
      arg:[],
    };
   
    this.moveEvent = this.moveEvent.bind(this);
  }

 
  moveEvent({ event, start, end }) {
    console.log(event)
    const { events } = this.state;

    const idx = events.indexOf(event);
    const updatedEvent = { ...event, start, end };

    const nextEvents = [...events];
    nextEvents.splice(idx, 1, updatedEvent);

    this.setState({
      events: nextEvents
    });
    console.log(nextEvents)
  }

  resizeEvent = (resizeType, { event, start, end }) => {
    const { events } = this.state;

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id ===event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });


    this.setState({
      events: nextEvents
    });
  };
 

  toggle = (args) => {
   this.setState({id:args.id})
   this.setState({arg:args})

    this.setState(previous => ({
      modal: !previous.modal
    }));
  };
  toggleCreate = (args) => {
    this.setState({start:args.start})
    this.setState(previous => ({
      modal: !previous.modal,
      create: true

    }));
  };

  componentDidMount() {
    this.props.getEVENT();

    axios.get('http://localhost:4000/event/')
    .then(res => {
     
        var arraydata=[]
res.data.forEach((item) => {
        arraydata.push({
            id: item._id,
            title: item.title,
            description:item.description,
            start: new Date(item.start_date),
            end: new Date(item.end_date)
          
          });
        });
        
        this.setState({events:arraydata,loading:false})
    
}
)
  }

  render() {

    console.log(this.state.events)
    const create = this.state.create;

    var title = "Editing Event";
   
    if (create) {
      title = "Creating New Event";

    }
   
   
  
   
    console.log(this.state.events)

  
    
    return (
     <React.Fragment>
        {this.state.loading?<h3>wait...</h3>:
 
           <React.Fragment>
             <div style ={{display:"flex",width:"100%"}}>
            <Link to ="/add"><Button onClick={()=>this.setState({create: true})} style ={{color:"black",backgroundColor:"white",margin:"10px"}}>Add Event</Button></Link> 
             <Link to ="/show"><Button onClick={()=>this.setState({show: true})} style ={{color:"black",backgroundColor:"white",margin:"10px",alignItems:"end"}}>Show Events</Button></Link>
           
             </div>
      <DragAndDropCalendar
        selectable
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        defaultView={BigCalendar.Views.YEARS}
        onSelectEvent={this.toggle}
        defaultDate={new Date()}
   
      />
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>

          <ModalBody>
            <NewOrdersForm
             create={this.state.create}
             event={this.state.arg}
            id={this.state.id}
             modal ={this.state.modal}
             start ={this.state.start}
           
            />
          </ModalBody>
        </Modal>
        </React.Fragment>}
        </React.Fragment>
  

    );
  }
}

const mapStateToProps = (state) => ({
  event: state.EVENT,
  
});


export default connect(mapStateToProps, { getEVENT })(Dnd)