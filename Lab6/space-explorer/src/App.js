import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TopNews from './pages/TopNews';
import CategoryNews from './pages/CategoryNews';
import styles from './styles/App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/top-news" element={<TopNews />} />
            <Route path="/category/:category" element={<CategoryNews />} />
            <Route path="/search" element={<TopNews />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;