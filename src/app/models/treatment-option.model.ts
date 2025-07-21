export interface TreatmentOption {
    _id: string;
    name: string;
    subOptions?:  {
      name: string;
      time: string;
      cost: number;
    }[]
}
