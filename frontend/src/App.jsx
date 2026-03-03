
import React, { useState, useEffect, useContext } from "react"; // Додано useContext
import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from "react-ga4";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Footer2 from "./Components/Footer2/Footer2";
import ProtectedRoute from "./Components/ProtectedRoute";
import ScrollToTop from "./Components/ScrollToTop";
import Modal from './Components/Modal/Modal';


// Context
import { AuthContext } from "./AuthContext"; 

// Pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Advert from "./pages/Advert/Advert";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/AdminDashbord/";
import EditPost from "./pages/EditPost/EditPost";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import AddPost from "./pages/AddPost/AddPost";
import SearchPage from "./pages/SearchPage/SearchPage";
import SettingsPage from "./pages/SettingPage/SettingPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import CommentsModeration from "./pages/CommentsModeration/CommentsModeration";
import TopTools from "./pages/TopTools/TopTools";
import Privacy from "./pages/Legal/Privacy";
import Terms from "./pages/Legal/Terms";
import ThankYou from "./pages/ThankYou/ThankYou";
import AdminLayout from "./pages/Admin/AdminLayout";
import TopToolsHosting from "./pages/TopTools/TopToolsHosting";
import TopToolsBuilders from "./pages/TopTools/TopToolsBuilder";
import TopToolsMarketing from "./pages/TopTools/TopToolsMarketing";
import ConditionalNewsletter from './ConditionalNewsletter';
import TopToolsCRM from "./pages/TopTools/TopToolsCRM";
import GoldAnalytics from "./pages/GoldAnalitics/GoldAnalytics";


// Google Analytics Setup
const TRACKING_ID = "G-XXXXXXXXXX"; 
ReactGA.initialize(TRACKING_ID);




const App = () => {
  const { admin, loading } = useContext(AuthContext); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  
  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  
  useEffect(() => {
    const handleMouseLeave = (e) => {
      const hasSeenModal = sessionStorage.getItem('exitIntentShown');
      if (e.clientY <= 0 && !hasSeenModal) {
        setIsModalOpen(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  
  if (loading) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Секунду, завантажуємо дані...</h1>
    </div>
  ); 
}

  return (
    <HelmetProvider>
      <ScrollToTop />
      <Navbar onOpenModal={openModal}/>
      <div>
        <Routes>
          {/* Публічні маршрути */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/advert" element={<Advert />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/top-tools" element={<TopTools />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tools" element={<TopTools />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/top-tools-hosting" element={<TopToolsHosting />} />
          <Route path="/top-tools-builders" element={<TopToolsBuilders />} />
          <Route path="/marketing" element={<TopToolsMarketing />} />
          <Route path="/crm" element={<TopToolsCRM />} />
          

          {/* Авторизація */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register-secret-page" element={<AdminRegister />} />

             <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="comments" element={<CommentsModeration />} />
              <Route path="add-post" element={<AddPost />} />
              <Route path="edit/:slug" element={<EditPost />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="gold-stats" element={<GoldAnalytics />} />
            </Route>
          {/* Редирект для неіснуючих сторінок (опціонально) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <ConditionalNewsletter />
        <Footer2 />
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </HelmetProvider>
  );
};

export default App;