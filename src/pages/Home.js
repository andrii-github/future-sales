import React from 'react';
import { motion } from 'framer-motion';

import Layout from '../components/Layout';
import Header from '../components/Header';

import { PAGE_VARIANT_BASIC } from '../constants';

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={PAGE_VARIANT_BASIC}>
      <Header />

      <Layout classNamePage="homepage">
        <div>
          <h1>Homepage</h1>
        </div>
      </Layout>
    </motion.div>
  );
};

export default Home;
