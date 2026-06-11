import { AuthProvider } from 'src/context/AuthContext'
import AppRoutes from 'src/routes/index'
import RequireNetwork from 'src/shared/components/HOC/requireNetwork'
import '@scssMain'
const App = () => {
  return (
    <RequireNetwork>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </RequireNetwork>
  )
}

export default App
