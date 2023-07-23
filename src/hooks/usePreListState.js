import {useState, useEffect} from "react";
import API from "api";

const usePreListState = () => {
    const [list, setList] = useState([]);

    const getAssetFromServer = async () => {
        const {asset_list} = await API.getAssets()
        setList(asset_list);
    };

    useEffect(() => {
        getAssetFromServer()
    }, []);

    return list;
};

export default usePreListState;