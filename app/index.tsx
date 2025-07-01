import { Link, useRouter } from "expo-router"
import { collection, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { View, Pressable, Text } from "react-native"
import { kidConverter } from "../constants/converters"
import { db } from "../constants/firebase"
import { useFamilyStore } from "../store/useFamilyStore"
import { Kid } from "../types"

export default function Kids() {
  const { familyId } = useFamilyStore()
  const [kids, setKids] = useState<Kid[]>([])
  const router = useRouter()

  useEffect(() => {
    if (!familyId) return
    const kidsRef = collection(db, "families", familyId, "kids").withConverter(kidConverter)
    const unsub = onSnapshot(kidsRef, (snap) => setKids(snap.docs.map((d) => d.data())))
    return unsub
  }, [familyId])

  if (!familyId) return null // shouldn’t happen, but TS guard

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {kids.map((k) => (
        <Pressable key={k.id} style={{ padding: 12 }} onPress={() => router.push(`/${k.id}`)}>
          <Text style={{ fontSize: 18 }}>{k.name}</Text>
        </Pressable>
      ))}
      <Link href="/add-kid" style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 24 }}>＋ Add child</Text>
      </Link>
    </View>
  )
}
