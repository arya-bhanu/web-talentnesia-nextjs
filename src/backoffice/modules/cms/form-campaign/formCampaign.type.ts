export interface CampaignPayload {
    title: string;
    content: string;
    status: number;
    image: string;
    startDate: string;
    endDate: string;
    discountId?: string;
}

export interface FormErrors {
    [key: string]: string;
}

export interface Discount {
    id: string;
    name: string;
    percentage: number;
}
