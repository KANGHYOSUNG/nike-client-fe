import {useState, useEffect} from "react";
import API from 'api';

const useAssets = (type) => {
    const [list, setList] = useState([]);

    const init = async () => {
        const {asset_list} = await API.getAssets();
        setList(asset_list.filter(v=>v.category === type && v.img != null));
    };

    useEffect(() => {
        init();
    }, [type]);


    function updateActiveItem(item) {
        setList(prev => {
            prev.forEach(value => value.isActive = value.id === item.id)
            return [...prev];
        })
    }

    return [list, setList, updateActiveItem];
};

export default useAssets;