'use client'

import { useEffect, useState } from "react";
import Product from "./product";
import { ApiResponse, Product as ProductType } from "../types/productApiTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

export default function ProductList() {
    const [page,setPage] = useState<number>(0);
    const [dataLength, setDataLength] = useState<number>(10);
    const [list, setList] = useState<ProductType[]>([]);

    const fetchData = () => {
        setPage(page + 10);
    };

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://dummyjson.com/products?limit=10&skip=${page}`;
            axios.get<ApiResponse>(url)
            .then((res) => {
                setList((prevState: ProductType[]) => {
                        return [...prevState, ...res.data.products];
                        });
                setDataLength(res.data.total);
            })
            .catch((err) => {
                console.error(err);
            });
        }

        fetchData();
    }, [page]);

    return (
            <InfiniteScroll 
                dataLength={list.length}
                next={fetchData}
                hasMore={list.length < dataLength}
                loader={<div/>}
                hasChildren={false}
                >
                    <div
                    className="mx-auto w-[80%] grid grid-cols-4 gap-5 justify-items-center"
                    >
                        {list.map((el) => 
                                (<Product
                                 key={`product-${el.id}`}
                                 name={el.title}
                                 description={el.description}
                                 price={el.price}
                                 discount={el.discountPercentage}
                                 imageUrl={el.thumbnail}
                                 redirectUrl={`/product/${el.id}`}
                                 />)
                                )}
                    </div>
        </InfiniteScroll>
        )
};

