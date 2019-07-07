import React, { Component } from "react";
import getCurrentUser from "./services/get-current-user.service";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    getCurrentUser().then(currentUser => {
      this.setState({
        user: currentUser,
        loading: false
      });
    });
  }
  render() {
    if (!this.state.loading) {
      return (
        <div className="App">
          <h1>
            Hello {this.state.user.LAST_NAME} {this.state.user.NAME}
          </h1>
          <h2>Start editing to see some magic happen!</h2>
        </div>
      );
    } else {
      return (
        <div>Загрузка...</div>
      )
    }
  }
}

export default App;
