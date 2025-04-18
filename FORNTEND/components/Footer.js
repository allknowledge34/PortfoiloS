import Link from "next/link";
import { FaFacebookF, FaGithub, FaTwitter } from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
    return <>
        <footer className="footer">
            <div className="footersec flex flex-center flex-col gap-2">
                <div className="logo">
                    <img src="/img/logo.png" alt="" />
                </div>
                <div className="ul flex gap-2">
                    <li><Link href='/services'>Services</Link></li>
                    <li><Link href='/projects'>Works</Link></li>
                    <li><Link href='/'>Resume</Link></li>
                    <li><Link href='/shop'>Shop</Link></li>
                    <li><Link href='/blogs'>Blogs</Link></li>
                    <li><Link href='/contact'>Contact</Link></li>
                </div>
                <ul className="hero_social">
                    <li> < a href="https://x.com/home?lang=en"><FaTwitter /></a></li>
                    <li> < a href="https://www.youtube.com/@AiCodingHub"><LiaBasketballBallSolid /></a></li>
                    <li> < a href="https://www.linkedin.com/in/sachin-kumar-355203340/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><GrLinkedinOption /></a></li>
                    <li> < a href="https://github.com/allknowledge34"><FaGithub /></a></li>
                </ul>
                <div className="copyrights">&copy; 2025 All Right Reserved By <span>AiCodinghub</span></div>
            </div>
        </footer>
    </>
}
