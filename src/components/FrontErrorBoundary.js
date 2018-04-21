import React, { Component } from "react";

class FrontErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      console.log(this.state.error, this.state.info);
      return (
        <div>
          <h1>{this.state.error.code} Error occurred!</h1>
          <p>{this.state.error.message}</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default FrontErrorBoundary;