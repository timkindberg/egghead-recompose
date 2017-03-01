/*
TITLE:
Flatten a Prop using Recompose

DESCRIPTION:
Learn how to use the ‘flattenProp’ higher order component to take a
single object prop and spread each of its fields out as a prop.
*/
const { Component } = React;
const { flattenProp } = Recompose;

const enhance = flattenProp('user');

const User = enhance(({ name, status }) =>
  <div className="User">{ name }—{ status }</div>
);

const user = { name: 'Tim', status: 'active' };

const App = () =>
  <div className="App">
    <User user={ user } />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
