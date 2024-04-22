interface IComment {
    comment_id: number;
    comment_post: number;
    comment_owner: string;
    comment_image: string;
    comment_tag: string;
    comment_ip: string;
    comment_time: Date;
    comment_content: string;
    comment_target_block: number;
}


interface IMetadata {
    metadataBase: string;
    title: string;
    description: string;
    openGraph: {
        title: string;
        description: string;
        siteName: string;
        locale: string;
        type: string;
        url: string;
        images: {
            url: string;
        },
    },
    twitter: {
        title: string;
        description: string;
        images: {
            url: string;
        },
    },
}

interface IMetadataProps {
    title: string;
    description: string;
    asPath: string;
    ogImage: string;
}

export type { IComment, IMetadata, IMetadataProps };
