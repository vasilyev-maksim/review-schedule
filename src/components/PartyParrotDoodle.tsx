import * as React from 'react';

export const PartyParrotDoodle: React.SFC = () => {
    return (
        <img
            src={require('../../public/party_parrot.gif')}
            alt="Party parrot!"
            className="party-parrot-doodle"
        />
    );
};
