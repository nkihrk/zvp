# <p align="middle">ZVP - Zoomable Video Player ( Angular 10+ )</p>

<p align="middle">
ZVP is a zoomable video player with YouTube-like UI for your Angular applications.
<br>
<a href="https://nkihrk.github.io/zvp/" target="_blank"><b>DEMO</b></a>
</p>

<br>

![ZVP_preview](./src/assets/screenshot_17-58-31.png)

<br>

# Installation

```
npm install zvp
```

And import into your NgModule.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZvpModule } from 'zvp';
​
@NgModule({
  imports: [ZvpModule],
})
```

<br>

# Usage

Add this code to a view-template.
<br>
( ZVP currently allows only one player per a view-template. Will figure it out sooner or later. )

```
<div style="width: 1000px; height: 100%">
  <zvp-component
    [options]="{
      sources: [
        { src: '$url', type: '$videoType' }
      ]
    }"
  ></zvp-component>
</div>
```

ZVP is the wrapper player of <a href="https://github.com/videojs" target="_blank">Video.js</a>. To see more clearly about `options` above, go visit <a href="https://docs.videojs.com/tutorial-options.html" target="_blank">this page</a>.

<br>

# License

MIT Licence

Copyright (c) 2020 NkiHrk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
