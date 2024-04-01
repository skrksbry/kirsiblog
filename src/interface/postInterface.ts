interface IPost {
    post_id: number;
    post_name: string;
    post_image: string;
    post_description: string;
    post_type: string;
    post_date: Date;
    blocks?: IBlock[];
}

interface IBlock {
    block_id: number;
    block_index: number;
    block_content: string;
    block_type: string;
}

export type {IPost, IBlock};
