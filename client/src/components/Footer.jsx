const Footer = () => {
  return (
    <footer className="bg-black-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-lg font-semibold text-white mb-2">MERN Shop</p>
        <p className="text-sm">
          Built with the MERN stack — MongoDB, Express, React, Node.js
        </p>
        <p className="text-xs mt-4 text-gray-500">
          &copy; {new Date().getFullYear()} MERN Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;