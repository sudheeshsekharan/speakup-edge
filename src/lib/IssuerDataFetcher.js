'use strict';

// import axios from 'axios';

// const ISSUER_DATA = {"issuer-request-key-uri":"/origin-token-key","issuer-request-uri":"/token-request","token-keys":[{"token-type":2,"token-key":"MIIBUjA9BgkqhkiG9w0BAQowMKANMAsGCWCGSAFlAwQCAqEaMBgGCSqGSIb3DQEBCDALBglghkgBZQMEAgKiAwIBMAOCAQ8AMIIBCgKCAQEAssa1yUS-F7zFYdlUpTP3_xLEi6Ihd2Od9IsNU2mOoepEIz46Lx4489m9p9zOx8DAPFfimbcrIBxiloFP7gyOKuCki8hAYIT3xFnSnhs7XukxzM6RalQ8tzlmSv6zXUHGCw7jGAae-rgezvXdyDs228XG3kpRM9xPBJqxdZV8uYTE1pa0T5G82WGolMgBCR2e58QjWONMByz6uA8vFz0QNYQrrGEazynll8CmvZJ8bHU1vg3jqkBVl3mjcC2RpNkyjuy2YwlkxRG6vv_nh0Dpc0dJyEctzXPTFxs4diVww_IoulIsGFeL-UN9RLDpX48qK5YAP4jfFzTbDeqRSWx8pwIDAQAB","token-key-legacy":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAssa1yUS-F7zFYdlUpTP3_xLEi6Ihd2Od9IsNU2mOoepEIz46Lx4489m9p9zOx8DAPFfimbcrIBxiloFP7gyOKuCki8hAYIT3xFnSnhs7XukxzM6RalQ8tzlmSv6zXUHGCw7jGAae-rgezvXdyDs228XG3kpRM9xPBJqxdZV8uYTE1pa0T5G82WGolMgBCR2e58QjWONMByz6uA8vFz0QNYQrrGEazynll8CmvZJ8bHU1vg3jqkBVl3mjcC2RpNkyjuy2YwlkxRG6vv_nh0Dpc0dJyEctzXPTFxs4diVww_IoulIsGFeL-UN9RLDpX48qK5YAP4jfFzTbDeqRSWx8pwIDAQAB","version":60,"not-before":1690316422},{"token-type":2,"token-key":"MIIBUjA9BgkqhkiG9w0BAQowMKANMAsGCWCGSAFlAwQCAqEaMBgGCSqGSIb3DQEBCDALBglghkgBZQMEAgKiAwIBMAOCAQ8AMIIBCgKCAQEAuty-iXufu4GhmGUW4McGFWA4d5eAGhXm5wKDkDGk9KPKPNeoUXYr-Y-S3Ysqf8X-0l39OV1-xiYSlhROpSexL-m84Y4H6t5h_dqlswss0CzVJq8mAdillM_Cp1Ap2gwLWMq2I3wwYZgqXNXWORvh1aFR5Jd2vWIPCg7JQ-kW05IWOgel6yjT5QuluuaP___wP1jyvgHlG6fGtAfwvLoaOMd4FZoHo4q0YQiHKQkUCS4KUmBZ5voudttxZDjfW1muqUZbeXWFg9sPDZ3JtF0VUhS04udgCYRbQ3sx7toLbE64CDnozdBs7cqVIR0k8ct-NxLL_cKjipbpFDh6po9OBwIDAQAB","token-key-legacy":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuty-iXufu4GhmGUW4McGFWA4d5eAGhXm5wKDkDGk9KPKPNeoUXYr-Y-S3Ysqf8X-0l39OV1-xiYSlhROpSexL-m84Y4H6t5h_dqlswss0CzVJq8mAdillM_Cp1Ap2gwLWMq2I3wwYZgqXNXWORvh1aFR5Jd2vWIPCg7JQ-kW05IWOgel6yjT5QuluuaP___wP1jyvgHlG6fGtAfwvLoaOMd4FZoHo4q0YQiHKQkUCS4KUmBZ5voudttxZDjfW1muqUZbeXWFg9sPDZ3JtF0VUhS04udgCYRbQ3sx7toLbE64CDnozdBs7cqVIR0k8ct-NxLL_cKjipbpFDh6po9OBwIDAQAB","version":59}]};

