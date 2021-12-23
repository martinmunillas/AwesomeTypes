/**
 * A secret santa must be  assigned to a person
 * and the next year must be different
 * than this year
 */
type Friends = ["Martin", "Felipe", "Annerys", "Gonzalo"];
type Friend = Friends[number];

type Possibles<
  T extends Friend = Friend,
  S extends unknown[] = []
> = S["length"] extends Friends["length"]
  ? S
  : Possibles<
      T,
      [
        ...S,
        {
          thisYear: Friends[S["length"]];
          nextYear: Exclude<Friend, Friends[S["length"]] | T>;
        }
      ]
    >;

type GetPossiblesByName<
  T extends Friend,
  S extends unknown[] = []
> = S["length"] extends Friends["length"]
  ? S
  : T extends Possibles<T>[S["length"]]["thisYear"]
  ? GetPossiblesByName<T, [...S, never]>
  : GetPossiblesByName<T, [...S, Possibles<T>[S["length"]]]>;

type SecretSanta<T extends Friend> = Exclude<
  GetPossiblesByName<T>[number],
  never
>;

const martin: SecretSanta<"Martin"> = {
  thisYear: "Annerys",
  nextYear: "Gonzalo",
};
