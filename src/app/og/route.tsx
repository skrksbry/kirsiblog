import { ImageResponse } from 'next/og';

const getPostBlocks = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}
export const GET =  async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const postBlocks = await getPostBlocks(searchParams.get("id") || "1");



        return new ImageResponse(
            (
                <div
                    style={{
                        background: postBlocks.blocks[0].block_option,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            position: 'relative',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{position: "absolute", left: "50px", top: "50px", fontSize: '1.5rem', color: '#fff'}}>
                            KIRSI BLOG
                        </div>
                        <img
                            src={postBlocks.blocks[0].block_content}
                        />
                        <span
                            style={{
                                display: 'flex',
                                width: "100%",
                                height: "100%",
                                paddingTop:"280px",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "absolute",
                                fontSize: "38px",
                                color: "white"
                            }}>
                                {postBlocks.post_name}
                        </span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}