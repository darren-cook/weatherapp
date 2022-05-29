(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){return t(1,arguments),e instanceof Date||"object"==typeof e&&"[object Date]"===Object.prototype.toString.call(e)}function n(e){t(1,arguments);var n=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===n?new Date(e.getTime()):"number"==typeof e||"[object Number]"===n?new Date(e):("string"!=typeof e&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function r(r){if(t(1,arguments),!e(r)&&"number"!=typeof r)return!1;var a=n(r);return!isNaN(Number(a))}var a={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function i(t){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.width?String(e.width):t.defaultWidth,r=t.formats[n]||t.formats[t.defaultWidth];return r}}var o,u={date:i({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:i({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:i({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},c={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function s(t){return function(e,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&t.formattingValues){var i=t.defaultFormattingWidth||t.defaultWidth,o=a.width?String(a.width):i;r=t.formattingValues[o]||t.formattingValues[i]}else{var u=t.defaultWidth,c=a.width?String(a.width):t.defaultWidth;r=t.values[c]||t.values[u]}return r[t.argumentCallback?t.argumentCallback(e):e]}}function d(t){return function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.width,a=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],i=e.match(a);if(!i)return null;var o,u=i[0],c=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(c)?h(c,(function(t){return t.test(u)})):l(c,(function(t){return t.test(u)}));o=t.valueCallback?t.valueCallback(s):s,o=n.valueCallback?n.valueCallback(o):o;var d=e.slice(u.length);return{value:o,rest:d}}}function l(t,e){for(var n in t)if(t.hasOwnProperty(n)&&e(t[n]))return n}function h(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return n}const m={code:"en-US",formatDistance:function(t,e,n){var r,i=a[t];return r="string"==typeof i?i:1===e?i.one:i.other.replace("{{count}}",e.toString()),null!=n&&n.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r},formatLong:u,formatRelative:function(t,e,n,r){return c[t]},localize:{ordinalNumber:function(t,e){var n=Number(t),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:s({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:s({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:s({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:s({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:s({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(t){return parseInt(t,10)}},function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.match(o.matchPattern);if(!n)return null;var r=n[0],a=t.match(o.parsePattern);if(!a)return null;var i=o.valueCallback?o.valueCallback(a[0]):a[0];i=e.valueCallback?e.valueCallback(i):i;var u=t.slice(r.length);return{value:i,rest:u}}),era:d({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:d({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:d({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:d({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:d({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function f(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function g(e,r){t(2,arguments);var a=n(e).getTime(),i=f(r);return new Date(a+i)}function w(e,n){t(2,arguments);var r=f(n);return g(e,-r)}var y=864e5;function p(e){t(1,arguments);var r=1,a=n(e),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function v(e){t(1,arguments);var r=n(e),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=p(i),u=new Date(0);u.setUTCFullYear(a,0,4),u.setUTCHours(0,0,0,0);var c=p(u);return r.getTime()>=o.getTime()?a+1:r.getTime()>=c.getTime()?a:a-1}function b(e){t(1,arguments);var n=v(e),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=p(r);return a}var C=6048e5;function T(e,r){t(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,u=null==o?0:f(o),c=null==a.weekStartsOn?u:f(a.weekStartsOn);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var s=n(e),d=s.getUTCDay(),l=(d<c?7:0)+d-c;return s.setUTCDate(s.getUTCDate()-l),s.setUTCHours(0,0,0,0),s}function M(e,r){t(1,arguments);var a=n(e),i=a.getUTCFullYear(),o=r||{},u=o.locale,c=u&&u.options&&u.options.firstWeekContainsDate,s=null==c?1:f(c),d=null==o.firstWeekContainsDate?s:f(o.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var l=new Date(0);l.setUTCFullYear(i+1,0,d),l.setUTCHours(0,0,0,0);var h=T(l,r),m=new Date(0);m.setUTCFullYear(i,0,d),m.setUTCHours(0,0,0,0);var g=T(m,r);return a.getTime()>=h.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function x(e,n){t(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:f(i),u=null==r.firstWeekContainsDate?o:f(r.firstWeekContainsDate),c=M(e,n),s=new Date(0);s.setUTCFullYear(c,0,u),s.setUTCHours(0,0,0,0);var d=T(s,n);return d}var D=6048e5;function S(t,e){for(var n=t<0?"-":"",r=Math.abs(t).toString();r.length<e;)r="0"+r;return n+r}const k=function(t,e){var n=t.getUTCFullYear(),r=n>0?n:1-n;return S("yy"===e?r%100:r,e.length)},E=function(t,e){var n=t.getUTCMonth();return"M"===e?String(n+1):S(n+1,2)},P=function(t,e){return S(t.getUTCDate(),e.length)},U=function(t,e){return S(t.getUTCHours()%12||12,e.length)},W=function(t,e){return S(t.getUTCHours(),e.length)},Y=function(t,e){return S(t.getUTCMinutes(),e.length)},q=function(t,e){return S(t.getUTCSeconds(),e.length)},N=function(t,e){var n=e.length,r=t.getUTCMilliseconds();return S(Math.floor(r*Math.pow(10,n-3)),e.length)};function O(t,e){var n=t>0?"-":"+",r=Math.abs(t),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=e||"";return n+String(a)+o+S(i,2)}function A(t,e){return t%60==0?(t>0?"-":"+")+S(Math.abs(t)/60,2):$(t,e)}function $(t,e){var n=e||"",r=t>0?"-":"+",a=Math.abs(t);return r+S(Math.floor(a/60),2)+n+S(a%60,2)}const j={G:function(t,e,n){var r=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});default:return n.era(r,{width:"wide"})}},y:function(t,e,n){if("yo"===e){var r=t.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return k(t,e)},Y:function(t,e,n,r){var a=M(t,r),i=a>0?a:1-a;return"YY"===e?S(i%100,2):"Yo"===e?n.ordinalNumber(i,{unit:"year"}):S(i,e.length)},R:function(t,e){return S(v(t),e.length)},u:function(t,e){return S(t.getUTCFullYear(),e.length)},Q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(r);case"QQ":return S(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(t,e,n){var r=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(r);case"qq":return S(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(t,e,n){var r=t.getUTCMonth();switch(e){case"M":case"MM":return E(t,e);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(t,e,n){var r=t.getUTCMonth();switch(e){case"L":return String(r+1);case"LL":return S(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,r,a,i){var o=function(e,r){t(1,arguments);var a=n(e),i=T(a,r).getTime()-x(a,r).getTime();return Math.round(i/D)+1}(e,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):S(o,r.length)},I:function(e,r,a){var i=function(e){t(1,arguments);var r=n(e),a=p(r).getTime()-b(r).getTime();return Math.round(a/C)+1}(e);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):S(i,r.length)},d:function(t,e,n){return"do"===e?n.ordinalNumber(t.getUTCDate(),{unit:"date"}):P(t,e)},D:function(e,r,a){var i=function(e){t(1,arguments);var r=n(e),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/y)+1}(e);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):S(i,r.length)},E:function(t,e,n){var r=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"e":return String(i);case"ee":return S(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(t,e,n,r){var a=t.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(e){case"c":return String(i);case"cc":return S(i,e.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(t,e,n){var r=t.getUTCDay(),a=0===r?7:r;switch(e){case"i":return String(a);case"ii":return S(a,e.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(t,e,n){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(t,e,n){var r,a=t.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",e){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(t,e,n){var r,a=t.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",e){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(t,e,n){if("ho"===e){var r=t.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return U(t,e)},H:function(t,e,n){return"Ho"===e?n.ordinalNumber(t.getUTCHours(),{unit:"hour"}):W(t,e)},K:function(t,e,n){var r=t.getUTCHours()%12;return"Ko"===e?n.ordinalNumber(r,{unit:"hour"}):S(r,e.length)},k:function(t,e,n){var r=t.getUTCHours();return 0===r&&(r=24),"ko"===e?n.ordinalNumber(r,{unit:"hour"}):S(r,e.length)},m:function(t,e,n){return"mo"===e?n.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):Y(t,e)},s:function(t,e,n){return"so"===e?n.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):q(t,e)},S:function(t,e){return N(t,e)},X:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();if(0===a)return"Z";switch(e){case"X":return A(a);case"XXXX":case"XX":return $(a);default:return $(a,":")}},x:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"x":return A(a);case"xxxx":case"xx":return $(a);default:return $(a,":")}},O:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+O(a,":");default:return"GMT"+$(a,":")}},z:function(t,e,n,r){var a=(r._originalDate||t).getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+O(a,":");default:return"GMT"+$(a,":")}},t:function(t,e,n,r){var a=r._originalDate||t;return S(Math.floor(a.getTime()/1e3),e.length)},T:function(t,e,n,r){return S((r._originalDate||t).getTime(),e.length)}};function B(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});default:return e.date({width:"full"})}}function H(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});default:return e.time({width:"full"})}}var L={p:H,P:function(t,e){var n,r=t.match(/(P+)(p+)?/)||[],a=r[1],i=r[2];if(!i)return B(t,e);switch(a){case"P":n=e.dateTime({width:"short"});break;case"PP":n=e.dateTime({width:"medium"});break;case"PPP":n=e.dateTime({width:"long"});break;default:n=e.dateTime({width:"full"})}return n.replace("{{date}}",B(a,e)).replace("{{time}}",H(i,e))}};const I=L;function F(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}var z=["D","DD"],Q=["YY","YYYY"];function G(t){return-1!==z.indexOf(t)}function R(t){return-1!==Q.indexOf(t)}function X(t,e,n){if("YYYY"===t)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===t)throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===t)throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===t)throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,_=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,V=/^'([^]*?)'?$/,K=/''/g,Z=/[a-zA-Z]/;function tt(e,a,i){t(2,arguments);var o=String(a),u=i||{},c=u.locale||m,s=c.options&&c.options.firstWeekContainsDate,d=null==s?1:f(s),l=null==u.firstWeekContainsDate?d:f(u.firstWeekContainsDate);if(!(l>=1&&l<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=c.options&&c.options.weekStartsOn,g=null==h?0:f(h),y=null==u.weekStartsOn?g:f(u.weekStartsOn);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!c.localize)throw new RangeError("locale must contain localize property");if(!c.formatLong)throw new RangeError("locale must contain formatLong property");var p=n(e);if(!r(p))throw new RangeError("Invalid time value");var v=F(p),b=w(p,v),C={firstWeekContainsDate:l,weekStartsOn:y,locale:c,_originalDate:p},T=o.match(_).map((function(t){var e=t[0];return"p"===e||"P"===e?(0,I[e])(t,c.formatLong,C):t})).join("").match(J).map((function(t){if("''"===t)return"'";var n=t[0];if("'"===n)return et(t);var r=j[n];if(r)return!u.useAdditionalWeekYearTokens&&R(t)&&X(t,a,e),!u.useAdditionalDayOfYearTokens&&G(t)&&X(t,a,e),r(b,t,c.localize,C);if(n.match(Z))throw new RangeError("Format string contains an unescaped latin alphabet character `"+n+"`");return t})).join("");return T}function et(t){return t.match(V)[1].replace(K,"'")}const nt="f2e559c52b6d79a001f90f630edcc2b9";function rt(){document.querySelectorAll(".skeletonable").forEach((t=>{t.classList.toggle("skeleton")}))}async function at(t){document.getElementById("card-now").style.backgroundColor="red";const e=t.coordinates,n=await async function(t){const e=`https://api.openweathermap.org/data/2.5/weather?lat=${t[0]}&lon=${t[1]}&appid=${nt}&units=imperial`,n=await fetch(e,{mode:"cors"});return await n.json()}(e),r=await async function(t){const e=`https://api.openweathermap.org/data/2.5/forecast?lat=${t[0]}&lon=${t[1]}&appid=${nt}&units=imperial`,n=await fetch(e,{mode:"cors"});return await n.json()}(e),a=it(n),i=function(t){const e=t.list,n=[];for(let t=0;t<6;t++)n.push(ot(e[t]));return n}(r),o=function(t){const e=t.list,n=[],r=tt(new Date,"dd"),a=e.findIndex((t=>t.dt_txt.slice(8,10)!==r)),i=[e.slice(a,a+9),e.slice(a+8,a+17),e.slice(a+16,a+25),e.slice(a+24,a+33)];for(let t=0;t<i.length;t++){const e=i[t],r=e[t+1].dt_txt,a=e[4].weather[0].icon,o=e[4].weather[0].main;let u=-9999,c=9999,s=0;for(let t=0;t<e.length;t++){let n=e[t].main.temp,r=e[t].pop;n>u&&(u=n),n<c&&(c=n),r>s&&(s=r)}n.push(ut(r,a,o,u,c,s))}return n}(r);!function(t){const e=document.getElementById("now-title"),n=document.getElementById("now-img"),r=document.getElementById("now-temp"),a=document.getElementById("now-description"),i=document.getElementById("now-humidity"),o=document.getElementById("now-wind");e.textContent=t.city,n.src=t.img,n.alt=`${t.description} icon`,r.textContent=t.temp,a.textContent=t.description,i.textContent=t.nowHumidity,o.textContent=t.wind}(a),function(t){const e=document.querySelectorAll(".hour-time"),n=document.querySelectorAll(".hour-img"),r=document.querySelectorAll(".hour-temp"),a=document.querySelectorAll(".hour-description"),i=document.querySelectorAll(".hour-rain");e.forEach(((e,n)=>{e.textContent=t[n].time})),n.forEach(((e,n)=>{e.src=t[n].img,e.alt=`${t[n].description} icon`})),r.forEach(((e,n)=>{e.textContent=t[n].temp})),a.forEach(((e,n)=>{e.textContent=t[n].description})),i.forEach(((e,n)=>{e.textContent=t[n].rain}))}(i),function(t){const e=document.querySelectorAll(".day-time"),n=document.querySelectorAll(".day-img"),r=document.querySelectorAll(".day-temp"),a=document.querySelectorAll(".day-description"),i=document.querySelectorAll(".day-rain");e.forEach(((e,n)=>{e.textContent=t[n].time})),n.forEach(((e,n)=>{e.src=t[n].img,e.alt=`${t[n].description} icon`})),r.forEach(((e,n)=>{e.textContent=`${t[n].highTemp} ${t[n].lowTemp}`})),a.forEach(((e,n)=>{e.textContent=t[n].description})),i.forEach(((e,n)=>{e.textContent=t[n].rain}))}(o),rt()}const it=t=>({city:t.name,img:`http://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png`,temp:`${Math.round(t.main.temp)}°`,description:t.weather[0].main,humidity:`Humidity: ${t.main.humidity}%`,wind:`Wind: ${t.wind.speed}mph`}),ot=t=>({time:tt(new Date(t.dt_txt),"haaa"),img:`http://openweathermap.org/img/wn/${t.weather[0].icon}@2x.png`,temp:`${Math.round(t.main.temp)}°`,description:t.weather[0].main,rain:`Rain: ${100*t.pop}%`}),ut=(t,e,n,r,a,i)=>({time:tt(new Date(t),"EEEE"),img:`http://openweathermap.org/img/wn/${e}@2x.png`,description:n,highTemp:`H:${Math.round(r)}°`,lowTemp:`L:${Math.round(a)}°`,rain:`Rain: ${100*i}%`});function ct(t,e){t.classList.toggle("hidden"),e.classList.toggle("hidden")}document.getElementById("card-now").style.backgroundColor="black",at(function(){let t=JSON.parse(localStorage.getItem("locationInfo"));if(null!==t)return t;{const t={city:"Los Angeles",coordinates:["34.0522","-118.2436"]};return localStorage.setItem("locationInfo",JSON.stringify(t)),t}}()),document.getElementById("input-search").addEventListener("click",(function(){!async function(){const t=document.getElementById("input"),e=document.getElementById("loader"),n=document.getElementById("input-search");if(""===t.value)t.setCustomValidity("Please enter a location."),t.reportValidity();else{ct(e,n);try{const r=await async function(t){let e="";/^\d{5}$/.test(t)&&(e=",us");const n=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${t}${e}&appid=${nt}`,{mode:"cors"}),r=await n.json(),a=r.coord.lat,i=r.coord.lon;return{city:r.name,coordinates:[a,i]}}(t.value);ct(e,n),rt(),at(r),localStorage.setItem("locationInfo",JSON.stringify(r))}catch(r){t.setCustomValidity("Invalid Location"),t.reportValidity(),ct(e,n)}}}()}))})();