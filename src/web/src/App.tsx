import CornMarket from '@/views/CornMarket'
import { ThemeProvider } from '@/components/theme-provider/ThemeProvider'
import { CornOrderProvider } from './context/CornOrderContext'
import { StrictMode } from 'react'

function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <CornOrderProvider>
          <div className='flex justify-center items-center h-screen bg-gray-300'>
            <CornMarket />
          </div>
        </CornOrderProvider>
      </ThemeProvider>
    </StrictMode>
  )
}

export default App
