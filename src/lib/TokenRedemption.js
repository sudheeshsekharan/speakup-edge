'use strict';

class TokenRedemption {

    constructor() {
        this.activeContexts = {};
    }

    registerTokenRequestForRedemption(tokenRequest) {
        var contextHash = crypto.createHash('sha256').update(tokenRequest).digest();
        this.activeContexts[contextHash.toString('hex')] = 1;
    }

    validateAuthToken(issuerInfo, authorizationHeader) {
        try {
            if (!authorizationHeader || authorizationHeader === '') {
                return { success: false, msg: 'authorizationHeader empty' };
            }

            var authToken;
            // Arrives as "Authorization: PrivateToken token=..."
            const strings = authorizationHeader.split(" ");
            for (var i = 0; i < strings.length; i++) {
                var s = strings[i];
                if (s.startsWith('token=')) {
                    authToken = s.replace('token=', '');
                    break;
                }
            }

            console.log({ authToken, authorizationHeader });

            if (!authToken) {
                return { success: false, msg: 'authToken empty' };
            }

            /**
             * Token structure according to spec. For blind RSA
             * the following constants have to be used: Nid=32, Nk=512
             * See https://www.ietf.org/archive/id/draft-ietf-privacypass-protocol-04.html#name-token-type
             * struct {
             *   uint16_t token_type;
             *   uint8_t nonce[32];
             *   uint8_t context[32];
             *   uint8_t token_key_id[Nid];
             *   uint8_t authenticator[Nk];
             * } Token;
             */

            const buf = Buffer.from(authToken, 'base64');

            // Only token type 2 is supported
            if (buf.readInt16BE(0) != 2) {
                return { success: false, msg: 'Only token type 2 is supported' };
            }

            //const client_nonce = buf.subarray(2, 34);
            //const token_key_id = buf.subarray(66, 98);
            const authenticator = buf.subarray(98, 512 + 98);

            // context is defined as SHA256(valid token request)
            const context = buf.subarray(34, 66);
            const contextHex = context.toString('hex');
            if (this.activeContexts[contextHex]) {
                delete this.activeContexts[contextHex];
            } else {
                console.error('Double redemption attempt detected!');
                //return false;
            }

            // We can verify the token with the Issuer public key by signing (token_type, client_nonce, token_key_id)
            // and comparing against the authenticator field
            const verifiableData = buf.subarray(0, 98);

            const isVerified = crypto.verify(
                null,
                verifiableData,
                {
                    key: issuerInfo.issuer_public_key_pem
                },
                authenticator
            );

            return { success: isVerified, msg: 'success' };
        }
        catch (ex) {
            return { success: false, msg: ex.message };
        }
    }
}

export default TokenRedemption;