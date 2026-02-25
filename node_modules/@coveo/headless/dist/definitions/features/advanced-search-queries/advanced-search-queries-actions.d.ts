export interface AdvancedSearchQueryActionCreatorPayload {
    /**
     * The advanced query.
     */
    aq?: string;
    /**
     * The constant query.
     */
    cq?: string;
    /**
     * The large query.
     */
    lq?: string;
    /**
     * The disjunction query
     */
    dq?: string;
}
export declare const updateAdvancedSearchQueries: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: AdvancedSearchQueryActionCreatorPayload], AdvancedSearchQueryActionCreatorPayload, "advancedSearchQueries/update", never, never>;
export declare const registerAdvancedSearchQueries: import("@reduxjs/toolkit").ActionCreatorWithPreparedPayload<[payload: AdvancedSearchQueryActionCreatorPayload], AdvancedSearchQueryActionCreatorPayload, "advancedSearchQueries/register", never, never>;
