import React from 'react';
import { Card, CardBody, Button, CardTitle, CardText, CardImg ,CardSubtitle} from 'reactstrap';
import {connect} from "react-redux"
import { getEVENT,deleteEVENT} from '../Redux/action'

class Example extends React.Component {
    componentDidMount(){
        this.props.getEVENT();
    }

    remove = id => {
        this.props.deleteEVENT(id); }
    render(){
  return (
    <div>
          {
          !this.props.event || this.props.event.length <= 0 ? (
           
                <h3 style ={{alignItems:"center"}}>Ops, no Event here yet</h3>
           
          ):
          <div>
        {this.props.event.map((event)=>
      <Card style ={{ width:"350px",margin:"18px", border:"1px solid", borderRadius:"1rem"}}>
        <CardImg  style ={{ height:"225px",width:"350px",border:"1px solid", borderRadius:"1rem"}}top width="100%" src={`http://localhost:4000/${event.image_url}`} alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{event.title}</CardTitle>
           <CardText>{event.description}</CardText>
           <CardSubtitle tag="h6" className="mb-2 text-muted">{(event.start_date).slice(0,10)}</CardSubtitle> 
          <h6>to</h6>
           <CardSubtitle tag="h6" className="mb-2 text-muted">{(event.end_date).slice(0,10)}</CardSubtitle>
          <Button color ="danger" onClick={()=>this.remove(event._id)}>Delete</Button>
        </CardBody>
      </Card>
    )}
    </div>}
    </div>
  );
  
};
}

const mapStateToProps = (state) => ({
    event: state.EVENT,
    
  });
  
  
  export default connect(mapStateToProps, { getEVENT,deleteEVENT })(Example)

