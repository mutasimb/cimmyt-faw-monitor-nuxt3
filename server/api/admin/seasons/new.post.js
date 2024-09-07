import { Seasons } from '../../../utils/models'

export default defineEventHandler(async e => {
  const
    { user } = e.context,

    {
      code,
      name,
      season: seasonAgri,
      nTrap,
      iY: dY,
      im: dm,
      id: dd
    } = await readBody(e),

    roles = ["Super Admin", "Moderator", "User Manager"]

  if (roles.indexOf(user.role) === -1) throw createError({
    status: 401,
    statusMessage: 'User don\'t have access to create new seasons'
  })

  const newSeason = new Seasons({
    code,
    name,
    country: "5ee35f69bf0800007d001299",
    crops: ["Maize"],
    nTrap: nTrap,
    season: seasonAgri,
    iY: dY,
    im: dm,
    id: dd,
    listed: true,
    default: false,
    closed: false,
    extents: {},
    params: [
      { keyParam: "count", keyUnit: "pdpt", nameParam: "Moth Count", abbParam: "Moth Count", unit: "/ day / trap" }, 
      { keyParam: "sfw", keyUnit: "percent", nameParam: "Small Fresh Windowpane Infestation", abbParam: "SFW Infestation", unit: "%" }, 
      { keyParam: "iw", keyUnit: "percent", nameParam: "Infested Whorl", abbParam: "IW Infestation", unit: "%" }, 
      { keyParam: "cob", keyUnit: "percent", nameParam: "Cob Infestation", abbParam: "Cob Infestation", unit: "%" }
    ]
  })

  const savedSeason = await newSeason.save()

  return { savedSeason }
})
