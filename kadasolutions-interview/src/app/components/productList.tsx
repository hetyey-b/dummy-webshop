'use client'

import { useCallback, useState } from "react";
import useProductFetch from "../hooks/useProductFetch";
import Product from "./product";
import { Product as ProductType } from "../types/productApiTypes";

export default function ProductList() {
    const [query,setQuery] = useState<string>("");
    const [page,setPage] = useState<number>(0);
    const {loading,error,list} = useProductFetch(query,page);

    return (
        <div className="mx-auto w-[80%] grid grid-cols-4 gap-5 justify-items-center">
            {list.map((el) => 
                (<Product
                    key={`product-${el.id}`}
                    name={el.title}
                    description={el.description}
                    price={el.price}
                    discount={el.discountPercentage}
                    imageUrl={el.thumbnail}
                />)
            )}
        </div>
    )
};

