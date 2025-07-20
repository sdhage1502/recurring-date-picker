
import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Recurring Date Picker',
  description: 'A powerful recurring date picker application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
