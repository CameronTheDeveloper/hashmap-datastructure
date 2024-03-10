const createHashMap = (bucketsSize = 16) => {

    let bucketsAr = [];
    bucketsAr.length = bucketsSize;

    const hash = (key) => {
        let hashCode = 0;
        const primeNum = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % 16;
        }

        return hashCode;
    };

    const isOutOfBounds = (key) => key < 0 || key >= bucketsAr.length;

    const set = (key, value) => {
        const bucketKey = hash(key);
        if (isOutOfBounds(bucketKey)) {
            throw new Error("Trying to access index out of bound");
        }

        const node = { key: key, value: value };
        bucketsAr[bucketKey] = node;
    };

    const has = (key) => {
        const bucketKey = hash(key);
        if (isOutOfBounds(bucketKey)) {
            throw new Error("Trying to access index out of bound");
        }

        const node = bucketsAr[bucketKey];
        if (node) {
            return true;
        } else {
            return false;
        }
    };

    const get = (key) => {
        const bucketKey = hash(key);

        if (isOutOfBounds(bucketKey)) {
            throw new Error("Trying to access index out of bound");
        }

        const node = bucketsAr[bucketKey];
        if (node) {
            return node.value;
        } else {
            return null;
        }
    };

    const remove = (key) => {
        const bucketKey = hash(key);

        if (isOutOfBounds(bucketKey)) {
            throw new Error("Trying to access index out of bound");
        }

        const node = bucketsAr[bucketKey];
        if (node) {
            bucketsAr[bucketKey] = undefined;
            return true;
        } else {
            return false;
        }
    };

    const clear = () => {
        bucketsAr = [];
        bucketsAr.length = 16;
    };

    const entries = () => {
        return bucketsAr.filter((index) => index);
    };

    const keys = () => {
        let keysAr = [];
        bucketsAr.forEach((index) => {
            index.key && keysAr.push(index.key);
        });
        return keysAr;
    };

    return { set, get, has, remove, clear, entries, keys };
};

export { createHashMap };