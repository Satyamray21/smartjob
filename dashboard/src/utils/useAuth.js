import { useEffect, useState } from "react";

function useAuth() {
    const [UserInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem('userInfo');
        if (localData) {
            try {
                const parsedData = JSON.parse(localData);
                setUserInfo(parsedData);
            } catch (error) {
                console.error("Failed to parse userInfo from localStorage", error);
                setUserInfo(null);
            }
        } else {
            setUserInfo(null);
        }
    }, []);

    const updateUserInfo = (newUserInfo) => {
        setUserInfo(newUserInfo);
        localStorage.setItem('userInfo', JSON.stringify(newUserInfo));
    };

    return {
        UserInfo,
        updateUserInfo
    };
}

export default useAuth;