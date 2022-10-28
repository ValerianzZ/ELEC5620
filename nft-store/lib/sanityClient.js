import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '6gt65pn7',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'sk5mu8iGlRusRAxSA9tAYwxvgg9kIpwMz8dPMckoFRcgxFpUKnOKPFfG4RlfThs9jEhEfcHKUu4tQH5ybjJW3hCVV025ZbrY69I5yUtmHVKc72MthvUaNKGDOWkiFvk8SqVelW5jVZdhXa810cMHz3r1TFp04L828AhVSr3a9YTaBL4DR5mS',
  useCdn: false,
})
