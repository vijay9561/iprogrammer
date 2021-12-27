import React from "react";
import './App.css';
class App extends React.Component {

  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      ObjectData: [],
      newObject: {},
      DataisLoaded: false
    };
  }

  // ComponentDidMount is used to
  // execute the code 
  componentDidMount() {
    const prepareOnly9Recod = [];
    fetch(
      "https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((json) => {
        json.forEach(item => {
          if (prepareOnly9Recod.length < 9) {
            item.flag = "false"
            prepareOnly9Recod.push(item);
          }
        });
        this.setState({
          DataisLoaded: true,
          data: prepareOnly9Recod,
        })
      })
  }
  handleClick = (items) => {
    const prepareOnly9Recod = [];
    this.state.data.forEach(item => {
      if (item.id == items.id) item.flag = "true"
      prepareOnly9Recod.push(item);
    });
    this.setState({ ObjectData: [...this.state.ObjectData, items], data: prepareOnly9Recod })
  }

  deleteobject = (items) => {
    console.log("ObjectData", items);
    // const newList = (this.state.ObjectData.length == 1) ? this.state.ObjectData.splice(items, -1) : this.state.ObjectData.splice(this.state.ObjectData.indexOf(items), 1);
    const newList = this.state.ObjectData.filter(itemInArray => itemInArray.id !== items.id);
    console.log(newList)
    const prepareOnly9Recod = [];
    this.state.data.forEach(item => {
      if (item.id == items.id) item.flag = "false"
      prepareOnly9Recod.push(item);
    });
    console.log("newList", newList);
    this.setState({ ObjectData: newList, data: prepareOnly9Recod })
  }

  persento = (record) => {
    const { ObjectData } = this.state;
    console.log("record", record, "ObjectData", ObjectData)
    const result = ObjectData.filter(item => item.id === record.id);
    if (!result) return "true";
    return "false";
  }

  render() {
    const { DataisLoaded, data, ObjectData } = this.state;
    if (!DataisLoaded) return <div>
      <h1> Pleses wait some time.... </h1> </div>;

    return (
      <div className="App">
        <h1> IPROGRAMMER TEST </h1>
        <div className="row">
          {data.map((item) => (
            <div className="column">
              <img src={item.url} style={{ width: '100%', height: '150px' }}></img>

              <p>{(item.title.length <= 30) ? item.title : item.title.substring(0, 30) + ' ' + '...'}</p>
              <p>{item.id}</p>
              <p>{item.url}</p>
              {(item.flag == "true") ?
                <button className="button-7" onClick={() => this.deleteobject(item)} role="button">Remove</button> :
                <button className="button-7" onClick={() => this.handleClick(item)} role="button">Add to List</button>}
            </div>
          ))
          }
          {ObjectData.length ?

            <table style={{ width: '76%' }}>
              <tr><th colSpan="4" style={{ textAlign: 'center', backgroundColor: "#000", color: "#fff" }}>COMPARISON TABLE</th></tr>
              <tr>
                <th>Image</th>
                <th>ID</th>
                <th>URL</th>
                <th>Title</th>
              </tr>
              {ObjectData.map((item) => (
                <tr>
                  <td><img src={item.url} style={{ width: '200px', height: '150px' }}></img></td>
                  <td>{item.id}</td>
                  <td>{item.url}</td>
                  <td>{item.title}</td>
                </tr>
              ))
              }
            </table>
            : null}
        </div>
      </div >
    );
  }
}

export default App;