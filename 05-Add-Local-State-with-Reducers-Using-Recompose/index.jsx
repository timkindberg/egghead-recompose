/*
TITLE:
Add Local State Using Reducers using Recompose

DESCRIPTION:
Learn how to use the 'withReducer' higher-order component
using the alternative reducer form. If you like using
reducers in redux, you’ll be able to reuse that same
technique but for local state.
*/

const { Component } = React;
const { compose, withReducer } = Recompose;

const toggleReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return true;
    case 'HIDE':
      return false;
    case 'TOGGLE':
      return !state;
    default:
      return state;
  }
}

const withToggling = withReducer(
  'toggledOn',
  'dispatch',
  toggleReducer,
  false
);

const StatusList = () =>
  <div className="StatusList">
    <div>pending</div>
    <div>inactive</div>
    <div>active</div>
  </div>;

const Status = withToggling(({ status, dispatch, toggledOn }) =>
  <span onClick={ () => dispatch({ type: 'TOGGLE' }) }>
    { status }
    { toggledOn && <StatusList /> }
  </span>
);

const Tooltip = withToggling(({ text, children, dispatch, toggledOn }) =>
  <span>
    { toggledOn && <div className="Tooltip">{ text }</div> }
    <span
      onMouseEnter={ () => dispatch({ type: 'SHOW' }) }
      onMouseLeave={ () => dispatch({ type: 'HIDE' }) }
    >
      { children }
    </span>
  </span>
);

const User = ({ name, status, dispatch }) =>
  <div className="User">
    <Tooltip text="Cool Dude!">{ name }</Tooltip>—
    <Status status={ status } />
  </div>;

const App = () =>
  <div>
    <User name="Tim" status="active" />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
