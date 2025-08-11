# TypeScript Tutorial - Part 1

This repository contains TypeScript tutorial files and examples to help you learn TypeScript fundamentals.

## Chapters

The tutorial is organized into the following chapters located in the `FollowAlong/` directory:

1. [Type Inference](./FollowAlong/1.type-inference.ts)
2. [Semicolons](./FollowAlong/2.semicolons.ts)
3. [Variable Declarations](./FollowAlong/3.variable-declarations.ts)
4. [Functions](./FollowAlong/4.functions.ts)
5. [Functions - Const vs Function](./FollowAlong/5.functions-b-const-vs-function.ts)
6. [Advanced Types](./FollowAlong/6.advanced-types.ts)
7. [Arrays](./FollowAlong/7.arrays.ts)
8. [Union Types](./FollowAlong/8.union-types.ts)
9. [Tuples](./FollowAlong/9.tuples.ts)
10. [Enums](./FollowAlong/10.enums.ts)
11. [Interfaces](./FollowAlong/11.interfaces.ts)
12. [TypeScript Project Setup](./FollowAlong/12.typescript-project-setup.ts)
13. [Classes](./FollowAlong/13.classes.ts)
14. [Private, Public, Readonly](./FollowAlong/14.private-public-readonly.ts)
15. [Getters & Setters](./FollowAlong/15.getters-setters.ts)
16. [Protected Modifier](./FollowAlong/16.protected-modifier.ts)
17. [Constructors Deep Dive](./FollowAlong/17.constructors-deep-dive.ts)
18. [Abstract Classes](./FollowAlong/18.abstract-classes.ts)
19. [Generics](./FollowAlong/19.generics.ts)
20. [Generics Arrays & Arrows](./FollowAlong/20.generics-arrays-arrows.ts)
21. [Generic Classes](./FollowAlong/21.generic-classes.ts)
22. [Type Narrowing](./FollowAlong/22.type-narrowing.ts)
23. [In Operator Narrowing](./FollowAlong/23.in-operator-narrowing.ts)
24. [Instanceof & Type Predicates](./FollowAlong/24.instanceof-type-predicates.ts)
25. [Discriminated Unions & Never](./FollowAlong/25.discriminated-unions-never.ts)

### Additional Files
- [Async Functions](./FollowAlong/4a.async-functions.ts)
- [Bookmarks Guide](./FollowAlong/bookmarks-guide.md)

## Credits

This tutorial has been inspired by the excellent **Learn TypeScript – Full Tutorial** from [freeCodeCamp](https://www.youtube.com/@freecodecamp).

🎥 **Original Video**: [Learn TypeScript – Full Tutorial](https://www.youtube.com/watch?v=30LWjhZzg50)

## Recommended Tools for Better Learning

### Visual Studio Code Extensions

**📚 Bookmarks Extension** - Highly recommended for navigating through the tutorial files!

Install the [Bookmarks extension](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) to easily mark and navigate between important code sections.

### Essential Keyboard Shortcuts

- **`Cmd + F`** - Search for specific content in files
- **`Option + Enter`** - Select all occurrences of the search term
- **`Option + K`** - Advanced search and selection operations

These shortcuts will help you quickly navigate through the code examples and find specific TypeScript concepts as you learn.

## Additional Notes

### Coroutines vs Async/Await

*Note: Information about coroutines credited to [this Reddit discussion](https://www.reddit.com/r/unity/comments/zr39d4/coroutines_or_asyncawait/)*

**Coroutines** stay on the main thread, are controlled by the Unity engine and run in sync with the game loop. That means that if you want to do anything with scene objects or the Unity API, you should be using coroutines. Coroutines are also thread safe by default.

**Async tasks** on the other hand are run on separate threads and don't automatically sync up with the game loop. This makes them great for long running tasks such as waiting for a web request or dealing with complex data crunching. But you generally can't use the Unity API or interact with the scene.

---

Happy learning! 🚀
