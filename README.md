# react-bittensor

> A React library for state management of the subtensor blockchain

[![NPM](https://img.shields.io/npm/v/react-bittensor.svg)](https://www.npmjs.com/package/react-bittensor) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-bittensor
```
OR
```bash
yarn add react-bittensor
```
## Usage

In your App.js or _app.js (next.js) add the Bittensor Provider

```jsx
import { BittensorProvider } from 'react-bittensor';


const MyApp = (props) => {
  const { Component, pageProps } = props;

  return (
    <BittensorProvider>
      <Component {...pageProps} />
    </BittensorProvider>
  );
};

```

then call Bittensor from anywhere.

```jsx
import { useBittensor } from 'react-bittensor'


function MyComponent() {

  const { 
    api, // API object that has a websocket to subtensor
    difficulty, // number type, current registration difficulty
    total_issuance, // number type, total issuance
    total_stake, // number type, total stake
    n, // number type, total machines in active set
    get_balance, // function, takes (api, ADDRESS)
    create_coldkey, //function takes no args, returns {mnemonic: mnemonic, pair: pair}
    create_hotkey, //function takes no args, returns {mnemonic: mnemonic, pair: pair}
  } = useBittensor();

  ...

}
  ```

## License

MIT © [noburu-org](https://github.com/noburu-org)
