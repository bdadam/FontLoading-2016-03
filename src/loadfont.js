window.loadFont = function(sheet, family, weights, className) {
    var raf = window.requestAnimationFrame || function(fn) { return setTimeout(fn, 50); };
    var caf = window.cancelAnimationFrame || clearTimeout;
    var testFamilies = ['sans-serif', 'serif', 'monospace'];
    var testDivs = [];

    try {
        var fontInCache = Date.now() - localStorage['font-loaded-' + family] < 86400000;

        if (fontInCache) {
            updateLocalStorage();
            loadStylesheetSync();
            return;
        }

        loadStylesheetAsync(
            function() {
                weights.forEach(function(weight) {
                    testFamilies.forEach(function(testFamily) {

                        var div = document.createElement('div');
                        div.innerHTML = '<object style="display: block; position: absolute; top: 0; right: 0; bottom: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;" type="text/html"></object>MXWmxwi0123';
                        // div.style.cssText = 'z-index:-1;position:absolute;visibility:hidden;display:inline-block;line-height:1;font-size:16px;font-family:' + family + ',' + testFamily + ';font-weight:' + weight;
                        div.style.cssText = 'z-index:-1;position:absolute;visibility:hidden;display:inline-block;line-height:1;font-size:16px;font-family:' + testFamily + ';font-weight:' + weight;

                        document.body.appendChild(div);
                        testDivs.push(div);

                        var obj = div.querySelector('object');
                        obj.data = 'about:blank';
                        obj.onload = function() {
                            // this.contentDocument.defaultView.addEventListener('resize', onObjectSizeChange);

                            console.log(this.contentDocument);

                            this.contentDocument.defaultView.addEventListener('resize', function() {
                                console.log('SIZE');
                                onObjectSizeChange();
                            });
                            onObjectSizeChange();
                        };

                        // obj.data = 'about:blank';

                        div.style.fontFamily = family + ',' + testFamily;
                    });
                });
            }
        );




        // localStorage['font-loaded-' + family] = Date.now();
        // updateLocalStorage();

    } catch(ex) {
        loadStylesheetSync();

        console.error(ex);

    }

    function loadStylesheetSync() {
        // we can safely do this, because we MUST be in the <head> of the document
        document.write('<link rel="stylesheet" href="' + sheet + '">');
        document.documentElement.className += ' ' + className;
    }

    function updateLocalStorage() {
        localStorage['font-loaded-' + family] = Date.now();
    }

    function loadStylesheetAsync(fn) {
        var link = document.createElement('link');
        link.media = 'only x';
        link.rel = 'stylesheet';
        link.href = sheet;
        link.onload = function() {
            this.media = 'all';
            this.onload = null;
            fn();
        };

        var script = document.getElementsByTagName('script')[0];
        script.parentNode.insertBefore(link, script);
    }


    var currentFrame;

    function onObjectSizeChange() {
        console.log('onObjectSizeChange');

        if (currentFrame) {
            caf(currentFrame);
            currentFrame = null;
        }

        currentFrame = raf(function() {
            var allLoaded = true;
            for (var i = 0; i < testDivs.length; i+=testFamilies.length) {
                allLoaded = allLoaded &&
                            testDivs[i].clientWidth === testDivs[i+1].clientWidth &&
                            testDivs[i+1].clientWidth === testDivs[i+2].clientWidth &&
                            testDivs[i].clientHeight === testDivs[i+1].clientHeight &&
                            testDivs[i+1].clientHeight === testDivs[i+2].clientHeight;
            }

            var widths = testDivs.map(function(d) { return d.clientWidth; });
            // var he = testDivs.map(function(d) { return d.clientWidth; });
            console.log(widths);

            if (allLoaded) {
                console.log('All Loaded');
                document.documentElement.className += ' ' + className;

                onSizeChange = function(){};
            }
        });

    }
};
