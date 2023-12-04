import React from 'react'
import "./topbar.css"
const Topbar = () => {
  return (
    <>
    
    
    <header className="header" >
			<div className="topbar">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-5 col-12">
							<ul className="top-link">
								<li><a href="#">About</a></li>
								<li><a href="#">Doctors</a></li>
								<li><a href="#">Contact</a></li>
								<li><a href="#">FAQ</a></li>
							</ul>
						</div>
						<div className="col-lg-6 col-md-7 col-12">
							<ul className="top-contact">
								<li><i className="fa fa-phone"></i>+880 1234 56789</li>
								<li><i className="fa fa-envelope"></i><a href="mailto:support@yourmail.com">support@yourmail.com</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div className="header-inner">
				<div className="container">
					<div className="inner">
						<div className="row">
							<div className="col-lg-3 col-md-3 col-12">
								<div className="logo">
									<a href="index.html"><img src="img/logo.png" alt="#"/></a>
								</div>
								<div className="mobile-nav"></div>
							</div>
							<div className="col-lg-7 col-md-9 col-12">
								<div className="main-menu">
									<nav className="navigation">
										<ul className="nav menu">
											<li className="active"><a href="#">Home <i className="icofont-rounded-down"></i></a>
												<ul className="dropdown">
													<li><a href="index.html">Home Page 1</a></li>
												</ul>
											</li>
											<li><a href="#">Doctos </a></li>
											<li><a href="#">Services </a></li>
											<li><a href="#">Pages <i className="icofont-rounded-down"></i></a>
												<ul className="dropdown">
													<li><a href="404.html">404 Error</a></li>
												</ul>
											</li>
											<li><a href="#">Blogs <i className="icofont-rounded-down"></i></a>
												<ul className="dropdown">
													<li><a href="blog-single.html">Blog Details</a></li>
												</ul>
											</li>
											<li><a href="contact.html">Contact Us</a></li>
										</ul>
									</nav>
								</div>
							</div>
							<div className="col-lg-2 col-12">
								<div className="get-quote">
									<a href="appointment.html" className="btn">Book Appointment</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
    
    
    
    
    
    
    
    
    
    
    </>
  )
}

export default Topbar