const OAuth = require('oauth').OAuth2;

const Facebook = (clientId, clientSecret) => {
    const oauth = new OAuth(clientId, clientSecret, 'https://graph.facebook.com', null, 'oauth2/token', null);

    const getProfileImage = (accessToken, done) => {
        oauth.get('https://graph.facebook.com/v3.0/me/picture?redirect=false', accessToken, (err, results) => {
            results = JSON.parse(results);
            done(results.data);
        });
    };

    return {
        getImage: getProfileImage
    }
};

module.exports = Facebook;