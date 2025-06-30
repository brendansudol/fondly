import { useLocalSearchParams, Link } from "expo-router"
import { useEffect, useState } from "react"
import { View, FlatList, Text } from "react-native"

import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../../constants/firebase"
import { quoteConverter } from "../../constants/converters"
import { Quote } from "../../types"
import { useFamilyStore } from "../../store/useFamilyStore"

export default function Quotes() {
  const { kidId } = useLocalSearchParams<{ kidId?: string }>()
  const { familyId } = useFamilyStore()
  const [quotes, setQuotes] = useState<Quote[]>([])

  useEffect(() => {
    if (!familyId || !kidId) return

    const q = query(
      collection(db, "families", familyId, "kids", kidId, "quotes").withConverter(quoteConverter),
      orderBy("ts", "desc")
    )
    const unsub = onSnapshot(q, (snap) => setQuotes(snap.docs.map((d) => d.data())))
    return unsub
  }, [familyId, kidId])

  if (!kidId) return null

  return (
    <View style={{ flex: 1 }}>
      <FlatList<Quote>
        data={quotes}
        keyExtractor={(q) => q.id}
        contentContainerStyle={{ padding: 24 }}
        renderItem={({ item }) => (
          <Text style={{ marginBottom: 16, fontSize: 16 }}>{item.text}</Text>
        )}
      />
      <Link href={`/${kidId}/add`} style={{ position: "absolute", right: 24, bottom: 24 }}>
        <Text style={{ fontSize: 36 }}>＋</Text>
      </Link>
    </View>
  )
}
