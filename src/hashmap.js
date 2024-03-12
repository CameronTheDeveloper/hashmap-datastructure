import { BucketLinkedList } from "./bucket-linked-list.js";

const HashMap = (bucketsSize = 16) => {

    let bucketsAr = [];
    let capacity = 0;
    let loadFactor = 0.75;
    bucketsAr.length = bucketsSize;

    const isOutOfBounds = (key) => key < 0 || key >= bucketsAr.length;

    const hash = (key) => {
        let hashCode = 0;
        const primeNum = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % bucketsAr.length;
        }
        if (isOutOfBounds(hashCode)) {
            throw new Error("Trying to access index out of bound");
        }
        return hashCode;
    };

    const has = (key) => {
        const bucketKey = hash(key);
        const bucket = bucketsAr[bucketKey];
        if (!bucket) {
            return false;
        }
        return bucket.hasNode(key);
    };

    const get = (key) => {
        const bucketKey = hash(key);
        const bucket = bucketsAr[bucketKey];
        if (!bucket) {
            return null;
        }
        const node = bucket.getNode(key);
        if (node) {
            return node.value;
        }
        return null;
    };

    const remove = (key) => {
        const bucketKey = hash(key);
        const bucket = bucketsAr[bucketKey];
        if (bucket && bucket.size <= 1) {
            bucketsAr[bucketKey] = undefined;
            capacity--;
        } else if (bucket && bucket.size > 1) {
            bucket.removeNode(key);
        } else {
            return false;
        }
        return true;
    };

    const clear = () => {
        bucketsAr = [];
        bucketsAr.length = 16;
        capacity = 0;
    };

    const entries = () => {
        let entriesAr = [];
        bucketsAr.forEach((bucket) => {
            bucket && bucket.getEntries(entriesAr);
        });
        return entriesAr;
    };

    const keys = () => {
        let keysAr = [];
        bucketsAr.forEach((bucket) => {
            bucket && bucket.getKeys(keysAr);
        });
        return keysAr;
    };

    const values = () => {
        let valuesAr = [];
        bucketsAr.forEach((bucket) => {
            bucket && bucket.getValues(valuesAr);
        });
        return valuesAr;
    };

    const length = () => capacity;

    const bucketsArIsTooSmall = () => bucketsAr.length * loadFactor < capacity;

    const growBucketsAr = () => {
        let tempAr = [];
        tempAr.length = bucketsAr.length;
        tempAr.push(...bucketsAr);
        bucketsAr = tempAr;
    };

    const set = (key, value) => {
        const bucketKey = hash(key);
        let bucket = bucketsAr[bucketKey];

        if (bucketsArIsTooSmall()) {
            growBucketsAr();
        }

        if (!bucket) {
            bucket = BucketLinkedList();
            bucket.append(key, value);
            capacity++;
            bucketsAr[bucketKey] = bucket;
        } else if (bucket) {
            let node = bucket.getNode(key);
            if (node) {
                node.value = value;
            } else {
                bucket.append(key, value);
            }
        }
    };

    return { get, has, remove, clear, entries, keys, values, length, set };
};

export { HashMap };