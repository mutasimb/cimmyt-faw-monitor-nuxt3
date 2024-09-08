import * as d3Array from 'd3-array'
import * as d3Time from 'd3-time'

import { Users } from '../../../utils/models'
import { Traps } from '../../../utils/models'
import { Scoutings } from '../../../utils/models'

export default defineEventHandler(async e => {
  const
    { user } = e.context,
    season = getRouterParam(e, 'season'),

    roles = ["Super Admin", "Moderator", "User Manager", "Data Viewer"]

  if(!user) throw createError({
    status: 400,
    statusMessage: 'User account couldn\'t be found'
  })

  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to collector data'
  })
  
  const
    usersSeason = await Users.find({ editSeasons: season, test: { $ne: true } }),
    trapsSeason = await Traps.find({ season, user: { $in: usersSeason } }).populate("area").sort("user tag"),
    scoutingsSeason = await Scoutings.find({ season }).sort("user tag submissionTime"),

    dateStart = d3Array.min(trapsSeason, d => d.installationDate),
    dateEnd = d3Array.max(scoutingsSeason, d => d.submissionTime),

    mondays = d3Time.utcMonday.range(dateStart, dateEnd),
    stepsUTC = [d3Time.utcMonday.offset(mondays[0], -1), ...mondays],
    steps = stepsUTC.map(step => d3Time.timeHour.offset(step, -6)),

    trapsAllUsers = usersSeason.reduce((acc, user) => {
      const
        { _id, name, phone, adm } = user._doc,
        userID = _id.toString()

      return [
        ...acc,
        ...["A", "B", "C"].map(tag => ({
          name,
          phone,
          adm,
          trapRegistered: trapsSeason.find(trap => trap._doc.user.toString() === userID && trap._doc.tag === tag) || null,
          tag
        }))
      ]
    }, []),

    exportable = trapsAllUsers.reduce((acc, trap, iTrap) => {
      const
        { trapRegistered } = trap,
        scoutingsTrap = !trapRegistered
          ? []
          : scoutingsSeason.filter(scouting => scouting.trap.toString() === trapRegistered._doc._id.toString())

      return [...acc, ...steps.map((step, iStep, arrStep) => {
        if (!trapRegistered) return { y: iTrap, x: iStep, val: 0 }

        const
          { installationDate } = trapRegistered,
          scoutingSubmissionTime = scoutingsTrap.map(scouting => scouting.submissionTime)

        return {
          y: iTrap,
          x: iStep,
          val: arrStep.length === (iStep + 1) ? (
            step < installationDate ? 1
              : scoutingSubmissionTime.some(submissionTime => step < submissionTime) ? 2
                : 0
          ) : (
            step < installationDate && arrStep[iStep+1] > installationDate ? 1
              : scoutingSubmissionTime.some(submissionTime => step < submissionTime && arrStep[iStep+1] > submissionTime) ? 2
                : 0
          )
        }
      })]
    }, [])

  return {
    season,
    dataViz: exportable,
    x: steps,
    y: trapsAllUsers,
  }
})
