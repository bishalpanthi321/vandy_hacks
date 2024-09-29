import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import Login from "../components/login";
import {useState} from 'react';

export default function Home() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const handleLoginModalOpen = () => setShowLoginModal(true);
    const handleLoginModalClose = () => setShowLoginModal(false);
    
    return (
        <div class="vh-100 vw-100 d-flex flex-row">
            <Sidebar onLoginClick={handleLoginModalOpen}/>
            <Editor />
            <Login onShow= {showLoginModal} onHideClick={handleLoginModalClose}/>
        </div>
    );
}
