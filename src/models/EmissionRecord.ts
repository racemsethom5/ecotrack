import mongoose, { Schema, Model } from 'mongoose';

export interface IEmissionRecord {
  householdSize: number;
  electricityData?: any;
  vehicleData?: any;
  flightsData?: any;
  shippingData?: any;
  fuelCombustionData?: any;
  dietType: string;
  shoppingFrequency: string;
  totalEmissionsKg: number;
  breakdown: {
    household: number;
    energy: number;
    transportation: number;
    lifestyle: number;
  };
  createdAt: Date;
}

const EmissionRecordSchema = new Schema<IEmissionRecord>({
  householdSize: { 
    type: Number, 
    required: true,
    min: 1,
    max: 20
  },
  electricityData: { 
    type: Schema.Types.Mixed,
    default: null
  },
  vehicleData: { 
    type: Schema.Types.Mixed,
    default: null
  },
  flightsData: { 
    type: Schema.Types.Mixed,
    default: null
  },
  shippingData: { 
    type: Schema.Types.Mixed,
    default: null
  },
  fuelCombustionData: { 
    type: Schema.Types.Mixed,
    default: null
  },
  dietType: { 
    type: String, 
    required: true,
    enum: ['vegan', 'vegetarian', 'low-meat', 'medium-meat', 'high-meat']
  },
  shoppingFrequency: { 
    type: String, 
    required: true,
    enum: ['minimal', 'average', 'frequent']
  },
  totalEmissionsKg: { 
    type: Number, 
    required: true,
    min: 0
  },
  breakdown: {
    household: { type: Number, required: true, min: 0 },
    energy: { type: Number, required: true, min: 0 },
    transportation: { type: Number, required: true, min: 0 },
    lifestyle: { type: Number, required: true, min: 0 }
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
    index: true
  }
});

const EmissionRecord: Model<IEmissionRecord> = 
  mongoose.models.EmissionRecord || 
  mongoose.model<IEmissionRecord>('EmissionRecord', EmissionRecordSchema);

export default EmissionRecord;