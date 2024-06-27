import { model } from 'mongoose'

import UserSchema from '../schemas/Users'
import SeasonSchema from '../schemas/Seasons'
import ScoutingSchema from '../schemas/Scoutings'
import AreaSchema from '../schemas/Areas'

export const Users = model("users", UserSchema)
export const Seasons = model("seasons", SeasonSchema)
export const Areas = model("areas", AreaSchema)
export const Scoutings = model("scoutings", ScoutingSchema)
