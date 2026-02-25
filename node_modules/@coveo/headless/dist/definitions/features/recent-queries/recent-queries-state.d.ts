export interface RecentQueriesState {
    queries: string[];
    maxLength: number;
}
export declare function getRecentQueriesInitialState(): RecentQueriesState;
