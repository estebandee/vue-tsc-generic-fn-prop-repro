# vue-tsc: generic function prop breaks type parameter inference (3.3.12+)

Passing a generic function to a function prop of a generic component makes vue-tsc stop inferring the component's type parameter from the other props. It falls back to the parameter's default instead.

## Reproduce

```sh
npm install
npm run typecheck
```

`src/App.vue` renders `Combo` twice with the same `Option<number>[]` options. The only difference is that the second one also passes `:search-function="searchOption"`, where `searchOption` is generic.

- vue-tsc 3.3.11: no errors
- vue-tsc 3.3.12 to 3.3.14: 3 errors on the second `Combo`, because `Value` resolves to its default `string`

```
src/App.vue(21,11): error TS2322: Type 'Option<number>[]' is not assignable to type 'Option<string>[]'.
src/App.vue(21,30): error TS2322: Type 'number' is not assignable to type 'string'.
src/App.vue(21,73): error TS2322: Type '(option: Option<number>) => void' is not assignable to type '(option: Option<string>) => any'.
```

Wrapping the function in a non-generic arrow, or removing the prop, makes the error go away.
