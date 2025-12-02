/**
 * Interfaces shared across web and mobile apps
 */
export interface User {
    id: string;
    name: string;
}

export interface AppState {
    isLoaded: boolean;
}
