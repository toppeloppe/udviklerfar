export interface ITravelInformation {
    flyingFrom?: string
    flyingDestination?: string,
    from?: Date,
    to?: Date
    travelers?: number;
    firstName?: string;
    lastName?: string;
    Address?: string;
    zipcode?: string;
    city?: string;
    phone?: string;
    email?: string;
}

// export interface ITravelPartial extends Partial<ITravelInformation> {}
//  type ITravelPartial = Partial<Omit<ITravelInformation, 'destination'>>