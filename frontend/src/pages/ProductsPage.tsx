import React from 'react';
import Header from '@/components/user/Header';
import Footer from '@/components/user/Footer';
import ProductCatalog from '@/components/products/ProductCatalog';
const ProductsPage: React.FC = () => {
  return (
    <>
      <Header />
        <ProductCatalog/>
      <Footer />
    </>
  );
};

export default ProductsPage;