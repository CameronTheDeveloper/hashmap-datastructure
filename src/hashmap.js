const createHashMap = (bucketSize = 16) => {

    let bucketsAr = [];
    bucketsAr.size = bucketSize;

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
        const node = { key: key, value: value };
        bucketsAr[bucketKey] = node;
    };

    const get = (key) => {
        const bucketKey = hash(key);
        const node = bucketsAr[bucketKey];

        if (node) {
            return node.value;
        } else {
            return null;
        }
    };

    return { set, get };
};

export { createHashMap };