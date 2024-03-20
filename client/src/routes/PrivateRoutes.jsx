import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Header from '../components/common/Header'
import Footer from "../components/common/Footer";

const PrivateRoutes = () => {

    const { auth } = useAuth();

    return (
        <>
            {
                auth.user ?
                    (
                        <main className="mx-auto max-w-[2040px] py-8">
                            <div className="container">
                                <Header />
                                <Outlet />
                                <div className="flex flex-col justify-end h-full">
                                    <Footer />
                                </div>
                            </div>
                        </main>
                    ) : (
                        <Navigate to="/login" />
                    )
            }
        </>
    )
}

export default PrivateRoutes;
