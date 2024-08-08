import mongoose from 'mongoose'

export interface LabelIface {
   name?: string,
   line: string,
   unit?: string,
   created: bool
}

const LabelSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is mandatory!']
   },
   line: {
      type: String,
      required: [true, 'Line is mandatory!']
   },
   unit: {
      type: String,
   },
   created: {
      type: Bool,
   }
});

export default LabelSchema;
