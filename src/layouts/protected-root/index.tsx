import { toast } from 'react-toastify';
import { Outlet, Navigate } from 'react-router-dom';

import Navbar from '../../components/navbar';
import PageWrapper from '../../components/ui/page-wrapper';

export default function ProtectedRootLayout() {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    if (!token || !userJson) {
        localStorage.clear();
        toast.error('Please login to continue');
        return <Navigate to="/" />;
    }

    return (
        <>
            <Navbar />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
}
