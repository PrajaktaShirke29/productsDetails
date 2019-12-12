import React, { Component } from 'react';
import axios from 'axios';

import Products from '../../components/Products/Products';

class ProductsPage extends Component {
  state = { isLoading: true, products: [] };
  componentDidMount() {
    this.fetchData();
  }

  productDeleteHandler = productId => {
    axios
      .delete('http://localhost:3100/products/' + productId, { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
      .then(result => {
        console.log(result);
        this.fetchData();
      })
      .catch(err => {
        this.props.onError(
          'Deleting the product failed. Please try again later'
        );
        console.log(err);
      });
  };

  fetchData = () => {

    axios
      .get('http://localhost:3100/products', { headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) } })
      .then(productsResponse => {
        this.setState({ isLoading: false, products: productsResponse.data });
      })
      .catch(err => {
        this.setState({ isLoading: false, products: [] });
        this.props.onError('Loading products failed. Please try again later');
        console.log(err);
      });
  }

  render() {
    let content = <p>Loading products...</p>;

    if (!this.state.isLoading && this.state.products.length > 0) {
      content = (
        <Products
          products={this.state.products}
          onDeleteProduct={this.productDeleteHandler}
        />
      );
    }
    if (!this.state.isLoading && this.state.products.length === 0) {
      if(localStorage.getItem('token')){
        content = <p>Found no products. Try again later.</p>;
      }else{
        content = <p>Session Expired. Please logout and login to get access to products</p>
      }
    }
    return <main>{content}</main>;
  }
}

export default ProductsPage;
