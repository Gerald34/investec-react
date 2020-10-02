import React from 'react';
import logo from '../../investec.png';
import './brand.scss';
function BrandComponent() {
        return(
            <img className='brand-logo' src={logo} alt='Investec'/>
        )
}

export default BrandComponent;