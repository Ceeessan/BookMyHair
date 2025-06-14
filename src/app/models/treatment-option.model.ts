export interface TreatmentOption {
    name: string;
    subOptions?:  {
      name: string;
      time: string;
      cost: number;
    }[]
}
