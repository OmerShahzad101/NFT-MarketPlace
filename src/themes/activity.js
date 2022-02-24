import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Activities from '../components/Activity/Activity';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Activity extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Activities />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Activity;