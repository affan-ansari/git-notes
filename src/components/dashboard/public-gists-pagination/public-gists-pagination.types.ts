export interface IPublicGistsPaginationControlsProps {
    page: number;
    variant: 'list' | 'card';
    setPage: (value: React.SetStateAction<number>) => void;
}
