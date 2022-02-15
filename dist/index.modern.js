import { createContext, useEffect } from 'react';
import { WsProvider, ApiPromise } from '@polkadot/api';

const BittensorContext = createContext({});
async function BittensorProvider({
  children
}) {
  const wsProvider = new WsProvider('wss://subtensor.noburu.app:9944');
  const api = await ApiPromise.create({
    provider: wsProvider
  });
  useEffect(() => {
    console.log(api.genesisHash.toHex());
  });
  return /*#__PURE__*/React.createElement(BittensorContext.Provider, {
    value: {
      api
    }
  }, children);
}

export { BittensorProvider };
//# sourceMappingURL=index.modern.js.map
