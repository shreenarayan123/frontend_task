
import './App.css'
import { AdminProvider } from './components/admin-context'
import { AdminDashboard } from './components/admin-dashboard'

function App() {
  return (



    <AdminProvider>
      <AdminDashboard />
    </AdminProvider>
  
  
  )
}

export default App
