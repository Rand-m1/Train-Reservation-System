// this is the node for the linked list
export interface WaitingListEntry {
  id: string
  passengerName: string
  passengerEmail: string
  trainId: string
  addedAt: Date
}


class Node {
  value: WaitingListEntry
  next: Node | null = null

  constructor(value: WaitingListEntry) {
    this.value = value
  }
}


// this is the queue class using linked list
// FIFO = first in first out
export class FIFOQueue {
  head: Node | null = null
  tail: Node | null = null
  size: number = 0


  // add person to end of queue
  enqueue(entry: WaitingListEntry) {
    const newNode = new Node(entry)

    if (this.tail) {
      this.tail.next = newNode
    }
    this.tail = newNode

    if (!this.head) {
      this.head = newNode
    }

    this.size++
  }


  // remove from front of queue
  dequeue(): WaitingListEntry | null {
    if (!this.head) return null

    const val = this.head.value
    this.head = this.head.next

    if (!this.head) {
      this.tail = null
    }

    this.size--
    return val
  }


  // check if queue is empty
  isEmpty(): boolean {
    return this.size === 0
  }


  // get all items as array so react can show them
  toArray(): WaitingListEntry[] {
    const result: WaitingListEntry[] = []
    let current = this.head

    while (current) {
      result.push(current.value)
      current = current.next
    }

    return result
  }
}
