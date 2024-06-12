import { ImageResponse } from 'next/og';

const getPost = async (id:string) => {
    const res = await fetch(`${process.env.baseUrl}/markdown-posts/${id}`,{ next: { revalidate: 10 } });
    return await res.json();
}
export const GET =  async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const post = await getPost(searchParams.get("id") || "0");



        return new ImageResponse(
            (
                <div
                    style={{
                        background: post.post_color,
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
                            src={post.post_image}
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
                                {post.post_name}
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