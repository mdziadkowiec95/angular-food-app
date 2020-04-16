export interface CollectionsResponse {
    collections: { collection: Collection }[];
}

export interface Collection {
    collection_id: number;
    res_count: number;
    image_url: string;
    url: string;
    title: string;
    description: string;
    share_url: string;
}
