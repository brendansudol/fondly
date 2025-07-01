import { useLocalSearchParams, useRouter } from "expo-router"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { View, TextInput, Button } from "react-native"
import { quoteConverter } from "../../constants/converters"
import { auth, db } from "../../constants/firebase"
import { useFamilyStore } from "../../store/useFamilyStore"

export default function AddQuote() {
  const [text, setText] = useState("")
  const { kidId } = useLocalSearchParams<{ kidId?: string }>()
  const { familyId } = useFamilyStore()
  const router = useRouter()

  if (!familyId || !kidId) return null

  async function save() {
    if (!familyId || !kidId || !text.trim()) return

    let ref = collection(db, "families", familyId, "kids", kidId, "quotes")
    ref = ref.withConverter(quoteConverter)

    await addDoc(ref, {
      id: "",
      text,
      ts: serverTimestamp() as any, // converter handles Timestamp → Date
      authorUID: auth.currentUser!.uid,
    })

    router.back()
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <TextInput
        placeholder="What did they say?"
        multiline
        autoFocus
        onChangeText={setText}
        style={{ fontSize: 18, textAlignVertical: "top" }}
      />
      <Button title="Save" onPress={save} />
    </View>
  )
}
