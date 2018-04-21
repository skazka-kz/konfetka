import React, { Component } from "react";

export default function adminDashboard(importContent) {
  class AsyncComponent extends Component {
    constructor() {
      super();

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importContent();
      this.setState({ component });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
