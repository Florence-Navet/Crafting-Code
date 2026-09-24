# Lint & Format

Votre équipe vient d'hériter de `order-service`. Chaque pull request tourne au débat sur les guillemets, les points-virgules et l'indentation, et un fichier de test ignore silencieusement des tests depuis des semaines. Votre mission : mettre en place l'outillage qui mettra fin aux débats et appliquera automatiquement les conventions de l'équipe.

Vous allez configurer **Prettier** (formatage), **ESLint** (linting), et les faire coopérer harmonieusement.

## Pour commencer

Nécessite Node ≥ 22.13.

```bash
npm install
npm test           # exécution unique
npm run test:watch
npm run typecheck
```

Chaque étape ci-dessous comporte un **objectif**, des **instructions**, et une **vérification** à exécuter pour vous assurer que c'est terminé. Les indices sont repliés ; ne les ouvrez que si vous êtes bloqué(e).

> **En retard ?** Chaque étape dispose d'un point d'étape (checkpoint) dans `solution/step-N/` contenant uniquement les fichiers modifiés à cette étape. Les checkpoints sont donc **cumulatifs** : appliquez chaque étape de 1 à N, dans l'ordre. Par exemple, pour arriver à la fin de l'étape 3 :
>
> ```bash
> for s in 1 2 3; do cp -R solution/step-$s/. .; done && npm install
> ```
>
> Les sorties attendues mentionnées dans les indices supposent le `.prettierrc` de la solution (pas de point-virgule, guillemets simples, `printWidth: 100`, virgules finales/trailing commas) ; avec d'autres choix, les numéros de ligne et les totaux différeront.

---

## Étape 0 — Explorer le bazar (10')

Lisez `src/domain/order.ts`, `src/app/order-service.ts` ainsi que leurs tests. Listez toutes les incohérences que vous pouvez trouver : guillemets, points-virgules, indentation, longueur de ligne… et tout ce qui ressemble à un bug en puissance.

Lancez `npm test`. Examinez attentivement le résumé.

**Vérification :** les tests passent. Combien sont ignorés (*skipped*), et pourquoi ?

<details><summary>Indice</summary>

`Tests 6 passed | 1 skipped (7)`. Cherchez `.only` dans les fichiers de test. Quel outil pourrait empêcher que cela ne soit un jour commité ? (Renseignez-vous sur `@vitest/eslint-plugin` et sa règle `no-focused-tests`.)

</details>

---

## Étape 1 — Prettier seul (15')

**Objectif :** le formatage n'est plus une affaire d'opinion.

1. `npm install -D prettier`
2. Créez `.prettierrc`. Discutez de chaque option avec votre binôme avant de choisir une valeur : `semi`, `singleQuote`, `printWidth`, `trailingComma`.
3. Créez `.prettierignore` avec `solution/`, `package-lock.json` et `README.md`.
4. Ajoutez deux scripts dans `package.json` : `format` (`prettier --write .`) et `format:check` (`prettier --check .`).
5. Exécutez `npm run format:check`, puis `npm run format`, puis observez `git diff`.

**Vérification :**

```bash
npm run format:check   # Tous les fichiers correspondants respectent le style de code Prettier !
npm test               # toujours au vert : le diff ne concerne que le style
```

<details><summary>Indice : première sortie attendue de format:check</summary>

```text
Checking formatting...
[warn] src/app/order-service.ts
[warn] src/domain/order.test.ts
[warn] src/domain/order.ts
[warn] vitest.config.ts
[warn] Code style issues found in 4 files. Run Prettier with --write to fix.
```

</details>

<details><summary>Discussion</summary>

- Pourquoi est-ce `format:check` (et non `format`) que vous exécuteriez en CI ?
- Prettier propose délibérément très peu d'options. En quoi est-ce un avantage ?

</details>

---

## Étape 2 — Formater à l'enregistrement (Format on save) (10')

**Objectif :** plus personne n'exécute jamais `npm run format` à la main.

1. Créez `.vscode/settings.json` en activant `editor.formatOnSave` avec Prettier (`esbenp.prettier-vscode`) comme `editor.defaultFormatter`.
2. Créez `.vscode/extensions.json` recommandant cette extension.

**Vérification :** cassez l'indentation de n'importe quelle ligne dans `order.ts`, sauvegardez → elle est automatiquement restaurée.

<details><summary>Discussion</summary>

- Pourquoi versionner (commiter) `.vscode/` dans le dépôt plutôt que de s'en remettre aux paramètres utilisateur de chaque développeur ?
- Le formatage à l'enregistrement et `format:check` en CI : pourquoi a-t-on besoin des deux ?

</details>

<details><summary>Autres éditeurs</summary>

- WebStorm : Paramètres → Langages et frameworks → JavaScript → Prettier → « Configuration automatique de Prettier » + « Exécuter à l'enregistrement ».
- Neovim : `conform.nvim` avec le formateur `prettier` et `format_on_save`.

</details>

---

