import { useState, createContext, useEffect, useReducer } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import Balance from './Balance';
import { Keyring } from '@polkadot/api';
import { mnemonicGenerate } from '@polkadot/util-crypto';

const initalBittensorState = {
    isInitalized: false,
    api: null,
}

const handlers = {
    INITALIZE: (state, action) => {
        const { api, difficulty, total_issuance, total_stake, n } = action.payload;

        return {
            ...state,
            isInitalized: true,
            api,
            difficulty,
            total_issuance,
            total_stake,
            n,
        }
    },
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;


export const BittensorContext = createContext({
    ...initalBittensorState,
    get_balance: () => Promise.resolve(),
    create_coldkey: () => Promise.resolve(),
    create_hotkey: () => Promise.resolve(),
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
                    address_type: 42,
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

                const [header, 
                    difficulty,
                    total_issuance,
                    total_stake,
                    n,
                    ] = await Promise.all([
                    api.rpc.chain.getHeader(),
                    api.query.subtensorModule.difficulty(),
                    api.query.subtensorModule.totalIssuance(),
                    api.query.subtensorModule.totalStake(),
                    api.query.subtensorModule.n(),
                ]);

                dispatch({
                    type: 'INITALIZE',
                    payload: {
                        api: api,
                        difficulty: Math.floor(difficulty * Math.pow(10, 0)),
                        total_issuance: (total_issuance * Math.pow(10, -9)),
                        total_stake: (total_stake * Math.pow(10, -9)),
                        n: Math.floor(n * Math.pow(10, 0)),
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

    const get_balance = async (api, address) => {
        const [header, { data: val }] = await Promise.all([
            api.rpc.chain.getHeader(),
            api.query.system.account(address)
          ]);
      
          return Balance.from_rao(val.free.value)
    }

    const create_coldkey = async () => {
        const keyring = new Keyring({ type: 'ed25519' });
        const mnemonic = mnemonicGenerate();

        const pair = keyring.addFromUri(mnemonic, { name: 'coldkey' }, 'ed25519');


        return { mnemonic, pair };
    }

    const create_hotkey = async () => {
        const keyring = new Keyring({ type: 'ed25519' });
        const mnemonic = mnemonicGenerate();

        const pair = keyring.addFromUri(mnemonic, { name: 'hotkey' }, 'ed25519');


        return { mnemonic, pair };
    }


    return (
        <BittensorContext.Provider 
            value={{
                ...state,
                get_balance,
                create_coldkey,
                create_hotkey
            }}
        >
            {children}
        </BittensorContext.Provider>
    )   

};

