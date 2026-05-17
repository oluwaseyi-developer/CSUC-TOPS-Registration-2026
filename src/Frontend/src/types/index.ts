export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface FormOptions {
  gender: OptionItem[];
  transportation: OptionItem[];
  comingWith: OptionItem[];
}

export interface OptionItem {
  value: number;
  label: string;
}

export interface RegistrationRequest {
  fullName: string;
  sex: number;
  email: string;
  phoneNumber: string;
  locationState: string;
  expectations?: string;
  needsAccommodation: boolean;
  meansOfTransportation: number;
  comingWith: number;
  numberOfPersons: number;
}

export interface Registrant {
  id: string;
  fullName: string;
  sex: string;
  email: string;
  phoneNumber: string;
  locationState: string;
  expectations: string;
  needsAccommodation: boolean;
  meansOfTransportation: string;
  comingWith: string;
  numberOfPersons: number;
  registeredAt: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RegistrationStatistics {
  totalRegistrations: number;
  maleCount: number;
  femaleCount: number;
  needAccommodation: number;
  comingAlone: number;
  comingWithBrethren: number;
  comingWithFamily: number;
  totalExpectedAttendees: number;
  transportationBreakdown: {
    publicTransport: number;
    privateVehicle: number;
    joinTheBrethren: number;
  };
}
