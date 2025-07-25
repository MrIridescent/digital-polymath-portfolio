import type { Metadata } from 'next'
import './globals.css'
import '../styles/dynamic-themes.css'
import { generateMetaTags } from '@/lib/seo-config'
import { PersonStructuredData, WebsiteStructuredData, OrganizationStructuredData, FAQStructuredData } from '@/components/StructuredData'

import { DynamicLayoutSystem } from '@/components/DynamicLayoutSystem'
import ContentProtection from '@/components/ContentProtection'
import { GlobalProtectionProvider } from '@/components/GlobalProtectionProvider'

export const metadata: Metadata = generateMetaTags()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <PersonStructuredData />
        <WebsiteStructuredData />
        <OrganizationStructuredData />
        <FAQStructuredData />
      </head>
      <body className="font-sans antialiased overflow-x-hidden" suppressHydrationWarning={true}>
        <GlobalProtectionProvider>
          <ContentProtection level={4}>
            <DynamicLayoutSystem>
              {children}
            </DynamicLayoutSystem>
          </ContentProtection>
        </GlobalProtectionProvider>
      </body>
    </html>
  )
}