import React, { Component } from 'react';

import Header from '../components/Header/Header';
import CreateCollection from '../components/CreateCollection/CreateCollection';
import Footer from '../components/Footer/Footer';
import ModalSearch from '../components/Modal/ModalSearch';
import ModalMenu from '../components/Modal/ModalMenu';
import Scrollup from '../components/Scrollup/Scrollup';

class Create extends Component {
    render() {
        return (
            <div className="main">
                <Header />
                <CreateCollection />
                <Footer />
                <ModalSearch />
                <ModalMenu />
                <Scrollup />
            </div>
        );
    }
}

export default Create;