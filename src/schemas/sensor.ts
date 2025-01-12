import mongoose from 'mongoose'

export interface SensorIface {
   _id: any,
   line: string,
   name: string,
   plc_name: string,
   unit?: string,
   address: string,
   active: boolean,
   node: string
}

const SensorSchema = new mongoose.Schema({
   line: {
      type: String,
      required: [true, 'Line is mandatory!']
   },
   name: {
      type: String,
      required: [true, 'Name is mandatory!']
   },
   plc_name: {
      type: String,
      required: [true, 'PLC_Name is mandatory!']
   },
   unit: {
      type: String,
   },
   address: {
      type: String,
      required: [true, 'Address is mandatory!']
   },
   active: {
      type: Boolean,
      required: [true, 'Active is mandatory!']
   },
   node: {
      type: String,
      required: [true, 'Node is mandatory!']
   }
});

export default SensorSchema;
