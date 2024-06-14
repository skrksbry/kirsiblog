"use client"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const MarkdownPostViewer = ({md = ""}:{md: string}) => {


    return (
        // @ts-ignore
        <MDEditor.Markdown
            style={{ width: '100%', backgroundColor: 'transparent' }}
            source={md}
        />
    )
}

export default MarkdownPostViewer;