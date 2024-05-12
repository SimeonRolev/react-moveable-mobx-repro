# Issue
Regression when trying to migrate from React 17 to React 18.

# Reproduce
There are two branches, both have the same code, only the React version is changed:
- `react-17` - Uses React 17. Everything works as expected. The approach to dragging and resizing was inspired by this demo page: https://daybrush.com/moveable/storybook/?path=/story/basic--basic-resizable
- `main` - Uses React 18. Resizing is glitchy, inconsistent, slow and causes displacement of the content.