const ISSUER_DATA = {"issuer-request-key-uri":"/origin-token-key","issuer-request-uri":"/token-request","token-keys":[{"token-type":2,"token-key":"MIIBUjA9BgkqhkiG9w0BAQowMKANMAsGCWCGSAFlAwQCAqEaMBgGCSqGSIb3DQEBCDALBglghkgBZQMEAgKiAwIBMAOCAQ8AMIIBCgKCAQEAlBddK8vu6rhmnrwsRa0IVxuFXwfWNqMptCjFJHdIi5Ozyz--sHOB3NRSFRaGA9bffXd5ZJXbokYmbkRJBo4rIGlsW33QLFlfQWLQhQ4gIlSnMaErpz5QC0yL5hD4GXkZf0jQTgjBzx4k8uagjfjh0JkrFwFJkACuSIqL_bmZkpZ7XPVaQv6GmCA5s9qGSYfNCpBVEpAAcSteMo0iz7_wByVMMugNk0S0l6dko-3TPKmHjTMiqdgXQc5IRCdgqq4aoktxGoDDVGNJ_XnK_CggQULl-084kmRk6R5wOZK7oLPhxnrSjh5b-_VxEFtYz0vd_IL98ZRJk1FLEwaie3_feQIDAQAB","token-key-legacy":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAlBddK8vu6rhmnrwsRa0IVxuFXwfWNqMptCjFJHdIi5Ozyz--sHOB3NRSFRaGA9bffXd5ZJXbokYmbkRJBo4rIGlsW33QLFlfQWLQhQ4gIlSnMaErpz5QC0yL5hD4GXkZf0jQTgjBzx4k8uagjfjh0JkrFwFJkACuSIqL_bmZkpZ7XPVaQv6GmCA5s9qGSYfNCpBVEpAAcSteMo0iz7_wByVMMugNk0S0l6dko-3TPKmHjTMiqdgXQc5IRCdgqq4aoktxGoDDVGNJ_XnK_CggQULl-084kmRk6R5wOZK7oLPhxnrSjh5b-_VxEFtYz0vd_IL98ZRJk1FLEwaie3_feQIDAQAB","version":75,"not-before":1699388454},{"token-type":2,"token-key":"MIIBUjA9BgkqhkiG9w0BAQowMKANMAsGCWCGSAFlAwQCAqEaMBgGCSqGSIb3DQEBCDALBglghkgBZQMEAgKiAwIBMAOCAQ8AMIIBCgKCAQEAtYwxb6L64kN-IAeA_pZxeoDCci3tGX6kXCpqFdIju8f794pY8eNr9PogDgoLp3r7y63yMt1jh869wCX9mf7fb6hXnCCQT3CP5h0G5dspa-8To0sntzD9bd0RwUkxhiPCGf25FaURAOvQfdf1eDQR4rQiL6Jn9quihcYvRPHygVkCj_EgbadSLdVUuaD6l1hagZzjwplhXKinz0Vb-fTr5UvuKNIag8cgnXTvoO0KPv2SeiJSoFDMJ3gHvyqZFgScAYyD_8JOf38PGgO0qVxhwOZx-LXvMEe3zEjxD-lEmIl1JmwvZMBChKwiOff3Viq04CYIbpakuyahGo20Pk3sewIDAQAB","token-key-legacy":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtYwxb6L64kN-IAeA_pZxeoDCci3tGX6kXCpqFdIju8f794pY8eNr9PogDgoLp3r7y63yMt1jh869wCX9mf7fb6hXnCCQT3CP5h0G5dspa-8To0sntzD9bd0RwUkxhiPCGf25FaURAOvQfdf1eDQR4rQiL6Jn9quihcYvRPHygVkCj_EgbadSLdVUuaD6l1hagZzjwplhXKinz0Vb-fTr5UvuKNIag8cgnXTvoO0KPv2SeiJSoFDMJ3gHvyqZFgScAYyD_8JOf38PGgO0qVxhwOZx-LXvMEe3zEjxD-lEmIl1JmwvZMBChKwiOff3Viq04CYIbpakuyahGo20Pk3sewIDAQAB","version":74}]};

class IssuerDataFetcher {

    fetchIssuerData() {

                const data = ISSUER_DATA;

                // Extract issuer name and issuer public key
                // If we find an absolute URL inside the dictionary we take that info instead
                const issuer_name = "demo-pat.issuer.cloudflare.com";
    
                var issuer_public_key_base64;
                for (var i = 0; i < data['token-keys'].length; i++) {
                    const key = data['token-keys'][i];
                    if (key['token-type'] == 2) {
                        issuer_public_key_base64 = key['token-key'];
                        break;
                    }
                }
    
                // Also prepare key in PEM format which we will need to verify redemption tokens
                var issuer_public_key_pem = "-----BEGIN PUBLIC KEY-----\n";
                for (i = 0; i < issuer_public_key_base64.length; i++) {
                    issuer_public_key_pem += issuer_public_key_base64[i].replace(/-/g, '+').replace(/_/g, '/');
                    if (i > 0 && i % 64 == 0) {
                        issuer_public_key_pem += "\n";
                    }
                }
                issuer_public_key_pem += "\n-----END PUBLIC KEY-----\n";
                
                return {
                    issuer_name,
                    issuer_public_key_base64,
                    issuer_public_key_pem
                };
                //});
    }
}

export default IssuerDataFetcher;