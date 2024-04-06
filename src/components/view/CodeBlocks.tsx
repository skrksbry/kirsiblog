"use client"

import {CodeBlock} from 'react-code-block';
import {IBlock} from "@/interface/postInterface";

const CodeBlocks = ({data}: {data: IBlock}) => {
    return (
        <div className="my-2">
            <CodeBlock code={data.block_content} language={data.block_option}>
                <CodeBlock.Code className="bg-gray-900 p-6 rounded-xl shadow-lg whitespace-pre-wrap break-all relative w-full">
                    <CodeBlock.LineContent>
                        <CodeBlock.Token />
                    </CodeBlock.LineContent>
                </CodeBlock.Code>
            </CodeBlock>
        </div>

    )
}

export default CodeBlocks;
