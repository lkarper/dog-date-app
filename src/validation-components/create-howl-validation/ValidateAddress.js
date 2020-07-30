import React, { useEffect } from 'react';

const ValidateAddress = (props) => {

    const { address, addressError, setAddressError } = props;

    useEffect(() => {

        if (address.trim().length === 0) {
            setAddressError(`You must enter an address or location name.`);
        } else {
            setAddressError('');
        }

    }, [address, setAddressError]);

    if (addressError) {
        return <p id='address-validator'>{addressError}</p>;
    }

    return <p id='address-validator'>Address/location set to {address}.</p>;
}

export default ValidateAddress;