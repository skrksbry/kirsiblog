const ColorBlock = ({
	color,
	onClick,
	nowColor,
}: {
	color: string;
	onClick: (color: string) => void;
	nowColor: string;
}) => {
	return (
		<div
			onClick={() => {
				onClick(color);
			}}
			className={`w-8 h-8 mb-6 rounded-[6px] border-[1px] border-white mr-3 box-content cursor-pointer transition-all ${
				nowColor === color ? 'scale-125' : 'scale-100'
			} hover:scale-125`}
			style={{ background: color }}
		></div>
	);
};

export default ColorBlock;
