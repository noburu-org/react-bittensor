import { useState, createContext, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';


export const BittensorContext = createContext({});

export const BittensorProvider = async ({ children }) => {
    const wsProvider = new WsProvider('ws://subtensor.noburu.app:9944');
    const api = await ApiPromise.create({ provider: wsProvider }); 

    useEffect(() => {
        console.log(api.genesisHash.toHex());
    });

    return (
        <BittensorContext.Provider 
            value={{ api }}
        >
            {children}
        </BittensorContext.Provider>
    )   

};

