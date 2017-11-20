export interface User {
    uid: string;
    displayName: string;
}

export interface ListItem {
    uid?: string;
    title: string;
    date: Date;
    done: boolean;
}
