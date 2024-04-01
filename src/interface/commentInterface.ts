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

export type { IComment };
