import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react"

export default function ImageSlider ({images, alts}: {images: string[], alts: string[]}) {
    const [imageIndex, setImageIndex] = useState<number>(0);

    const onPrevImage = () => {
        setImageIndex(currentValue => {
            if (currentValue === 0) {
                return images.length - 1;
            }
            return currentValue - 1;
        });
    };

    const onNextImage = () => {
        setImageIndex(currentValue => {
            if (currentValue === images.length - 1) {
                return 0;
            }
            return currentValue + 1;
        });
    };

    return (
            <div>
                <div className="flex w-[500px] h-[500px] block mr-8">
                    <button onClick={onPrevImage} className="[&>*]:hover:opacity-100 p-2"><ChevronLeft className="opacity-60 stroke-black"/></button>
                    <div className="flex relative h-full w-full overflow-hidden">
                        {images.map((url,ind) => (
                            <img 
                                src={url} 
                                key={`slider image ${ind + 1}`} 
                                alt={alts[ind]}
                                style={{translate: `-${100 * imageIndex}%`}} 
                                className="transition-[translate] duration-300 ease-in-out object-cover block grow-0 shrink-0 w-full h-full"
                            />
                        ))}
                    </div>
                    <button onClick={onNextImage} className="[&>*]:hover:opacity-100 p-2"><ChevronRight className="opacity-60 stroke-black"/></button>
                </div>
                <div className="flex w-full justify-center">
                    {images.map((_,ind) => (
                        <button 
                            onClick={() => setImageIndex(ind)}
                            key={`image dot button ${ind + 1}`}
                            className={
                                `${ind === imageIndex ? "bg-purple" : "opacity-60 hover:opacity-100 bg-foreground"}  
                                 w-3 h-3 rounded-full m-1 inline-block`
                            } 
                        />
                    ))}
                </div>
            </div>
        )
}
