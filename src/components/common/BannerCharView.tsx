"use client"
import {useEffect, useRef} from "react";
import {SpinePlayer} from "@esotericsoftware/spine-player";

const BannerCharView = () => {
    const containerRef = useRef<any>(null);

    useEffect(() => {
        new SpinePlayer(containerRef.current, {
            skeleton: '/Yin.json',
            atlas: '/Yin.atlas',
            animation: 'animation',
            showControls: false,
            premultipliedAlpha: true,
            backgroundColor: "#00000000",
            alpha: true,
            preserveDrawingBuffer: true,
            scale: 0.8,
            showLoading: false,
            viewport : {
                x : -50 ,
                y : -100 ,
                width : 300 ,
                height : 600 ,
                padLeft : "50%" ,
                padRight : "0%" ,
                padTop : "0%" ,
                padBottom : "0%"
            }
        });
    }, []);

    return (
        <div
            ref={containerRef}
            className="object-contain flex pointer-events-none select-none"
            style={{width: '100%', height: '100%'}}
        />
    )
}

export default BannerCharView;