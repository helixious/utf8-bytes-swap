function flatten(arr) {
    return arr.reduce(function(flat, toFlatten) {
        if(toFlatten instanceof Uint8Array || toFlatten instanceof Uint16Array || toFlatten instanceof Uint32Array) toFlatten = Array.from(toFlatten);
        if(Array.isArray(toFlatten)) {
            return flat.concat(flatten(toFlatten));
        } else if(typeof toFlatten == 'string' && web3.utils.isHex(toFlatten)) {
            return flat.concat(web3.utils.hexToBytes(toFlatten));
        } else {
            return flat.concat([toFlatten]);
        }
    }, []);
}

function sanitizeArray(arr) {
    while(arr[arr.length-1] === 0) arr.pop();
    return new Uint8Array(arr);
}

function stringToBytesArray(str, size=32, fill=true) {
    try {
        let result = [];
        let bytes = Array.from(Buffer.from(str, 'utf8'));
        let byteCount = bytes.length;
        
        while(byteCount > 0) {
            let byteArray = fill ? new Uint32Array(size).fill() : new Uint32Array(size);
            bytes.splice(0,size).forEach((byte, i) => {
                byteArray[i] = byte;
            });
            result.push(byteArray);
            byteCount = bytes.length;
        }
        return result;
    } catch(e) {
        console.error(e);
    }
};

function bytesArrayToString(bytesArray) {
    try {
        let flatBytesArray = flatten(bytesArray);
        let sanitizedArray = sanitizeArray(flatBytesArray);
        let result = new TextDecoder().decode(sanitizedArray);
        return result;
    } catch(e) {
        console.error(e);
    }
}

module.exports = {
    stringToBytesArray,
    bytesArrayToString
}