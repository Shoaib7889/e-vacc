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

class Areas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areas:[],
      tableStyles: [
        {
          id: 1,
          number:'#23',
          description:'Fully Vaccinated',
          population:'3',
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 2,
          number:'#24',
          description:'Fully Vaccinated',
          population:'3',
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 3,
          number:'#25',
          description:'Partially Vaccinated',
          population:'3',
          progress: {
            percent: 50,
            colorClass: "danger",
          },
        },
        {
          id: 4,
           number:'#26',
          description:'Non Vaccinated',
          population:'3',
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 5,
          number:'#27',
          description:'Non Vaccinated',
          population:'3',
          progress: {
            percent: 38,
            colorClass: "inverse",
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
            this.setState({areas:response.data.rows})
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
          All - <span className="fw-semi-bold">Areas</span>
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
                    
                    <th className="hidden-sm-down">#Population</th>
                    
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.area.length>0 ? this.state.areas.map((row) => (
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
                  )): this.state.tableStyles.map((row) => (
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

export default Areas;
