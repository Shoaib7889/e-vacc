import React from "react";
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

import AddWorker from "./create-drawer";
import Widget from "../../../components/Widget/Widget";
import s from "./Static.module.scss";
import { Drawer } from "antd";

import { COUCHDB_BASE_URL } from '../../urls';
// import { uuid } from 'uuid/v4';
import {v4 as uuid} from 'uuid';
var md5 = require('md5');
const axios = require('axios');
global.Buffer = global.Buffer || require('buffer').Buffer


class Workers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records:[],
      tableStyles: [
        {
          id: 1,
          name:'Shaoib',
          address:'Lahore',
          contact:'2323'
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 2,
          name:'Shaoib',
          address:'Lahore',
          contact:'2323'
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 3,
          name:'Shaoib',
          address:'Lahore',
          contact:'2323'
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 4,
          name:'Shaoib',
          address:'Lahore',
          contact:'2323'
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 5,
          name:'Shaoib',
          address:'Lahore',
          contact:'2323'
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
      visible:false
    };

    this.checkAll = this.checkAll.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount(){
    const token = Buffer.from(`${"admin"}:${"password"}`, 'utf8').toString('base64')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      }
 
        const uid = uuid();
      axios.get(`${COUCHDB_BASE_URL}/e-vaccination/_all_docs`,{
        headers: headers
      }).then(async response=>{
          console.log(response.data)
          if(response.data.length>0){
            this.setState({records:response.data.rows})
          }
          return;
        
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })    
  }

  toggle = () => {
    this.setState({ visible: !this.state.visible });
    // alert('grrrrr');
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  // parseDate(date) {
  //   this.dateSet = date.toDateString().split(" ");

  //   return `${date.toLocaleString("en-us", { month: "long" })} ${
  //     this.dateSet[2]
  //   }, ${this.dateSet[3]}`;
  // }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }

  render() {
    return (
      <div className={s.root}>
        
        <h2 className="page-title">
          Workers - <span className="fw-semi-bold">Info
            <Button color="primary" className="ml-3" onClick={this.toggle}>Add worker</Button>
          </span>
        <AddWorker
          modal={this.state.visible}
          toggle={this.toggle}
        />
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                   <span className="fw-semi-bold">Workers</span>
                </h5>
              }
              settings
              close
              bodyClass={s.mainTableWidget}
            >
              <Table striped>
                <thead>
                  <tr className="fs-sm">
                    <th className="hidden-sm-down">#</th>
                    <th className="hidden-sm-down">Name</th>
                    <th className="hidden-sm-down">Address</th>
                    <th className="hidden-sm-down">Contact</th>
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.records.length>0 ? this.state.records.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      
                      <td>
                        <p className="mb-0">
                          {row.name}
                        </p>
                        
                      </td>
                      <td className="text-muted">{(row.address)}</td>
                      <td className="text-muted">{row.contact}</td>
                      <td className="width-150">
                        <Progress
                          color={row.progress.colorClass}
                          value={row.progress.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>
                  )): this.state.tableStyles.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      
                      <td>
                        <p className="mb-0">
                          {row.name}
                        </p>
                        
                      </td>
                      <td className="text-muted">{(row.address)}</td>
                      <td className="text-muted">{row.contact}</td>
                      <td className="width-150">
                        <Progress
                          color={row.progress.colorClass}
                          value={row.progress.percent}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Workers;
