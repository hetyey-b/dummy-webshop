'use client'

import ImageSlider from "@/app/components/imageSlider";
import { Product } from "@/app/types/productApiTypes";
import axios from "axios";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: Promise<{productId: string}> }) {
    const [productData, setProductData] = useState<Product | null>(null);

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
    
    if (!productData) {
        return (
            <div>Loading...</div>
        )
    }

    // Note: The figma shows 4 filled stars for a rating of 4.69, so the number of stars colored is equal to the rating rounded down
    // The more conventional way would be to round the rating, in which case modify clause in the star rendering:
    // n <= Math.round(productData!.rating)
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <ImageSlider images={productData!.images} alts={productData!.images.map((_,i) => `Image: ${productData!.title} ${i+1}`)}/>
            <div>
                <div className="flex w-full justify-between">
                    <span className="font-bold text-5xl">{productData!.title}</span>
                    <div className="ml-6 flex items-center">
                        {[1,2,3,4,5].map((n) => (
                            <Star key={`star-${n}`} className={`${n < productData!.rating ? "fill-purple" : "fill-lightGray"} stroke-none`}/>
                        ))} 
                         <span className="font-bold text-2xl ml-2">{productData!.rating.toFixed(2)}</span>
                    </div>
                </div>
                <p className="w-[400px] text-2xl my-1">
                    {productData!.description}
                </p>
                <p className="opacity-60 text-black text-2xl mb-3">
                    <span className="block">Stock: {productData!.stock}</span>
                    <span className="block">Brand: {productData!.brand}</span>
                    <span className="block">Category: {productData!.category}</span>
                </p>
                <div className="max-w-[100px] text-center bg-purple text-white text-xl font-bold rounded-full py-1 px-3">-{productData!.discountPercentage.toFixed(2)}%</div>
                <div className="flex mt-4 items-center">
                    <span className="text-6xl font-bold">{productData!.price} $</span>
                    <button className="ml-5 text-3xl px-8 bg-black text-white rounded-full p-2 text-lg font-bold">Add to cart</button>
                </div>
            </div>
        </div>
    );
}
