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
        }

    };
};

export { bucketLinkedList };