import { useEffect, useState } from 'react'
import { NetworkStatus } from 'src/enums/networkStatusTypes'
export const useNetwork = () => {
  const [networkStatus, setNetworkStatus] = useState({
    isOnline: navigator.onLine,
  })

  const handleNetworkStatusChange = ({ type }: Event) =>
    setNetworkStatus((prevStatus) => ({
      ...prevStatus,
      isOnline: type === NetworkStatus.ONLINE,
    }))

  useEffect(() => {
    window.addEventListener('online', handleNetworkStatusChange)
    window.addEventListener('offline', handleNetworkStatusChange)

    return () => {
      window.removeEventListener('online', handleNetworkStatusChange)
      window.removeEventListener('offline', handleNetworkStatusChange)
    }
  }, [])

  return {
    networkStatus,
  }
}
