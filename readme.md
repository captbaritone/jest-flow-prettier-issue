# Jest Bug Repro

When updating inline snapshots Jest applies Prettier. Unfortunatly with Flow files, Jest disregards the parser defined in the user's Pretteir config and instead uses an infered one for that file.

In the case of Flow files, Jest seems to pick incorrectly, and instead uses babel.

This leads prettier to think it's okay to remove quotes around numeric object keys.

> Note that Prettier never unquotes numeric property names in Angular expressions, TypeScript, and Flow because the distinction between string and numeric keys is significant in these languages

-- [Prettier Docs](https://prettier.io/docs/en/options.html#quote-props)

The result is that Jest writes back a snapshot file which Prettier cannot parse, and so even subsequent Prettier runs cannot restore the file to a parseable state.

The only recourse is to manually update all numeric keys in the test file (and to be very careful not to ever update the inline snapshot automatically ever again).

The bug is caused on [this line](https://github.com/facebook/jest/blob/24e0472ac41ea03cdd89ffaea8c5f410ecf6054f/packages/jest-snapshot/src/InlineSnapshots.ts#L273-L277) of `jest-snapshot` where the infered parser is prefered over one explcitly defined in the config.

## Repro

```
yarn
yarn repro # jest -u
```

### Expected

The snapshot updates and the rest of the file is left untouched.

### Actual

The snapshot updates and line 3 of `test.js` is updated to remove the quotes. Now Flow can't parse that file.

