import { Tabs, useRouter } from "expo-router"
import { onAuthStateChanged, User } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { auth, db } from "../constants/firebase"
import { useFamilyStore } from "../store/useFamilyStore"

export default function RootLayout() {
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const { familyId, setFamilyId } = useFamilyStore()
  const router = useRouter()

  /* 1 Auth state */
  useEffect(() => onAuthStateChanged(auth, setUser), [])

  /* 2 Find a family doc */
  useEffect(() => {
    if (!user) return
    ;(async () => {
      const q = query(collection(db, "families"), where("memberUIDs", "array-contains", user.uid))
      const snap = await getDocs(q)
      if (!snap.empty) setFamilyId(snap.docs[0].id)
    })()
  }, [user])

  /* 3 Navigate once the info is known */
  useEffect(() => {
    if (user === undefined) return
    else if (!user) router.replace("/sign-in")
    else if (!familyId) router.replace("/join-family")
  }, [user, familyId])

  /* While we’re deciding, render nothing (or a splash) */
  if (user === undefined) return null

  // TODO: figure out what tabs to show
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Kids" }} />
      <Tabs.Screen name="add-kid" options={{ href: null }} />
      <Tabs.Screen name="[kidId]/index" options={{ href: null }} />
      <Tabs.Screen name="[kidId]/add" options={{ href: null }} />
    </Tabs>
  )
}
