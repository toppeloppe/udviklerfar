export interface ITravelInformation {
    destination?: string,
    from?: Date,
    to?: Date
}

// export interface ITravelPartial extends Partial<ITravelInformation> {}
//  type ITravelPartial = Partial<Omit<ITravelInformation, 'destination'>>