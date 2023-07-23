import {useState, useEffect} from "react";
import API from 'api';

const useProducts = (category) => {
    const [list, setList] = useState([]);

    const init = async () => {
        const {product_list: data} = await API.getProducts();
        setList(data ? data.filter(value=> value.category === category) : []);
    };

    useEffect(() => {
        init();
    }, []);


    function updateActiveItem(item) {
        setList(prev => {
            prev.forEach((value) => value.isActive = value.id === item.id);
            return [...prev];
        })
    }

    return [list, setList, updateActiveItem];
};

export default useProducts;