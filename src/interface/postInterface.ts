interface IPost {
    post_id: number;
    post_name: string;
    post_image: string;
    post_description: string;
    post_type: string;
    post_date: Date;
    post_hidden: boolean;
    post_color: string;
    blocks?: IBlock[];
}

interface IBlock {
    block_id: number;
    block_index: number;
    block_content: string;
    block_type: string;
    block_option: string;
}

interface IMarkdownPost {
    post_call_id: string;
    post_name: string;
    post_image: string;
    post_category: string;
    post_hidden: boolean;
    post_description: string;
    post_date: Date;
    post_color: string;
    post_content: string;
}

export type {IPost, IBlock, IMarkdownPost};
