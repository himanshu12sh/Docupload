import "./globals.css"

export const metadata = {
  title: "Document App",
  description: "Document Upload System",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}