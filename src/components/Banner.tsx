import Image from "next/image";

const Banner = () => {

    return (
        <div
            className="h-[150px] flex image-cover overflow-hidden justify-center items-center"
            style={{width: "100%", background: "linear-gradient(90deg, #ef4444 0%, rgb(218, 174, 81) 100%)", position: "relative"}}>
            <div className="w-[150px] pt-[50px] absolute">
                <Image
                    src="/sd.png"
                    alt={"본문이미지"}
                    fill
                    sizes="(max-width: 768px) 100%, 100%"
                    className="object-contain flex image-unset"
                />
            </div>
            {/*<span>블로그에 오신걸 환영합니다.</span>*/}
        </div>
    )
}

export default Banner