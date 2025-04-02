import ProductList from "./components/productList";

export default function Home() {
    return (
        <div className="w-full items-center">
            <h1 className="text-5xl mx-auto text-center my-[50px] font-bold">See Products</h1>
            <ProductList />
        </div>
    );
}
