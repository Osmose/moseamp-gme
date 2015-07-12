# moseamp-gme
moseamp-gme is a package for [Moseamp][] that adds the ability to play the
following formats:

- Spectrum ZX: `.ay`
- Game Boy: `.gbs`
- Sega Genesis: `.gym`
- NEC PC Engine / TurboGrafx-16: `.hes`
- MSX / Other Z80: `.kss`
- NES: `.nsf`
- NES Extended: `.nsfe`
- Atari SAP: `.sap`
- SNES: `.spc`
- Sega: `.vgm`/`.vgz`

It accomplishes this using the wonderful [Game Music Emu][] by blargg and mpyne.
We use [emscripten][] to compile the C library into JavaScript, which is then
used to process the files and get audio data to feed into the Web Audio API.

[Moseamp]: https://github.com/osmose/moseamp
[Game Music Emu]: https://bitbucket.org/mpyne/game-music-emu
[emscripten]: http://emscripten.org


## License & Copyright
- moseamp-gme is licensed under the  MIT license. See `LICENSE` for more info.
- Game_Music_Emu library is licensed under the LGPL v2.1. See
  `emscripten/game_music_emu/license.txt` for details.
- CCAN's JSON library is licensed under the MIT License. See
  `emscripten/json/licenses/BSD-MIT` for details.
