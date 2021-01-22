import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import {connect} from "react-redux"
import {addEVENT,editEVENT} from "../Redux/action"
import DayPickerInput from 'react-day-picker/DayPickerInput';

import 'react-day-picker/lib/style.css';

class NewOrdersForm extends React.Component {
  state = {
 id:"",
  title:"",
  description:"",
  image_url:"",
  start_date:"",
  end_date:""
    
  };

  componentDidMount() {
  
    if (this.props.event) {
      const {id, title,
      description,
      image_url,
      start_date,
      end_date,
      

  } = this.props.event;
      this.setState({id, title,
        description,
        image_url,
        start_date,
        end_date,
    });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleImageChange=e=>{
    this.setState({
      [e.target.id]: e.target.files[0]

  })
  }
  createEVENT = e => {
    e.preventDefault();

    const formdata = new FormData()
    formdata.append('title',this.state.title)
    formdata.append('description',this.state.description)
    formdata.append('image_url',this.state.image_url)
    formdata.append('start_date',this.state.start_date)
    formdata.append('end_date',this.state.end_date)
  this.props.addEVENT(formdata);
   
     
   
  };


  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };
  editEVENT = e => {
    e.preventDefault();
    
    const formdata = new FormData()
    formdata.append('title',this.state.title)
    formdata.append('description',this.state.description)
    formdata.append('image_url',this.state.image_url)
    formdata.append('start_date',this.state.start_date)
    formdata.append('end_date',this.state.end_date)
    this.props.editEVENT(this.props.id,formdata);
    
     
    
  };
  render() {
   
   return(
      <Form encType='multipart/form-data' onSubmit={this.createEVENT}>
       
        <FormGroup>
          <Label for="title">title</Label>
          <Input
            type="text"
            name="title"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.title)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">description:</Label>
          <Input
            type="text"
            name="description"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.description)}
          />
        </FormGroup>
        <FormGroup>
        <Label for="start_date">start_date:</Label>
        <DayPickerInput  onDayChange={day => this.setState({start_date:day})} />
        </FormGroup>
        <FormGroup>
        <Label for="end_date">end_date:</Label>
        <DayPickerInput onDayChange={day => this.setState({end_date:day})} />
        </FormGroup>
      
  
        <FormGroup>
          <Label for="image_url">Image:</Label>
          <Input  type="file" className="imag" id="image_url" accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
        </FormGroup>
      
        
        <Button>Send</Button>
      </Form>
    );
  }
}

export default connect( "",{addEVENT,editEVENT })(NewOrdersForm); ;