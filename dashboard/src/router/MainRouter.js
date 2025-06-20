import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AdminRouter from './routes/AdminRoutes';
import RecruiterRouter from './routes/RecruiterRoutes';
import PublicRoutes from './routes/PublicRoutes';
import { adminProfile } from '../reduxSlice/adminSlice';
import { recruiterProfile } from '../reduxSlice/recruiterSlice';

const MainRoutes = () => {
    const dispatch = useDispatch();
    const [metaData, setMetaData] = useState(null);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userInfo'));
        setMetaData(storedData);

        if (storedData && storedData?.data?.role === 1) {
            dispatch(adminProfile());
        } else if (storedData && storedData?.data?.role === 2) {
            dispatch(recruiterProfile());
        }
    }, [dispatch]);

    if (!metaData) {
        return <PublicRoutes />;
    }

    return (
        <>
            {metaData?.data?.role === 1 ? (
                <AdminRouter />
            ) : metaData?.data?.role === 2 ? (
                <RecruiterRouter />
            ) : (
                <PublicRoutes />
            )}
        </>
    );
};

export default MainRoutes;
