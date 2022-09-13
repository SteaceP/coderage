import { InMemoryCache } from "@apollo/client/core";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          read(_, { args, toReference }) {
            return toReference({
              __typename: "Post",
              id: args.id,
            });
          },
          keyArgs: ["filters"],
          merge(existing, incoming) {
            //? This is a test for something that I'll add sooner or later doesn't do much right now
            return {
              ...incoming,
              data: [...(existing?.data || []), ...incoming.data],
            };
          },
        },
      },
    },
  },
});

(async () => {
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(localStorage),
  });
})();
