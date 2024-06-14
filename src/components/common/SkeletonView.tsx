const SkeletonView = () => {
    const lines = Array.from({ length: 57 });
    return (
        <div className="w-full flex flex-wrap gap-2">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 animate-pulse"/>
            {lines.map((_, index) => {
                const randomWidth = `${Math.floor(Math.random() * 91) + 10}%`;
                return (
                    <div
                        key={index}
                        className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 animate-pulse"
                        style={{ width: randomWidth }}
                    />
                );
            })}
        </div>
    );
}

export default SkeletonView;