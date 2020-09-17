import React, { useEffect } from 'react';

const ValidateAddress = (props) => {

    const { address, addressError, setAddressError } = props;

    useEffect(() => {

        if (address.trim().length === 0) {
            setAddressError(`You must enter an address or location name. (Max 100 chars.)`);
        } else {
            setAddressError('');
        }

    }, [address, setAddressError]);

    if (addressError) {
        return (
            <p 
                className='ValidateAddress__validator error'
                id='address-validator'
            >
                {addressError}
            </p>
        );
    }

    return (
        <p 
            className='ValidateAddress__validator valid'
            id='address-validator'
        >
            Address/location set to '{address}'. (Max 100 chars.)
        </p>
    );
}

export default ValidateAddress;
