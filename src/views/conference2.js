import React from 'react';
import ReactDOM from 'react-dom';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormInput } from "shards-react";
import {
Container,
Col,
Row,
Card,
CardHeader,
CardTitle,
CardImg,
CardBody,
CardFooter,
Button,
FormSelect
} from "shards-react";

class Conference extends React.Component {
  constructor(){
    super();
    this.state = {
      data : [],
      paiddata : [],
      freedata : [],
      search: null,
      selectValue: null,
      selectMonth:null,
      open:false,
    }
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleDropdownChange1 = this.handleDropdownChange1.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getData();
  }

getData(){
  let data = fetch('https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences').then((resp)=>{
    resp.json().then((res)=>{
      let temppaid = res.paid;
      let tempfree = res.free;
      let tempState = [...temppaid, ...tempfree];
      console.log(tempState);
      this.setState({
        data: tempState.reverse()
      })

      console.log(data)

})
})
}



  onchange = e => {
    this.setState({ search: e.target.value });
    console.log(this.state.search);
    this.setState({ open: false });
  };


  handleDropdownChange(e) {
    this.setState({ search: e.target.value });
    console.log(this.state.selectValue);
    this.setState({ open: false });
  }


  handleDropdownChange1(e) {
    this.setState({ search: e.target.value });
    this.setState({ open: false });
  }

toggle() {
this.setState(prevState => {
return { open: !prevState.open };
});
}


render(){
/*  const sortedActivities = this.state.data.sort((event_reverse) => ().map(item=>{
return(
<Col lg="3" md="12">
<Card className="h-auto p-1 m-2 ml-3">
   <CardImg className="h-25" style={{maxHeight:"220px"}} top src={item.imageURL} alt="alt" onError={(e)=>
   {e.target.onerror = null; e.target.src="../conference.gif"}}/>
   <CardBody>
      <CardTitle>{item.confName}</CardTitle>
      <span>
         <p>{item.confStartDate}</p>
         <p>{item.city}, {item.country}</p>
         <a href={item.confUrl}>
            <p>{item.confUrl}</p>
         </a>
      </span>
   </CardBody>
   <CardFooter>
      <Button className="ml-5 float-right" >{item.entryType}</Button>
   </CardFooter>
</Card>
</Col>
)
})*/
const sortedActivities= this.state.data.slice().sort(function(a, b) {
let dateA = new Date(a.confStartDate), dateB = new Date(b.confStartDate);
return dateA - dateB;
});
console.log(sortedActivities);
const sortedConf = sortedActivities.map(item=>{
return(
<Col lg="3" md="12">
<Card className="h-auto p-1 m-2 ml-3">
   <CardImg className="h-25" style={{maxHeight:"220px"}} top src={item.imageURL} alt="alt" onError={(e)=>
   {e.target.onerror = null; e.target.src="../conference.gif"}}/>
   <CardBody>
      <CardTitle>{item.confName}</CardTitle>
      <span>
         <p>{item.confStartDate}</p>
         <p>{item.city}, {item.country}</p>
         <a href={item.confUrl}>
            <p>{item.confUrl}</p>
         </a>
      </span>
   </CardBody>
   <CardFooter>
      <Button className="ml-5 float-right" >{item.entryType}</Button>
   </CardFooter>
</Card>
</Col>
)
})
const items = this.state.data.filter((item)=>{
if(this.state.search == null )
return item
else if(item.city.toLowerCase().includes(this.state.search.toLowerCase()) || item.country.toLowerCase().includes(this.state.search.toLowerCase()) || item.confName.toLowerCase().includes(this.state.search.toLowerCase()) || item.entryType.toLowerCase().includes(this.state.search.toLowerCase()) || item.confStartDate.toLowerCase().includes(this.state.search.toLowerCase()) ){
return item
}
}).map(item=>{
return(
<Col lg="3" md="12">
<Card className="h-auto p-1 m-2 ml-3">
   <CardImg className="h-25" style={{maxHeight:"220px"}} top src={item.imageURL} alt="alt" onError={(e)=>
   {e.target.onerror = null; e.target.src="../conference.gif"}}/>
   <CardBody>
      <CardTitle>{item.confName}</CardTitle>
      <span>
         <p>{item.confStartDate}</p>
         <p>{item.city}, {item.country}</p>
         <a href={item.confUrl}>
            <p>{item.confUrl}</p>
         </a>
      </span>
   </CardBody>
   <CardFooter>
      <Button className="ml-5 float-right" >{item.entryType}</Button>
   </CardFooter>
</Card>
</Col>
)
})
return (
<div>
   <Row className="w-100">
      <Col lg="4">
      <h3 className="m-4" >Fetched Results</h3>
      </Col>
      <Col lg="5">
      <Row>
         <Col lg="1">
         </Col>
         <Col lg="4">
         <Button className="m-4" outline pill onClick={this.toggle}>
         Sort by Date
         </Button>
         </Col>
         <Col lg="4">
         <div>
            <FormSelect className="m-4" onChange={this.handleDropdownChange1}>
               <option value="">Select Month</option>
               <option value="January">January</option>
               <option value='February'>February</option>
               <option value='March'>March</option>
               <option value='April'>April</option>
               <option value='May'>May</option>
               <option value='June'>June</option>
               <option value='July'>July</option>
               <option value='August'>August</option>
               <option value='September'>September</option>
               <option value='October'>October</option>
               <option value='November'>November</option>
               <option value='December'>December</option>
            </FormSelect>
         </div>
         </Col>
         <Col lg="3">
         <div>
            <FormSelect className="m-4" onChange={this.handleDropdownChange}>
               <option value="">Entry type</option>
               <option value="free">Free</option>
               <option value="paid">Paid
               </option>
            </FormSelect>
         </div>
         </Col>
      </Row>
      </Col>
      <Col lg="3">
      <Row>
         <FormInput size="sm" placeholder="Search..." className="mb-2 m-4 w-100 ml-5" onChange={this.onchange}/>
      </Row>
      </Col>
   </Row>
   <Row >
      {this.state.open ?
      sortedConf :
      items
      }
   </Row>
</div>
);
}
}
export default Conference;
