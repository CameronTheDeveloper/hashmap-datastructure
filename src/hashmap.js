import { BucketLinkedList } from "./bucket-linked-list.js";

const HashMap = (bucketsSize = 16) => {

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
        bucketsAr.forEach((index) => {
            index.value && valuesAr.push(index.value);
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

        if (bucketsArIsTooSmall()) {
            growBucketsAr();
        }

        const bucketKey = hash(key);
        if (isOutOfBounds(bucketKey)) {
            throw new Error("Trying to access index out of bound");
        }

        if (bucketsAr[bucketKey]) {
            bucketsAr[bucketKey].append(key, value);
        } else {
            const bucket = BucketLinkedList();
            bucket.append(key, value);
            capacity++;
            bucketsAr[bucketKey] = bucket;
        }
    };

    return { get, has, remove, clear, entries, keys, values, length, set };
};

export { HashMap };