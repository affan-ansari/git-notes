export interface IPublicGistsPaginationControlsProps {
    page: number;
    totalPages: number | undefined;
    setPage: (value: React.SetStateAction<number>) => void;
}
