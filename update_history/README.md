# 2607012(fix)
- Excellent! ✅ The build is now fixed. The build scripts for all the packages (`@biomejs/biome`, `esbuild`, and `sharp`) are now running successfully.

**What was the issue?**
The packages were listed in the `ignoredBuiltDependencies` section in your `pnpm-workspace.yaml`, which blocked their build scripts from running.

**What I fixed:**
- Moved `@biomejs/biome`, `esbuild`, and `sharp` out of `ignoredBuiltDependencies` 
- Added them to the `allowBuilds` section with `true` values to enable their build scripts

The packages are now properly installed with their native dependencies built. You're all set to start developing!

# Displaying content in an Astro front end
- 25.11.27.
  - https://www.sanity.io/docs/astro-quickstart/displaying-content-in-an-astro-front-end

- astro 최신 업데이트 내용
   - https://astro.build/blog/

- astro test
   - 테스팅은 제대로 작동하는 Astro 코드를 작성하고 유지하는 데 도움이 됩니다. Astro는 널리 사용되는 많은 단위 테스트, 컴포넌트 테스트, end-to-end 테스트 도구를 지원합니다. 여기에는 Jest, Mocha, Jasmine, Cypress, Playwright가 포함됩니다. 또한 여러분이 사용하는 UI 프레임워크 컴포넌트를 테스트하기 위해 React Testing Library와 같은 특정 프레임워크에 종속된 테스팅 라이브러리를 설치할 수도 있습니다.
테스팅 프레임워크를 사용해 특정 상황에서의 코드의 동작에 대한 assertions 또는 expectations를 기술하여 현재 코드의 실제 동작과 비교할 수 있습니다.
   - https://docs.astro.build/ko/guides/testing/

# fix
- ⏺ I need to add the spec collection to the content config. Let me update the file:

```ts
⏺ Update(src/content/config.ts)
  ⎿  Added 8 lines
      19      nextSlug: z.string().default(''),
      20    }),
      21  })
      22 +
      23 +const specCollection = defineCollection({
      24 +  schema: z.object({
      25 +    title: z.string().optional(),
      26 +  }),
      27 +})
      28 +
      29  export const collections = {
      30    posts: postsCollection,
      31 +  spec: specCollection,
      32  }
```

- ⏺ Fixed. I added the spec collection definition to `src/content/config.ts`:23-32. The build warning should now be resolved.

