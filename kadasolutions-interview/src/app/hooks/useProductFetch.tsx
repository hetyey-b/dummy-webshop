import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ApiResponse, Product } from "../types/productApiTypes";


export default function useProductFetch(query: string, page: number) {
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<Error | null>(null);
    const [list,setList] = useState<Product[]>([]);

    const sendQuery = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const url = `https://dummyjson.com/products?limit=10&skip=${page}`;
            const res = await axios.get<ApiResponse>(url);
            setList((prevState: Product[]) => {
                return [...prevState, ...res.data.products];
            });
        } catch(err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        sendQuery();
    }, [query,sendQuery,page]);

    return {loading, error, list};
}
