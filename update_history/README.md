# 2607012(fix)
- Excellent! ✅ The build is now fixed. The build scripts for all the packages (`@biomejs/biome`, `esbuild`, and `sharp`) are now running successfully.

**What was the issue?**
The packages were listed in the `ignoredBuiltDependencies` section in your `pnpm-workspace.yaml`, which blocked their build scripts from running.

**What I fixed:**
- Moved `@biomejs/biome`, `esbuild`, and `sharp` out of `ignoredBuiltDependencies` 
- Added them to the `allowBuilds` section with `true` values to enable their build scripts

The packages are now properly installed with their native dependencies built. You're all set to start developing!
