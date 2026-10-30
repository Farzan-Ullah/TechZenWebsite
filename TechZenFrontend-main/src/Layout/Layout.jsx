import { Outlet } from "react-router-dom"
import styles from './Layout.module.css'

import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import BackToTop from "../components/BackToTop"
import Chatbot from "../components/Chatbot/Chatbot"
import SmoothScroll from "../components/SmoothScroll/SmoothScroll"

const Layout = ()=>{
    return(
        <SmoothScroll>
            <div className={styles.layout}>
                <Navbar></Navbar>
                <main className={styles.main}>
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
                <BackToTop />
                <Chatbot />
            </div>
        </SmoothScroll>
    )
}


export default Layout;