import { defineStore, storeToRefs } from 'pinia';
import * as d3 from 'd3-time-format'

import { useSeasonsStore } from '@/stores/seasons';

export const useAdminSeasonsStore = defineStore('admin-seasons', () => {
  const
    storeSeasons = useSeasonsStore(),
    { seasons } = storeToRefs(storeSeasons),

    seasonsList = computed(() => seasons.value
      .map(el => ({
        _id: el._id,
        code: el.code,
        name: el.name,
        season: el.season,
        crops: el.crops.join(', '),
        nTrap: el.nTrap,
        date: d3.timeParse('%Y/%-m/%-d')(`${el.iY}/${el.im}/${el.id}`),
        default: el.default ? '\u2713' : '-'
      }))
      .sort((a, b) => a.date > b.date ? -1 : 1)
    ),

    dialogFormSeason = ref(false),

    code = ref(''),
    name = ref(''),
    season = ref(null),
    nTrap = ref(null),
    iY = ref(null),
    im = ref(null),
    id = ref(null)

  const
    postNewSeason = () => new Promise((resolve, reject) => {
      $fetch('/api/admin/seasons/new', {
        method: 'post',
        body: {
          code: code.value,
          name: name.value,
          season: season.value,
          nTrap: nTrap.value,
          iY: iY.value,
          im: im.value,
          id: id.value
        }
      })
      .then(res => {
        seasons.value.push(res.savedSeason);
        resolve(res.savedSeason);
      })
      .catch(err => { reject(err); });
    });

  return {
    seasonsList,

    dialogFormSeason,

    code,
    name,
    season,
    nTrap,
    iY,
    im,
    id,

    postNewSeason
  }
})
