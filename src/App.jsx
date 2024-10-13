import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the import path as needed
import Wardrobe from './Wardrobe'; // Your components
import Outfits from './Outfits';
import Events from './Events';
import Analytics from './Analytics';
import CreateOutfit from './CreateOutfit';

import HeroSection from './Herosection';

import FeaturesSection from './FeaturesSection';

import GallerySection from './GallerySection';

import AboutSection from './AboutSection';

import ContactSection from './ContactSection';

import FooterSection from "./FooterSection";

import Login from "./Login";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

              {/* Render both HeroSection and FeaturesSection on the root route */}
              <Route path="/" element={
          <>
            <HeroSection />
            <FeaturesSection />


          <GallerySection/>

          <AboutSection/>

          <ContactSection/>

          <FooterSection/>

          </>
        } />


        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/outfits" element={<Outfits />} />
        <Route path="/events" element={<Events />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/create-outfit" element={<CreateOutfit />} />

        <Route path="/login" element={<Login />} />


      </Routes>

 

    </Router>
  );
};

export default App;
