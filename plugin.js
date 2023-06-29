
const crypto = require("crypto");

const getWsseHeader = ({ username, password }) => {
    const nonce = crypto.randomBytes(16).toString('hex');
    const timestamp = new Date().toISOString();
    const digest = base64Sha1(nonce + timestamp + password);
    return `UsernameToken Username="${username}", PasswordDigest="${digest}", Nonce="${nonce}", Created="${timestamp}"`;
}

const base64Sha1 = (str) => {
    const hexDigest = crypto.createHash('sha1').update(str).digest('hex');
    return Buffer.from(hexDigest).toString('base64');
}

module.exports.templateTags = [{
    name: 'InsomniaEmarsysWsse',
    displayName: 'Emarsys WSSE',
    description: 'Generate a Emarsys WSSE header',
    args: [
        {
            displayName: 'Username',
            description: 'Username',
            type: 'string'
        },
        {
            displayName: 'Password',
            description: 'User password',
            type: 'string'
        }
    ],
    async run(context, username, password) {
        return getWsseHeader({ username, password });
    }
}];

