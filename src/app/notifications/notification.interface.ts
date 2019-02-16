export interface Notification {
    id?: string,
    unread: boolean,
    icon: string,
    title: string,
    description: string,
    destination?: string
}