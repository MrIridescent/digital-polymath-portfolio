'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to check if the component is running on the client side.
 * This is useful for preventing hydration mismatches when using
 * browser-only APIs like window, document, etc.
 * 
 * @returns boolean - true if running on client, false on server
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient
}

/**
 * Hook to safely access window object
 * Returns null on server-side, window object on client-side
 */
export function useWindow(): Window | null {
  const isClient = useIsClient()
  return isClient ? window : null
}

/**
 * Hook to safely access document object
 * Returns null on server-side, document object on client-side
 */
export function useDocument(): Document | null {
  const isClient = useIsClient()
  return isClient ? document : null
}
