import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductListScreen from './screens/ProductListScreen';
import RegisterScreen from './screens/RegisterScreen';
import CustomerProfile from './screens/customer/CustomerProfile';
import CustomerCartDetails from './screens/customer/CustomerCartDetails';
import CustomerOrderDetails from './screens/customer/CustomerOrderDetails';
import CustomerOrders from './screens/customer/CustomerOrders';
import AdminCreateProduct from './screens/admin/AdminCreateProduct';
import AdminCustomers from './screens/admin/AdminCustomers';
import AdminEditCustomer from './screens/admin/AdminEditCustomer';
import AdminEditProduct from './screens/admin/AdminEditProduct';
import AdminOrderDetails from './screens/admin/AdminOrderDetails';
import AdminOrders from './screens/admin/AdminOrders';
import AdminProducts from './screens/admin/AdminProducts';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/product-list" element={<ProductListScreen />} />
        <Route path="/product-details" element={<ProductDetailsScreen />} />
        <Route path="/product-details/:id" element={<ProductDetailsScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element="Page not exists 404" />

        <Route path="/customer" element={<CustomerProfile />} />
        <Route path="/customer/my-orders" element={<CustomerOrders />} />
        <Route path="/customer/order-details/:id" element={<CustomerOrderDetails />} />
        <Route path="/customer/cart-details" element={<CustomerCartDetails />} />

        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/edit-customer" element={<AdminEditCustomer />} />
        <Route path="/admin/edit-customer/:id" element={<AdminEditCustomer />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        <Route path="/admin/create-product" element={<AdminCreateProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/order-details/:id" element={<AdminOrderDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
