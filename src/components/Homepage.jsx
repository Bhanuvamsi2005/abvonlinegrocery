import { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { FaLeaf, FaAppleAlt, FaBreadSlice, FaWineBottle } from 'react-icons/fa';
import { GiMeat, GiMilkCarton, GiFrozenOrb } from 'react-icons/gi';
import './Homepage.css';
import { Link } from 'react-router-dom';

import bg1 from './Static/backgroundimg1.png';
import bg2 from './Static/backgroundimg2.png';
import bg3 from './Static/backgroundimg1.png';
import bg4 from './Static/backgroundimg1.png';

import bananaImg from './Static/banana.jpg';
import strawberriesImg from './Static/strawberry.jpg';
import eggsImg from './Static/eggs.jpg';
import breadImg from './Static/bread.jpg';
import beefImg from './Static/backgroundimg1.png';
import waterImg from './Static/water.jpg';
import almondMilkImg from './Static/almondmilk.jpg';
import salmonImg from './Static/salmon.jpg';  

const Homepage = () => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCart.length);
  const [cartProducts, setCartProducts] = useState(initialCart);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const cartRef = useRef();
  const cartIconRef = useRef();

  const backgrounds = [
    { image: bg1, overlay: 'rgba(0, 0, 0, 0.3)' },
    { image: bg2, overlay: 'rgba(0, 0, 0, 0.4)' },
    { image: bg3, overlay: 'rgba(0, 0, 0, 0.2)' },
    { image: bg4, overlay: 'rgba(0, 0, 0, 0.3)' },
  ];

  const categories = [
    { name: 'Fruits & Vegetables', icon: <FaAppleAlt /> },
    { name: 'Meat & Seafood', icon: <GiMeat /> },
    { name: 'Dairy & Eggs', icon: <GiMilkCarton /> },
    { name: 'Bakery', icon: <FaBreadSlice /> },
    { name: 'Beverages', icon: <FaWineBottle /> },
    { name: 'Frozen Foods', icon: <GiFrozenOrb /> },
    { name: 'Organic', icon: <FaLeaf /> },
  ];

  const featuredProducts = [
    { id: 1, name: 'Organic Bananas', price: 100, category: 'Fruits & Vegetables', image: bananaImg },
    { id: 2, name: 'Fresh Strawberries', price: 500, category: 'Fruits & Vegetables', image: strawberriesImg },
    { id: 3, name: 'Free Range Eggs', price: 450, category: 'Dairy & Eggs', image: eggsImg },
    { id: 4, name: 'Whole Grain Bread', price: 499, category: 'Bakery', image: breadImg },
    { id: 5, name: 'Grass-Fed Beef', price: 899, category: 'Meat & Seafood', image: beefImg },
    { id: 6, name: 'Mineral Water', price: 1000, category: 'Beverages', image: waterImg },
    { id: 7, name: 'Almond Milk', price: 650, category: 'Dairy & Eggs', image: almondMilkImg },
    { id: 8, name: 'Salmon Fillet', price: 1200, category: 'Meat & Seafood', image: salmonImg },
  ];

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    setCartItems(cartProducts.length);
  }, [cartProducts]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCart && 
          cartRef.current && 
          !cartRef.current.contains(event.target) && 
          !cartIconRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCart]);

  const addToCart = (product) => {
    const updatedCart = [...cartProducts, product];
    setCartProducts(updatedCart);
  };

  const removeFromCart = (productId) => {
    const index = cartProducts.findIndex(item => item.id === productId);
    if (index !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart.splice(index, 1);
      setCartProducts(updatedCart);
    }
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowCart(false);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
    setShowProfile(false);
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
    // Clear cart after checkout
    setCartProducts([]);
    // In a real app, you would navigate to a checkout page:
    // navigate('/checkout');
  };

  const filteredProducts = selectedCategory
    ? featuredProducts.filter(product => product.category === selectedCategory)
    : featuredProducts;

  return (
    <div className="app">
      {/* Background Image with overlay */}
      <div className="background-overlay" style={{ 
        backgroundColor: backgrounds[backgroundIndex].overlay 
      }}></div>
      <img 
        src={backgrounds[backgroundIndex].image} 
        alt="Background" 
        className="background-image"
      />

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <h1 className="logo">Mr.Grocery</h1>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
            <Link to="/contactus" target='_blank'>Contact</Link>
          </div>
        </div>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="search-icon" />
        </div>
        
        <div className="nav-right">
          <div className="cart-icon" onClick={toggleCart} ref={cartIconRef}>
            <FiShoppingCart />
            {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
          </div>
          
          {showCart && (
            <div className="cart-dropdown" ref={cartRef}>
              <h4>Your Cart ({cartItems})</h4>
              {cartProducts.length > 0 ? (
                <>
                  <div className="cart-items">
                    {cartProducts.map((product, index) => (
                      <div key={index} className="cart-item">
                        <img src={product.image} alt={product.name} className="cart-item-image" />
                        <div className="cart-item-details">
                          <span>{product.name}</span>
                          <span>Rs.{product.price.toFixed(2)}</span>
                          <button 
                            className="remove-item-btn"
                            onClick={() => removeFromCart(product.id)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="cart-total">
                      <span>Total:</span>
                      <span>Rs.{cartProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </button>
                </>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          )}
          
          <div className="profile-icon" onClick={toggleProfile}>
            <FiUser />
            {showProfile && (
              <div className="profile-dropdown">
                <a href="/profile">View Profile</a>
                <a href="/orders">My Orders ({cartItems})</a>
                <a href="/settings">Settings</a>
                <a href="/prehome">Logout</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Fresh Groceries Delivered to Your Door</h2>
          <p>Shop the best quality products at affordable prices</p>
          <button className='button1'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>Shop now</span>
          </button>
        </div>
      </section>

      <div className="content-wrapper">

        <section className="categories">
          <h3>Shop by Category</h3>
          <div className="category-grid">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className={`category-card ${selectedCategory === category.name ? 'selected' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              >
                <div className="category-icon">{category.icon}</div>
                <p>{category.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="featured-products">
          <h3>{selectedCategory ? `${selectedCategory}` : 'Featured Products'}</h3>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <h4>{product.name}</h4>
                <p>Rupees : {product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <a href="#">Home</a>
              <a href="#">Shop</a>
              <a href="#">About Us</a>
              <a href="#">Contact</a>
            </div>
            <div className="footer-section">
              <h4>Customer Service</h4>
              <a href="https://www.linkedin.com/in/achanta-bhanu-vamsi/">FAQ</a>
              <a href="#">Shipping Policy</a>
              <a href="#">Returns & Refunds</a>
            </div>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>Email: bhanuvamsia@gmail.com</p>
              <p>Phone:+91 834 193 XXX</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Mr.Grocery. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Homepage;