import React, { Component } from 'react';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import TopSellerPage from '../components/TopSellerPage/TopSellerPage';

class topSellerPage extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <TopSellerPage/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            
            </div>
            
        );
    }
}

export default topSellerPage;