# Kata Prime Factors (facteurs premiers)

Le kata Prime Factors, popularisé par Robert C. Martin (« Uncle Bob »), est l'un
des exercices classiques pour s'entraîner au Test-Driven Development. Il est
assez court pour être refait tous les jours, et pourtant il offre l'une des
démonstrations les plus frappantes de la façon dont un algorithme peut *émerger*
des tests au lieu d'être conçu à l'avance.

## Le problème

Écrire une fonction qui prend un entier `n > 1` et renvoie la liste de ses
facteurs premiers, dans l'ordre croissant, avec répétitions.

```
generate(1)  -> []
generate(2)  -> [2]
generate(3)  -> [3]
generate(4)  -> [2, 2]
generate(6)  -> [2, 3]
generate(8)  -> [2, 2, 2]
generate(9)  -> [3, 3]
generate(12) -> [2, 2, 3]
```

## Les règles du jeu

Suivre les trois lois du TDD :

1. N'écrire du code de production que pour faire passer un test qui échoue.
2. N'écrire que la partie de test suffisante pour montrer un échec (une erreur
   de compilation compte comme un échec).
3. N'écrire que le code de production suffisant pour faire passer le test qui
   échoue.

Et le cycle red / green / refactor :

- **Red** — ajouter le plus petit test suivant ; le regarder échouer.
- **Green** — faire la chose la plus simple qui le fait passer, même si ça
  paraît naïf.
- **Refactor** — nettoyer le code *et les tests* pendant que tout reste vert.

## Comment le pratiquer

Prendre les entrées dans l'ordre (`1, 2, 3, 4, 5, 6, 8, 9, ...`) et ajouter un
test à la fois. Résister à l'envie de sauter des étapes : le but du kata est
d'observer comment l'implémentation grandit.

Une progression typique ressemble à ceci :

1. `1` renvoie une liste vide — l'implémentation la plus simple possible
   renvoie `[]`.
2. `2` impose un premier `if`.
3. `3` généralise le `if` en une division par 2.
4. `4` transforme le `if` en `while`.
5. `6` impose une seconde boucle, externe, sur les diviseurs candidats.
6. Vers `8` et `9`, les cas particuliers disparaissent et toute la fonction se
   réduit à quelques lignes.

La leçon : **plus les tests deviennent spécifiques, plus le code devient
générique.** À la fin, il ne reste aucun `if` pour des nombres particuliers —
juste deux boucles imbriquées. Uncle Bob appelle ça la *Transformation Priority
Premise* en action.

## Cibles de refactoring

Une fois que c'est vert, chercher :

- un nom clair pour la variable de boucle (`divisor`, pas `i`) ;
- des clauses de garde plutôt que des conditions imbriquées ;
- des tests qui se lisent comme une spécification (les tests pilotés par table
  fonctionnent bien ici) ;
- aucune duplication entre les cas de test.

## Pour démarrer

```bash
npm install
npm test          # single run
npm run test:watch # red/green/refactor loop
npm run typecheck
```

Les tests se trouvent dans `src/`, à côté du code qu'ils testent, dans des
fichiers `*.test.ts`. Commencer par renommer le test d'exemple dans
`src/prime-factors.test.ts` et écrire la première vraie assertion — puis créer
`src/prime-factors.ts` seulement quand un test l'exige.

## Pour aller plus loin

- Se chronométrer : le kata devrait finir par prendre moins de 10 minutes.
- L'essayer sans regarder une solution précédente.
- L'essayer dans un autre langage, ou avec un test basé sur les propriétés
  (`factors.reduce((a, b) => a * b) === n` et chaque facteur est premier).