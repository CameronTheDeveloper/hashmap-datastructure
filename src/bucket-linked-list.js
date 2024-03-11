import { MapNode } from "./map-node.js";

const BucketLinkedList = () => {
    return {
        head: null,
        tail: null,
        size: 0,

        append(key, value) {
            const newNode = MapNode(key, value);

            if (this.size < 1) {
                this.head = newNode;
                this.tail = newNode;
            } else {
                this.tail.next = newNode;
                this.tail = newNode;
            }
            this.size++;
        },

        prepend(key, value) {
            const newHead = MapNode(key, value);
            newHead.next = this.head;
            this.head = newHead;
            this.size++;
        },

        hasNode(key) {
            let current = this.head;
            let nodeFound = false;
            while (current) {
                if (current.key === key) {
                    nodeFound = true;
                    return nodeFound;
                } else {
                    current = current.next;
                }
            }
            return nodeFound;
        },

        removeNode(key) {
            let current = this.head;
            let nextNode = current.next;

            if (current.key === key) {
                this.head = current.next;
                current = null;
                return;
            }

            while (nextNode && nextNode.key !== key) {
                current = current.next;
                nextNode = current.next;
            }

            if (nextNode && nextNode.key === key) {
                current.next = nextNode.next;
                nextNode = null;
            } else {
                throw new Error('Key not found in bucket');
            }
        },

        getEntries(entriesAr) {
            let current = this.head;
            while (current) {
                entriesAr.push({ key: current.key, value: current.value });
                current = current.next;
            }
        },

        getKeys(keysAr) {
            let current = this.head;
            while (current) {
                keysAr.push(current.key);
                current = current.next;
            }
        },

        getValues(valuesAr) {
            let current = this.head;
            while (current) {
                valuesAr.push(current.value);
                current = current.next;
            }
        },
    };
};

export { BucketLinkedList };