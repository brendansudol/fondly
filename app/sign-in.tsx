import { useState } from "react"
import { View, TextInput, Button, Alert } from "react-native"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../constants/firebase"
import { useRouter } from "expo-router"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [pw, setPw] = useState("")
  const router = useRouter()

  async function submit(isNew: boolean) {
    try {
      if (isNew) await createUserWithEmailAndPassword(auth, email.trim(), pw)
      else await signInWithEmailAndPassword(auth, email.trim(), pw)
      router.replace("/")
    } catch (e: any) {
      Alert.alert("Auth error", e.message)
    }
  }

  return (
    <View style={{ padding: 24, gap: 16 }}>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPw} />
      <Button title="Log in" onPress={() => submit(false)} />
      <Button title="I’m new → Sign up" onPress={() => submit(true)} />
    </View>
  )
}
