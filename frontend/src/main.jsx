import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HeroSection from './components/HeroSection.jsx';
import Pricing from './components/Pricing.jsx';
import MainScreen from './components/MainScreen.jsx';
import RazorpayButton from './components/RazorpayButton.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HeroSection />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="mainscreen" element={<MainScreen />} />
      <Route path="razorpay" element={<RazorpayButton />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
