import React, { Component } from 'react';
import './App.css';

class App extends Component {
 
  state = {
     response: '', 
     task: '', 
     status:'',
     responseToPost: '', 
    };
  componentDidMount() { this.callApi().then(res => this.setState({ response: res.express })).catch(err => console.log(err)); }
  callApi = async () => {
    const response = await fetch('/tasks'); const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault(); 
    const response = await fetch('/tasks', 
                    { method: 'POST', 
                      headers: 
                      { 
                        'Content-Type': 'application/json', 
                      }, 
                      body: JSON.stringify(
                        { 
                          task: this.state.task, 
                          status:this.state.status
                        }), 
                      }); 
                      const body = await response.text();

                      this.setState({ responseToPost: body });  
                    
                    };
    render() {    
      return (      
      <div className="App">        
        <header className="App-header">          
          
          <p>{this.state.response}</p><form onSubmit={this.handleSubmit}><p><strong>Post to Server:</strong></p>
          <label for="cheese">Task</label>
          <input type="text" id="taskname" value={this.state.task} onChange={e => this.setState({ task: e.target.value })}/>
            &nbsp;&nbsp;&nbsp;
          <label for="cheese">Status</label>
          <input type="text" id="taskstatus" value={this.state.status} onChange={e => this.setState({ status: e.target.value })}/>
          <button type="submit">Submit</button></form>
          <p>{this.state.responseToPost}</p>
          </header>        

          </div>
          );  
          }






                        

  }
  export default App;
