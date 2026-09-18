import resortDataJson from './resortData.json';

export interface PropertyAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  locationDescription: string;
}

export interface PropertyContact {
  phone: string;
  email: string;
  loyaltyEmail: string;
  website: string;
  frontDeskExtension: string;
  frontDeskAvailability: string;
}

export interface PropertyOverview {
  name: string;
  fictionalDisclaimer: string;
  taglines: string[];
  classification: string;
  starRating: number;
  address: PropertyAddress;
  contact: PropertyContact;
  inventory: {
    totalRooms: number;
    suites: number;
    villas: number;
  };
  timing: {
    checkIn: string;
    checkOut: string;
    earlyCheckInGuaranteed: string;
    lateCheckOutGuaranteed: string;
  };
  highlights: string[];
}

export interface RoomRates {
  lowSeason: number;
  highSeason: number;
}

export interface RoomType {
  id: string;
  name: string;
  roomNumbers: string;
  sqFt: number;
  maxOccupancy: string;
  maxAdults: number;
  maxChildren: number;
  bedConfig: string;
  rates: RoomRates;
  petFriendly: boolean;
  description: string;
  features: string[];
}

export interface DiningVenue {
  id: string;
  name: string;
  type: string;
  hours: string;
  dressCode: string;
  reservations: string;
  allInclusive: string;
  description: string;
  activeBulletin?: string;
}

export interface LoyaltyTier {
  tier: string;
  qualification: string;
  benefits: string[];
}

export interface DepartmentDirectoryItem {
  department: string;
  extension: string;
  primaryFunctions: string;
}

export interface LocalAttraction {
  name: string;
  distance: string;
  typicalVisit: string;
  keyInformation: string;
}

export interface InRoomRequestItem {
  type: string;
  time: string;
  routedTo?: string;
  notes?: string;
}

export interface SpaTreatment {
  name: string;
  duration: string;
  price: number;
  description: string;
}

export interface ResortData {
  property: PropertyOverview;
  financials: {
    currency: string;
    occupancyTaxRate: number;
    resortFeePerNight: number;
    resortFeeCovers: string[];
    incidentalHoldPerNight: number;
    extraPersonCharges: {
      adult: number;
      childAges3To12: number;
      under3: number;
    };
    seasonality: {
      highSeason: string;
      lowSeason: string;
    };
  };
  rooms: RoomType[];
  diningVenues: DiningVenue[];
  allInclusiveDetails: {
    included: string[];
    specialtySurcharges: {
      additionalWaterfrontDinnerAdult: number;
      additionalWaterfrontDinnerChild: number;
    };
    dietaryAccommodations: string;
  };
  amenities: {
    pools: Array<{
      name: string;
      hours: string;
      access: string;
      description: string;
      activeBulletin?: string;
    }>;
    beach: {
      frontage: string;
      loungers: string;
      cabanaRental: {
        pricePerDay: number;
        bookingChannel: string;
        loyaltyPerk: string;
      };
    };
    fitnessCenter: {
      access: string;
      personalTraining: string;
    };
    wifi: {
      standard: string;
      premium: string;
    };
    parking: {
      selfParking: string;
      valet: string;
      evCharging: string;
    };
    businessCenter: {
      location: string;
      hours: string;
      printing: string;
    };
    laundry: {
      valet: string;
      selfService: string;
    };
  };
  spa: {
    hours: string;
    activeBulletin: string;
    roomsCount: number;
    thermalSuite: string;
    signatureTreatments: SpaTreatment[];
    bookingRecommendation: string;
    cancellationPolicy: string;
  };
  activities: {
    kidsClub: {
      ages: string;
      dayCamp: string;
      eveningSession: string;
    };
    teenLounge: {
      ages: string;
      features: string;
    };
    watersports: {
      complimentary: string[];
      rentals: Array<{
        name: string;
        rate: string;
        provider: string;
      }>;
    };
    eveningEntertainment: string[];
    excursions: string[];
  };
  transportation: {
    airportShuttle: {
      rate: string;
      frequency: string;
      normalReservationLeadTime: string;
      activeBulletin: string;
    };
    onDemandTransfer: {
      service: string;
      rate: string;
      bookingChannel: string;
    };
    rentalCars: {
      location: string;
      hours: string;
    };
    golfCourseShuttle: {
      rate: string;
      hours: string;
    };
  };
  loyaltyProgram: {
    name: string;
    enrollment: string;
    pointsEarning: string;
    freeNightRedemption: string;
    pointsExpiration: string;
    redemptionOptions: string[];
    statusMatch: string;
    tiers: LoyaltyTier[];
  };
  policies: {
    checkInOut: {
      checkIn: string;
      checkOut: string;
      guaranteedEarlyOrLate: string;
      requirements: string;
    };
    cancellation: {
      standardRooms: string;
      suitesAndVillas: string;
      noShows: string;
    };
    childrenAndExtraGuests: {
      childrenUnder3: string;
      rollawayBeds: string;
      cribs: string;
    };
    pets: {
      allowed: boolean;
      roomCategory: string;
      fee: string;
      limits: string;
      serviceAnimals: string;
    };
    smoking: {
      policy: string;
      designatedAreas: string;
      violationCleaningFee: string;
    };
    ageRequirements: {
      primaryGuest: string;
      guests18to20: string;
      adultsOnlyPool: string;
    };
    payment: {
      acceptedCards: string[];
      currency: string;
      resortFeeAndTaxes: string;
    };
    damageAndLostItems: {
      lostAndFound: string;
      damage: string;
    };
  };
  inRoomRequests: {
    menuHours: string;
    deliveryTime: string;
    deliveryFee: string;
    orderingChannels: string;
    fulfillmentTimes: InRoomRequestItem[];
  };
  conciergeWorkflows: {
    commonBookings: string[];
    leadTimes: {
      dining: string;
      spa: string;
      excursions: string;
      privateEvents: string;
    };
    confirmationProtocol: string;
  };
  reservationModificationFlow: string[];
  complaintCategories: Array<{ category: string; examples: string }>;
  customerGroups: Array<{ group: string; needs: string }>;
  directory: DepartmentDirectoryItem[];
  localAttractions: LocalAttraction[];
  operationalUpdates: string[];
}

export const resortData: ResortData = resortDataJson as ResortData;

export default resortData;
