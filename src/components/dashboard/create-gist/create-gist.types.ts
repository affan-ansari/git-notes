export interface FileInput {
    filename: string;
    content: string;
}

export interface GistFormInputs {
    description?: string;
    files: FileInput[];
    public: boolean;
}

export interface GistFormData {
    description?: string;
    files: {
        [filename: string]: {
            content: string;
        };
    };
}
