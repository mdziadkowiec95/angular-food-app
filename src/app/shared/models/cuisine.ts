
export interface CuisinesResponse {
    cuisines: Cuisine[];
}

export interface Cuisine {
    cuisine: {
        cuisine_id: number;
        cuisine_name: string;
    };
}
