/*
TITLE:
Set the HTML Tag of a Component via a Prop using Recompose

DESCRIPTION:
Learn how to user the ‘componentFromProp’ helper and ‘defaultProps’
higher order component to swap the underlying html tag of your
component. Sometimes we want a component to behave the same overall
but to use a different element in the HTML output. An example is
swapping an <a> for a <button> or even a react router <Link>
depending on circumstance.
*/
const { Component } = React;
const { withPropsOnChange, compose, componentFromProp,
        mapProps, withProps } = Recompose;

const Link = compose(
  withProps(({ type='a', to='#' }) =>
    type === 'a'
      ? { type, href: to }
      : { type, onClick(e) { window.location = to } })
)(componentFromProp('type'));

const App = () =>
  <div className="App">
    <Link to="#/page1">Anchor Link</Link>
    <br/>
    <br/>
    <Link type="button" to="#/page2">Button Link</Link>
  </div>

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
