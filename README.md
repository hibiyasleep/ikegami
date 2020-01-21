
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


##
