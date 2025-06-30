import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentData,
  Timestamp,
} from "firebase/firestore"
import { Kid, Quote } from "../types"

export const kidConverter: FirestoreDataConverter<Kid> = {
  toFirestore: (kid): DocumentData => ({ name: kid.name }),
  fromFirestore: (snap: QueryDocumentSnapshot, _opts: SnapshotOptions): Kid => {
    const data = snap.data()
    return { id: snap.id, name: data.name }
  },
}

export const quoteConverter: FirestoreDataConverter<Quote> = {
  toFirestore: (q): DocumentData => ({
    text: q.text,
    ts: q.ts,
    authorUID: q.authorUID,
  }),
  fromFirestore: (snap: QueryDocumentSnapshot, _opts: SnapshotOptions): Quote => {
    const d = snap.data()
    const tsRaw = d.ts as Timestamp | null | undefined
    return {
      id: snap.id,
      text: d.text,
      ts: tsRaw ? tsRaw.toDate() : null,
      authorUID: d.authorUID,
    }
  },
}
