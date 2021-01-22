import React, { Component } from 'react'
import {
    Button,
    Form,
    Grid,
    Header,
   TextArea,
    Segment,
    Label,Icon,Input, Image
  } from "semantic-ui-react";
import axios from "axios"
  


export class Page3 extends Component {
    state = {
        title: "",
       description: "",
     
        image_url:"",
        event:[]
      };
    
      handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
      handleImageChange = (e) => {
        this.setState({
            [e.target.id]: e.target.files[0]

        })
    };

      addQuantity=()=>{
          this.setState({quantity:this.state.quantity+1})
      }
      subtractQuantity=()=>{
          if(this.state.quantity>0){
        this.setState({quantity:this.state.quantity-1})}
    }
    subtractPrice=()=>{
        if(this.state.price>0){
      this.setState({price:this.state.price-1})}
  }
      addPrice=()=>{
        this.setState({price:this.state.price+1})
    }
  
    sendingData=(e)=>{
        e.preventDefault();
        const form_data = new FormData();

        console.log("hey",this.state)
    
        form_data.append('title', this.state.title);
        form_data.append('image_url', this.state.image_url);
        form_data.append('description', this.state.description);
        console.log(form_data)
        axios.post('http://localhost:4000/event/create-event/',form_data)
        .then(res => {
           console.log(res);
        })
        .catch(err => {
           console.log(err);
        });
}


    componentDidMount(){
      axios.get('http://localhost:4000/event/')
      .then(res => {
        console.log(res)
         this.setState({event: res.data})
      })
     
}


    //Adding 'create' event

  

    
    render() {
      console.log(this.state.event)
        console.log(this.state)
        return (
            <div style={{width:"100%",height:"100vh",backgroundColor:"#d3d3d3"}}>
               
                
                <Grid style={{marginLeft:"24rem",position:"relative",top:"91px"}}>
                
                <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" style={{ color: "black" }} textAlign="center">
           Create Rewards
          </Header>
          <h6 style={{color: "green", textAlign: "center"}}>{this.state.message}</h6>
          

          <React.Fragment>
            <form size="large" onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <Segment stacked>
                  <Label style={{marginLeft:"10rem",marginBottom:"1rem"}} color="black">Title</Label>
                 
                <Form.Input
                  onChange={this.handleChange}
           
                  name="title"
                  fluid
              
                
                 
                />
                <Label style={{marginLeft:"9rem",marginBottom:"1rem"}} color="black">Description</Label>
                <TextArea style={{marginBottom:"1rem"}}  name="description"
                   fluid
               
                  
                     onChange={this.handleChange} placeholder='Description' />

                 
                 
<Label style={{marginLeft:"9.5rem",marginBottom:"1rem"}} color="black">Quantity</Label>
<div style={{display:"flex",marginBottom:"17px",marginLeft:"120px"}}>
<Button color="black" onClick={this.addQuantity} style={{marginLeft:"-5px",borderRadius:"2rem"}}>+</Button><h3 style={{margin:"10px"}}>{this.state.quantity}</h3><Button onClick={this.subtractQuantity} style={{borderRadius:"2rem"}} color="black">-</Button>
</div>
<Label style={{marginLeft:"10.5rem",marginBottom:"1rem"}} color="black">Price</Label>
<div style={{display:"flex",marginBottom:"17px",marginLeft:"113px"}}>
<Button onClick={this.addPrice}color="black" style={{marginLeft:"-5px",borderRadius:"2rem"}}>+</Button><h3 style={{margin:"10px"}}>{this.state.price}$</h3><Button onClick={this.subtractPrice} style={{borderRadius:"2rem"}} color="black">-</Button>
</div>
<Label style={{marginLeft:"9rem",marginBottom:"1rem"}} color="black"> Total Price</Label>
<div style={{display:"flex",marginBottom:"17px",marginLeft:"179px"}}>
<h3 style={{margin:"4px",marginLeft:"-3px"}}>{this.state.quantity*this.state.price}$</h3>
</div>
<Form.Field>
                                                <Label color="violet" for="image_url" >Profile </Label>
                                               
                                                <Icon name="camera" style={{ color: "white", position: "relative", left: "1px" }} />
                                                <Input style={{ opacity: "1", top: "-53px", position: "relative" }} type="file" className="imag" id="image_url" accept="image/png, image/jpeg" onChange={this.handleImageChange} required />

                                            </Form.Field>
                                          

                                           
            {this.state.event.map((data)=>
        <div>
        <h2>{data.title}</h2>
        <img src={`http://localhost:4000/${data.image_url}`}></img>
        </div>
               ) }

                <Button
                  style={{ backgroundColor: "black", color: "white",borderRadius:"1rem" }}
                  fluid
                  size="large"
                  onClick = {this.sendingData}
                  loading= {this.state.loading}

                >
                 Create Reward
                </Button>
              </Segment>
            </form>
           
          </React.Fragment>
        </Grid.Column>
      </Grid> 

     
                </div>
              
        )
    }
}

export default Page3

                                       
                            











