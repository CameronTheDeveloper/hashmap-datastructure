import { mapNode } from "./map-node";

const bucketLinkedList = () => {
    return {
        head: null,
        tail: null,
        size: 0,

        append(key, value) {
            const newNode = mapNode(key, value);

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
            const newHead = mapNode(key, value);
            newHead.next = this.head;
            this.head = newHead;
            this.size++;
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
        }

    };
};

export { bucketLinkedList };