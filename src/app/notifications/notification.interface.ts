/**
 * Interface for notifications
 * id?: string, unread: boolean, icon: string, title: string, destination?: string, destinationTitle?: string
 */
export interface Notification {
    id?: string,
    unread: boolean,
    icon: string,
    title: string,
    description: string,
    destination?: string,
    destinationTitle?: string
}