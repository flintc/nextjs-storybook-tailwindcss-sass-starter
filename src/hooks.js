import React, { useCallback, useEffect, useState } from "react";

import {
  useQuery,
  queryCache,
  useQueries,
  useInfiniteQuery,
  QueriesObserver,
  useQueryClient as useReactQueryClient,
} from "react-query";
import { resolve } from "./utils";

export function useSharedState(key, initialValue) {
  const queryClient = useReactQueryClient();
  const { data: state } = useQuery(
    key,
    () => {
      return queryClient.getQueryData(key);
    },
    {
      initialData: initialValue,
    }
  );

  const setState = (value) => {
    return queryClient.setQueryData(key, value);
  };

  return [state, setState];
}

export function useLocalStateArray(key, filters) {
  const queryClient = useReactQueryClient();

  const [queries, setQueries] = useState(
    queryClient.getQueryCache().findAll(key, filters)
  );

  // const queries = queryClient.getQueryCache().findAll(key, filters);

  // const observer = new QueriesObserver(
  //   queryClient,
  //   queries.map((x) => x.options)
  // );

  // let unsubscribe = observer.subscribe((result) => {
  //   console.log("observer sub", unsubscribe, result);
  //   unsubscribe && unsubscribe();
  // });

  // const results = useQueries(queries.map((x) => x.options));

  // console.log("results", results);
  let setState = (value) => {
    const queries = queryClient.getQueryCache().findAll(key, filters);
    queries.map((x) => {
      // console.log("setting foo ?", x, x.queryKey);
      queryClient.setQueryData(x.queryKey, value);
    });
  };

  useEffect(() => {
    let unsubscribe = () => {};
    if (queries.length === 0) {
      unsubscribe = queryClient.getQueryCache().subscribe((x) => {
        const queries = queryClient.getQueryCache().findAll(key, filters);
        // console.log("sub", queries);
        if (queries.length) {
          setQueries(queries);
          unsubscribe();
        }
      });
    }
    return () => {
      // console.log("cleanup", unsubscribe);
      unsubscribe && unsubscribe();
    };
  }, []);

  // queries.forEach((x) => {
  //   x.subscribe((y) => {
  //     console.log("sub", y);
  //   });
  // });
  const state = queries.map((x) => x.state.data);
  console.log("fooooo", queries);
  // const { data: state } = useQuery(
  //   key,
  //   () => {
  //     return queryClient.getQueryData(key);
  //   },
  //   {
  //     initialData: initialValue,
  //   }
  // );

  return [state, setState];
}

export const useQueryClient = () => {
  const queryClient = useReactQueryClient();
  queryClient.setAllQueryData = (key, value, filters = {}) => {
    const queries = queryClient.getQueryCache().findAll(key, filters);
    queries.map((x) => {
      queryClient.setQueryData(x.queryKey, value);
    });
  };
  return queryClient;
};
