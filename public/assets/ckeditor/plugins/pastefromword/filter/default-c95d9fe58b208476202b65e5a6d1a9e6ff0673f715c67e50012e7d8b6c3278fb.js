/*
 Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
!function(){function e(e){for(var e=e.toUpperCase(),t=l.length,n=0,i=0;t>i;++i)for(var o=l[i],a=o[1].length;e.substr(0,a)==o[1];e=e.substr(a))n+=o[0];return n}function t(e){for(var e=e.toUpperCase(),t=c.length,n=1,i=1;0<e.length;i*=t)n+=c.indexOf(e.charAt(e.length-1))*i,e=e.substr(0,e.length-1);return n}var n=CKEDITOR.htmlParser.fragment.prototype,i=CKEDITOR.htmlParser.element.prototype;n.onlyChild=i.onlyChild=function(){var e=this.children;return 1==e.length&&e[0]||null},i.removeAnyChildWithName=function(e){for(var t,n=this.children,i=[],o=0;o<n.length;o++)t=n[o],t.name&&(t.name==e&&(i.push(t),n.splice(o--,1)),i=i.concat(t.removeAnyChildWithName(e)));return i},i.getAncestor=function(e){for(var t=this.parent;t&&(!t.name||!t.name.match(e));)t=t.parent;return t},n.firstChild=i.firstChild=function(e){for(var t,n=0;n<this.children.length;n++)if(t=this.children[n],e(t)||t.name&&(t=t.firstChild(e)))return t;return null},i.addStyle=function(e,t,n){var i="";if("string"==typeof t)i+=e+":"+t+";";else{if("object"==typeof e)for(var o in e)e.hasOwnProperty(o)&&(i+=o+":"+e[o]+";");else i+=e;n=t}this.attributes||(this.attributes={}),e=this.attributes.style||"",e=(n?[i,e]:[e,i]).join(";"),this.attributes.style=e.replace(/^;+|;(?=;)/g,"")},i.getStyle=function(e){var t=this.attributes.style;return t?(t=CKEDITOR.tools.parseCssText(t,1),t[e]):void 0},CKEDITOR.dtd.parentOf=function(e){var t,n={};for(t in this)-1==t.indexOf("$")&&this[t][e]&&(n[t]=1);return n};var o,a=/^([.\d]*)+(em|ex|px|gd|rem|vw|vh|vm|ch|mm|cm|in|pt|pc|deg|rad|ms|s|hz|khz){1}?/i,r=/^(?:\b0[^\s]*\s*){1,4}$/,s={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},l=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],c="ABCDEFGHIJKLMNOPQRSTUVWXYZ",d=0,u=null,h=CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(e,t){var n=new CKEDITOR.htmlParser.element("cke:listbullet");return n.attributes={"cke:listsymbol":e[0]},n.add(new CKEDITOR.htmlParser.text(t)),n},isListBulletIndicator:function(e){return/mso-list\s*:\s*Ignore/i.test(e.attributes&&e.attributes.style)?!0:void 0},isContainingOnlySpaces:function(e){var t;return(t=e.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(t.value)},resolveList:function(e){var t,n=e.attributes;return(t=e.removeAnyChildWithName("cke:listbullet"))&&t.length&&(t=t[0])?(e.name="cke:li",n.style&&(n.style=h.filters.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(e){e=e.split(" "),e=CKEDITOR.tools.convertToPx(e[3]||e[1]||e[0]),!d&&null!==u&&e>u&&(d=e-u),u=e,n["cke:indent"]=d&&Math.ceil(e/d)+1||1}],[/^mso-list$/,null,function(e){var e=e.split(" "),t=Number(e[0].match(/\d+/)),e=Number(e[1].match(/\d+/));1==e&&(t!==o&&(n["cke:reset"]=1),o=t),n["cke:indent"]=e}]])(n.style,e)||""),n["cke:indent"]||(u=0,n["cke:indent"]=1),CKEDITOR.tools.extend(n,t.attributes),!0):(o=u=d=null,!1)},getStyleComponents:function(){var e=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);return CKEDITOR.document.getBody().append(e),function(t,n,i){e.setStyle(t,n);for(var t={},n=i.length,o=0;n>o;o++)t[i[o]]=e.getStyle(i[o]);return t}}(),listDtdParents:CKEDITOR.dtd.parentOf("ol")},filters:{flattenList:function(e,t){var n,t="number"==typeof t?t:1,i=e.attributes;switch(i.type){case"a":n="lower-alpha";break;case"1":n="decimal"}for(var r,s=e.children,l=0;l<s.length;l++)if(r=s[l],r.name in CKEDITOR.dtd.$listItem){var c=r.attributes,d=r.children,m=d[d.length-1];m.name in CKEDITOR.dtd.$list&&(e.add(m,l+1),--d.length||s.splice(l--,1)),r.name="cke:li",i.start&&!l&&(c.value=i.start),h.filters.stylesFilter([["tab-stops",null,function(e){(e=e.split(" ")[1].match(a))&&(u=CKEDITOR.tools.convertToPx(e[0]))}],1==t?["mso-list",null,function(e){e=e.split(" "),e=Number(e[0].match(/\d+/)),e!==o&&(c["cke:reset"]=1),o=e}]:null])(c.style),c["cke:indent"]=t,c["cke:listtype"]=e.name,c["cke:list-style-type"]=n}else if(r.name in CKEDITOR.dtd.$list){for(arguments.callee.apply(this,[r,t+1]),s=s.slice(0,l).concat(r.children).concat(s.slice(l+1)),e.children=[],r=0,d=s.length;d>r;r++)e.add(s[r]);s=e.children}delete e.name,i["cke:list"]=1},assembleList:function(n){for(var i,a,r,l,c,h,m,f,g,p,E,T,C=n.children,n=[],I=0;I<C.length;I++)if(i=C[I],"cke:li"==i.name)if(i.name="li",a=i.attributes,g=(g=a["cke:listsymbol"])&&g.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),p=E=T=null,a["cke:ignored"])C.splice(I--,1);else{if(a["cke:reset"]&&(h=l=c=null),r=Number(a["cke:indent"]),r!=l&&(f=m=null),g){if(f&&s[f][m].test(g[1]))p=f,E=m;else for(var O in s)for(var b in s[O])if(s[O][b].test(g[1])){if("ol"!=O||!/alpha|roman/.test(b)){p=O,E=b;break}m=/roman/.test(b)?e(g[1]):t(g[1]),(!T||T>m)&&(T=m,p=O,E=b)}!p&&(p=g[2]?"ol":"ul")}else p=a["cke:listtype"]||"ol",E=a["cke:list-style-type"];if(f=p,m=E||("ol"==p?"decimal":"disc"),E&&E!=("ol"==p?"decimal":"disc")&&i.addStyle("list-style-type",E),"ol"==p&&g){switch(E){case"decimal":T=Number(g[1]);break;case"lower-roman":case"upper-roman":T=e(g[1]);break;case"lower-alpha":case"upper-alpha":T=t(g[1])}i.attributes.value=T}if(h){if(r>l)n.push(h=new CKEDITOR.htmlParser.element(p)),h.add(i),c.add(h);else{if(l>r){l-=r;for(var v;l--&&(v=h.parent);)h=v.parent}h.add(i)}C.splice(I--,1)}else n.push(h=new CKEDITOR.htmlParser.element(p)),h.add(i),C[I]=h;c=i,l=r}else h&&(h=l=c=null);for(I=0;I<n.length;I++)if(h=n[I],O=h.children,m=m=void 0,b=h.children.length,v=m=void 0,C=/list-style-type:(.*?)(?:;|$)/,l=CKEDITOR.plugins.pastefromword.filters.stylesFilter,m=h.attributes,!C.exec(m.style)){for(c=0;b>c;c++)if(m=O[c],m.attributes.value&&Number(m.attributes.value)==c+1&&delete m.attributes.value,m=C.exec(m.attributes.style)){if(m[1]!=v&&v){v=null;break}v=m[1]}if(v){for(c=0;b>c;c++)m=O[c].attributes,m.style&&(m.style=l([["list-style-type"]])(m.style)||"");h.addStyle("list-style-type",v)}}o=u=d=null},falsyFilter:function(){return!1},stylesFilter:function(e,t){return function(n,i){var o=[];(n||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(n,a,r){a=a.toLowerCase(),"font-family"==a&&(r=r.replace(/["']/g,""));for(var s,l,c,d=0;d<e.length;d++)if(e[d]&&(n=e[d][0],s=e[d][1],l=e[d][2],c=e[d][3],a.match(n)&&(!s||r.match(s))))return a=c||a,t&&(l=l||r),"function"==typeof l&&(l=l(r,i,a)),l&&l.push&&(a=l[0],l=l[1]),void("string"==typeof l&&o.push([a,l]));!t&&o.push([a,r])});for(var a=0;a<o.length;a++)o[a]=o[a].join(":");return o.length?o.join(";")+";":!1}},elementMigrateFilter:function(e,t){return e?function(n){var i=t?new CKEDITOR.style(e,t)._.definition:e;n.name=i.element,CKEDITOR.tools.extend(n.attributes,CKEDITOR.tools.clone(i.attributes)),n.addStyle(CKEDITOR.style.getStyleText(i))}:function(){}},styleMigrateFilter:function(e,t){var n=this.elementMigrateFilter;return e?function(i,o){var a=new CKEDITOR.htmlParser.element(null),r={};r[t]=i,n(e,r)(a),a.children=o.children,o.children=[a],a.filter=function(){},a.parent=o}:function(){}},bogusAttrFilter:function(e,t){return-1==t.name.indexOf("cke:")?!1:void 0},applyStyleFilter:null},getRules:function(e,t){var n=CKEDITOR.dtd,i=CKEDITOR.tools.extend({},n.$block,n.$listItem,n.$tableContent),o=e.config,a=this.filters,s=a.falsyFilter,l=a.stylesFilter,c=a.elementMigrateFilter,d=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),u=this.utils.createListBulletMarker,h=a.flattenList,m=a.assembleList,f=this.utils.isListBulletIndicator,g=this.utils.isContainingOnlySpaces,p=this.utils.resolveList,E=function(e){return e=CKEDITOR.tools.convertToPx(e),isNaN(e)?e:e+"px"},T=this.utils.getStyleComponents,C=this.utils.listDtdParents,I=!1!==o.pasteFromWordRemoveFontStyles,O=!1!==o.pasteFromWordRemoveStyles;return{elementNames:[[/meta|link|script/,""]],root:function(e){e.filterChildren(t),m(e)},elements:{"^":function(e){var t;CKEDITOR.env.gecko&&(t=a.applyStyleFilter)&&t(e)},$:function(e){var a=e.name||"",r=e.attributes;if(a in i&&r.style&&(r.style=l([[/^(:?width|height)$/,null,E]])(r.style)||""),a.match(/h\d/)){if(e.filterChildren(t),p(e))return;c(o["format_"+a])(e)}else if(a in n.$inline)e.filterChildren(t),g(e)&&delete e.name;else if(-1!=a.indexOf(":")&&-1==a.indexOf("cke")){if(e.filterChildren(t),"v:imagedata"==a)return(a=e.attributes["o:href"])&&(e.attributes.src=a),void(e.name="img");delete e.name}a in C&&(e.filterChildren(t),m(e))},style:function(e){if(CKEDITOR.env.gecko){var e=(e=e.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&e[1],t={};e&&(e.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(e,n,i){for(var n=n.split(","),e=n.length,o=0;e>o;o++)CKEDITOR.tools.trim(n[o]).replace(/^(\w+)(\.[\w-]+)?$/g,function(e,n,o){n=n||"*",o=o.substring(1,o.length),o.match(/MsoNormal/)||(t[n]||(t[n]={}),o?t[n][o]=i:t[n]=i)})}),a.applyStyleFilter=function(e){var n=t["*"]?"*":e.name,i=e.attributes&&e.attributes["class"];n in t&&(n=t[n],"object"==typeof n&&(n=n[i]),n&&e.addStyle(n,!0))})}return!1},p:function(e){if(/MsoListParagraph/i.exec(e.attributes["class"])||e.getStyle("mso-list")){var n=e.firstChild(function(e){return e.type==CKEDITOR.NODE_TEXT&&!g(e.parent)});(n=n&&n.parent)&&n.addStyle("mso-list","Ignore")}e.filterChildren(t),p(e)||(o.enterMode==CKEDITOR.ENTER_BR?(delete e.name,e.add(new CKEDITOR.htmlParser.element("br"))):c(o["format_"+(o.enterMode==CKEDITOR.ENTER_P?"p":"div")])(e))},div:function(e){var t=e.onlyChild();if(t&&"table"==t.name){var n=e.attributes;t.attributes=CKEDITOR.tools.extend(t.attributes,n),n.style&&t.addStyle(n.style),t=new CKEDITOR.htmlParser.element("div"),t.addStyle("clear","both"),e.add(t),delete e.name}},td:function(e){e.getAncestor("thead")&&(e.name="th")},ol:h,ul:h,dl:h,font:function(e){if(f(e.parent))delete e.name;else{e.filterChildren(t);var n=e.attributes,i=n.style,o=e.parent;"font"==o.name?(CKEDITOR.tools.extend(o.attributes,e.attributes),i&&o.addStyle(i),delete e.name):(i=(i||"").split(";"),n.color&&("#000000"!=n.color&&i.push("color:"+n.color),delete n.color),n.face&&(i.push("font-family:"+n.face),delete n.face),n.size&&(i.push("font-size:"+(3<n.size?"large":3>n.size?"small":"medium")),delete n.size),e.name="span",e.addStyle(i.join(";")))}},span:function(e){if(f(e.parent))return!1;if(e.filterChildren(t),g(e))return delete e.name,null;if(f(e)){var n=e.firstChild(function(e){return e.value||"img"==e.name}),i=(n=n&&(n.value||"l."))&&n.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(i)return n=u(i,n),(e=e.getAncestor("span"))&&/ mso-hide:\s*all|display:\s*none /.test(e.attributes.style)&&(n.attributes["cke:ignored"]=1),n}return(i=(n=e.attributes)&&n.style)&&(n.style=l([["line-height"],[/^font-family$/,null,I?null:d(o.font_style,"family")],[/^font-size$/,null,I?null:d(o.fontSize_style,"size")],[/^color$/,null,I?null:d(o.colorButton_foreStyle,"color")],[/^background-color$/,null,I?null:d(o.colorButton_backStyle,"color")]])(i,e)||""),n.style||delete n.style,CKEDITOR.tools.isEmpty(n)&&delete e.name,null},b:c(o.coreStyles_bold),i:c(o.coreStyles_italic),u:c(o.coreStyles_underline),s:c(o.coreStyles_strike),sup:c(o.coreStyles_superscript),sub:c(o.coreStyles_subscript),a:function(e){e=e.attributes,e.href&&e.href.match(/^file:\/\/\/[\S]+#/i)&&(e.href=e.href.replace(/^file:\/\/\/[^#]+/i,""))},"cke:listbullet":function(e){e.getAncestor(/h\d/)&&!o.pasteFromWordNumberedHeadingToList&&delete e.name}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:l(O?[[/^list-style-type$/,null],[/^margin$|^margin-(?!bottom|top)/,null,function(e,t,n){if(t.name in{p:1,div:1}){if(t="ltr"==o.contentsLangDirection?"margin-left":"margin-right","margin"==n)e=T(n,e,[t])[t];else if(n!=t)return null;if(e&&!r.test(e))return[t,e]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(e,t){return"img"==t.name?e:void 0}],[/^width|height$/,null,function(e,t){return t.name in{table:1,td:1,th:1,img:1}?e:void 0}]]:[[/^mso-/],[/-color$/,null,function(e){return"transparent"==e?!1:CKEDITOR.env.gecko?e.replace(/-moz-use-text-color/g,"transparent"):void 0}],[/^margin$/,r],["text-indent","0cm"],["page-break-before"],["tab-stops"],["display","none"],I?[/font-?/]:null],O),width:function(e,t){return t.name in n.$tableContent?!1:void 0},border:function(e,t){return t.name in n.$tableContent?!1:void 0},"class":s,bgcolor:s,valign:O?s:function(e,t){return t.addStyle("vertical-align",e),!1}},comment:CKEDITOR.env.ie?s:function(e,t){var n=e.match(/<img.*?>/),i=e.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return i?(i=(n=i[1]||n&&"l.")&&n.match(/>(?:[(]?)([^\s]+?)([.)]?)</),u(i,n)):CKEDITOR.env.gecko&&n?(n=CKEDITOR.htmlParser.fragment.fromHtml(n[0]).children[0],(i=(i=(i=t.previous)&&i.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/))&&i[1])&&(n.attributes.src=i),n):!1}}}},m=function(){this.dataFilter=new CKEDITOR.htmlParser.filter};m.prototype={toHtml:function(e){var e=CKEDITOR.htmlParser.fragment.fromHtml(e),t=new CKEDITOR.htmlParser.basicWriter;return e.writeHtml(t,this.dataFilter),t.getHtml(!0)}},CKEDITOR.cleanWord=function(e,t){CKEDITOR.env.gecko&&(e=e.replace(/(<\!--\[if[^<]*?\])--\>([\S\s]*?)<\!--(\[endif\]--\>)/gi,"$1$2$3")),CKEDITOR.env.webkit&&(e=e.replace(/(class="MsoListParagraph[^>]+><\!--\[if !supportLists\]--\>)([^<]+<span[^<]+<\/span>)(<\!--\[endif\]--\>)/gi,"$1<span>$2</span>$3"));var n=new m,i=n.dataFilter;i.addRules(CKEDITOR.plugins.pastefromword.getRules(t,i)),t.fire("beforeCleanWord",{filter:i});try{e=n.toHtml(e)}catch(o){alert(t.lang.pastefromword.error)}return e=e.replace(/cke:.*?".*?"/g,""),e=e.replace(/style=""/g,""),e=e.replace(/<span>/g,"")}}();