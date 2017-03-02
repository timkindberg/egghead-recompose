/*
TITLE:
Learn How Recompose Optimizes Higher Order Components

DESCRIPTION:
Learn about optimizations that Recompose uses behind the scenes.
*/
window.process = { env: { NODE_ENV: 'development' } };

const { Component } = React;

const overrideProps = (overrideProps) => (BaseComponent) => {
  const factory = createEagerFactory(BaseComponent);

  return (props) => factory(
    { ...props, ...overrideProps },
    props.children
  );
}

const User = ({ name }) =>
  <div className="User">{ name }</div>;

const alwaysBob = overrideProps({ name: 'Bob' });
const User2 = alwaysBob(User);

const App = () =>
  <div>
    <User name="Joe" />
    <User2 name="Steve" />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);







///// HOC Optimizations /////

function createEagerFactory(Component) {
  return (props, children) => {
    if (isReferentiallyTransparentFunctionComponent(Component)) {
      return children
        ? Component({ ...props, children })
        : Component(props);
    }

    return children
      ? <Component {...props}>{ children }</Component>
      : <Component {...props} />
  }
}

function isReferentiallyTransparentFunctionComponent(Component) {
  return Boolean(
    typeof Component === 'function' &&
    !isClassComponent(Component) &&
    !Component.defaultProps &&
    !Component.contextTypes &&
    (window.process.env.NODE_ENV === 'production' || !Component.propTypes)
  )
}

function isClassComponent(Component) {
  return Boolean(
    Component &&
    Component.prototype &&
    typeof Component.prototype.isReactComponent === 'object'
  );
}
