// imports
import React from 'react';
// import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const PageFooter = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
        <div className="row">

          {/* Logo & Trademark */}
          <div className="col-md-4 text-center text-md-start mb-3">
            <h4 className="fw-bold">Ctrl Alt Elite -1</h4>
            <p className="small">&copy; {new Date().getFullYear()} Ctrl Alt Elite -1. All Rights Reserved.</p>
          </div>

          {/* Navigation Links */}
          <div className="col-md-4 text-center mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">About</a></li>
              <li><a href="/books" className="text-light text-decoration-none">Books</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact</a></li>
              <li><a href="/privacy" className="text-light text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div className="col-md-4 text-center text-md-end">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="https://facebook.com" className="text-light"></a>
              <a href="https://twitter.com" className="text-light"></a>
              <a href="https://instagram.com" className="text-light"></a>
              <a href="https://linkedin.com" className="text-light"></a>
            </div>

            {/* Newsletter Subscription */}
            <form className="mt-3">
              <input type="email" className="form-control form-control-sm" placeholder="Subscribe via email" />
              <button type="submit" className="btn btn-primary btn-sm mt-2">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter
