// v2/frontend/app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import PasswordGate from '../components/PasswordGate'

export const metadata = {
  title: 'AIStockAnalytics',
  description: 'AI-baserad aktieanalys med licenser och engångsköp.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  )
}
