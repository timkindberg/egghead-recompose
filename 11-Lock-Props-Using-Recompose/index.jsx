/*
TITLE:
Lock Props using Recompose

DESCRIPTION:
Learn how to use the ‘withProps’ higher order component to pre-fill a prop,
unable to be overridden.
*/
const { Component } = React;
const { withProps } = Recompose;

const HomeLink = withProps(({ query }) => ({ href: '#/?query=' + query }))('a');
const ProductsLink = withProps({ href: '#/products' })('a');
const CheckoutLink = withProps({ href: '#/checkout' })('a');

const App = () =>
  <div className="App">
    <header>
      <HomeLink query="logo">Logo</HomeLink>
    </header>
    <nav>
      <HomeLink>Home</HomeLink>
      <ProductsLink>Products</ProductsLink>
      <CheckoutLink>Checkout</CheckoutLink>
    </nav>
  </div>;

ReactDOM.render(
  <App />,
  document.getElementById('main')
);
