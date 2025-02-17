import { Context, Effect, Layer, Schedule } from "effect";

export interface BusResponse<T> {
  "odata.metadata": string;
  value: T;
}

export class DatamallService extends Context.Tag("DatamallService")<
  DatamallService,
  {
    readonly url: string;
    readonly key: string;
  }
>() {}

export const datamallGet = <T>(uri: string) =>
  DatamallService.pipe(
    Effect.andThen((service) =>
      Effect.tryPromise({
        try: () =>
          fetch(`${service.url}${uri}`, {
            method: "GET",
            headers: {
              accountKey: service.key,
            },
          }).then((res) => {
            if (!res.ok) {
              throw Error(`Unable to fetch ${uri}. - ${res.status}`);
            }
            return res;
          }) as Promise<Response>,
        catch: (err) => `${err}`,
      }).pipe(
        Effect.retry({
          times: 3,
          schedule: Schedule.exponential(100, 3),
        }),
        Effect.andThen((res) =>
          Effect.tryPromise({
            try: () => res.json() as Promise<T>,
            catch: () => "Unable to parse JSON.",
          })
        )
      )
    )
  );

const getEnvironmentVar = (variable: string): Effect.Effect<string, string> => {
  const result = process.env[variable];
  if (!result) {
    return Effect.fail(`Unable to get ${variable} environment.`);
  }

  return Effect.succeed(result);
};

export const datamallServiceLayer = Layer.effect(
  DatamallService,
  Effect.all([
    getEnvironmentVar("DATAMALL_URL"),
    getEnvironmentVar("DATAMALL_KEY"),
  ]).pipe(Effect.andThen(([url, key]) => ({ url, key })))
);
