import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async"; // Import HelmetProvider
import theme from "./theme/theme";
import Navbar from "./components/navbar/Navbar";
import { CartProvider } from "./context/Cart";
import Newsletter from "./components/newsletter";
import CookieBanner from "./components/cookie";
import Footer from "./components/footer";
import "./App.css";

// Direct imports for Eshop and MenuPage
import MenuPage from "./pages/restaurantmenu/RestaurantMenu";
import Eshop from "./pages/productlist/ProductList";
import BranchPage from "./pages/branch/BranchPage";

// Lazy-load remaining pages
const BookingPage = lazy(() => import("./pages/bookingUser/BookingPage"));
const RegistrationPage = lazy(() => import("./pages/registration/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/singIn/SignInPage"));
const CartPage = lazy(() => import("./pages/cart/CartPageV2"));
const HomePage = lazy(() => import("./pages/homepage/HomePage"));
const ErrorPage = lazy(() => import("./pages/error/ErrorPage"));
const NewsPage = lazy(() => import("./pages/news/NewsPage"));
const BranchDetailPage = lazy(() => import("./pages/branch/BranchDetailPage"));
const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage"));
const CardPaymentPage = lazy(() => import("./pages/cardPayment/CardPaymentPage"));
const OrderCompletedPage = lazy(() => import("./pages/orderComplete/OrderCompletePage"));
const ProductDetailsPage = lazy(() => import("./pages/product/ProductDetailsPage"));

const App: React.FC = () => {
    const [user, setUser] = useState<{ firstName: string } | null>(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <HelmetProvider> {/* Wrap the app with HelmetProvider */}
            <CartProvider>
                <ThemeProvider theme={theme}>
                    <Router>
                        <Navbar />
                        <Newsletter />
                        <CookieBanner />
                        <main>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/shops" element={<BranchPage />} />
                                    <Route path="/menu" element={<MenuPage />} />
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/eshop" element={<Eshop />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/shops/:shopname" element={<BranchDetailPage />} />
                                    <Route path="/register" element={<RegistrationPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/order-completed/:orderId" element={<OrderCompletedPage />} />
                                    <Route path="/card" element={<CardPaymentPage />} />
                                    <Route path="/coffee/:productId" element={<ProductDetailsPage />} />
                                    <Route path="/news" element={<NewsPage />} />
                                    <Route path="/booking" element={<BookingPage />} />
                                    <Route path="*" element={<ErrorPage />} />
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                    </Router>
                </ThemeProvider>
            </CartProvider>
        </HelmetProvider>
    );
};

export default App;
