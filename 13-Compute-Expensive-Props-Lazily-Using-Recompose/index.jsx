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
const { withPropsOnChange, withState,
        withHandlers, compose } = Recompose;

let count = 0;
const lazy = withPropsOnChange(
  ['depth'],
  (props) => ({
    result: fibonacci(props.depth),
    count: ++count
  })
);

const Fibonacci = lazy(({ result, color, size, count }) =>
  <div style={{ color, fontSize: size }}>
    Result: { result }
    <br/>
    Compute count: { count }
  </div>
);

const enhance = compose(
  withState('depth', 'setDepth', 20),
  withState('color', 'setColor', 'red'),
  withState('size', 'setSize', 30)
);

const App = enhance(({ depth, color, size, setDepth, setColor, setSize }) =>
  <div className="App">
    <div>Depth:
      <button onClick={ () => setDepth(x => x + 1) }>+</button>
      <button onClick={ () => setDepth(x => x - 1) }>-</button>
    </div>
    <div>Size:
      <button onClick={ () => setSize(x => x + 1) }>+</button>
      <button onClick={ () => setSize(x => x - 1) }>-</button>
    </div>
    <div>Color:
      <button onClick={ () => setColor('blue') }>blue</button>
      <button onClick={ () => setColor('green') }>green</button>
      <button onClick={ () => setColor('red') }>red</button>
    </div>
    <br/>
    <Fibonacci { ...{ depth, color, size} } />
  </div>
);

ReactDOM.render(
  <App />,
  document.getElementById('main')
);

function fibonacci(num, memo) {
  memo = memo || {};

  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}
