# Issue
Regression when trying to migrate from React 17 to React 18, probably caused by the introduction of state changes batching in React 18. With React 18, resizing is glitchy, inconsistent, slow and causes displacement of the content. The approach to dragging and resizing was inspired by this demo page: https://daybrush.com/moveable/storybook/?path=/story/basic--basic-resizable. I see that they just modify the DOM node's style and not working with state/observables, thus no re-renders are triggered. I guess that the `react-moveable` library relies on syncronous updates to the DOM and the re-render messes it up somehow.

# Reproduction branches
- `main` -     React 18: Broken resizing
- `react-17` - React 17: Fine. No code changes against `main` branch, only React/ReactDOM version is downgraded to 17
- `solution/flush-hook` - React 18: Fix for the `main` branch by using `ReactDOM.flushSync`
- `mobx/react-18` - React 18 + MobX: Broken resizing
- `mobx/react-17` - React 17 + MobX: Fine

# Question
Is the `mobx/react-18` branch fixable, as is? Can I bypass the batching for the `drag`, `resize` and `rotate` actions and cause re-render every time, like in React 17? I need the x/y/width/height observables for a legacy project, that is already implemented with this structure (see `mobx/react-17` branch). It has a lot of inner calculations, nested boxes etc. so it'd be a mess if I have to 
