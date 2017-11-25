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

export const TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const COLOR_DONE = '#CDDC39';
export const COLOR_MISSED = '#FF5722';
export const COLOR_NORMAL = '#FFF9C4';
export const ICON_EDIT = 'fa pull-right fa-pencil text-info';
export const ICON_CLOSE = 'fa pull-right text-danger fa-times';
