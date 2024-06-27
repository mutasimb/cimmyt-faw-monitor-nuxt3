import { Schema } from 'mongoose'

export default new Schema({
  name: { type: String, required: true },
  role: { type: String, default: "Data", enum: ["Super Admin", "Moderator", "User Manager", "Data Viewer", "Data"] },
  title: { type: String },
  org: { type: String },
  adm: {
    adm1: { type: String },
    adm2: { type: String },
    adm3: { type: String },
    adm4: { type: String }
  },
  email: { type: String },
  phone: { type: String, unique: true },
  defaultSeason : { type: Schema.Types.ObjectId, ref: "seasons" },
  viewSeasons: [
    { type: Schema.Types.ObjectId, ref: "seasons" }
  ],
  editSeasons: [
    { type: Schema.Types.ObjectId, ref: "seasons" }
  ],
  password: { type: String, required: true },
  test: { type: Boolean },
  tag: [{ type: String }],
  needPasswordReset: { type: Boolean, default: true }
})
