import { Seasons } from '~~/server/utils/models'

export default defineEventHandler(async e => {
  const seasons = await Seasons.find()
  return { seasons }
})
