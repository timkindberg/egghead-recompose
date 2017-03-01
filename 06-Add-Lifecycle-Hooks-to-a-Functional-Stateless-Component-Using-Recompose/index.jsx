/*
TITLE:
Add Lifecycle Hooks to a Functional Stateless Component using Recompose

DESCRIPTION:
Learn how to use the 'lifecycle' higher-order component
to conveniently use hooks without using a class component.
*/

const { Component } = React;
const { compose, lifecycle } = Recompose;

const configPromise = fetchConfiguration();

const withConfig = lifecycle({
  getInitialState() {
    return { config: {} }
  },
  componentDidMount() {
    configPromise.then((config) =>
      this.setState({ config }));
  }
});

const User = withConfig(({ name, status, config }) =>
  <div className="User">
    { name }
    { config.showStatus && '—' + status }
    { config.canDeleteUsers && <button>X</button> }
  </div>
);

const App = () =>
  <div>
    <User name="Tim" status="active" />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

const config = {
  showStatus: true,
  canDeleteUsers: true
}

function fetchConfiguration() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(config), 300);
  });
}
