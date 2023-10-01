import crypto from 'crypto';

const keySizeBytes = 64;
const secureKey = crypto.randomBytes(keySizeBytes);
const CryptoKey = secureKey.toString('hex');

export default CryptoKey;