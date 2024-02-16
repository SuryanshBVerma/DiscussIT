import { useEffect } from "react";

const usePageMeta = (title, description) => {
    const defaultTitle = "DiscussIT";
    const defaultDesc = "meta description";

    useEffect(() => {
        document.title = title || defaultTitle;
        document
            .querySelector("meta[name='description']")
            .setAttribute("content", description || defaultDesc);
    }, [defaultTitle, title, defaultDesc, description]);
};

export default usePageMeta;
