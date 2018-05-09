import React from "react";
import { render } from "react-dom";
import { compose, lifecycle } from "recompose";

/*
TITLE:
Add Local State to a Functional Stateless Component using Recompose

DESCRIPTION:
Learn how to use the 'withState' and 'withHandlers' higher order
components to easily add local state to your functional stateless
components. No need for classes!
*/
/*
TITLE:
Add Lifecycle Hooks to a Functional Stateless Component using Recompose

DESCRIPTION:
Learn how to use the 'lifecycle' higher-order component
to conveniently use hooks without using a class component.
*/

const { Component } = React;

const configPromise = fetchConfiguration();

const withConfig = lifecycle({
  state: { config: {} },
  componentDidMount() {
    configPromise.then(config => this.setState({ config }));
  }
});

const User = withConfig(({ name, status, config }) => (
  <div className="User">
    {name}
    {config.showStatus && "—" + status}
    {config.canDeleteUsers && <button>X</button>}
  </div>
));

const App = () => (
  <div>
    <User name="Tim" status="active" />
  </div>
);

render(<App />, document.getElementById("root"));

// Mock Configuration

const config = {
  showStatus: true,
  canDeleteUsers: true
};

function fetchConfiguration() {
  return new Promise(resolve => {
    setTimeout(() => resolve(config), 300);
  });
}
