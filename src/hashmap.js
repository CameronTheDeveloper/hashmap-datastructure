const createHashMap = (bucketsSize = 16) => {

    let bucketsAr = [];
    let capacity = 0;
    let loadFactor = 0.75;
    bucketsAr.length = bucketsSize;

    const hash = (key) => {
        let hashCode = 0;
        const primeNum = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % bucketsAr.length;
        }

        return hashCode;
    };

    const isOutOfBounds = (key) => key < 0 || key >= bucketsAr.length;

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
            capacity--;
            bucketsAr[bucketKey] = {};
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

    const values = () => {
        let valuesAr = [];
        bucketsAr.forEach((index) => {
            index.value && valuesAr.push(index.value);
        });
        return valuesAr;
    };

    const length = () => {
        const keysAr = keys();
        return keysAr.length;
    };

    const bucketsArIsTooSmall = () => bucketsAr.length * loadFactor < capacity;

    const growBucketsAr = () => {
        bucketsAr.length *= 2;
    };

    const set = (key, value) => {

        if (bucketsArIsTooSmall) {
            growBucketsAr();
        }

        const bucketKey = hash(key);
        if (isOutOfBounds(bucketKey)) {
            throw new Error("Trying to access index out of bound");
        }

        const node = { key: key, value: value };
        capacity++;
        bucketsAr[bucketKey] = node;
    };

    return { get, has, remove, clear, entries, keys, values, length, set };
};

export { createHashMap };