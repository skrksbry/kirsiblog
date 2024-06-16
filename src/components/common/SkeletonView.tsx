const getMarkdownPost = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/markdown-posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}

const SkeletonView = () => {

    const getStringLines = ( target: string ) => {
        if(!target) return 0;
        const pattern = /  \n|\n\n/g;
        const matches = target.match(pattern);
        
        return matches ? matches.length : 0;
    }

    
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