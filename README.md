# utf8-bytes-swap

return an utf8 string or bytes array


This module converts UTF8 <-> Bytes Array

## Installation

Use the package manager [npm](https://npmjs.org) to install utf8-bytes-swap.

```bash
npm install utf8-bytes-swap
```

## example
Storing strings on the blockchain is expensive. Using string to bytes array significantly reduces transaction cost for storing IPFS CID hashes.

A IPFS cidV1 hash is 59 byte and fit inside a bytes32[2]. Solidity does not accept incomplete byteArrays: `fill=true` is required for the 5 unused bytes.

``` node
const { stringToBytesArray, bytesArrayToString } = require('utf8-bytes-swap');

let cidV1 = 'bafkreicizr7rctuvyki43dtpp7n23go56r6ouw3qxc3iq3r4dtkf2izv6i';
let bytesArray = stringToBytesArray(cidV1, 32, true);
/* 
[
  Uint32Array(32) [
     98,  97, 102, 107, 114, 101, 105,
     99, 105, 122, 114,  55, 114,  99,
    116, 117, 118, 121, 107, 105,  52,
     51, 100, 116, 112, 112,  55, 110,
     50,  51, 103, 111
  ],
  Uint32Array(32) [
     53,  54, 114,  54, 111, 117, 119,  51,
    113, 120,  99,  51, 105, 113,  51, 114,
     52, 100, 116, 107, 102,  50, 105, 122,
    118,  54, 105,   0,   0,   0,   0,   0
  ]
]
*/

let retrievedCidV1 = bytesArrayToString(bytesArray);
// bafkreicizr7rctuvyki43dtpp7n23go56r6ouw3qxc3iq3r4dtkf2izv6i
```

## methods

``` node
// default: size to 32, fill partial bytesArray
function stringToBytesArray(str, size=32, fill=true){...};

// returns bytesArray to utf8 string
function bytesArrayToString(bytesArray){...};

```


## stringToBytesArray(< string >)

Return an array of integers from 0 through 255, inclusive, representing the
bytes in the unicode string `str`.

## bytesArrayToString(<uint array | hex array>)

Return an unicode `str` from a hex or integer array of 0 through 255.

# license

MIT,
