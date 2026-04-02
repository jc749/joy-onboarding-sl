export const metadata = {
  title: 'COMMANDIO — Joy Sunday Intelligence Onboarding',
  description: 'For Joy\'s management team.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
