'use client'

import { Product } from "@/app/types/productApiTypes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: Promise<{productId: string}> }) {
    const [productData, setProductData] = useState<Product | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const productId = (await params).productId;
            const url = `https://dummyjson.com/products/${productId}`;
            axios.get<Product>(url)
            .then((res) => {
                setProductData(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        }

        fetchData();
    }, [])
    
    return (
        <div className="w-full items-center">
            <img src={productData?.images[0]} alt={`image: ${productData?.title}`} className="w-[500px] h-[500px]"/>
            <div>
                <span className="font-bold text-xl">{productData?.title}</span>
                <div>*****</div>
                <span>{productData?.rating.toFixed(2)}</span>
            </div>
            <p>
                {productData?.description}
            </p>
            <p className="opacity-60 text-black">
                <span className="block">Stock: {productData?.stock}</span>
                <span className="block">Brand: {productData?.brand}</span>
                <span className="block">Category: {productData?.category}</span>
            </p>
            <div className="bg-[#6100FF] text-white text-sm font-bold rounded-full py-1 px-3">-{productData?.discountPercentage.toFixed(2)}%</div>
            <div>
                <span>{productData?.price} $</span>
                <button className="bg-black text-white rounded-full p-2 text-lg font-bold">Add to cart</button>
            </div>
        </div>
    );
}
