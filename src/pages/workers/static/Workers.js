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

class Workers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tableStyles: [
        {
          id: 1,
          picture: require("../../../images/tables/1.png"), // eslint-disable-line global-require
          description: "Palo Alto",
          info: {
            type: "Shoaib",
            dimensions: "200x150",
          },
          date: 'Kasur',
          size: "45.6 KB",
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 2,
          picture: require("../../../images/tables/2.png"), // eslint-disable-line global-require
          description: "The Sky",
          info: {
            type: "Huzaifa",
            dimensions: "2400x1455",
          },
          date: 'Miawali',
          size: "15.3 MB",
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 3,
          picture: require("../../../images/tables/3.png"), // eslint-disable-line global-require
          description: "Down the road",
          label: {
            colorClass: "primary",
            text: "INFO!",
          },
          info: {
            type: "Hamza",
            dimensions: "200x150",
          },
          date: 'Lahore',
          size: "49.0 KB",
          progress: {
            percent: 38,
            colorClass: "inverse",
          },
        },
        {
          id: 4,
          picture: require("../../../images/tables/4.png"), // eslint-disable-line global-require
          description: "The Edge",
          info: {
            type: "Ali Ahmad",
            dimensions: "210x160",
          },
          date: 'Okara',
          size: "69.1 KB",
          progress: {
            percent: 100,
            colorClass: "success",
          },
        },
        {
          id: 5,
          picture: require("../../../images/tables/5.png"), // eslint-disable-line global-require
          description: "Fortress",
          info: {
            type: "Bushra SAleem",
            dimensions: "1452x1320",
          },
          date: 'Lahore',
          size: "2.3 MB",
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

  toggle = () => {
    this.setState({ visible: !this.state.visible });
    // alert('grrrrr');
  };
  onClose = () => {
    this.setState({ visible: false });
  };

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
                    {/* <th>Picture</th> */}
                    {/* <th>Description</th> */}
                    <th className="hidden-sm-down">Name</th>
                    <th className="hidden-sm-down">Address</th>
                    <th className="hidden-sm-down">Contact</th>
                    <th className="hidden-sm-down">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tableStyles.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      {/* <td>
                        <img
                          className="img-rounded"
                          src={row.picture}
                          alt=""
                          height="50"
                        />
                      </td> */}
                      
                      <td>
                        <p className="mb-0">
                          {row.info.type}
                        </p>
                        
                      </td>
                      <td className="text-muted">{(row.date)}</td>
                      <td className="text-muted">{row.size}</td>
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
