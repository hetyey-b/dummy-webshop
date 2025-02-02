export default function Product({name, description, price, discount, imageUrl}: {
        name: string,
        description: string,
        price: number,
        discount: number,
        imageUrl: string
    }) {
    return (
        <div className="bg-white inline-block relative p-5 border-solid border-[#dbdbdb] border rounded-lg w-full h-[320px]">
            <div className="bg-[#6100FF] text-white text-sm font-bold rounded-full py-1 px-3 absolute right-3 top-3">-{discount.toFixed(2)}%</div>
            <img src={imageUrl} alt={name} className="w-[280px] h-[150px] object-cover"/>
            <div className="font-bold flex justify-between w-full text-xl truncate">
                <span>{name}</span>
                <span>{price} $</span>
            </div>
            <p className="py-1 h-[40px] mb-4 text-sm line-clamp-2">
                {description}
            </p>
            <button className="bg-black text-white rounded-full p-2 text-lg font-bold w-full">See details</button>
        </div>
    )
}
