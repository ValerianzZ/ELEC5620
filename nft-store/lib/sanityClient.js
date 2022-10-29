import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'jtjutxlt',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skOFVZVhgpxFerZD0cNGQ8q11B2vqGrDXRmOH1hMxbDG8D4AovFYmDaylxNsMMLJRYdoC6MM8MAcjI29OUFW59e6W996koaFkdcL8FV2i9BMrpaFrEb3KPZQgscYPZxNKamjHEMVkMYVcYbKHVySuhYQBPyor95Bjv2RKISgLcLaE9LY7irD',
  useCdn: false,
})
