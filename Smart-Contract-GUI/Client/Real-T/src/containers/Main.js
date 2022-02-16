import React from 'react';
import Slide from 'react-reveal/Slide';
import './css_home/bootstrap.css';
import './css_home/font-awesome.css';
import './css_home/light.css';
import './css_home/style.css';
import logo from './css_home/image_home/logo.png';
import lock from './css_home/images/lock.png';
import operator from './css_home/images/operator.png';
import handHoldingTorch from './css_home/images/hand-holding-up-a-torch.png';
import earth from './css_home/images/earth-globe.png';
import { Link } from 'react-router-dom';
import { getTexts } from '../api/admin';
import Loader from '../components/Loader';
const { subscribe } = require('../api/subscribe');
const Main = () => {

    const [ email, setEmail] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [texts, setTexts] = React.useState({});
    React.useEffect(()=> {
        getTexts().then((res)=> { setTexts(res.data); setLoading(false) });
        require('./js_home/js');
    },[])

    const handleSubscription = (e) => {
        e.preventDefault();
        subscribe({email}).then(() => {alert("Successfully subscribed!"); setEmail("");})
        .catch((res) => {
            if (res.response.status === 421) alert("Email already exist!")
            else if (res.response.status === 422) alert("Invalid email format!")
            else alert("Something wrong happened!")
        })
    }
     return loading ? <div className="container mx-auto text-center"><Loader /></div> :
     ( 
        <>
        <div className="site-wrapper" id="topElem">
            <div className="clearfix"></div>
                <div className="row transparent-menu">
                    <div className="clear-padding">
                        <div className="navbar-wrapper">
                            <div className="navbar navbar-default" role="navigation">
                                <div className="nav-container">
                                    <div className="navbar-header">                                       
                                        <div className="site_logo">
                                            <a className="logo" href="/"><img className="navbar-brand logo" src={logo} alt="Real-T logo"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row banner_content">
                    <div className="container">
                        <div className="col-md-9 col-sm-7 text-center">
                            <div>
                                <div className="hotel-tagline text-center">
                                    <h2>{texts.section1_title}</h2>
                                    <h1>{texts.section1_description}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <section id="how-it-work">
                    <div className="row work-row">
                        <div className="container">
                            <div className="section-title text-center">
                                <h2>{texts.section2_title}</h2>
                                {/* <h4>REQUEST - RIDE - PAY AND GO</h4> */}
                                <div className="space"></div>
                                <p>
                                {texts.section2_description_line1}<br />
                                {texts.section2_description_line2}
                                </p>
                            </div>
                            <div className="work-step">
                                <div className="col-md-4 col-sm-4 first-step text-center">
                                    <i className="fa fa-pencil-square-o"></i>
                                    <h5>{texts.section2_steps_first_title}</h5>
                                    <p>{texts.section2_steps_first_description}</p>
                                </div>
                                <div className="col-md-4 col-sm-4 second-step text-center">
                                    <i className="fa fa-money"></i>
                                    <h5>{texts.section2_steps_second_title}</h5>
                                    <p>{texts.section2_steps_second_description}</p>
                                </div>
                                <div className="col-md-4 col-sm-4 third-step text-center">
                                    <i className="fa fa-usd"></i>
                                    <h5>{texts.section2_steps_third_title}</h5>
                                    <p>{texts.section2_steps_third_description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            
		<div className="row sm-footer back_img_cont">
			<div className="container clear-padding">
				<div className="col-md-4 col-sm-4 col-xs-10 car1_details">
					<h2>{texts.section3_title}<br />
					</h2><br /><br />
					<p className="car_app_details" style={{color: "#fff"}}>
                    {texts.section3_description}
					</p>
				</div>
			</div>
		</div>


            <section id="subscribe">
                <div className="row subscribe-row">
                        <div className="container text-center">
                            <div className="section-title">
                                <h2>{texts.section4_title}</h2>
                                <h4>{texts.section4_subtitle}</h4>
                                <div className="space"></div>
                                <p>
                                {texts.section4_description}<br />
                                </p>
                            </div>
                            <div className="col-md-8 col-md-offset-2 subscribe-box">
                                <form onSubmit={handleSubscription}>
                                    <div className="col-md-11 col-sm-11 col-xs-10 clear-padding">
                                        <input className="form-control" required={true} name="email" placeholder="Enter Your Email to Subscribe" type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="col-md-1 col-sm-1 col-xs-2 clear-padding">
                                        <button type="submit" className="subscribe-btn btn"><i className="fa fa-paper-plane"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </section>
            <section id="why-choose-us">
                <div className="row choose-us-row">
                    <div className="container clear-padding">
                        <div className="light-section-title text-center">
                            <h2>{texts.section5_title}</h2>
                            <h4>{texts.section5_subtitle}</h4>
                            <div className="space"></div>
                            
                        </div>
                        <Slide left>
                            <div  className="col-md-4 col-sm-4">
                                <div className="choose-us-item text-center">
                                    <div className="choose-icon"><img className="img-icon" src={lock} alt='lock'/></div>
                                    <h2>{texts.section5_first_title}</h2>
                                    <h4>{texts.section5_first_subtitle}</h4>
                                    <p>{texts.section5_first_description}</p>
                                    {/* <a href="#">KNOW MORE</a> */}
                                </div>
                            </div>
                        </Slide>
                        <Slide top>
                            <div className="col-md-4 col-sm-4">
                                <div className="choose-us-item text-center">
                                    <div className="choose-icon"><img className="img-icon" src={handHoldingTorch} alt='torch'/></div>
                                    <h2>{texts.section5_second_title}</h2>
                                    <h4>{texts.section5_second_subtitle}</h4>
                                    <p>{texts.section5_second_description}</p>
                                    {/* <a href="#">KNOW MORE</a> */}
                                </div>
                            </div>
                        </Slide>
                        <Slide right>
                            <div className="col-md-4 col-sm-4">
                                <div className="choose-us-item text-center">
                                    <div className="choose-icon"><img className="img-icon" src={operator} alt='operator'/></div>
                                    <h2>{texts.section5_third_title}</h2>
                                    <h4>{texts.section5_third_subtitle}</h4>
                                    <p>{texts.section5_third_description}</p>
                                    {/* <a href="#">KNOW MORE</a> */}
                                </div>
                            </div>
                        </Slide>
                        <Slide left>
                            <div className="col-md-offset-4 col-md-4 col-sm-offset-4 col-sm-4">
                                <div className="choose-us-item text-center">
                                    <div className="choose-icon"><img className="img-icon" src={earth} alt='earth'/></div>
                                    <h2>{texts.section5_fourth_title}</h2>
                                    <h4>{texts.section5_fourth_subtitle}</h4>
                                    <p>{texts.section5_fourth_description}</p>
                                    {/* <a href="#">KNOW MORE</a> */}
                                </div>
                            </div>
                        </Slide>
                        <div className="col-md-offset-3 col-md-6 col-sm-offset-3 col-sm-6">
                            <div className="choose-us-item text-center bg-transparent">
                                <Link className='col-12' to={'/real-t/home'}>Get Started</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section id="footer">
                <footer>
                    
                    <div className="clearfix"></div>
                    <div className="row sm-footer-nav text-center">
                        <div className='col-sm-12 my-auto'>
                            <p className="social-media">
                                    <a href="https://www.facebook.com/crozdale"><i className="fa fa-facebook"></i></a>
                                    <a href="https://twitter.com/CROZDALE1"><i className="fa fa-twitter"></i></a>
                                    <a href="https://plus.google.com/+xdale"><i className="fa fa-google-plus"></i></a>
                                    <a href="https://www.instagram.com/douglascrosdale/"><i className="fa fa-instagram"></i></a>
                                </p>
                        </div>
                        <p className="copyright col-sm-12 my-auto">
                            {texts.section6_line1}
                        </p>
                        <div className='col-sm-12 my-auto'>
                            <h5 style={{color: "#F9676B !important", fontSize: "14px"}}>{texts.section6_line2}</h5>
                        </div>
                        <div className="go-up">
                            <a href="#topElem"><i className="fa fa-arrow-up"></i></a>
                        </div>
                    </div>
                </footer>
            </section>
        </div>
        </>
     );
}
 
export default Main;
