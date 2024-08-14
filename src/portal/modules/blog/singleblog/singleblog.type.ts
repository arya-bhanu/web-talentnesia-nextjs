    export interface BreadcrumbProps {
        pathSegments: { label: string; href: string; }[];
        currentPath: string;
    }

    export interface SingleBlogViewProps {
        toggleDropDown: () => void;
    }

    export interface RelatedArticleType {
        title: string;
        imageSrc: string;
        url: string;
        description: string;
    }