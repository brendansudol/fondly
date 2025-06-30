import { useState } from "react"
import { View, TextInput, Button, Alert } from "react-native"
import { doc, setDoc, arrayUnion } from "firebase/firestore"
import { auth, db } from "../constants/firebase"
import { useFamilyStore } from "../store/useFamilyStore"
import { useRouter } from "expo-router"

export default function JoinFamily() {
  const [code, setCode] = useState("")
  const { setFamilyId } = useFamilyStore()
  const router = useRouter()

  async function join() {
    if (!auth.currentUser) {
      Alert.alert("You must be signed in to join a family")
      return
    }

    try {
      const ref = doc(db, "families", code.trim())
      await setDoc(
        ref,
        {
          name: code.trim(),
          memberUIDs: arrayUnion(auth.currentUser.uid),
          viewerUIDs: [],
        },
        { merge: true }
      )

      setFamilyId(ref.id)
      router.replace("/")
    } catch (error: any) {
      Alert.alert("join-family join fail", error.message)
    }
  }

  return (
    <View style={{ padding: 24, gap: 16 }}>
      <TextInput placeholder="Enter family code (e.g. smiths)" onChangeText={setCode} />
      <Button title="Join / Create" onPress={join} />
    </View>
  )
}
