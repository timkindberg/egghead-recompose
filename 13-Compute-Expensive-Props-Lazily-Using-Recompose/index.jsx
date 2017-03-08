/*
TITLE:
Compute Expensive Props Lazily using Recompose

DESCRIPTION:
Learn how to use the 'withPropsOnChange' higher order component to help
ensure that expensive prop computations are only executed when necessary.
Simply specify which props are “expensive” and provide a factory function
for those props.
*/
const { Component } = React;
const { withPropsOnChange, withState, withHandlers, compose } = Recompose;

const lazyResult = withPropsOnChange(
  ['depth'],
  ({ depth }) => ({
    result: fibonacci(depth)
  })
);

const Fibonacci = lazyResult(({ result, color, size }) =>
  <div style={{ color, fontSize: size }}>
    Fibonacci Result:<br/>{ result }
  </div>
);

const withAppState = compose(
  withState('depth', 'setDepth', 1400),
  withState('color', 'setColor', 'red'),
  withState('size', 'setSize', 14)
);

const App = withAppState(({ depth, color, size, setDepth, setColor, setSize }) =>
  <div className="App">
    <Fibonacci { ...{ depth, color, size} } />
    <br/>
    <div>
      <span>Depth: { depth } </span>
      <button onClick={ () => setDepth(x => x + 1) }>+</button>
      <button onClick={ () => setDepth(x => x - 1) }>-</button>
    </div>
    <div>
      <span>Size: { size } </span>
      <button onClick={ () => setSize(x => x + 1) }>+</button>
      <button onClick={ () => setSize(x => x - 1) }>-</button>
    </div>
    <div>
      <span>Color: </span>
      <button onClick={ () => setColor('blue') }>blue</button>
      <button onClick={ () => setColor('green') }>green</button>
      <button onClick={ () => setColor('red') }>red</button>
    </div>
    <br/>
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

let count = 1;

function fibonacci(num, memo) {
  if (!memo) {
    document.getElementById('log').textContent = `Computed: ${++count || 1}`;
  }

  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}
