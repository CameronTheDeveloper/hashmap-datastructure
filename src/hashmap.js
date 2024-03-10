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
        const nodeKey = hash(key);
        const node = { key: key, value: value };
        bucketsAr[nodeKey] = node;
    };

    return { set };
};

export { createHashMap };