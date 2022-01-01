
# ikegami

<img src="_readme/title.png?raw=true" width="640" __ />

## Example

 In 8-player duty:

![In 8-player duty](_readme/example-1.png)

 Detailed view (when hover, username manually redacted):

![Detailed view (when hover)](_readme/example-2.png)

## Installation

 Add `http://kagerou.hibiya.moe/ikegami-test` to your ACT Plugin.

 if you're getting problem to position overlay absolutely-center, try
modifying OverlayPlugin config file. Save and relaunch ACT (or reload plugin).

```xml
<!-- ACT\Config\RainbowMage.OverlayPlugin.config.xml -->
...
<LogParseOverlayConfig>
  <Name>ikegami</Name> <!-- ← find this -->
  <IsVisible>true</IsVisible>
  <IsClickThru>false</IsClickThru>
  <Position>
    <X>320</X> <!-- ← -->
    <Y>0</Y>
  </Position>
  <Size>
    <Width>1280</Width> <!-- ← -->
    <Height>400</Height> <!-- ← -->
  </Size>
...
```

### About HTTP
 this domain serves on HTTP, because browsers doesn't allow downgrade to
`ws://` connection. ACTWebSocket provides `ws://` interface, but doesn't
includes local certificate which required to `wss://`.


## [For Developers] Adding new classes
### Update assets/classes.png
Update the assets/classes.psd file using the following instructions and then export to PNG.

Note: Source of original icons, and the exact instructions on how to create them is unknown. This is a "close enough" approximation used for additions to the sprite sheet (GBN, DNC, SGE, RPR).

Icons are from https://xivapi.com/docs/Icons?set=class_job_set_1
Icons are imported and resized to 30 by 30, and then positioned on the grid using this formula to position the top-left of the icon: 32x{zero indexed row or column} + 1

### Update assets/FFXIVAppIcons.woff
Get from here: https://github.com/xivapi/classjob-icons/blob/master/font/FFXIVAppIcons.woff
Or manually update following the instructions in that repo's README.md

### Update styles/enum/_class-icons-raster.scss
`$class-matrix` is a 2D array that matches the sprite sheet in assets/classes.png.

### Update styles/enum/_class-icons-vector.scss
`$class-pua-glyph-map` maps to the font "index" in assets/FFXIVAppIcons.woff. It appears new jobs are just added to the end of the existing job glyphs in the font, but this may change in the future. If so, you will need to inspect the font.

### Update styles/enum/_job-colors.scss
Should be self-explanatory with the inline comments.

### Update components/class-colors.vue
Update the list of jobs near the top.

### Update store/encounter.js
Update the `VALID_PLAYER_JOBS` variable.