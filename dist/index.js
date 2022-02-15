var react = require('react');
var api = require('@polkadot/api');

var BittensorProvider = function BittensorProvider(_ref) {
  var children = _ref.children;

  try {
    var wsProvider = new api.WsProvider('wss://subtensor.noburu.app:9944');
    return Promise.resolve(api.ApiPromise.create({
      provider: wsProvider
    })).then(function (api) {
      react.useEffect(function () {
        console.log(api.genesisHash.toHex());
      });
      return /*#__PURE__*/React.createElement(BittensorContext.Provider, {
        value: {
          api: api
        }
      }, children);
    });
  } catch (e) {
    return Promise.reject(e);
  }
};
var BittensorContext = react.createContext({});

exports.BittensorProvider = BittensorProvider;
//# sourceMappingURL=index.js.map
