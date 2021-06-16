import React,{useState,useEffect} from "react";
import { Form, FormGroup } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";
import Widget from "../../../components/Widget/Widget";
import s from "./Static.module.scss";
import superImg from '../../../images/people/a5.jpg'

function SupervisorProfile() {
  
  const [form, setForm] = useState({ name: '', email: null, password: null, contact: '', address: '' });
  const inputHandler = (e) => {
    const obj = { ...form };
    obj[e.target.name] = e.target.value;
    setForm(obj);
  }
  console.log('e ', form);
    
  
  return (
    <div className={s.root}>
      <h2 className="page-title">
        Supervisor - <span className="fw-semi-bold">Profile</span>
      </h2>
      <Row>
        <Col md="4">
          <Card >
            <CardImg top width="100%" src={superImg} alt="Card image cap" />
            <CardBody className="card-body">
              <CardTitle tag="h5" className="text-light">Muhammad Shoaib</CardTitle>
              <CardText className="text-light">Hey, I am the Supervisor of the areas under Kasur Tehsil and supervising the vaccination process</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="8">
          <Form >
            <FormGroup>
              <Label for="examplename">Name</Label>
              <Input type="name" name="name" id="examplename" onChange={e => inputHandler(e)} placeholder="password placeholder" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input type="email" name="email" onChange={e => inputHandler(e)} id="exampleEmail" placeholder="with a placeholder" />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input type="password" name="password" id="examplePassword" onChange={e => inputHandler(e)} placeholder="password placeholder" />
            </FormGroup>
            <FormGroup>
              <Button className="bg-primary text-white mt-3">Update Profile</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
}


export default SupervisorProfile;
