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

import Widget from "../../../components/Widget/Widget";
import s from "./Static.module.scss";
import { COUCHDB_BASE_URL } from '../../urls';
// import { uuid } from 'uuid/v4';
import {v4 as uuid} from 'uuid';
var md5 = require('md5');
const axios = require('axios');
global.Buffer = global.Buffer || require('buffer').Buffer


class NonVaccinatedAreas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areas:[],
      tableStyles: [
        {
          id: 1,
          name:'#206',
          picture: require("../../../images/tables/1.png"), // eslint-disable-line global-require
          description: "Fully Vaccinated",
          info: {
            type: "JPEG",
            dimensions: "200x150",
          },
          date: 5,
          size: "45.6 KB",
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 2,
          name:'#204',
          picture: require("../../../images/tables/2.png"), // eslint-disable-line global-require
          description: "Fully Vaccinated",
          info: {
            type: "PSD",
            dimensions: "2400x1455",
          },
          date: 6,
          size: "15.3 MB",
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
      ],
      checkboxes1: [false, true, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };
    

    this.checkAll = this.checkAll.bind(this);
  }
  componentDidMount(){
    const token = Buffer.from(`${"admin"}:${"admin123"}`, 'utf8').toString('base64')
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${token}`,
      }
 
        const uid = uuid();
    axios.post(`${COUCHDB_BASE_URL}/e-vaccination/_find`, {
      'selector': {
          'table':'houses'
        }
      },{
        headers: headers
      }).then(async response=>{
          console.log(response.data)
          if(response.data.docs.length>0){
            this.setState(old => ({
              ...old,
              areas: response.data.docs
            }))
          }
          return;
        
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })    
  }


  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

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
          Vaccinated -<span className="fw-semi-bold">Areas</span>
        </h2>
        <Row>
          <Col>
            <Widget
              title={
                <h5>
                   <span className="fw-semi-bold">Areas</span>
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
                    <th className="hidden-sm-down">Number</th>
                    <th>Description</th>
                    {/* <th className="hidden-sm-down">#Houses</th> */}
                    <th className="hidden-sm-down">#Population</th>
                    {/* <th className="hidden-sm-down">Size</th> */}
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.areas.length>0 ? this.state.areas.map((row,index) => row.status ==='warning' ? (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{row.houseNo}</td>
                      <td>
                        {row.status ==='warning' ? 'Non vaccinated' :' Vaccinated'}
                      </td>
                      <td className="text-muted">{(parseInt(row.NoOfPeople))}</td>
                      <td className="width-150">
                        <Progress
                          color={row.status ==='warning'?'danger':'success'}
                          value={row.status ==='warning'?'50':'100'}
                          className="progress-sm mb-xs"
                        />
                      </td>
                    </tr>
                  ):''): this.state.tableStyles.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.number}</td>
                      <td>
                        {row.description}
                      </td>
                      <td className="text-muted">{(row.population)}</td>
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

export default NonVaccinatedAreas;
