import React from 'react'
import style from './Utils.module.css';

const ContactUs = () => {
    return (
        <div className={style.Utils}>
            <div>
                <h1>Contact Us</h1>
                <ul>
                    <li>Email: <a href="mailto:youremail@yourdomain.com">youremail@yourdomain.com</a></li>
                    <li>Phone: (555) 555-5555 (Hours: Monday-Friday, 9:00 AM to 5:00 PM PST)</li>
                    <li>Twitter: <a href="mailto:youremail@yourdomain.com">youremail@yourdomain.com</a></li>
                    <li>Instagram: <a href="mailto:youremail@yourdomain.com">youremail@yourdomain.com</a></li>
                    <li>Facebook: <a href="mailto:youremail@yourdomain.com">youremail@yourdomain.com</a></li>
                </ul>
            </div>

        </div>
    )
}

export default ContactUs