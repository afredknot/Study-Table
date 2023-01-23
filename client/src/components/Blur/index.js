import React from 'react';
import { useProviderContext } from '../../utils/providerContext';
import "./style.css"

function Blur() {

    const {isMenuOpen, modalVisibility} = useProviderContext();

    return (
        <div className={`${isMenuOpen || modalVisibility? 'blurred' : 'hideBlur'}`}></div>
    );
};

export default Blur;
