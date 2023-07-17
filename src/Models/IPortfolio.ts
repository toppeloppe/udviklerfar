export interface IPortfolio {
    Title: string;
    subTitle: string;
    internalProjectName: string;
    githubLink: string;
    tags: string[];
}

interface Tag {
    name: string,
    background: string;
    color: string;
}

export const allTags: Tag[] = [
    {
        name: "React",
        background: "#61dbfb",
        color: "white"
    },
    {
        name: "Mui",
        background: "#007fff",
        color: "white"
    }
]
