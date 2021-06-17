import React from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

import Widget from "../../components/Widget";

import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";
import AnimateNumber from "react-animated-number";




import s from "./Dashboard.module.scss";

import peopleA1 from "../../images/people/a1.jpg";
import peopleA2 from "../../images/people/a2.jpg";
import peopleA5 from "../../images/people/a5.jpg";
import peopleA4 from "../../images/people/a4.jpg";
import { COUCHDB_BASE_URL } from '../urls';
// import { uuid } from 'uuid/v4';
import {v4 as uuid} from 'uuid';
const axios = require('axios');
global.Buffer = global.Buffer || require('buffer').Buffer

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses:null,
      vaccinatedHouses: null,
      nonVaccinatedHouses: null,
      workers:null,
      graph: null,
      checkedArr: [false, false, false],
    };
    this.checkTable = this.checkTable.bind(this);
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
        'table':'workers'
        }
      }, {
        headers: headers
      }).then(async response=>{
          // console.log('fst ',response.data)
        const noOfWorkers = response.data.docs.length;
        this.setState(old => ({ old, workers: noOfWorkers }))
        console.log('fst ', noOfWorkers);
          return;
        
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })
    axios.post(`${COUCHDB_BASE_URL}/e-vaccination/_find`, {
      'selector': {
        'table':'houses'
        }
      }, {
        headers: headers
      }).then(async response=>{
        const noOfHouses = response.data.docs.length;
        let nonVacc=0;
        response.data.docs.map(house => {
          if (parseInt(house.NoOfPeopleNotVaccinated) > 0) {
            nonVacc++ 
          }
        })
        console.log('2nd ', noOfHouses, nonVacc);
        
        this.setState(old => ({
          ...old,
          houses: noOfHouses,
          nonVaccinatedHouses: nonVacc,
          vaccinatedHouses:noOfHouses-nonVacc
        }))
        
          return;
        
      }).catch(e=>{
        console.log("Fdsa")
        // alert('ok')
      })    
    console.log('state ', this.state);
  }

  checkTable(id) {
    let arr = [];
    if (id === 0) {
      const val = !this.state.checkedArr[0];
      for (let i = 0; i < this.state.checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = this.state.checkedArr;
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    this.setState({
      checkedArr: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h1 className="page-title">
          Demographics &nbsp;
          <small>
            <small>Red Zones</small>
          </small>
        </h1>

        <Row>
          <Col lg={7}>
            <Widget className="bg-transparent">
              <Map population={this.state.houses} />
            </Widget>
          </Col>
          <Col lg={1} />

          <Col lg={4}>
            <Widget
              className="bg-transparent"
              title={
                <h5>
                  {" "}
                  Map
                  <span className="fw-semi-bold">&nbsp;Statistics</span>
                </h5>
              }
              settings
              refresh
              close
            >
              <p>
                Status: <strong>Going on</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-map-marker" />
                </span>{" "}
                &nbsp; 1 City, 14 Regions
              </p>
              {/* <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Vaccinated</h6>
                  <Progress
                    color="primary"
                    value="60"
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={75} />%
                    </small>
                  </span>
                </div>
              </div> */}
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Vaccinated</h6>
                  <Progress
                    color="success"
                    value={String(this.state.vaccinatedHouses)+"0"}
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={92} />%
                    </small>
                  </span>
                </div>
              </div>
              <div className="row progress-stats">
                <div className="col-md-9 col-12">
                  <h6 className="name fw-semi-bold">Non-Vaccinated</h6>
                  <Progress
                    color="danger"
                    value={String(this.state.nonVaccinatedHouses)+"0"}
                    className="bg-custom-dark progress-xs"
                  />
                </div>
                <div className="col-md-3 col-12 text-center">
                  <span className="status rounded rounded-lg bg-default text-light">
                    <small>
                      <AnimateNumber value={84} />%
                    </small>
                  </span>
                </div>
              </div>
              
              <h6 className="fw-semi-bold mt">Map Distributions</h6>
              <p>
                Tracking: <strong>Active</strong>
              </p>
              {/* <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-cog" />
                </span>
                &nbsp; 391 elements installed, 84 sets
              </p> */}
              {/* <div className="input-group mt">
                <input
                  type="text"
                  className="form-control bg-custom-dark border-0"
                  placeholder="Search Map"
                />
                <span className="input-group-btn">
                  <button
                    type="submit"
                    className={`btn btn-subtle-blue ${s.searchBtn}`}
                  >
                    <i className="fa fa-search text-light" />
                  </button>
                </span>
              </div> */}
            </Widget>
          </Col>
        </Row>

        <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> Vaccinated </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Growth</h6>
                  <p className="value">{String(this.state.vaccinatedHouses)+"0"} 567 318</p>
                </div>
                <div className="stat-item">
                  {/* <h6 className="name">Montly</h6>
                  <p className="value">10.38%</p> */}
                </div>
                
              </div>
              <Progress
                color="success"
                value={String(this.state.vaccinatedHouses)+"0"}
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-up" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;17% lower</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> Non-Vaccinated </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name">Overall Values</h6>
                  <p className="value">{String(this.state.vaccinatedHouses)+"0"} 967 000</p>
                </div>
                <div className="stat-item">
                  {/* <h6 className="name">Montly</h6>
                  <p className="value">55 120</p> */}
                </div>
                
              </div>
              <Progress
                color="danger"
                value={String(this.state.nonVaccinatedHouses)+"0"}
                className="bg-custom-dark progress-xs"
              />
              <p>
                <small>
                  <span className="circle bg-default text-white mr-2">
                    <i className="fa fa-chevron-down" />
                  </span>
                </small>
                <span className="fw-semi-bold">&nbsp;8% higher</span>
                &nbsp;than last month
              </p>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> Number Of Workers </h6>} close settings>
              <div className="stats-row">
                <div className="stat-item">
                  <h6 className="name fs-sm">Total workers</h6>
                  <p className="value">&nbsp;{this.state.workers}</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">Allocated workers</h6>
                  <p className="value">{this.state.workers}</p>
                </div>
                <div className="stat-item">
                  <h6 className="name fs-sm">Non Allocated</h6>
                  <p className="value">0</p>
                </div>
              </div>
              <Progress
                color="bg-primary"
                value="100"
                className="bg-custom-dark progress-xs"
              />
              <p>
                {/* <span className="fw-semi-bold">&nbsp;90% on work</span> */}
              </p>
            </Widget>
          </Col>
        </Row>

        <Row>
          <Col lg={6} xs={12}>
            <Widget
              title={
                <h6>
                  <span className="badge badge-success mr-2"> </span>Areas Visited
                </h6>
              }
              refresh
              close
            >
              <div className="widget-body undo_padding">
                <div className="list-group list-group-lg">
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA2}
                        alt="..."
                      />
                      <i className="status status-bottom bg-success" />
                    </span>
                    <div>
                      <h6 className="m-0">Muhammad Shoaib</h6>
                      <p className="help-block text-ellipsis m-0">
                        Lahore Area is visited 
                      </p>
                    </div>
                  </button>
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA4}
                        alt="..."
                      />
                      <i className="status status-bottom bg-success" />
                    </span>
                    <div>
                      <h6 className="m-0">Abdul Rehman</h6>
                      <p className="help-block text-ellipsis m-0">
                        Lahore Area is visited 
                      </p>
                    </div>
                  </button>
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA1}
                        alt="..."
                      />
                      <i className="status status-bottom bg-default" />
                    </span>
                    <div>
                      <h6 className="m-0">Sameer Ameen</h6>
                      <p className="help-block text-ellipsis m-0">
                        Lahore Area is visited 
                      </p>
                    </div>
                  </button>
                  <button className="list-group-item text-left">
                    <span className="thumb-sm float-left mr">
                      <img
                        className="rounded-circle"
                        src={peopleA5}
                        alt="..."
                      />
                      <i className="status status-bottom bg-danger" />
                    </span>
                    <div>
                      <h6 className="m-0">Shoaib</h6>
                      <p className="help-block text-ellipsis m-0">
                        Lahore Area is visited 
                      </p>
                    </div>
                  </button>
                </div>
              </div>
              <footer className="bg-widget-transparent mt">
                ''
              </footer>
            </Widget>
          </Col>
          <Col lg={6} xs={12}>
            <Widget
              title={<h6>Calendar</h6>}
              settings
              close
              bodyClass={"pt-2 px-0 py-0"}
            >
              <Calendar />
              <div className="list-group fs-mini">
                <button className="list-group-item text-ellipsis">
                  <span className="badge badge-pill badge-primary float-right">
                  </span>
                </button>
                <button className="list-group-item text-ellipsis">
                  <span className="badge badge-pill badge-success float-right">
                  </span>
                </button>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
