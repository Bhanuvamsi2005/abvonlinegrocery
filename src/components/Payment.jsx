import React, { useState, useEffect } from 'react';
import './Payment.css';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paypalName: '',
    paypalEmail: '',
    paypalId: ''
  });
  const [errors, setErrors] = useState({});

  const totalAmount = 499.99;

  useEffect(() => {
    if (paymentCompleted && "Notification" in window) {
      const message = `Your payment of ₹${totalAmount} has been completed.`;
      if (Notification.permission === "granted") {
        new Notification("Payment Successful", {
          body: message,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Payment Successful", {
              body: message,
            });
          }
        });
      }
    }
  }, [paymentCompleted]);

  const validateForm = () => {
    const newErrors = {};

    if (selectedMethod === 'credit') {
      if (!formData.name.trim()) newErrors.name = 'Name is required.';
      if (!/^\d{16}$/.test(formData.cardNumber)) newErrors.cardNumber = 'Card number must be 16 digits.';
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiry)) newErrors.expiry = 'Use MM/YY format.';
      if (!/^\d{3}$/.test(formData.cvv)) newErrors.cvv = 'CVV must be 3 digits.';
    }

    if (selectedMethod === 'paypal') {
      if (!formData.paypalName.trim()) newErrors.paypalName = 'Name required.';
      if (!/\S+@\S+\.\S+/.test(formData.paypalEmail)) newErrors.paypalEmail = 'Invalid email.';
      if (!formData.paypalId.trim()) newErrors.paypalId = 'PayPal ID required.';
    }

    if (selectedMethod === 'cod' && !location) {
      newErrors.cod = 'Please detect your location for delivery.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCompletePayment = () => {
    if (validateForm()) {
      setTimeout(() => setPaymentCompleted(true), 1000);
    }
  };

  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error("Failed to fetch location:", error);
      } finally {
        setLoadingLocation(false);
      }
    }, () => {
      alert("Unable to retrieve your location.");
      setLoadingLocation(false);
    });
  };

  if (paymentCompleted) {
    return (
      <div className="payment-wrapper thank-you-page">
        <h2>🎉 Payment Successful</h2>
        <p className="thank-you">Thank you for your payment!</p>
        <p>Your transaction of ₹{totalAmount} has been completed.</p>
      </div>
    );
  }

  if (!selectedMethod) {
    return (
      <div className="payment-wrapper">
        <h2>Select a Payment Method</h2>
        <div className="method-buttons">
          <button onClick={() => setSelectedMethod('credit')}>💳 Credit Card</button>
          <button onClick={() => setSelectedMethod('razorpay')}>📱 Razorpay</button>
          <button onClick={() => setSelectedMethod('paypal')}>🌐 PayPal</button>
          <button onClick={() => setSelectedMethod('cod')}>🚚 Cash on Delivery</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <h2>{selectedMethod.charAt(0).toUpperCase() + selectedMethod.slice(1)} Payment</h2>

      {selectedMethod === 'credit' && (
        <div className="payment-option">
          <input
            type="text"
            placeholder="Card Holder Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}

          <input
            type="text"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          />
          {errors.cardNumber && <p className="error-message">{errors.cardNumber}</p>}

          <div className="card-details">
            <input
              type="text"
              placeholder="MM/YY"
              value={formData.expiry}
              onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
            />
            <input
              type="text"
              placeholder="CVV"
              value={formData.cvv}
              onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            />
          </div>
          {errors.expiry && <p className="error-message">{errors.expiry}</p>}
          {errors.cvv && <p className="error-message">{errors.cvv}</p>}
        </div>
      )}

      {selectedMethod === 'razorpay' && (
        <div className="payment-option">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay" alt="QR Code" className="qr-image" />
          <p>Scan this QR code using your UPI app to pay.</p>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="payment-option">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.paypalName}
            onChange={(e) => setFormData({ ...formData, paypalName: e.target.value })}
          />
          {errors.paypalName && <p className="error-message">{errors.paypalName}</p>}

          <input
            type="email"
            placeholder="Email Address"
            value={formData.paypalEmail}
            onChange={(e) => setFormData({ ...formData, paypalEmail: e.target.value })}
          />
          {errors.paypalEmail && <p className="error-message">{errors.paypalEmail}</p>}

          <input
            type="text"
            placeholder="PayPal ID"
            value={formData.paypalId}
            onChange={(e) => setFormData({ ...formData, paypalId: e.target.value })}
          />
          {errors.paypalId && <p className="error-message">{errors.paypalId}</p>}

          <p>Click below to proceed with PayPal payment.</p>
          <button className="paypal-button">Pay with PayPal</button>
        </div>
      )}

      {selectedMethod === 'cod' && (
        <div className="payment-option">
          <p>Click below to detect your address for delivery:</p>
          <button onClick={fetchLocation} className="location-button">
            📍 Detect My Location
          </button>
          {loadingLocation && <p>Fetching your location...</p>}
          {errors.cod && <p className="error-message">{errors.cod}</p>}
          {location && (
            <div className="location-info">
              <p><strong>City:</strong> {location.city}</p>
              <p><strong>State:</strong> {location.principalSubdivision}</p>
              <p><strong>Postal Code:</strong> {location.postcode}</p>
              <p><strong>Locality:</strong> {location.locality}</p>
            </div>
          )}
        </div>
      )}

      <div className="payment-total">
        <h3>Total: ₹{totalAmount}</h3>
        <button className="submit-payment" onClick={handleCompletePayment}>
          ✅ Complete Payment
        </button>
        <button className="go-back" onClick={() => setSelectedMethod('')}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};

export default Payment;
