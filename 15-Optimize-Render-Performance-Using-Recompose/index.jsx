/*
TITLE:
Optimize Render Performance using Recompose

DESCRIPTION:
Learn how and when to use the ‘shouldUpdate’, ‘pure’, ‘onlyUpdateForKeys’,
and ‘onlyUpdateForPropTypes’ higher order components. Each one provides a
certain granularity of control around prevention of unnecessary renders.
Learn how they build upon each other to provide different options.
*/
const { Component } = React;
const { createStore } = Redux;
const { Provider, connect } = ReactRedux;
const { fromJS } = Immutable;
const { withPropsOnChange, compose, lifecycle,
        setPropTypes, shouldUpdate, pure,
        onlyUpdateForKeys, onlyUpdateForPropTypes } = Recompose;

// const optimizeUser = onlyUpdateForKeys(['selected', 'chore']);

const optimizeUser = compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    selected: React.PropTypes.string,
  })
);

const UserAssign = compose(
  connect(
    state => ({ users: getAllUsers(state) }),
    { assignChore }
  ),
  optimizeUser
)(({ selected, chore, users, assignChore }) =>
  <select
    value={ selected }
    onChange={ (e) => assignChore(chore, e.target.value) }
    style={{ borderColor: randomColor() }}
  >
    { users.map((u, i) =>
      <option key={ i } value={ u.id }>{ u.name }</option>) }
  </select>
);

// #1
// const optimize = shouldUpdate((props, nextProps) => true);

// #2
// const optimize = shouldUpdate((props, nextProps) =>
//   props.chore.name !== nextProps.chore.name ||
//   props.chore.complete !== nextProps.chore.complete ||
//   props.user.id !== nextProps.user.id
// );

// #3
// const optimize = pure;

// #4
// const optimize = onlyUpdateForKeys([]);

// #5
// const optimizeChore = onlyUpdateForKeys(['complete', 'name', 'user'])

// #6
const optimizeChore = compose(
  onlyUpdateForPropTypes,
  setPropTypes({
    complete: React.PropTypes.bool,
    name: React.PropTypes.string,
    user: React.PropTypes.string
  })
);

const Chore = compose(
  connect(
    (state, { id }) => getChoreById(state, id),
    { renameChore, setChoreStatus }
  ),
  optimizeChore
)(({ id, name, user, complete, renameChore, setChoreStatus }) =>
  <div>
    <input
      type="checkbox" checked={ complete }
      onChange={ () => setChoreStatus(id, !complete) }
    />
    <UserAssign selected={ user } chore={ id } />
    { complete ? ' did the ' : ' needs to do the ' }
    <input
      type="text" size={ `${name.length || 1}` }
      value={ name } style={{ borderColor: randomColor() }}
      onChange={ (e) => renameChore(id, e.target.value) }
    />
  </div>
);

const ChoreList = ({ ids }) =>
  <div>
    { ids.map(id =>
      <Chore key={ id } id={ id } />) }
  </div>;

const App = connect(
  (state) => ({ choreIds: getAllChoreIds(state) })
)(({ choreIds }) =>
  <div className="App">
    <ChoreList ids={ choreIds } />
  </div>
);

ReactDOM.render(
  <Provider store={ createStore(reducer) }>
    <App />
  </Provider>,
  document.getElementById('main')
);

// Actions

function renameChore(choreId, name) {
  return { type: 'RENAME_CHORE', choreId, name };
}

function assignChore(choreId, userId) {
  return { type: 'ASSIGN_CHORE', choreId, userId };
}

function setChoreStatus(choreId, complete) {
  return { type: 'SET_CHORE_STATUS', choreId, complete };
}

// Selectors

function getAllChoreIds(state) {
  return Object.keys(state.toJS().chores);
}

function getChoreById(state, id) {
  return state.getIn(['chores', id]).toJS();
}

function getAllUsers(state) {
  return state.get('users').toList().toJS();
}

function getUserById(state, id) {
  return state.getIn(['users', id]).toJS();
}

// Reducer

function reducer(state=fromJS({
  users: {
    '1': { id: '1', name: 'Tim' },
    '2': { id: '2', name: 'Bob' },
    '3': { id: '3', name: 'Jim' },
    '4': { id: '4', name: 'Joe' },
  },
  chores: {
    '1': { id: '1', name: 'Vacuuming', complete: true,  user: '1' },
    '2': { id: '2', name: 'Tidying',   complete: false, user: '3' },
    '3': { id: '3', name: 'Bathrooms', complete: true,  user: '2' },
    '4': { id: '4', name: 'Dishes',    complete: false, user: '1' },
    '5': { id: '5', name: 'Laundrey',  complete: false, user: '4' }
  }
}), action) {
  console.log(action);

  switch(action.type) {
    case 'SET_CHORE_STATUS':
      return state.setIn(['chores', action.choreId, 'complete'], action.complete);

    case 'RENAME_CHORE':
      return state.setIn(['chores', action.choreId, 'name'], action.name);

    case 'ASSIGN_CHORE':
      return state.setIn(['chores', action.choreId, 'user'], action.userId);

    default:
      return state;
  }
};

function randomColor() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}
