import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductsAll = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Navigate to home route when the component mounts
    navigate('/products/all');
  }, [navigate]); // Dependency array includes navigate to avoid warning
  
  return null; // You can return null or a loading state while navigating
};

export default ProductsAll;
