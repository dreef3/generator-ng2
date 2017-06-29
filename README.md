# generator-ng2

Simple Yeoman generator that helps with common boilerplate tasks when working on Angular 2 applications.

**NB:** generator is heavily based on naming conventions.

Supported features:

 * `add-missing-test-files` - invoke from your project root. Will scan for any directories that contain components and
 add missing `.unit.ts` files with boilerplate test setup.
 
 * `ng2:component` - sub-generator that generates a new component including:
     * empty template
     * component
     * module
     * unit test
     
    Usage: `yo ng2:component heroComponent` in the parent directory.