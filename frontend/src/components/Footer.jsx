const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <div className="mb-4">
        <a href="/privacy-policy" className="text-sm underline mx-2">Privacy Policy</a>
        <a href="/terms-of-service" className="text-sm underline mx-2">Terms of Service</a>
        <a href="/contact-us" className="text-sm underline mx-2">Contact Us</a>
      </div>
      <p className="text-sm">&copy; 2023 Alzheimer Detection Tool. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
