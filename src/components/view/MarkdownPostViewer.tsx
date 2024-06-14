"use client"
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";

const MarkdownPostViewer = ({md = ""}:{md: string}) => {

    return (
        <MDEditor.Markdown
            style={{ width: '100%', backgroundColor: 'transparent' }}
            source={md}
        />
    )
}

export default MarkdownPostViewer;