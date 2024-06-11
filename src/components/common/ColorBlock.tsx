const ColorBlock = ({color, onClick}:{color:string, onClick:(color: string)=>void}) => {
    
    return (
        <div onClick={()=>{onClick(color)}} className="w-8 h-8 mb-6 rounded-[6px] border-2 border-white mr-2 cursor-pointer border-opacity-30 hover:border-opacity-100" style={{background:color}}></div>
    )
}

export default ColorBlock;