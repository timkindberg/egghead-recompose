import React from "react";
import { render } from "react-dom";
import { compose, flattenProp, withProps } from "recompose";

/*
TITLE:
Flatten a Prop using Recompose

DESCRIPTION:
Learn how to use the ‘flattenProp’ higher order component to take a
single object prop and spread each of its fields out as a prop.
*/
const { Component } = React;
const { connect } = ReactRedux();

const mapStateToProps = state => ({ user: state.user });

const enhance = compose(connect(mapStateToProps), flattenProp("user"));

const User = enhance(({ name, status }) => (
  <div className="User">
    {" "}
    {name} - {status}{" "}
  </div>
));

const App = () => (
  <div className="App">
    <User />
  </div>
);

render(<App />, document.getElementById("root"));

// Mock Implemenation of ReactRedux connect
function ReactRedux() {
  const state = {
    user: { name: "Tim", status: "active" }
  };

  return {
    connect: map => withProps(map(state))
  };
}
