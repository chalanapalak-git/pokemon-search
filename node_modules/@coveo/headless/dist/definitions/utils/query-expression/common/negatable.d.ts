export interface Negatable {
    /**
     * If `true`, the inverse expression will be created.
     */
    negate?: boolean;
}
export declare function getNegationPrefix(config: Negatable): "" | "NOT ";
