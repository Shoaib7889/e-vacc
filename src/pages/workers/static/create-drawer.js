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

    const [form, setForm] = useState({ name: '', email: '', password: '', contact: '', address: '' });
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
      const token = Buffer.from(`${"admin"}:${"admin123"}`, 'utf8').toString('base64')
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
        // props.flagChange();
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
            <Form >
                <FormGroup>
                    <Label for="examplename">Name</Label>
                    <Input type="name" name="name" required id="examplename" value={form.name} onChange={e=>inputHandler(e)} placeholder="Enter name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleemail">Email</Label>
                    <Input type="email" name="email" required value={form.email} id="exampleemail" onChange={e=>inputHandler(e)} placeholder="Enter email" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplepassword">Password</Label>
                    <Input type="password" name="password" required value={form.password} id="examplepassword" onChange={e=>inputHandler(e)} placeholder="Enter password" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplecontact">Contact</Label>
                    <Input type="contact" name="contact" required value={form.contact} id="examplecontact" onChange={e=>inputHandler(e)} placeholder="Enter contact" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleaddress">Address</Label>
                    <Input type="address" name="address" required value={form.address} id="exampleaddress" onChange={e=>inputHandler(e)} placeholder="Enter address" />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toggle}>Cancel</Button>
            <Button color="primary" type="submit" onClick={doLogin}>Save</Button>{' '}
                  
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddWorker;
