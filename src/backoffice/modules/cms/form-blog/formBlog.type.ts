export interface BlogPostPayload {
    title: string;
    content: string;
    status: number;
    image: string;
    categoryId: string;
    categoryName: string;
    tags: string[]; // This will now store tag IDs
    slug: string;
}

export interface FormErrors {
    slug?: string;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
}
