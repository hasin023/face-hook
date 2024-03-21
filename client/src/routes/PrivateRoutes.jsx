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
                        <>
                            <Header />
                            <main className="mx-auto max-w-[1020px] py-8">
                                <div className="container">
                                    <Outlet />
                                </div>
                            </main>
                            <div className="flex flex-col justify-end h-lvh">
                                <Footer />
                            </div>
                        </>
                    ) : (
                        <Navigate to="/login" />
                    )
            }
        </>
    )
}

export default PrivateRoutes;
