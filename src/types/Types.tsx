export interface MenuItem {
    name: string;
    price: number;
    type: string;
}

export interface GroupedMenu {
    [key: string]: MenuItem[];
}
