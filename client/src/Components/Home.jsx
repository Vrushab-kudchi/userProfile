import React from 'react';
import "../assets/css/style.css";
import encryptimage from "../assets/images/encrypt.jpg";
import skull from "../assets/images/pic11.jpg";
import person1 from "../assets/images/0011.jpg";
import person2 from "../assets/images/0022.jpg";
import person3 from "../assets/images/0033.jpg";

import { Link } from 'react-router-dom';


const Home = () => {

  return (

    <div id="page-wrapper">
      {/* Header */}
      <section id="header" className="wrapper" style={{height:"580px"}}>
        {/* Logo */}
        <div id="logo">
          <h1>
            <a href="index.html">
              <u>Secure</u> <u>Crypt</u>
            </a>
          </h1>
          <p>A Encryption and Decryption tool</p>
        </div>
        {/* Nav */}
        <nav id="nav">
          {/* Add the button here if needed */}
          <div
            className="mr-3"
            style={{
              float: 'right',
              paddingRight: '1em',
            }}
            id="lgbt"
                  >
        <Link
            to={'/login'}
            id="logbtn"
            className="btn btn-outline btn-white"
            style={{
                backgroundColor: 'transparent',
                fontSize: '20px',
                textDecoration: 'none',
                color: 'white',
                transition: 'color 0.3s, background-color 0.3s', // Add transition for smooth hover effect
            }}
            onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white'; // Change background color on hover
                e.target.style.color = 'black'; // Change text color on hover
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent'; // Reset background color on hover out
                e.target.style.color = 'white'; // Reset text color on hover out
            }}
            >
            Login
            </Link>

          </div>
          <ul>
            <li className="current">
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <a href="#abt">About us</a>
            </li>
            <li>
              <a href="#faq">FAQ/s</a>
            </li>
            <li>
              <a href="#review">Review</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </nav>
      </section>
      {/* Intro */}
      <section id="intro" className="wrapper style1">
        <div className="title" id="abt">
          <h4>About Us</h4>
        </div>
        <div
          className="container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="col-min-6">
            <a href="#" className="image featured">
              <img
                src={encryptimage}
                alt="N/A"
                style={{
                  height: 'auto',
                  width: '2000px',
                  marginRight: '20px',
                }}
              />
            </a>
          </div>
          <div className="col-min-6">
                      <p className="style1" style={{ fontSize: 'large', marginLeft: '30px' }}>
              In an age where digital information has become the lifeblood of
              our interconnected world, ensuring its security and confidentiality
              has emerged as an imperative challenge. Encryption and decryption
              stand as the pillars of modern data protection, providing a robust
              shield against unauthorized access and potential breaches. This
              synopsis delves into the intricate realm of encryption and decryption
              tools, unraveling their significance, methods, and applications in
              safeguarding sensitive information. <br /> <br /> As we navigate the
              intricate landscape of cyberspace, the need to fortify digital
              communication and storage has intensified. Encryption, the process of
              converting plaintext into an indecipherable format, emerges as a
              potent solution to this challenge. It renders data unreadable to
              anyone without the corresponding decryption key, thwarting attempts
              of malicious interception. In contrast, decryption, the reverse
              process, translates encrypted data back into its original form,
              allowing authorized individuals to access and utilize the information.
            </p>
          </div>
        </div>
        <ul className="actions">
          <li
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <a href="#" className="btn btn-dark" style={{backgroundColor: 'Black', width:'200px'}}>
              More information
            </a>
          </li>
        </ul>
      </section>
      {/* Main */}
      <section id="main" className="wrapper style2">
        <div className="title">
          <a style={{ fontSize: 'large' }}>The Details</a>
        </div>
        <div className="container">
          {/* Image */}
          <a href="#" className="image featured">
            <img src={skull} alt="" />
          </a>
          {/* Features */}
          <section id="features">
            <header className="style1" id="faq">
              <h2 style={{ color: 'aliceblue' }}>Do You Have Question's?</h2>
            </header>
            <div className="feature-list">
              <div className="row" style={{ color: 'aliceblue' }}>
                <div className="col-6 col-12-medium">
                  <section>
                    <h3 className="icon solid fa-lock">How to Encryption</h3>
                    <p>
                      To encrypt your plain text message on our website, start by
                      logging in with your credentials. Once logged in, navigate
                      to the "Encryption" section. You'll find a text box there,
                      where you can paste the message you want to encrypt. After
                      pasting your message, simply click the "Encrypt" button, and
                      your message will be securely encrypted.
                    </p>
                  </section>
                </div>
                <div className="col-6 col-12-medium">
                  <section>
                    <h3 className="icon solid fa-key">How to Decrypt</h3>
                    <p>
                      {' '}
                      To decrypt a previously encrypted message, you'll need the
                      decryption key. Navigate to the "Decryption" section, paste
                      the encrypted message, enter the decryption key, and then
                      click "Decrypt." This process will allow you to both encrypt
                      and decrypt messages on our platform securely.
                    </p>
                  </section>
                </div>
                <div className="col-6 col-12-medium">
                  <section>
                    <h3 className="icon fa-eye-slash">Illegal</h3>
                    <p>
                    Our website does not support or condone misuse for illegal activities,
                    such as weapon and drug dealing threads. Encrypting such content is not possible or permitted."
                    </p>
                  </section>
                </div>
                <div className="col-6 col-12-medium">
                  <section>
                    <h3 className="icon solid fa-unlock">Key Reset</h3>
                    <p>
                      For more safety purposes and added security, you can change your key in your profile settings.
                    </p>
                  </section>
                </div>
                <div className="col-6 col-12-medium">
                  <section>
                    <h3 className="icon solid fa-file">History</h3>
                    <p>
                    The website retains encrypted messages in its database to track your message history for reference and transparency.
                    </p>
                  </section>
                </div>
                <div className="col-6 col-12-medium">
                  <section>
                    <h3 className="icon fa-square">Forget Password</h3>
                    <p>
                    If you forget your account password, you can reset it using email OTP for added security.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      {/* Highlights */}
      <section id="highlights" className="wrapper style3">
        <div className="title" id="review">
          <h4>Review</h4>
        </div>
        <div className="container">
          <div className="row aln-center">
            <div className="col-4 col-12-medium">
              <section className="highlight">
                <a href="#" className="image featured">
                  <img src={person1} alt="" />
                </a>
                <h3>
                  <a href="#" style={{ fontWeight: 'bold' }}>
                    Steffan Mitchell
                  </a>
                </h3>
                <p>
                  This encryption and decryption tool offers seamless data
                  security, making it a must-have for safeguarding sensitive
                  information with ease and confidence.
                </p>
                <ul className="actions">
                  <li
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <a href="#" className="btn btn-dark" style={{backgroundColor: 'Black'}}>
                      Read More
                    </a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col-4 col-12-medium">
              <section className="highlight">
                <a href="#" className="image featured">
                  <img src={person2} alt="" />
                </a>
                <h3>
                  <a href="#" style={{ fontWeight: 'bold' }}>
                    Alexandra Williams
                  </a>
                </h3>
                <p>
                  Effortlessly user-friendly, this encryption and decryption tool
                  ensures your data stays locked away from prying eyes, without
                  any technical hassle.
                </p>
                <ul className="actions">
                  <li
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <a href="#" className="btn btn-dark" style={{backgroundColor: 'Black'}}>
                      Read More
                    </a>
                  </li>
                </ul>
              </section>
            </div>
            <div className="col-4 col-12-medium">
              <section className="highlight">
                <a href="#" className="image featured">
                  <img src={person3} alt="" />
                </a>
                <h3>
                  <a href="#" style={{ fontWeight: 'bold' }}>
                    Isabella Parker
                  </a>
                </h3>
                <p>
                  With lightning-fast performance and top-notch security, this
                  encryption and decryption tool is a game-changer for anyone
                  serious about protecting.
                </p>
                <ul className="actions">
                  <li
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <a href="#" className="btn btn-dark" style={{backgroundColor: 'Black'}}>
                      Read More
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <section id="footer" className="wrapper">
        <div className="title" id="contact">
          <h4>Contact Us</h4>
        </div>
        <div className="container">
          <div>
            <br />
          </div>

          <div className="col-12">
            {/* Contact */}
            <section className="feature-list small container" style={{ textAlign: 'center' }}>
  <div className="row">
    <div className="col-sm-6">
      <section>
        <h3 className="icon solid fa-home">
          <u>Company Address</u>
        </h3>
        <p>

          No 3, RMZ Infinity - Tower E,Old Madras Road, 4th & 5th Floors,<br />
          Bangalore Bangalore KA 560016 IN.
        </p>
      </section>
    </div>
    <div className="col-sm-6">
      <section style={{textAlign:'center'}}>
        <h3 className="icon solid fa-comment">
          <u>Social</u>
        </h3>
        <p>
          <a href="#">https://twitter.com/SecureCrypt</a>
          <br />
          <a href="#">https://linkedin.com/SecureCrypt</a>
          <br />
          <a href="#">https://facebook.com/SecureCrypt</a>
        </p>
      </section>
    </div>
    <div className="col-6 col-12-small">
      <section>
        <h3 className="icon solid fa-envelope ">
          <u>Email</u>
        </h3>
        <p>
          <a href="#">info@SecureCrypt.rediffmail.com</a>
        </p>
      </section>
    </div>
    <div className="col-6 col-12-small">
      <section>
        <h3 className="icon solid fa-phone">
          <u>Phone</u>
        </h3>
        <p>
          +91 (831)037-4672<br />
          +91 (748)376-4446<br />
        </p>
      </section>
    </div>
  </div>
</section>
</div>
</div>
<div id="copyright">
  <ul>
    <li>&copy; Secure Crypt</li>
    <li>
      <a href="https://facebook.com/SecureCrypt" target="_blank">
        <i className="fab fa-facebook" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="https://twitter.com/SecureCrypt" target="_blank">
        <i className="fab fa-twitter" aria-hidden="true"></i>
      </a>
    </li>
    <li>
      <a href="https://linkedin.com/SecureCrypt" target="_blank">
        <i className="fab fa-linkedin" aria-hidden="true"></i>
      </a>
    </li>
  </ul>
</div>
</section>

    </div>

  );
};

export default Home;
