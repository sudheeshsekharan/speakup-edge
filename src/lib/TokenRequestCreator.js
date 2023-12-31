'use strict';

class TokenRequestCreator {

     makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    createTokenRequest(issuerName, includeRandomNonce = true, originScope = null) {
        // Construct byte buffer including length encodings
        const buf = Buffer.allocUnsafe(1024);
        var offset = 0;
        offset = buf.writeUInt16BE(2, offset);
        offset = buf.writeUInt16BE(issuerName.length, offset);
        offset += buf.write(issuerName, offset);
        
        // While including a nonce is described as optional, it seems needed for the creation of unique token requests
        if (includeRandomNonce) {
            offset = buf.writeUint8(32, offset);
            const nonce = this.makeid(32).toString('hex');
            offset += buf.write(nonce, offset);
        } else {
            // No nonce
            offset = buf.writeUint8(0, offset);
        }

        // For added security we can scope the tokens to a list of origins
        if (originScope && originScope.length > 0) {
            offset = buf.writeUInt16BE(originScope.length, offset);
            offset += buf.write(originScope, offset);
        } else {
            offset = buf.writeUInt16BE(0, offset);
        }

        // Create new correctly sized buffer without empty bytes
        const buf2 = Buffer.allocUnsafe(offset);
        buf.copy(buf2, 0, 0, offset);

        return buf2.toString('base64');
    }
    
}

export default TokenRequestCreator;