import { useRouter } from "expo-router"
import { collection, addDoc } from "firebase/firestore"
import { useState } from "react"
import { View, TextInput, Button } from "react-native"
import { kidConverter } from "../constants/converters"
import { db } from "../constants/firebase"
import { useFamilyStore } from "../store/useFamilyStore"

export default function AddKid() {
  const [name, setName] = useState("")
  const { familyId } = useFamilyStore()
  const router = useRouter()

  async function save() {
    if (!familyId || !name.trim()) return
    const ref = collection(db, "families", familyId, "kids").withConverter(kidConverter)
    await addDoc(ref, { id: "", name: name.trim() })
    router.back()
  }

  if (!familyId) return null

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <TextInput placeholder="Child’s name" onChangeText={setName} />
      <Button title="Save" onPress={save} />
    </View>
  )
}
