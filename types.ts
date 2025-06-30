export interface Kid {
  id: string
  name: string
}

export interface Quote {
  id: string
  text: string
  ts: Date | null // `null` until server timestamp resolves offline
  authorUID: string
}
