/*
TITLE:
Replace a Component with Non-Optimal States using Recompose

DESCRIPTION:
Learn how to use the ‘branch’ and ‘renderComponent’
higher-order components to show errors or messaging when
your component is in a non-optimal state. Avoid putting
extraneous logic to show errors or messaging into your
core component by organizing your non-optimal states into
custom higher-order components.
*/

const { Component } = React;
const { compose, lifecycle, branch, renderComponent } = Recompose;

const User = ({ name, status }) =>
  <div className="User">{ name }—{ status }</div>;

const withUserData = lifecycle({
  componentDidMount() {
    fetchData().then(
      (users) => this.setState({ users }),
      (error) => this.setState({ error })
    );
  }
});

const UNAUTHENTICATED = 401;
const UNAUTHORIZED = 403;
const errorMsgs = {
  [UNAUTHENTICATED]: 'Not Authenticated!',
  [UNAUTHORIZED]: 'Not Authorized!',
};

const AuthError = ({ error }) =>
  error.statusCode &&
    <div className="Error">{ errorMsgs[error.statusCode] }</div>;

const NoUsersMessage = () =>
  <div>There are no users to display</div>;

const hasErrorCode = ({ error }) => error && error.statusCode;
const hasNoUsers = ({ users }) => users && users.length === 0;

const nonOptimalStates = (states) =>
  compose(...states.map(state =>
    branch(state.when, renderComponent(state.render))));

const enhance = compose(
  withUserData,
  nonOptimalStates([
    { when: hasErrorCode, render: AuthError },
    { when: hasNoUsers, render: NoUsersMessage }
  ])
);

const UserList = enhance(({ users, error }) =>
  <div className="UserList">
    { users && users.map((user) => <User {...user} />) }
  </div>
);

const App = () =>
  <div className="App">
    <UserList />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

// Mock Service
const noUsers = [];
const users = [
  { name: "Tim", status: "active" },
  { name: "Bob", status: "active" },
  { name: "Joe", status: "inactive" },
  { name: "Jim", status: "pending" },
];
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject({ statusCode: UNAUTHENTICATED });
      // reject({ statusCode: UNAUTHORIZED })
      resolve(noUsers);
      // resolve(users);
    }, 100);
  });
}
