/*
TITLE:
Render Nothing in Place of a Component using Recompose

DESCRIPTION:
Learn how to use the ‘branch’ and ‘renderNothing’
higher-order components to render nothing when a
certain prop condition is met. Sometimes you only
want to render a component when valid props exist
or are in a certain condition; ‘renderNothing’ is
an easy way to completely remove the component when
you don’t need to show it.
*/
const { Component } = React;
const { compose, branch, renderNothing } = Recompose;

const User = ({ name, status }) =>
  <div className="User">{ name }—{ status }</div>;

const userIsNotActive = ({ user }) => user.status !== 'active';

const enhance = compose(
  branch(userIsNotActive, renderNothing)
);

const FeaturedUser = enhance(({ user: { name, status } }) =>
  <div>
    <h3>Today's Featured User</h3>
    <User name={ name } status={ status } />
    <hr />
  </div>
);

const UserList = ({ users }) =>
  <div className="UserList">
    <h3>All Users</h3>
    { users && users.map((user) => <User {...user} />) }
  </div>;

const users = [
  { name: "Tim", status: "active" },
  { name: "Bob", status: "active" },
  { name: "Joe", status: "inactive" },
  { name: "Jim", status: "pending" },
];

const featuredUser = users[0];

const App = () =>
  <div className="App">
    <h2>User Management</h2>
    <hr />
    <FeaturedUser user={ featuredUser } />
    <UserList users={ users } />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
