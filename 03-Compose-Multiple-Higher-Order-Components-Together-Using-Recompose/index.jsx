/*
TITLE: Compose Multiple Higher Order Components Together using Recompose

DESCRIPTION: Learn how to use the 'compose' function to mix together
higher-order components, even ones from other libraries like 'connect'
from redux.
*/
const { Component } = React;
const { compose, setDisplayName, setPropTypes } = Recompose;
const { connect } = Redux();

const enhance = compose(
  setDisplayName('User'),
  setPropTypes({
    name: React.PropTypes.string.isRequired,
    status: React.PropTypes.string
  }),
  connect()
);

const User = enhance(({ name, status, dispatch }) =>
  <div
    className="User"
    onClick={ () => dispatch({ type: 'USER_SELECTED' }) }>
    { name }: { status }
  </div>
);

console.log(User.displayName);

ReactDOM.render(
  <User name="Tim" status="active" />,
  document.getElementById('main')
);

function Redux() {
  return {
    connect: () => (BaseComponent) => (props) =>
      <BaseComponent
        {...props}
        dispatch={ ({ type }) => console.log(type + ' dispatched') }
      />
  }
}
