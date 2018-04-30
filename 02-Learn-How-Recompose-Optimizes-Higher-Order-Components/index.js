import { React, Component } from "react";
import { Render } from "react-dom";
import PropTypes from "prop-types";
import { compose, setDisplayName, setPropTypes } from "recompose";
/*
TITLE: Compose Multiple Higher Order Components Together using Recompose

DESCRIPTION: Learn how to use the 'compose' function to mix together
higher-order components, even ones from other libraries like 'connect'
from redux.
*/
const { connect } = Redux();
const enhance = compose(
  setDisplayName("User"),
  setPropTypes({
    name: PropTypes.string.isRequired,
    status: PropTypes.string
  }),
  connect()
);

const User = enhance(({ name, status, dispatch }) => (
  <div className="User" onClick={() => dispatch({ type: "USER_SELECTED" })}>
    {name}: {status}
    console.log(User.displayName);
    {Render} ( <User name="Tim" status="active" />,
    document.getElementById('main'));
  </div>
));

// fake implementation of redux

function Redux() {
  return {
    connect: () => BaseComponent => props => (
      <BaseComponent
        {...props}
        dispatch={({ type }) => console.log(type + " dispatched")}
      />
    )
  };
}
