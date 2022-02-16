import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { createContext, useReducer, useEffect, useContext } from 'react';
import { WsProvider, ApiPromise, Keyring } from '@polkadot/api';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import { mnemonicGenerate } from '@polkadot/util-crypto';

var Balance = /*#__PURE__*/function () {
  function Balance(balance) {
    _classCallCheck(this, Balance);

    this.rao = balance;
    this.tao = this.rao / Math.pow(10, 9);
  }

  _createClass(Balance, [{
    key: "to_tao",
    value: function to_tao() {
      return this.tao;
    }
  }, {
    key: "to_rao",
    value: function to_rao() {
      return this.rao;
    }
  }, {
    key: "to_string",
    value: function to_string() {
      return "\u03C4".concat(this.tao.toFixed(9), ",").concat(this.tao.toFixed(9).split('.')[1]);
    }
  }, {
    key: "to_rich",
    value: function to_rich() {
      return "[green]\u03C4[/green][green]".concat(this.tao.toFixed(9).split('.')[0], "[/green][green].[/green][dim green]").concat(this.tao.toFixed(9).split('.')[1], "[/dim green]");
    }
  }, {
    key: "to_repr",
    value: function to_repr() {
      return this.to_string();
    }
  }, {
    key: "eq",
    value: function eq(other) {
      return this.rao === other.rao;
    }
  }, {
    key: "ne",
    value: function ne(other) {
      return this.rao !== other.rao;
    }
  }, {
    key: "gt",
    value: function gt(other) {
      return this.rao > other.rao;
    }
  }, {
    key: "lt",
    value: function lt(other) {
      return this.rao < other.rao;
    }
  }, {
    key: "le",
    value: function le(other) {
      return this.rao <= other.rao;
    }
  }, {
    key: "ge",
    value: function ge(other) {
      return this.rao >= other.rao;
    }
  }], [{
    key: "from_float",
    value: function from_float(amount) {
      var rao = Math.floor(amount * Math.pow(10, 9));
      return new Balance(rao);
    }
  }, {
    key: "from_tao",
    value: function from_tao(amount) {
      var rao = Math.floor(amount * Math.pow(10, 9));
      return new Balance(rao);
    }
  }, {
    key: "from_rao",
    value: function from_rao(amount) {
      return new Balance(amount);
    }
  }]);

  return Balance;
}();
module.exports = Balance;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var initalBittensorState = {
  isInitalized: false,
  api: null
};
var handlers = {
  INITALIZE: function INITALIZE(state, action) {
    var _action$payload = action.payload,
        api = _action$payload.api,
        difficulty = _action$payload.difficulty,
        total_issuance = _action$payload.total_issuance,
        total_stake = _action$payload.total_stake,
        n = _action$payload.n;
    return _objectSpread(_objectSpread({}, state), {}, {
      isInitalized: true,
      api: api,
      difficulty: difficulty,
      total_issuance: total_issuance,
      total_stake: total_stake,
      n: n
    });
  }
};

var reducer = function reducer(state, action) {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

var BittensorContext = /*#__PURE__*/createContext(_objectSpread(_objectSpread({}, initalBittensorState), {}, {
  get_balance: function get_balance() {
    return Promise.resolve();
  },
  create_coldkey: function create_coldkey() {
    return Promise.resolve();
  },
  create_hotkey: function create_hotkey() {
    return Promise.resolve();
  }
}));
function BittensorProvider(props) {
  var children = props.children;

  var _useReducer = useReducer(reducer, initalBittensorState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  useEffect(function () {
    var initalize = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var wsProvider, api, _yield$Promise$all, _yield$Promise$all2, difficulty, total_issuance, total_stake, n;

        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                wsProvider = new WsProvider('ws://138.197.231.123:9944');
                _context.next = 4;
                return ApiPromise.create({
                  provider: wsProvider,
                  address_type: 42,
                  runtime_id: 2,
                  types: {
                    Balance: {
                      value: "u64"
                    },
                    NeuronMetadataOf: {
                      type: "struct",
                      type_mapping: [["version", "u32"], ["ip", "u128"], ["port", "u16"], ["ip_type", "u8"], ["uid", "u32"], ["modality", "u8"], ["hotkey", "AccountId"], ["coldkey", "AccountId"], ["active", "u32"], ["last_update", "u64"], ["priority", "u64"], ["stake", "u64"], ["rank", "u64"], ["trust", "u64"], ["consensus", "u64"], ["incentive", "u64"], ["dividends", "u64"], ["emission", "u64"], ["bonds", "Vec<(u32, u64)>"], ["weights", "Vec<(u32, u32)>"]]
                    }
                  }
                });

              case 4:
                api = _context.sent;
                _context.next = 7;
                return Promise.all([api.rpc.chain.getHeader(), api.query.subtensorModule.difficulty(), api.query.subtensorModule.totalIssuance(), api.query.subtensorModule.totalStake(), api.query.subtensorModule.n()]);

              case 7:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 5);
                difficulty = _yield$Promise$all2[1];
                total_issuance = _yield$Promise$all2[2];
                total_stake = _yield$Promise$all2[3];
                n = _yield$Promise$all2[4];
                dispatch({
                  type: 'INITALIZE',
                  payload: {
                    api: api,
                    difficulty: Math.floor(difficulty * Math.pow(10, 0)),
                    total_issuance: total_issuance * Math.pow(10, -9),
                    total_stake: total_stake * Math.pow(10, -9),
                    n: Math.floor(n * Math.pow(10, 0))
                  }
                });
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                dispatch({
                  type: 'INITALIZE',
                  payload: {
                    isInitalized: false,
                    api: null
                  }
                });

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }));

      return function initalize() {
        return _ref.apply(this, arguments);
      };
    }();

    initalize();
  }, []);

  var get_balance = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(api, address) {
      var _yield$Promise$all3, _yield$Promise$all4, val;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return Promise.all([api.rpc.chain.getHeader(), api.query.system.account(address)]);

            case 2:
              _yield$Promise$all3 = _context2.sent;
              _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
              val = _yield$Promise$all4[1].data;
              return _context2.abrupt("return", Balance.from_rao(val.free.value));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function get_balance(_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var create_coldkey = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      var keyring, mnemonic, pair;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              keyring = new Keyring({
                type: 'ed25519'
              });
              mnemonic = mnemonicGenerate();
              pair = keyring.addFromUri(mnemonic, {
                name: 'coldkey'
              }, 'ed25519');
              return _context3.abrupt("return", {
                mnemonic: mnemonic,
                pair: pair
              });

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function create_coldkey() {
      return _ref3.apply(this, arguments);
    };
  }();

  var create_hotkey = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var keyring, mnemonic, pair;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              keyring = new Keyring({
                type: 'ed25519'
              });
              mnemonic = mnemonicGenerate();
              pair = keyring.addFromUri(mnemonic, {
                name: 'hotkey'
              }, 'ed25519');
              return _context4.abrupt("return", {
                mnemonic: mnemonic,
                pair: pair
              });

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function create_hotkey() {
      return _ref4.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/React.createElement(BittensorContext.Provider, {
    value: _objectSpread(_objectSpread({}, state), {}, {
      get_balance: get_balance,
      create_coldkey: create_coldkey,
      create_hotkey: create_hotkey
    })
  }, children);
}

var useBittensor = function useBittensor() {
  return useContext(BittensorContext);
};

export { BittensorProvider, useBittensor };
