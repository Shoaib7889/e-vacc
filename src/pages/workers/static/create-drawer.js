import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup ,
InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import { COUCHDB_BASE_URL } from '../../urls';
// import { uuid } from 'uuid/v4';
import {v4 as uuid} from 'uuid';
var md5 = require('md5');
const axios = require('axios');
global.Buffer = global.Buffer || require('buffer').Buffer

const AddWorker = (props) => {
    const {
        buttonLabel,
        className,
        modal,
        toggle
    } = props;

    const [form, setForm] = useState({ name: '', email: null, password: null, contact: '', address: '' });
    const inputHandler = (e) => {
        const obj = { ...form };
        obj[e.target.name] = e.target.value;
        setForm(obj);
    }
    // console.log('e ', form);
    

    async function handleReset() {
    // const { navigation } = this.props;
    const { name,email,password,address,contact } = form;
    const errors = [];
    
    // Keyboard.dismiss();
    // this.setState({ loading: true });
    // if (!email) errors.push("email");
    if (errors.length > 0) {
      
    }
    else {
      const token = Buffer.from(`${"admin"}:${"password"}`, 'utf8').toString('base64')
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`,
      }
 
        const uid = uuid();
      axios.put(`${COUCHDB_BASE_URL}/e-vaccination/${uid}`, {
        'table':'workers',
        'name': name,
        'email': email,
        'password': password,
        'address': address,
        'contact': contact,
        
      },{
        headers: headers
      }).then(async response=>{
          console.log(response.data)
          return;
        
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })
    }
    }
    
    const doLogin = () => {
        handleReset();
    }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
            <form onSubmit={doLogin}>
                <FormGroup>
                    <Label for="examplename">Name</Label>
                    <Input type="name" name="name" required id="examplename" onChange={e=>inputHandler(e)} placeholder="Enter name" />
                </FormGroup>
                <FormGroup className="mt">
                    <Label for="email">Email</Label>
                    <InputGroup className="input-group-no-border">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="la la-user text-white"/>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="email" className="input-transparent pl-3" value={form.email} onChange={e=>inputHandler(e)} type="email"
                               required name="email" placeholder="Email"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <InputGroup className="input-group-no-border">
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <i className="la la-lock text-white"/>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input id="password" className="input-transparent pl-3" value={form.password}
                               onChange={e=>inputHandler(e)} type="password"
                               required name="password" placeholder="Password"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="examplecontact">Contact</Label>
                    <Input type="contact" name="contact" required id="examplecontact" onChange={e=>inputHandler(e)} placeholder="Enter contact" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleaddress">Address</Label>
                    <Input type="address" name="address" required id="exampleaddress" onChange={e=>inputHandler(e)} placeholder="Enter address" />
                </FormGroup>
            </form>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toggle}>Cancel</Button>
            <Button color="primary" type="submit">Save</Button>{' '}
                  
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddWorker;
