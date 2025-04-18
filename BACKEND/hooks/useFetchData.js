import axios from "axios";
import { useState, useEffect } from "react";


function useFetchData(apiEndpoint){
    const [alldata, setAlldata] = useState([]);
    const [loading, setLoading] = useState([]);
    const [initialLoad, setIntialLoad] = useState([]);

    useEffect(() => {
        if (initialLoad) {
            setIntialLoad(false);
            setLoading(false);
            return;
        }

        setLoading(true)

        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndpoint);
                const alldata = res.data;
                setAlldata(alldata);
                setLoading(false)
            } catch (error) {
               setLoading(false) ;
            }
        }

        if (apiEndpoint) {
            fetchAllData()
        }
    }, [initialLoad, apiEndpoint]);

    return {alldata, loading}
}

export default useFetchData;
