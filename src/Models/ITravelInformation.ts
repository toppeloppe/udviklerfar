export interface ITravelInformation {
    flyingFrom?: string
    flyingDestination?: string,
    from?: Date,
    to?: Date
    travelers?: number;
}

// export interface ITravelPartial extends Partial<ITravelInformation> {}
//  type ITravelPartial = Partial<Omit<ITravelInformation, 'destination'>>