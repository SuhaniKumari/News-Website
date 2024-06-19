import React from 'react';
import style from './Utils.module.css';
import SMFaisalSulaiman from '../../assets/images/SMFaisalSulaiman.jpg'
import RhythmBhambri from '../../assets/images/RhythmBhambri.jpg'

const AboutUs = () => {
    return (
        <div className={style.Utils}>
            <div>
                <h1>About Us</h1>

                <div className={style.utilImages}>
                    <div>
                        <img src={SMFaisalSulaiman} alt='S M Failsal Sulaiman' />
                        <span>S M Failsal Sulaiman</span>
                    </div>
                    <div>
                        <img src={RhythmBhambri} alt='Rhythm Bhambri' />
                        <span>Rhythm Bhambri</span>
                    </div>
                </div>

                <div>
                    <h2>Who we are and what we do</h2>
                    <h3>Here, you can introduce your company, organization, or yourself (if it's a personal website). Briefly describe your mission, values, and what you're passionate about. Explain the purpose of your website and what visitors can gain from it.</h3>
                    <br/>
                    <h2>Our story</h2>
                    <h3>This is where you can share your origin story. When and how did you get started? What inspired you to create this company/organization/website?  This helps connect with your audience on a personal level.</h3>
                    <br/>
                    <h2>Our team</h2>
                    <h3>Introduce the people behind the scenes! You can include short bios, pictures, and blurbs about each team member's expertise and role. This builds trust and credibility with your visitors.</h3>
                    <br/>
                    <h2>Why choose us</h2>
                    <h3>Highlight what makes you unique. What sets you apart from competitors?  Focus on the benefits you offer to your audience and the value proposition of what you do.</h3>
                </div>
            </div>

        </div>
    )
}

export default AboutUs