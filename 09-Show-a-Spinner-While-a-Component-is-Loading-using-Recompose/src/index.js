import React from "react";
import { render } from "react-dom";
import { compose, lifecycle, branch, renderComponent } from "recompose";

/*
TITLE:
Show a Spinner While a Component is Loading using Recompose

DESCRIPTION:
Learn how to use the 'branch' and 'renderComponent'
higher-order components to show a spinner while a
component loads.
*/

const { Component } = React;

const withUserData = lifecycle({
  state: { loading: true },
  componentDidMount() {
    fetchData().then(data => this.setState({ loading: false, ...data }));
  }
});

const Spinner = () => (
  <div className="Spinner">
    <div className="loader">Loading...</div>
  </div>
);

const isLoading = ({ loading }) => loading;

const withSpinnerWhileLoading = branch(isLoading, renderComponent(Spinner));

const enhance = compose(withUserData, withSpinnerWhileLoading);

const User = enhance(({ name, status }) => (
  <div className="User">
    {name}—{status}
  </div>
));

const App = () => (
  <div>
    <User />
  </div>
);

render(<App />, document.getElementById("root"));

function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ name: "Tim", status: "active" }), 1500);
  });
}
