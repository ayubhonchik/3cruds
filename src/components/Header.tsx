import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link to="/use-state">useState</Link>
      <Link to="/use-ref">useRef</Link>
      <Link to="/use-form">useForm</Link>
    </nav>
  );
};

export default Header;
