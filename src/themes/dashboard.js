import React, { Component } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';
import Dashboard from '../components/Dashboard/Dashboard';

class dashboard extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <Dashboard/>
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            
            </div>
            
        );
    }
}

export default dashboard;