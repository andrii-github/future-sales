import React, {useContext, useState} from 'react';
import { motion } from 'framer-motion';

import Layout from '../components/Layout';

import { PAGE_VARIANT_BASIC, PAGE_TRANSITION } from '../constants';
import Header from "../components/product/Header";
import {useParams} from "react-router-dom";
import {UserContext} from "../contexts/UserProvider";
import {ProductContext} from "../contexts/ProductsProvider";
import timeImage from '../images/time.png';
import locationImage from '../images/location.png';
import {getSellingDate} from "../utils/getSellingDate";
import {formatNumber} from "../utils/formatNumber";
import {calculateCommitmentPrice} from "../utils/calculateCommitmentPrice";
import { Link } from "react-router-dom";

const Product = () => {
  const [state, setState] = useState({
    expandedDetails: false,
    expandedSeller: false,
  });
  const {productId} = useParams();
  const {getProduct} = useContext(ProductContext);
  const {getUserInfo} = useContext(UserContext);
  const product = getProduct(productId);
  const commitNowUrl = `/checkout/${product.id}`;
  const seller = getUserInfo();
  const categorySubscribers = 2467;
  const toggleExpandDetails = () => {
    setState({...state, ...{
      expandedDetails: !state.expandedDetails,
    }});
  };
  const toggleSellerDetails = () => {
    setState({...state, ...{
      expandedSeller: !state.expandedSeller,
    }});
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      transition={PAGE_TRANSITION}
      variants={PAGE_VARIANT_BASIC}>
      <Layout>
        <section className="productPage">
          <Header product={product} />

          <section className="productBody">
            <div className='productMain'>
              <h1>{product.title}</h1>
              <div className='prices'>
                <div className='buyingPrice'>&#36;{product.buyingPrice}</div>
                <div className='sellingPrice'>&#36;{product.sellingPrice}</div>
              </div>
            </div>
            <p className="time">
              <img src={timeImage} alt="Selling date"/>
              Will be sold after {product.sellingDate} months usage ({getSellingDate(product)})
            </p>

            <hr/>

            <section className={state.expandedDetails ? 'description expanded' : 'description'}>
              <h6>Description</h6>
              <p>{product.description}</p>
            </section>
            <span className='expandButton' onClick={() => toggleExpandDetails()}>{state.expandedDetails ? 'Hide' : 'Read All'}</span>

            <section className="subscribe">
              <h6>{product.category} Subscribers</h6>
              {formatNumber(categorySubscribers)}
            </section>

            <section className={state.expandedSeller ? 'seller expanded' : 'seller'}>
              <figure>
                <div className="imageWrapper">
                  <img src={seller.avatar} alt="Seller"/>
                </div>
                <figcaption>
                  <h6>{seller.fullName}</h6>
                  <p className='location'>
                    <img src={locationImage} alt="Seller location"/>
                    {seller.location}
                  </p>
                </figcaption>
              </figure>
              <span className='expandButton' onClick={() => toggleSellerDetails()}>{state.expandedDetails ? 'Hide' : 'View Details'}</span>
            </section>
          </section>

          <section className="productFooter">
            <p className="payNowOnly">Pay now only <span className='actualPrice'>&#36;{calculateCommitmentPrice(product.sellingPrice)}</span> from &#36;{product.buyingPrice}</p>
            <Link className='submitBtn' to={commitNowUrl}>Commit now</Link>
          </section>
        </section>
      </Layout>
    </motion.div>
  );
};

export default Product;
