import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar';
import PageWrapper from '../../components/ui/page-wrapper';

export default function RooLayout() {
    return (
        <>
            <Navbar />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
        </>
    );
}
