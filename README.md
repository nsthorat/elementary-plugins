# SRVB VST: Svelte + Typescript + Bun

SRVB is a small digital reverb audio plugin (VST3/AU) for MacOS and Windows.

This is the Svelte + Typescript + Bun version of the plugin, which is forked from
https://github.com/elemaudio/srvb.

This project demonstrates one way to write an audio plugin using JavaScript and familiar web
technologies, and while there are several variants on this approach, it is meant to be both a
compelling example and a good starting point for audio plugins made with a similar architecture.

<img width="1509" alt="image" src="https://github.com/nsthorat/elementary-plugins/assets/1100749/222a6631-ab6d-456b-8d89-bbc4fca10781">

## Overview

See: https://github.com/elemaudio/srvb

## Elementary

If you're new to Elementary Audio, [Elementary](https://elementary.audio) is a JavaScript/C++
library for building audio applications.

See https://github.com/elemaudio/srvb.

## Getting Started

### Code structure

- `dsp/` contains all the elementary audio specific API calls and controls the underlying DSP logic.
- `src/` contains all the Web UI code which renders the knobs and calls off to the injected window
  logic from `dsp/`
- `native/` is where all the native audio plugins will be generated.

Everything

### Dependencies

Before running the following steps, please make sure you have the following dependencies installed
and available at the command line:

- [CMake](https://cmake.org/)
- [Node.js](https://nodejs.org/en)
- [Bun.js](https://bun.sh/)
- Bash: the build steps below expect to run scripts in a Bash environment. For Windows machines,
  consider running the following steps in a Git Bash environment, or with WSL.

Next, we fetch the SRVB project and its dependencies,

```bash
git submodule update --init --recursive

bun install
```

### Develop

```bash
bun run dev -- --open
```

In develop mode, the native plugin is compiled to fetch its JavaScript assets from localhost, where
subsequently we run the Vite dev server to serve those assets. This arrangement enables Vite's hot
reloading behavior for developing the plugin while it's running inside a host.

### Build & Release

```bash
bun run build
```

In release builds, the JavaScript bundles are packaged into the plugin app bundle so that the
resulting bundle is relocatable, thereby enabling distribution to end users.

The files will be built and written to: `native/build/scripted/SRVB_artefacts/`

### Loading the plugin from Ableton

To load the plugin in Ableton once you have built and released it:

- Open Ableton Live preferences and go to "Plugin-ins"
- Add custom VST-3 folder, and choose the `native/build/scripted/SRVB_artefacts/` which is relative
  to this directory.

This will then give you a "SRVB" plugin in ableton which is now useable.

### Troubleshooting

Please see the original repository for troubleshooting details: https://github.com/elemaudio/srvb

## License

[MIT](./LICENSE.md)

This project also uses [JUCE](https://juce.com/), which is licensed GPLv3. Please consult JUCE's
license agreement if you intend to distribute your own plugin based on this template.
