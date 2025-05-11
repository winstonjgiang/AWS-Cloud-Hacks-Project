import { Providers } from './providers/providers'

export const metadata = {
  title: 'Cloud Hacks',
  description: 'Cloud Hacks Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 