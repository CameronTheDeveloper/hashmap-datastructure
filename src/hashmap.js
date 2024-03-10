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

    const set = (key, value) => {
        const bucketKey = hash(key);
        if (bucketKey < 0 || bucketKey >= bucketsAr.length) {
            throw new Error("Trying to access index out of bound");
        }

        const node = { key: key, value: value };
        bucketsAr[bucketKey] = node;
    };

    const has = (key) => {
        const bucketKey = hash(key);
        if (bucketKey < 0 || bucketKey >= bucketsAr.length) {
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

        if (bucketKey < 0 || bucketKey >= bucketsAr.length) {
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

        if (bucketKey < 0 || bucketKey >= bucketsAr.length) {
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

    return { set, get, has, remove };
};

export { createHashMap };