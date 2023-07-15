export interface IPortfolio {
    Title: string;
    subTitle: string;
    internalProjectName: string;
    tags: string[];
}

interface Tag {
    name: string,
    background: string;
    color: string
}

export const allTags: Tag[] = [
    {
        name: "React",
        background: "grey",
        color: "white"
    },
    {
        name: "Mui",
        background: "teal",
        color: "white"
    }
]
