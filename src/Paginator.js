import React, { Component } from "react";
import App from "./App";
import { peopleData } from "./graphql/schema";

const LIMIT_PER_PAGE = 2;

class Paginator extends Component {
  state = {
    page: 1
  };

  setPage = (page) => {
    this.setState({ page });
  };

  render() {
    return (
      <App
        page={this.state.page}
        limitPerPage={LIMIT_PER_PAGE}
        dataToMatch={peopleData.slice((this.state.page - 1)*LIMIT_PER_PAGE, this.state.page*LIMIT_PER_PAGE)}
        setPage={this.setPage}
      />
    );
  }
}

export default Paginator;
