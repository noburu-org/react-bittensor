import { useState, createContext, useEffect, useReducer } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';

const initalBittensorState = {
    isInitalized: false,
    api: null,
}

const handlers = {
    INITALIZE: (state, action) => {
        const { api } = action.payload;

        return {
            ...state,
            isInitalized: true,
            api
        }
    }
};

const reducer = (state, action) => {
    handlers[action.type] ? handlers[action.type](state, action) : state;
}

export const BittensorContext = createContext({
    ...initalBittensorState
});

export function BittensorProvider(props) {
    const { children } = props;

    const [state, dispatch] = useReducer(reducer, initalBittensorState);


    useEffect(() => {
        const initalize = async () => {
            try {
                const wsProvider = new WsProvider('ws://138.197.231.123:9944');
                const api = await ApiPromise.create({
                    provider: wsProvider,
                    runtime_id: 2,
                    types: {
                        Balance: {
                            value: "u64"
                        },
                        NeuronMetadataOf: {
                            type: "struct",
                            type_mapping: [
                                ["version", "u32"],
                                ["ip", "u128"], 
                                ["port", "u16"], 
                                ["ip_type", "u8"], 
                                ["uid", "u32"], 
                                ["modality", "u8"], 
                                ["hotkey", "AccountId"], 
                                ["coldkey", "AccountId"], 
                                ["active", "u32"],
                                ["last_update", "u64"],
                                ["priority", "u64"],
                                ["stake", "u64"],
                                ["rank", "u64"],
                                ["trust", "u64"],
                                ["consensus", "u64"],
                                ["incentive", "u64"],
                                ["dividends", "u64"],
                                ["emission", "u64"],
                                ["bonds", "Vec<(u32, u64)>"],
                                ["weights", "Vec<(u32, u32)>"]
                            ]
                        }
                    }
                })

                dispatch({
                    type: 'INITALIZE',
                    payload: {
                        isInitalized: true,
                        api: api
                    }
                })
            } catch (error) {
                dispatch({
                    type: 'INITALIZE',
                    payload: {
                        isInitalized: false,
                        api: null
                    }
                })
            }
        }

        initalize();
    }, []);

    return (
        <BittensorContext.Provider 
            value={{
                ...state
            }}
        >
            {children}
        </BittensorContext.Provider>
    )   

};

