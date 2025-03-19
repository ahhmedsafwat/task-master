'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster position="bottom-right" richColors />
      {children}
    </ThemeProvider>
  )
}
