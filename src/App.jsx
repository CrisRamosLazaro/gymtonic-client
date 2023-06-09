import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from './contexts/theme.context'
import AppRoutes from './routes/AppRoutes'
import Navigation from './components/Navigation/Navigation'
import NavigationTop from './components/NavigationTop/NavigationTop'
import NavigationBottom from './components/NavigationBottom/NavigationBottom'
import Footer from './components/Footer/Footer'


const App = () => {

  const { theme, switchTheme } = useContext(ThemeContext)
  const variant = theme === 'light' ? 'dark' : 'light'

  const location = useLocation()

  return (
    <div className={variant === 'light' ? 'App App-light' : 'App App-dark'}>
      {!["/signup", "/login", "/"].includes(location.pathname) && <Navigation />}
      {!["/"].includes(location.pathname) && <NavigationTop />}
      <AppRoutes />
      {!["/signup", "/login", "/"].includes(location.pathname) && <NavigationBottom />}
      {!["/signup", "/login", "/"].includes(location.pathname) && <Footer />}
    </div>
  )
}

export default App
