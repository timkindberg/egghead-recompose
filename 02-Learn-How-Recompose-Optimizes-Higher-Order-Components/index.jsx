/*
TITLE:
Learn How Recompose Optimizes Higher Order Components

DESCRIPTION:
Learn about optimizations that Recompose uses behind the scenes.
*/
window.process = { env: { NODE_ENV: 'development' } };

const { Component } = React;

const overrideProps = (overrideProps) => (BaseComponent) => (props) =>
  <BaseComponent {...props} {...overrideProps} />;

const User = ({ name }) =>
  <div className="User">{ name }</div>;

const alwaysBob = overrideProps({ name: 'Bob' });
const User2 = alwaysBob(User);

const App = () =>
  <div>
    <User name="Joe" />
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);







///// HOC Optimizations /////

function createEagerFactory(Component) {

}

function isReferentiallyTransparentFunctionComponent(Component) {

}

function isClassComponent(Component) {
  return Boolean(
    Component &&
    Component.prototype &&
    typeof Component.prototype.isReactComponent === 'object'
  );
}