## Étape 3 — Les bases d'ESLint (20')

**Objectif :** détecter les bugs, pas le style.

1. `npm install -D eslint @eslint/js typescript-eslint`
2. Créez `eslint.config.js` (*flat config*) avec `{ ignores: ['solution/**'] }`, `js.configs.recommended` et `tseslint.configs.recommended`, enveloppés dans `defineConfig` issu de `eslint/config`.
3. Ajoutez un script `lint` : `eslint .` dans le `package.json`.
4. Exécutez `npm run lint` et lisez chaque message.
5. En utilisant la doc d'ESLint : https://eslint.org/docs/latest/rules/
   Ajoutez un bloc de configuration avec les règles d'équipe : `eqeqeq` en `error`, `no-console` en `warn`. Relancez.
6. Corrigez tout. La ligne d'audit avec `console.info` est légitime : conservez-la avec un commentaire de désactivation expliquant **pourquoi**.

**Vérification :**

```bash
npm run lint   # aucune sortie, code de retour 0
npm test
```

<details><summary>Indice : sortie attendue avec uniquement les règles recommandées</summary>

```text
src/app/order-service.ts
   7:8   error  'OrderLine' is defined but never used     @typescript-eslint/no-unused-vars
  19:25  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

src/domain/order.ts
  22:9  error  'currency' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 3 problems (3 errors, 0 warnings)
```

</details>

<details><summary>Indice : sortie attendue après l'ajout des règles d'équipe</summary>

```text
src/app/order-service.ts
   7:8   error    'OrderLine' is defined but never used     @typescript-eslint/no-unused-vars
  19:25  error    Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  29:5   warning  Unexpected console statement              no-console
  31:5   warning  Unexpected console statement              no-console

src/domain/order.ts
  22:9   error  'currency' is assigned a value but never used  @typescript-eslint/no-unused-vars
  27:26  error  Expected '===' and instead saw '=='            eqeqeq

✖ 6 problems (4 errors, 2 warnings)
```

`OrderLine` est importé mais inutilisé car `add` prend `line: any` à la place : corriger le type `any` résout les deux problèmes.

</details>

<details><summary>Indice : syntaxe du commentaire de désactivation</summary>

```ts
// eslint-disable-next-line no-console -- piste d'audit exigée par la finance
```

</details>

<details><summary>Discussion</summary>

- `off` / `warn` / `error` : les avertissements (*warnings*) ne font pas échouer `npm run lint`. Quand ajouteriez-vous `--max-warnings 0` ?
- Pourquoi un commentaire de désactivation sans justification est-il un *code smell* ?
- `tsconfig.json` contient `noUnusedLocals: false` à dessein. Compilateur ou linter : qui devrait être responsable de cette vérification ?

</details>

---

## Étape 4 — Le conflit (15')

**Objectif :** comprendre pourquoi linters et formateurs entrent en conflit, et désamorcer le conflit.

1. `npm install -D @stylistic/eslint-plugin` et ajoutez un bloc activant `@stylistic/quotes` avec le style de guillemets **opposé** à celui de votre `.prettierrc` (par exemple `'@stylistic/quotes': ['error', 'double']` si vous avez choisi `singleQuote: true`).
2. Exécutez `npm run lint -- --fix`, puis `npm run format:check`. Ensuite `npm run format`, puis `npm run lint`. Que se passe-t-il ?
3. `npm install -D eslint-config-prettier` : https://www.npmjs.com/package/eslint-config-prettier et ajoutez `eslintConfigPrettier` (provenant de `eslint-config-prettier/flat`) comme **dernière** entrée de votre configuration.
4. Complétez `.vscode/settings.json` avec `"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`, et recommandez `dbaeumer.vscode-eslint` dans `extensions.json`.

**Vérification :** les deux séquences sont stables.

```bash
npm run format && npm run lint
npm run lint -- --fix && npm run format:check
```

<details><summary>Indice : à quoi ressemble le conflit</summary>

```text
✖ 54 problems (54 errors, 0 warnings)
  54 errors and 0 warnings potentially fixable with the `--fix` option.
```

`lint --fix` réécrit chaque chaîne avec des guillemets doubles, puis `format` les remet en guillemets simples, puis `lint` râle à nouveau. À l'infini.

</details>

<details><summary>Indice : l'ordre a son importance</summary>

Les entrées de la *flat config* s'appliquent de haut en bas ; une entrée plus bas surcharge une entrée précédente. Si `eslintConfigPrettier` n'est pas en dernière position, les règles qu'elle désactive peuvent être réactivées par les entrées suivantes. Essayez de la déplacer au-dessus du bloc `@stylistic` :

```text
✖ 55 problems (55 errors, 0 warnings)
  55 errors and 0 warnings potentially fixable with the `--fix` option.
```

</details>

<details><summary>Discussion</summary>

La règle d'or : **le formateur gère le style, le linter gère l'exactitude du code (la correction).** Pouvez-vous penser à une règle qui se situe à la frontière des deux ?

</details>
