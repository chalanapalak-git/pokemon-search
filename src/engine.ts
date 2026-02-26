import {buildSearchEngine} from "@coveo/headless";
export const engine = buildSearchEngine({
  configuration: {
    organizationId: 'pumldoscdaxbxx62xcz5ja4cpiy',
    accessToken: 'xxff77f15a-d782-4e63-9f0f-96d47f47f8d8',
    search: {
      searchHub: "default",
      pipeline: "default"
    }
  }});