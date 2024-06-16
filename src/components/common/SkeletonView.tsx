const SkeletonView = () => {
    const lines = Array.from({ length: 60 });
    return (
        <div className="w-full flex flex-col gap-1.5">
            <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4 animate-pulse"/>
            {lines.map((_, index) => {
                const randomWidth = `${Math.floor(Math.random() * 100)}%`;
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