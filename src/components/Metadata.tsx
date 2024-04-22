import {IMetadata, IMetadataProps} from "@/interface/commentInterface";

const MetadataContent = (metadataProps?: IMetadataProps) => {
    const { title, description, asPath, ogImage } = metadataProps || {};

    const TITLE = title || "";
    const DESCRIPTION = description || "";
    const PAGE_URL = asPath|| "";
    const OG_IMAGE = ogImage || "";

    const metadata: IMetadata = {
        metadataBase: 'https://blog.silvercherry.io/',
        title: TITLE,
        description: DESCRIPTION,
        openGraph: {
            title: TITLE,
            description: DESCRIPTION,
            siteName: "KIRSI BLOG",
            locale: 'ko_KR',
            type: 'website',
            url: PAGE_URL,
            images: {
                url: OG_IMAGE,
            },
        },
        twitter: {
            title: TITLE,
            description: DESCRIPTION,
            images: {
                url: OG_IMAGE,
            },
        },
    };

    return metadata;
}

export default MetadataContent;