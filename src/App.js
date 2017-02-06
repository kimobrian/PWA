import React, { Component } from 'react';
import './App.css';


const Uploads = ({onChange}) =>
  <div>
    <label htmlFor="files" className="Uploads-select">Select files...</label>
    <input 
      type="file" 
      id="files" 
      multiple 
      accept="image/*" 
      style={{display: 'none'}} 
      onChange={onChange}
    />
  </div>;

const Results = ({files}) => {
  if (files.length === 0) {return <span/>;}
  return (
    <table className="Results-table">
      <tbody>
      <tr><th>Image</th><th>filename</th><th>size</th><th>mime</th></tr>
      {files.map((f, idx) => {
        if (!f.type.startsWith('image/')) {
          return null;
        }
        return (
          <tr key={idx}>
            <td><img alt={f.name} src={window.URL.createObjectURL(f)} height="60" /></td>
            <td>{f.name}</td>
            <td>{f.size}</td>
            <td>{f.type}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
    };
    document.documentElement.ondragenter = e => e.preventDefault();
    document.documentElement.ondragover = e => e.preventDefault();
    document.documentElement.ondrop = e => {
      e.preventDefault();
      this.update(e.dataTransfer.files); // dropped files
    }
  }

handleUploads(e) { 
  this.update(e.target.files); // from file input
}

update(moreFiles) {
  const files = Array.from(moreFiles);
  if (!files) {
    return;
  }
  this.setState({
    files: this.state.files.concat(files)
  });
}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Upload me some images</h1>
          <p>pst, you can just drop them anywhere</p>
        </div>
        <div className="Tool-in">
          <Uploads onChange={this.handleUploads.bind(this)} />
        </div>
        <div className="Tool-out">
          <Results files={this.state.files} />
        </div>
      </div>
    );
  }
}

export default App;
