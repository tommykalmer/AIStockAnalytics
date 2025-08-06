// v2/frontend/components/PasswordGate.tsx
'use client'

import { useState } from 'react'

const correctPassword = 'dittlösenord123'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false)
  const [input, setInput] = useState('')

  if (!entered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Ange lösenord för att gå vidare</h1>
        <input
          type="password"
          className="border border-gray-400 rounded px-4 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setEntered(input === correctPassword)}
        >
          Gå vidare
        </button>
      </div>
    )
  }

  return <>{children}</>
}
