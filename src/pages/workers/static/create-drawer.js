import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
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
    console.log('e ', form);
    

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
        // if(response.data.docs.length > 0){
        //   var newPass = await md5(await uuidv4())
        //   // var newPass = await md5("12341234")
        //   console.log(newPass)
        //   response.data.docs[0].password = newPass
        //   axios.put(`${COUCHDB_BASE_URL}/e-vaccination/${response.data.docs[0]._id}`,
        //     response.data.docs[0]
        //   ,{
        //     headers: headers
        //   }).then((resp)=>{
        //     if(resp.data.ok){
        //       Alert.alert(
        //         "Success!",
        //         "Password Reset instructions have been sent to your email.",
        //         [
        //           {
        //             text: "Continue",
        //             onPress: () => {
        //               navigation.navigate("Login");
        //             }
        //           }
        //         ],
        //         { cancelable: false }
        //       );
        //     }
        //     else{
        //       Alert.alert(
        //         "Error!",
        //         "Some Error Occured. Please Try Again.",
        //         [
        //           {
        //             text: "Retry",
        //             onPress: () => console.log("Retry Pressed"),
        //             style: "cancel"
        //           }
        //         ],
        //         { cancelable: true }
        //       );
        //     }
        //   }).catch(e=>{
        //     Alert.alert(
        //       "Error!",
        //       "Some Error Occured. Please Try Again.",
        //       [
        //         {
        //           text: "Retry",
        //           onPress: () => console.log("Retry Pressed"),
        //           style: "cancel"
        //         }
        //       ],
        //       { cancelable: true }
        //     );
        //   }) 
        // }
        // else{
        //   Alert.alert(
        //     "Error!",
        //     "Your email is not registered with the E-vaccination system.",
        //     [
        //       {
        //         text: "Retry",
        //         onPress: () => console.log("Retry Pressed"),
        //         style: "cancel"
        //       }
        //     ],
        //     { cancelable: true }
        //   );
        // }
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })
    }
    }
    
    const submitHandler = () => {
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
                    <Input type="name" name="name" require id="examplename" onChange={e=>inputHandler(e)} placeholder="password placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" require onChange={e=>inputHandler(e)} id="exampleEmail" placeholder="with a placeholder" />
                </FormGroup>
                {/* <AvForm onValidSubmit={this.handleValidSubmit} onInvalidSubmit={this.handleInvalidSubmit}>
                  <AvField name="email" label="Email Address" type="email" required />
                  <Button color="primary">Submit</Button>
                </AvForm> */}
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" require id="examplePassword" onChange={e=>inputHandler(e)} placeholder="password placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="examplecontact">Contact</Label>
                    <Input type="contact" name="contact" require id="examplecontact" onChange={e=>inputHandler(e)} placeholder="password placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleaddress">Address</Label>
                    <Input type="address" name="address" require id="exampleaddress" onChange={e=>inputHandler(e)} placeholder="password placeholder" />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
            <Button color="danger" onClick={toggle}>Cancel</Button>
            <Button color="primary" onClick={(a, b) => submitHandler(a, b)}>Save</Button>{' '}
                  
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddWorker;
