export interface NewsItems {
    id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    image: string;
    author: {
        firstname: string;
        lastname: string;
        department: string;
    };
    createdAt: string;
}

export interface ActivitiesItems {
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    author: {
        firstname: string;
        lastname: string;
        department: string;
    };
    createdAt: string;
}
