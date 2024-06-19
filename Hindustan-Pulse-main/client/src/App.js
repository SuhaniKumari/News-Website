import './App.css';
import { Routes, Route } from 'react-router-dom'
import Header from './components/common/Header/Header';
import Home from './pages/Home/Home';
import View from './pages/View/View';
import Footer from './components/common/Footer/Footer';
import Search from './pages/Search/Search';
import OpenRoute from './routes/openRoute';
import ProtectedRoute from './routes/protectedRoute';
import Account from './pages/Account/Account';
import Verification from './pages/Auth/Verification';
import ResetPassword from './pages/Auth/ResetPassword';
import AboutUs from './pages/Utils/AboutUs';
import PrivacyPolicy from './pages/Utils/PrivacyPolicy';
import ContactUs from './pages/Utils/ContactUs';
import Error from './pages/Utils/Error';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/view' element={<View />} />
                <Route path='/search' element={<Search />} />
                <Route path='/login' element={<OpenRoute><Account /></OpenRoute>} />
                <Route path='/myaccount' element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path='/verification/:token' element={<Verification />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/contact-us' element={<ContactUs />} />
                <Route path='/privacy' element={<PrivacyPolicy />} />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
