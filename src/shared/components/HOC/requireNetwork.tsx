import { PropsWithChildren } from 'react'
import { useNetwork } from 'src/shared/hooks/useNetwork'
import Offline from 'src/shared/components/Offline'
interface RequireNetworkProps {}

const RequireNetwork = ({
  children,
}: PropsWithChildren<RequireNetworkProps>) => {
  const {
    networkStatus: { isOnline },
  } = useNetwork()

  return (
    <div className="network-status-wrapper">
      <Offline isOffline={!isOnline} />
      {children}
    </div>
  )
}

export default RequireNetwork
