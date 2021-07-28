!function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function t(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&i(e,t)}function i(e,t){return(i=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function o(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=l(e);if(t){var i=l(this).constructor;n=Reflect.construct(a,arguments,i)}else n=a.apply(this,arguments);return r(this,n)}}function r(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{HutK:function(e,i,r){"use strict";r.r(i),r.d(i,"ShowcaseFormsModule",function(){return ot});var l=r("ofXK"),c=r("tyNb"),s=r("TPIS"),u=r("fXoL"),p=r("ZBJK"),d=r("pLZG"),f=r("IzEk"),m=r("lR5k");function b(e,t){if(1&e&&(u.Vb(0,"div",1),u.Vb(1,"div",2),u.Qb(2,"markdown",3),u.Ub(),u.Ub()),2&e){var n=u.hc();u.Db(2),u.nc("src",n.filePath)("start",0)}}var h,g=((h=function(e){a(i,e);var t=o(i);function i(e){var a;return n(this,i),(a=t.call(this)).activatedRoute=e,a.addSubscription(a.activatedRoute.data.pipe(Object(d.a)(function(e){return!!(null==e?void 0:e.filePath)}),Object(f.a)(1)),function(e){a.filePath=e.filePath}),a}return i}(s.a)).\u0275fac=function(e){return new(e||h)(u.Pb(c.a))},h.\u0275cmp=u.Jb({type:h,selectors:[["lab900-markdown-page"]],inputs:{filePath:"filePath"},features:[u.Ab],decls:1,vars:1,consts:[["class","markdown-page row",4,"ngIf"],[1,"markdown-page","row"],[1,"page"],["lineNumbers","",3,"src","start"]],template:function(e,t){1&e&&u.Ic(0,b,3,2,"div",0),2&e&&u.nc("ngIf",t.filePath)},directives:[l.m,m.a],styles:[".page[_ngcontent-%COMP%]{background:#fff;padding:30px}@media screen and (max-width:599px){.page[_ngcontent-%COMP%]{padding:15px}}.page[_ngcontent-%COMP%]     h1{font-size:1.6rem;font-weight:500;margin-top:0}.page[_ngcontent-%COMP%]     h2{font-size:1.4rem;font-weight:500;margin:30px 0 6px}.page[_ngcontent-%COMP%]     h3{font-size:1.2rem;font-weight:500;margin:20px 0 6px}.page[_ngcontent-%COMP%]     p{font-size:16px;line-height:1.5}.page[_ngcontent-%COMP%]     table{border-collapse:collapse;width:100%}.page[_ngcontent-%COMP%]     table td, .page[_ngcontent-%COMP%]     table th{border:1px solid #b3e6e4;padding:8px;text-align:left}.page[_ngcontent-%COMP%]     table th{background:#b3e6e4}.page[_ngcontent-%COMP%]     table a{color:inherit}"]}),h),v=r("Wp6s"),y=r("XiUz"),w=r("sYmb"),x=r("bTqV"),T=r("NFeN"),F=r("wZkO"),O=["exampleComponent"];function S(e,t){if(1&e&&(u.Vb(0,"mat-tab",9),u.Qb(1,"markdown",10),u.ic(2,"lowercase"),u.Ub()),2&e){var n=t.$implicit,a=u.hc(2);u.nc("label",n),u.Db(1),u.nc("src","examples/"+(a.fileDir||a.exampleName)+"/"+a.exampleName+".component."+u.jc(2,3,n))("start",0)}}function I(e,t){if(1&e&&(u.Vb(0,"div",7),u.Vb(1,"mat-tab-group"),u.Ic(2,S,3,5,"mat-tab",8),u.Ub(),u.Ub()),2&e){var n=u.hc();u.Db(2),u.nc("ngForOf",n.extensions)}}var k,C,R=["*"],_=((C=function(){function e(){n(this,e),this.extensions=["HTML","TS","SCSS"],this.showSource=!1}return t(e,[{key:"trackExampleFile",value:function(e,t){return t.extension}},{key:"toggleSourceView",value:function(){this.showSource=!this.showSource}},{key:"ngAfterViewInit",value:function(){var e,t,n,a;this.exampleName=null===(a=null===(n=null===(t=null===(e=this.exampleComponent)||void 0===e?void 0:e.nativeElement)||void 0===t?void 0:t.children)||void 0===n?void 0:n[0])||void 0===a?void 0:a.localName.replace("lab900-","")}}]),e}()).\u0275fac=function(e){return new(e||C)},C.\u0275cmp=u.Jb({type:C,selectors:[["lab900-example-viewer"]],viewQuery:function(e,t){var n;1&e&&u.Oc(O,1),2&e&&u.wc(n=u.ec())&&(t.exampleComponent=n.first)},inputs:{extensions:"extensions",fileDir:"fileDir",exampleTitle:"exampleTitle",exampleName:"exampleName"},ngContentSelectors:R,decls:13,vars:3,consts:[[1,"lab900-card"],["fxLayout","","fxLayoutAlign","space-between center"],["fxFlex","","translate",""],["mat-icon-button","","matTooltip","Toggle source",3,"disabled","click"],["class","example-source-wrapper",4,"ngIf"],[2,"padding","30px"],["exampleComponent",""],[1,"example-source-wrapper"],[3,"label",4,"ngFor","ngForOf"],[3,"label"],["lineNumbers","",3,"src","start"]],template:function(e,t){1&e&&(u.mc(),u.Vb(0,"mat-card",0),u.Vb(1,"mat-card-header",1),u.Vb(2,"mat-card-title"),u.Vb(3,"h3",2),u.Kc(4),u.Ub(),u.Ub(),u.Vb(5,"button",3),u.dc("click",function(){return t.toggleSourceView()}),u.Vb(6,"mat-icon"),u.Kc(7,"code"),u.Ub(),u.Ub(),u.Ub(),u.Vb(8,"mat-card-content"),u.Ic(9,I,3,1,"div",4),u.Vb(10,"div",5,6),u.lc(12),u.Ub(),u.Ub(),u.Ub()),2&e&&(u.Db(4),u.Lc(t.exampleTitle),u.Db(1),u.nc("disabled",0===t.extensions.length),u.Db(4),u.nc("ngIf",t.showSource&&t.exampleName))},directives:[v.a,v.c,y.c,y.b,v.e,y.a,w.a,x.b,T.a,v.b,l.m,F.b,l.l,F.a,m.a],pipes:[l.j],styles:[""]}),C),D=((k=function(){function e(t,a){n(this,e),this.container=t,this.resolver=a}return t(e,[{key:"ngOnChanges",value:function(e){e.lab900ComponentLoader&&this.loadComponent()}},{key:"loadComponent",value:function(){if(this.container.clear(),this.lab900ComponentLoader){var e=this.resolver.resolveComponentFactory(this.lab900ComponentLoader);this.container.createComponent(e)}}}]),e}()).\u0275fac=function(e){return new(e||k)(u.Pb(u.R),u.Pb(u.j))},k.\u0275dir=u.Kb({type:k,selectors:[["","lab900ComponentLoader",""]],inputs:{lab900ComponentLoader:"lab900ComponentLoader"},features:[u.Bb]}),k);function P(e,t){if(1&e&&u.Qb(0,"lab900-markdown-page",6),2&e){var n=u.hc(2);u.nc("filePath",null==n.data?null:n.data.docFile)}}function M(e,t){if(1&e&&(u.Vb(0,"div",8),u.Vb(1,"lab900-example-viewer",9),u.Rb(2,10),u.Ub(),u.Ub()),2&e){var n=t.$implicit;u.Db(1),u.nc("extensions",n.extensions)("fileDir",null==n?null:n.fileFolder)("exampleTitle",n.title),u.Db(1),u.nc("lab900ComponentLoader",n.component)}}function V(e,t){if(1&e&&(u.Tb(0),u.Ic(1,M,3,4,"div",7),u.Sb()),2&e){var n=u.hc(2);u.Db(1),u.nc("ngForOf",n.data.examples)}}function L(e,t){if(1&e&&(u.Vb(0,"div",1),u.Qb(1,"lab900-page-header",2),u.Tb(2,3),u.Ic(3,P,1,1,"lab900-markdown-page",4),u.Ic(4,V,2,1,"ng-container",5),u.Sb(),u.Ub()),2&e){var n=u.hc();u.Db(1),u.nc("pageTitle",n.data.title)("navItems",n.navItems),u.Db(1),u.nc("ngSwitch",n.currentTab),u.Db(1),u.nc("ngSwitchCase","guide"),u.Db(1),u.nc("ngSwitchCase","examples")}}var U,N,A,Q,j,E,q,J,K,B,G,z,H,$,X,W=((U=function(e){a(i,e);var t=o(i);function i(e,a){var o;return n(this,i),(o=t.call(this)).activatedRoute=e,o.router=a,o.guideNav={label:"Guide",queryParams:{tab:"guide"}},o.exampleNav={label:"Examples",queryParams:{tab:"examples"}},o.currentTab="guide",o.navItems=[],o.addSubscription(o.activatedRoute.queryParams,function(e){var t,n;o.data=o.activatedRoute.snapshot.data,o.navItems=(null===(t=o.data)||void 0===t?void 0:t.docFile)?[o.guideNav,o.exampleNav]:[o.exampleNav],(null==e?void 0:e.tab)?o.currentTab=null==e?void 0:e.tab:o.router.navigate([],{relativeTo:o.activatedRoute,queryParams:{tab:(null===(n=o.data)||void 0===n?void 0:n.docFile)?"guide":"examples"}})}),o}return i}(s.a)).\u0275fac=function(e){return new(e||U)(u.Pb(c.a),u.Pb(c.c))},U.\u0275cmp=u.Jb({type:U,selectors:[["lab900-showcase-page"]],features:[u.Ab],decls:1,vars:1,consts:[["class","showcase-page row",4,"ngIf"],[1,"showcase-page","row"],[3,"pageTitle","navItems"],[3,"ngSwitch"],[3,"filePath",4,"ngSwitchCase"],[4,"ngSwitchCase"],[3,"filePath"],["style","padding: 30px 0 0",4,"ngFor","ngForOf"],[2,"padding","30px 0 0"],[3,"extensions","fileDir","exampleTitle"],[3,"lab900ComponentLoader"]],template:function(e,t){1&e&&u.Ic(0,L,5,5,"div",0),2&e&&u.nc("ngIf",t.data&&t.currentTab)},directives:[l.m,p.b,l.o,l.p,g,l.l,_,D],styles:[".showcase-page[_ngcontent-%COMP%]     .lab900-page-header__nav{padding:0}.showcase-page[_ngcontent-%COMP%]     .lab900-page-header__main{padding:0 0 30px}.showcase-page[_ngcontent-%COMP%]     .markdown-page{max-width:100%;padding:0}"]}),U),Z=function e(t,a,i,o){n(this,e),this.path=t,this.component=W,this.data={title:a,path:t,examples:i,docFile:o}},Y=function e(t,a,i){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:["TS"];n(this,e),this.component=t,this.title=a,this.fileFolder=i,this.extensions=o},ee=r("GIPc"),te=r("LRne"),ne=((B=function(){function e(){var t=this;n(this,e),this.options=[{name:"Mary"},{name:"Shelley"},{name:"Igor"}].map(function(e){return{value:e,label:e.name}}),this.formSchema={fields:[{attribute:"textInput",title:"Search a value",editType:ee.a.Autocomplete,options:{required:!0,autocompleteOptions:function(e){return Object(te.a)(t.filter(e))},debounceTime:500,displayInputFn:function(e){var t;return null!==(t=null==e?void 0:e.name)&&void 0!==t?t:""},displayOptionFn:function(e){var t;return'<div class="user-option"><img width="20" height="20" src="https://firebasestorage.googleapis.com/v0/b/lab900-website-production.appspot.com/o/public%2Fproject-images%2Fyou%2Fyou-mockup.svg?alt=media"> '.concat(null!==(t=null==e?void 0:e.label)&&void 0!==t?t:"","</div>")}}},{attribute:"textInputMatchRequired",title:"Search a value (match required)",editType:ee.a.Autocomplete,options:{autocompleteOptions:function(e){return Object(te.a)(t.filter(e))},debounceTime:500,requireMatch:!0,displayInputFn:function(e){var t;return null!==(t=null==e?void 0:e.name)&&void 0!==t?t:""},displayOptionFn:function(e){var t;return'<div class="user-option"><img width="20" height="20" src="https://firebasestorage.googleapis.com/v0/b/lab900-website-production.appspot.com/o/public%2Fproject-images%2Fyou%2Fyou-mockup.svg?alt=media"> '.concat(null!==(t=null==e?void 0:e.label)&&void 0!==t?t:"","</div>")}}}]}}return t(e,[{key:"filter",value:function(e){var t=e.toLowerCase();return this.options.filter(function(e){return e.label.toLowerCase().includes(t)})}},{key:"validate",value:function(){console.log(this.formContainer.valid)}}]),e}()).\u0275fac=function(e){return new(e||B)},B.\u0275cmp=u.Jb({type:B,selectors:[["lab900-form-field-autocomplete-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(ee.b,1),2&e&&u.wc(n=u.ec())&&(t.formContainer=n.first)},decls:3,vars:1,consts:[[3,"schema"],["mat-raised-button","","color","primary",3,"click"]],template:function(e,t){1&e&&(u.Qb(0,"lab900-form",0),u.Vb(1,"button",1),u.dc("click",function(){return t.validate()}),u.Kc(2,"Submit"),u.Ub()),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b,x.b],styles:[".user-option{display:flex;align-items:center}"]}),B),ae=((K=function(){function e(){n(this,e),this.formSchema={fields:[{attribute:"repeater",title:"Add something",editType:ee.a.Repeater,validators:[function(e){var t=(null==e?void 0:e.value)||[];if((null==t?void 0:t.length)>1){var n=t.filter(function(e){return!0===e.default});if(!n.length)return{noDefault:!0};if(n.length>1)return{toManyDefaults:n.length}}return null}],nestedFields:[{editType:ee.a.Row,options:{mobileCols:!0},nestedFields:[{attribute:"value",editType:ee.a.Input,title:"Repeated field",options:{defaultValue:"234",colspan:6}},{attribute:"default",editType:ee.a.Checkbox,title:"default",options:{defaultValue:!1,colspan:6}}]}]}]}}return t(e,[{key:"logValue",value:function(e){console.log(e)}}]),e}()).\u0275fac=function(e){return new(e||K)},K.\u0275cmp=u.Jb({type:K,selectors:[["lab900-form-field-repeater-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(ee.b,1),2&e&&u.wc(n=u.ec())&&(t.form=n.first)},decls:2,vars:1,consts:[[3,"schema","click"],["form",""]],template:function(e,t){if(1&e){var n=u.Wb();u.Vb(0,"lab900-form",0,1),u.dc("click",function(){u.Ac(n);var e=u.xc(1);return t.logValue(e)}),u.Ub()}2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),K),ie=((J=function(){function e(){n(this,e),this.repeaterData={repeater:[{value:"hello"}]},this.formSchema={fields:[{attribute:"repeater",title:"Fill the 3 fields",editType:ee.a.Repeater,nestedFields:[{attribute:"value",editType:ee.a.Input,title:"Repeated field"}],options:{minRows:3,fixedList:!0,required:!0}}]}}return t(e,[{key:"logValue",value:function(){console.log(this.form.value)}}]),e}()).\u0275fac=function(e){return new(e||J)},J.\u0275cmp=u.Jb({type:J,selectors:[["lab900-form-field-repeater-fixed-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(ee.b,1),2&e&&u.wc(n=u.ec())&&(t.form=n.first)},decls:1,vars:2,consts:[[3,"schema","data","click"]],template:function(e,t){1&e&&(u.Vb(0,"lab900-form",0),u.dc("click",function(){return t.logValue()}),u.Ub()),2&e&&u.nc("schema",t.formSchema)("data",t.repeaterData)},directives:[ee.b],encapsulation:2}),J),oe=((q=function(){function e(){n(this,e),this.formSchema={fields:[{attribute:"uniqueNumber",title:"Text Input Hidden",editType:ee.a.Input,options:{hide:!0}},{attribute:"textInput2",title:"Text Input",editType:ee.a.Input,options:{required:!0,autofocus:!0,minLength:5,maxLength:15},icon:{name:"search",position:"left"}},{attribute:"textInput3",title:"Text Input",editType:ee.a.Input,icon:{name:"search",position:"right"}},{attribute:"emailInput",title:"Email Input",editType:ee.a.Input,options:{type:"email"}},{attribute:"numberInput",title:"Number Input",editType:ee.a.Input,options:{type:"number",max:1e3,min:5}},{attribute:"passwordInput",title:"Password Input",editType:ee.a.Input,options:{type:"password"}},{attribute:"mask",title:"Mask",editType:ee.a.Input,options:{fieldMask:{mask:"separator.4",decimalMarker:",",thousandSeparator:"."}}},{attribute:"readOnlyInput",title:"Read-only input",editType:ee.a.Input,options:{type:"text",readonly:function(e){return null!=e},required:!0}},{attribute:"suffixField",title:"Input with suffix",editType:ee.a.Input,options:{type:"text",suffix:"mm2"}},{attribute:"suffixField",title:"Input with suffix, prefix & right alignment",editType:ee.a.Input,options:{type:"text",prefix:"$",suffix:".00",align:"right"}}]}}return t(e,[{key:"validate",value:function(){console.log(this.formContainer.valid)}}]),e}()).\u0275fac=function(e){return new(e||q)},q.\u0275cmp=u.Jb({type:q,selectors:[["lab900-form-field-inputs-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(ee.b,1),2&e&&u.wc(n=u.ec())&&(t.formContainer=n.first)},decls:3,vars:1,consts:[[3,"schema"],["mat-raised-button","","color","primary",3,"click"]],template:function(e,t){1&e&&(u.Qb(0,"lab900-form",0),u.Vb(1,"button",1),u.dc("click",function(){return t.validate()}),u.Kc(2,"Submit"),u.Ub()),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b,x.b],encapsulation:2}),q),re=((E=function e(){n(this,e),this.formSchema={fields:[{attribute:"Textarea",title:"Textarea",editType:ee.a.TextArea}]}}).\u0275fac=function(e){return new(e||E)},E.\u0275cmp=u.Jb({type:E,selectors:[["lab900-form-field-textarea-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),E),le=((j=function e(){n(this,e),this.formSchema={fields:[{attribute:"somePropName",title:"Select yes or no",editType:ee.a.RadioButtons,options:{required:!0,radioOptions:[{value:!0,label:"yes"},{value:!1,label:"no"}]}},{attribute:"somePropName2",title:"Select ON OR OFF",editType:ee.a.Checkbox,options:{readonly:!0}},{attribute:"somePropName2",title:"Select ON OR OFF",editType:ee.a.Checkbox}]}}).\u0275fac=function(e){return new(e||j)},j.\u0275cmp=u.Jb({type:j,selectors:[["lab900-form-field-radio-buttons-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),j),ce=((Q=function e(){n(this,e),this.formSchema={fields:[{attribute:"range",title:"Large range with inputs",editType:ee.a.RangeSlider,options:{min:1e4,max:2e6,format:"K-M",steps:5e3}},{attribute:"range-small",title:"Small range with inputs",editType:ee.a.RangeSlider,options:{min:1,max:10,steps:1}}]}}).\u0275fac=function(e){return new(e||Q)},Q.\u0275cmp=u.Jb({type:Q,selectors:[["lab900-form-field-range-slider-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),Q),se=((A=function e(){n(this,e),this.formSchema={fields:[{attribute:"repeater",title:"Add something nested",editType:ee.a.Repeater,nestedFields:[{attribute:"value",editType:ee.a.Row,options:{colspan:12},nestedFields:[{attribute:"two",editType:ee.a.Input,title:"Repeated field"}]},{attribute:"value",editType:ee.a.Row,options:{colspan:12,visibleFn:function(e){return e.group.parent.controls.indexOf(e.group)!==e.group.parent.controls.length-1}},nestedFields:[{editType:ee.a.Icon,options:{icon:{name:"arrow_downward"},colspan:12}}]}]}]}}).\u0275fac=function(e){return new(e||A)},A.\u0275cmp=u.Jb({type:A,selectors:[["lab900-form-field-repeater-advanced-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),A),ue=((N=function(){function e(){n(this,e),this.formSchema={fields:[{attribute:"buttonGroupAttribute",title:"Select yes or no",editType:ee.a.ButtonToggle,options:{required:!0,buttonOptions:[{value:pe.VICTIM,label:"yes",buttonClass:"dsfkldsjflkdsjf"},{value:pe.RELATED,label:"no"}]}},{attribute:"value",editType:ee.a.Row,options:{colspan:12},nestedFields:[{attribute:"buttonGroupAttribute2",editType:ee.a.ButtonToggle,options:{required:!0,buttonOptions:[{value:"edit",label:"one",icon:{name:"delete",position:"right"}},{value:"delete",label:"two",icon:{name:"delete",position:"left"}}]}},{attribute:"textInput",title:"Text Input",editType:ee.a.Input}]}]},this.formData={buttonGroupAttribute:"VICTIM"}}return t(e,[{key:"logValue",value:function(){console.log(this.form.value)}}]),e}()).\u0275fac=function(e){return new(e||N)},N.\u0275cmp=u.Jb({type:N,selectors:[["lab900-form-field-button-toggle-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(ee.b,1),2&e&&u.wc(n=u.ec())&&(t.form=n.first)},decls:1,vars:2,consts:[[3,"schema","data","click"]],template:function(e,t){1&e&&(u.Vb(0,"lab900-form",0),u.dc("click",function(){return t.logValue()}),u.Ub()),2&e&&u.nc("schema",t.formSchema)("data",t.formData)},directives:[ee.b],encapsulation:2}),N),pe=function(e){return e.VICTIM="VICTIM",e.RELATED="RELATED",e.MISSING="MISSING",e}({}),de={fields:[{attribute:"fullName",editType:ee.a.Row,nestedFields:[{title:"name",attribute:"name",editType:ee.a.Input,options:{colspan:6,required:!0}},{title:"firstname",attribute:"firstname",editType:ee.a.Input,options:{colspan:6}}]},{attribute:"address",editType:ee.a.Row,nestedFields:[{title:"Country",attribute:"country",editType:ee.a.Input,options:{colspan:12}},{title:"Street",attribute:"street",editType:ee.a.Input,options:{colspan:6,readonly:!0}},{title:"Number",attribute:"number",editType:ee.a.Input,options:{colspan:6}}]},{editType:ee.a.Row,nestedFields:[{title:"languages",attribute:"languages",editType:ee.a.Select,options:{readonly:!0,colspan:12,selectOptions:[{value:"Dutch",label:"DUT"},{value:"English",label:"ENG"}]}}]}]},fe={address:{country:"Belgium",street:"Sesamstraat",number:12},firstname:"Example",languages:"DUT"},me=["lab900FormContainer"],be=((G=function(){function e(){n(this,e),this.formFields=de,this.formData=fe}return t(e,[{key:"submitForm",value:function(){this.formContainer.valid?console.log(this.formContainer.value):this.formContainer.form.markAllAsTouched()}}]),e}()).\u0275fac=function(e){return new(e||G)},G.\u0275cmp=u.Jb({type:G,selectors:[["lab900-form-container-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(me,1),2&e&&u.wc(n=u.ec())&&(t.formContainer=n.first)},decls:4,vars:2,consts:[[3,"schema","data"],["lab900FormContainer",""],["mat-stroked-button","",3,"click"]],template:function(e,t){1&e&&(u.Qb(0,"lab900-form",0,1),u.Vb(2,"button",2),u.dc("click",function(){return t.submitForm()}),u.Kc(3,"Submit Form"),u.Ub()),2&e&&u.nc("schema",t.formFields)("data",t.formData)},directives:[ee.b,x.b],encapsulation:2}),G),he=["lab900FormContainer"],ge=((X=function(){function e(){n(this,e),this.formFields=Object.assign(Object.assign({},de),{readonly:!0}),this.formData=fe}return t(e,[{key:"toggleReadOnly",value:function(){this.formFields.readonly=!this.formFields.readonly}}]),e}()).\u0275fac=function(e){return new(e||X)},X.\u0275cmp=u.Jb({type:X,selectors:[["lab900-form-container-readonly-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(he,1),2&e&&u.wc(n=u.ec())&&(t.formContainer=n.first)},decls:4,vars:2,consts:[[3,"schema","data"],["lab900FormContainer",""],[3,"click"]],template:function(e,t){1&e&&(u.Qb(0,"lab900-form",0,1),u.Vb(2,"button",2),u.dc("click",function(){return t.toggleReadOnly()}),u.Kc(3,"Toggle edit"),u.Ub()),2&e&&u.nc("schema",t.formFields)("data",t.formData)},directives:[ee.b],encapsulation:2}),X),ve=(($=function(){function e(){var t=this;n(this,e),this.options=[{name:"Mary"},{name:"Shelley"},{name:"Igor"}].map(function(e){return{value:e,label:e.name}}),this.formSchema={fields:[{attribute:"textInput",title:"Search a value",editType:ee.a.AutocompleteMultiple,options:{autocompleteOptions:function(e){return Object(te.a)(t.filter(e))},displayInputFn:function(e){var t;return null!==(t=null==e?void 0:e.name)&&void 0!==t?t:""},displayOptionFn:function(e){return null==e?void 0:e.label}}}]}}return t(e,[{key:"filter",value:function(e){var t=e.toLowerCase();return this.options.filter(function(e){return e.label.toLowerCase().includes(t)})}}]),e}()).\u0275fac=function(e){return new(e||$)},$.\u0275cmp=u.Jb({type:$,selectors:[["lab900-form-field-autocomplete-multiple-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),$),ye=((H=function e(){n(this,e),this.formSchema={fields:[{attribute:"test",title:"Select a date range",editType:ee.a.DateRange,options:{startKey:"startDate",endKey:"endDate"}}]}}).\u0275fac=function(e){return new(e||H)},H.\u0275cmp=u.Jb({type:H,selectors:[["lab900-form-field-date-range-picker-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),H),we=((z=function e(){n(this,e),this.formSchema={fields:[{attribute:"test",title:"Select a date & time",editType:ee.a.DateTime,conditions:[{dependOn:"urgent",disableIfEquals:!0,onChangeFn:function(e,t){!0===e&&t.reset()}}]},{attribute:"urgent",title:"Urgent?",editType:ee.a.Checkbox}]}}).\u0275fac=function(e){return new(e||z)},z.\u0275cmp=u.Jb({type:z,selectors:[["lab900-form-field-date-time-picker-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),z),xe=r("RdCW");function Te(e,t){if(1&e&&(u.Vb(0,"header",4),u.Vb(1,"span",5),u.Kc(2),u.Ub(),u.Vb(3,"div",6),u.Vb(4,"mat-icon"),u.Kc(5),u.Ub(),u.Vb(6,"h1"),u.Kc(7),u.ic(8,"translate"),u.Ub(),u.Vb(9,"p"),u.Kc(10),u.ic(11,"translate"),u.Ub(),u.Ub(),u.Ub()),2&e){var n=t.ngIf;u.Db(2),u.Lc(n.version),u.Db(3),u.Lc(null==n?null:n.icon),u.Db(2),u.Lc(u.jc(8,4,n.title)),u.Db(3),u.Lc(u.jc(11,6,n.description))}}var Fe=function(e){return[e]};function Oe(e,t){if(1&e&&(u.Vb(0,"button",13),u.Kc(1),u.ic(2,"translate"),u.Ub()),2&e){var n=t.$implicit;u.nc("routerLink",u.sc(4,Fe,"/"+n.route)),u.Db(1),u.Mc(" ",u.jc(2,2,n.label)," ")}}function Se(e,t){if(1&e&&(u.Vb(0,"div",10),u.Vb(1,"h2"),u.Kc(2),u.ic(3,"translate"),u.Ub(),u.Vb(4,"div",11),u.Ic(5,Oe,3,6,"button",12),u.Ub(),u.Ub()),2&e){var n=t.$implicit;u.Db(2),u.Lc(u.jc(3,2,n.label)),u.Db(3),u.nc("ngForOf",n.children)}}function Ie(e,t){if(1&e&&(u.Tb(0),u.Ic(1,Se,6,4,"div",9),u.Sb()),2&e){var n=t.$implicit;u.Db(1),u.nc("ngForOf",n.items)}}function ke(e,t){if(1&e&&(u.Vb(0,"div",7),u.Ic(1,Ie,2,1,"ng-container",8),u.Ub()),2&e){var n=t.ngIf;u.Db(1),u.nc("ngForOf",n)}}function Ce(e,t){if(1&e&&(u.Vb(0,"div",1),u.Ic(1,Te,12,8,"header",2),u.Ic(2,ke,2,1,"div",3),u.Ub()),2&e){var n=t.ngIf;u.Db(1),u.nc("ngIf",n.config),u.Db(1),u.nc("ngIf",n.nav)}}var Re,_e,De,Pe,Me,Ve,Le,Ue,Ne,Ae,Qe=((Re=function e(t){n(this,e),this.activatedRoute=t,this.data$=this.activatedRoute.data}).\u0275fac=function(e){return new(e||Re)(u.Pb(c.a))},Re.\u0275cmp=u.Jb({type:Re,selectors:[["lab900-showcase-home"]],decls:2,vars:3,consts:[["class","showcase-home",4,"ngIf"],[1,"showcase-home"],["class","showcase-home__header",4,"ngIf"],["class","showcase-home__links row",4,"ngIf"],[1,"showcase-home__header"],[1,"showcase-home__header__version"],[1,"row"],[1,"showcase-home__links","row"],[4,"ngFor","ngForOf"],["style","margin-bottom: 30px",4,"ngFor","ngForOf"],[2,"margin-bottom","30px"],["fxLayout","row wrap","fxLayoutGap","10px"],["mat-raised-button","",3,"routerLink",4,"ngFor","ngForOf"],["mat-raised-button","",3,"routerLink"]],template:function(e,t){1&e&&(u.Ic(0,Ce,3,2,"div",0),u.ic(1,"async")),2&e&&u.nc("ngIf",u.jc(1,1,t.data$))},directives:[l.m,T.a,l.l,y.c,y.d,x.b,c.d],pipes:[l.b,w.d],styles:[".showcase-home__header[_ngcontent-%COMP%]{background:#b3e6e4;text-align:center}.showcase-home__header[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:280px;margin:0 auto 30px}.showcase-home__header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-top:0;font-size:2.5rem;font-weight:500}.showcase-home__header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:1.2rem}.showcase-home__header[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:80px;width:80px;height:80px;color:#ff7459;margin:0 auto 20px}.showcase-home__header__version[_ngcontent-%COMP%]{position:absolute;top:20px;right:20px;font-size:12px;background:#81d6d2;padding:5px 10px 3px;display:block;border-radius:10px}button[_ngcontent-%COMP%]{display:block;margin-bottom:10px}"]}),Re),je=r("pnlo"),Ee=((_e=function e(){n(this,e),this.formSchema={fields:[{attribute:"",editType:ee.a.Row,nestedFields:[{attribute:"somePropName",title:"Select yes or no",editType:ee.a.Select,options:{selectOptions:[{value:!0,label:"yes"},{value:!1,label:"no"}],colspan:6,required:function(e){return null==e?void 0:e.secondPropName}}},{attribute:"secondPropName",title:"Select yes or no",editType:ee.a.Select,options:{selectOptions:[{value:!0,label:"yes"},{value:!1,label:"no"}],colspan:6}}]},{attribute:"",editType:ee.a.Row,nestedFields:[{attribute:"dependOnCheck",title:"Select yes or no",editType:ee.a.Select,options:{colspan:6,selectOptions:[{value:"whatever",label:"checked yes"}]}}]}]}}).\u0275fac=function(e){return new(e||_e)},_e.\u0275cmp=u.Jb({type:_e,selectors:[["lab900-form-field-select-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),_e),qe=r("tk/3"),Je=((De=function(){function e(t){var a=this;n(this,e),this.http=t,this.formSchema={fields:[{attribute:"files",title:"My files",editType:ee.a.FilePreview,options:{multiple:!0,accept:"image/*",canEditFileMetaData:!1,fileMetaDataConfig:{fields:[{attribute:"fileName",title:"File name",editType:ee.a.Input}]},httpCallback:function(e){return a.http.get(null==e?void 0:e.imageSrc,{responseType:"blob"})},showOverlay:function(e){return e.delicate},overlay:{backgroundColor:"#c93b2e",textColor:"white",text:"delicate"}}}]},this.formData={files:[{fileName:"file.jpg",delicate:!1,imageSrc:"https://media-exp1.licdn.com/dms/image/C560BAQHHSRGRgKfSFQ/company-logo_200_200/0/1542017911828?e=2159024400&v=beta&t=mNV_FUsqSBIXoI-HFA88TpUP9kX8JO3AqoK_aT2SQ_E"}]}}return t(e,[{key:"validate",value:function(){console.log(this.formContainer.form.controls.files.value)}}]),e}()).\u0275fac=function(e){return new(e||De)(u.Pb(qe.a))},De.\u0275cmp=u.Jb({type:De,selectors:[["lab900-form-field-file-upload-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(ee.b,1),2&e&&u.wc(n=u.ec())&&(t.formContainer=n.first)},decls:3,vars:2,consts:[[3,"schema","data"],["mat-raised-button","","color","primary",3,"click"]],template:function(e,t){1&e&&(u.Qb(0,"lab900-form",0),u.Vb(1,"button",1),u.dc("click",function(){return t.validate()}),u.Kc(2,"Submit"),u.Ub()),2&e&&u.nc("schema",t.formSchema)("data",t.formData)},directives:[ee.b,x.b],encapsulation:2}),De),Ke={fields:[{attribute:"role",editType:ee.a.Select,options:{colspan:6,selectOptions:[{label:"",value:null},{label:"user",value:"user"},{label:"administrator",value:"administrator"}]}},{attribute:"",editType:ee.a.Row,nestedFields:[{attribute:"country",editType:ee.a.Select,options:{colspan:6},conditions:[{dependOn:"role",enableIfHasValue:!0,conditionalOptions:function(){return[{label:"belgium",value:"BEL"},{label:"france",value:"FRA"},{label:"germany",value:"GER"},{label:"hide language",value:"HIDE"}]}}]},{attribute:"language",editType:ee.a.Select,options:{colspan:6},conditions:[{dependOn:"country",conditionalOptions:function(e){switch(e){case"BEL":return[{label:"Dutch",value:"NL"},{label:"French",value:"FR"},{label:"German",value:"DE"}];case"FRA":return[{label:"French",value:"FR"}];case"GER":return[{label:"German",value:"DE"}]}},hideIfEquals:function(e){return"HIDE"===e}}]},{attribute:"favouriteFood",editType:ee.a.Select,options:{colspan:6},conditions:[{dependOn:"language",conditionalOptions:function(e){switch(e){case"NL":return[{label:"Belgian Fries",value:"fries"}];case"FRA":case"GER":return[{label:"Bon Cuisine",value:"bon"}]}}}]}]}]},Be={country:"BEL"},Ge=["lab900FormContainer"],ze=((Pe=function(){function e(){n(this,e),this.formFields=Ke,this.formData=Be}return t(e,[{key:"submitForm",value:function(){this.formContainer.valid?console.log(this.formContainer.value):this.formContainer.form.markAllAsTouched()}}]),e}()).\u0275fac=function(e){return new(e||Pe)},Pe.\u0275cmp=u.Jb({type:Pe,selectors:[["lab900-form-container-example"]],viewQuery:function(e,t){var n;1&e&&u.Oc(Ge,1),2&e&&u.wc(n=u.ec())&&(t.formContainer=n.first)},decls:4,vars:2,consts:[[3,"schema","data"],["lab900FormContainer",""],["mat-stroked-button","",3,"click"]],template:function(e,t){1&e&&(u.Qb(0,"lab900-form",0,1),u.Vb(2,"button",2),u.dc("click",function(){return t.submitForm()}),u.Kc(3,"Submit Form"),u.Ub()),2&e&&u.nc("schema",t.formFields)("data",t.formData)},directives:[ee.b,x.b],encapsulation:2}),Pe),He=[{value:"nl",label:"NLD"},{value:"en",label:"ENG"},{value:"fr",label:"FR"}],$e=((Me=function e(){var t=this;n(this,e),this.languages=He,this.formSchema={fields:[{attribute:"multiLangField",title:"Multi language field",editType:ee.a.MultiLangInput,validators:[Object(ee.e)()],errorMessages:{missingTranslations:"missing translations"}},{attribute:"multiLangField2",title:"Multi language field",editType:ee.a.MultiLangInput,validators:[Object(ee.e)()],errorMessages:{missingTranslations:"missing translations"}},{attribute:"multiLangField3",title:"Multi language field",editType:ee.a.MultiLangInput,validators:[Object(ee.e)()],errorMessages:{missingTranslations:"missing translations"}},{attribute:"multiLangField4",title:"Multi language field (TextArea)",editType:ee.a.MultiLangInput,validators:[Object(ee.e)()],options:{useTextAreaField:!0},errorMessages:{missingTranslations:"missing translations"}}]},setTimeout(function(){t.data={multiLangField:{en:"field en",nl:"field nl",fr:"field fr"},multiLangField2:{en:"field",nl:"field",fr:"field"}}},100)}).\u0275fac=function(e){return new(e||Me)},Me.\u0275cmp=u.Jb({type:Me,selectors:[["lab900-form-field-multi-language-example"]],decls:1,vars:3,consts:[["language","nl",3,"availableLanguages","schema","data"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("availableLanguages",t.languages)("schema",t.formSchema)("data",t.data)},directives:[ee.b],encapsulation:2}),Me),Xe=r("3Pt+"),We=((Ve=function e(){n(this,e),this.schema={fields:[{attribute:"markAsRequired",editType:ee.a.Checkbox,title:"Mark as required",options:{colspan:6,disabledIndeterminate:!0}},{attribute:"field",editType:ee.a.Input,title:"Input Field?",options:{colspan:6},conditions:[{dependOn:"markAsRequired",validators:function(e){return!0===e?[Xe.w.required]:[]}}]},{attribute:"selectField",editType:ee.a.Select,title:"Select Field?",options:{colspan:6,selectOptions:[{value:"a",label:"Option a"},{value:"b",label:"Option b"},{value:"c",label:"Option c"}]},conditions:[{dependOn:"markAsRequired",validators:function(e){return!0===e?[Xe.w.required]:[]}}]}]}}).\u0275fac=function(e){return new(e||Ve)},Ve.\u0275cmp=u.Jb({type:Ve,selectors:[["lab900-form-condtional-validation-example"]],decls:2,vars:1,consts:[[3,"schema"],["lab900FormContainer",""]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0,1),2&e&&u.nc("schema",t.schema)},directives:[ee.b],encapsulation:2}),Ve),Ze=function(e){return{form1:e}},Ye=((Le=function e(){n(this,e),this.schema={fields:[{attribute:"type",editType:ee.a.Select,title:"Type",options:{colspan:6,selectOptions:[{value:"a",label:"a value"},{value:"b",label:"b value"}]}}]},this.schema2={fields:[{attribute:"name",editType:ee.a.Input,title:"Type",conditions:[{dependOn:"type",disableIfEquals:"a",externalFormId:"form1"}]}]}}).\u0275fac=function(e){return new(e||Le)},Le.\u0275cmp=u.Jb({type:Le,selectors:[["lab900-form-conditional-with-external-form-example"]],decls:8,vars:5,consts:[[3,"schema"],["form1",""],[3,"schema","externalForms"],["form2",""]],template:function(e,t){if(1&e&&(u.Vb(0,"h2"),u.Kc(1,"Form 1"),u.Ub(),u.Qb(2,"lab900-form",0,1),u.Vb(4,"h2"),u.Kc(5,"Form 2"),u.Ub(),u.Qb(6,"lab900-form",2,3)),2&e){var n=u.xc(3);u.Db(2),u.nc("schema",t.schema),u.Db(4),u.nc("schema",t.schema2)("externalForms",u.sc(3,Ze,n.form))}},directives:[ee.b],encapsulation:2}),Le),et=r("lJxs"),tt=((Ue=function(){function e(t){var a=this;n(this,e),this.http=t,this.formSchema={fields:[{attribute:"",editType:ee.a.Row,nestedFields:[{attribute:"books",title:"Select a book",editType:ee.a.Select,options:{selectOptions:this.getSelectOptions.bind(this),colspan:6,infiniteScroll:{enabled:!0}}},{attribute:"books2",title:"Search a book",editType:ee.a.Select,options:{selectOptions:this.getSelectOptions.bind(this),colspan:6,infiniteScroll:{enabled:!0},search:{enabled:!0}}}]},{attribute:"",editType:ee.a.Row,nestedFields:[{attribute:"author",title:"Select a author",editType:ee.a.Select,options:{selectOptions:[{value:"twain",label:"Twain"},{value:"tolkien",label:"Tolkien"}],colspan:6}},{attribute:"booksByAuthor",title:"Search a book",editType:ee.a.Select,options:{selectOptions:this.getSelectOptions.bind(this),colspan:6,infiniteScroll:{enabled:!0},search:{enabled:!0}},conditions:[{dependOn:"author",enableIfHasValue:!0,conditionalOptions:function(e,t,n){return a.getSelectOptions(n,e)}}]}]}]}}return t(e,[{key:"getSelectOptions",value:function(e,t){return this.http.get("https://openlibrary.org/search.json",{params:{q:null==e?void 0:e.searchQuery,author:null!=t?t:"tolkien",limit:"10",offset:String(10*((null==e?void 0:e.page)||0))}}).pipe(Object(et.a)(function(e){var t;return null===(t=null==e?void 0:e.docs)||void 0===t?void 0:t.map(function(e){return{label:e.title,value:e}})}))}}]),e}()).\u0275fac=function(e){return new(e||Ue)(u.Pb(qe.a))},Ue.\u0275cmp=u.Jb({type:Ue,selectors:[["lab900-form-field-select-advanced-example"]],decls:1,vars:1,consts:[[3,"schema"]],template:function(e,t){1&e&&u.Qb(0,"lab900-form",0),2&e&&u.nc("schema",t.formSchema)},directives:[ee.b],encapsulation:2}),Ue),nt=[{path:"",component:Qe,data:{config:xe.a,nav:je.a}},{path:"getting-started",component:g,data:{filePath:"guides/forms/getting-started.md"}},new Z("form-container","Dynamic forms",[new Y(be,"Form Container"),new Y(ge,"Form Container Readonly","form-container-example")],"guides/forms/creating-forms.md"),new Z("conditional-forms","Conditional forms",[new Y(ze,"Conditional Form Container"),new Y(We,"Conditional validation"),new Y(Ye,"Conditionals across multiple forms")],"guides/forms/TODO.md"),new Z("form-field-autocomplete","Form Fields: Autocomplete",[new Y(ne,"Autocomplete"),new Y(ve,"Autocomplete Multiple","form-field-autocomplete-example")]),new Z("form-field-repeater","Form Fields: Repeater",[new Y(se,"Repeater (nested)"),new Y(ae,"Repeater"),new Y(ie,"Repeater fixed")]),new Z("form-field-datepicker","Form Fields: Datepicker",[new Y(ye,"Date range picker"),new Y(we,"Date time picker")]),new Z("form-field-input","Form Fields: Input & Textarea",[new Y(oe,"Input"),new Y(re,"Textarea")]),new Z("form-field-radio-buttons","Form Fields: Radio buttons",[new Y(le,"Radio buttons")]),new Z("form-field-button-toggle","Form Fields: Button Toggle",[new Y(ue,"Button Toggle")]),new Z("form-field-range-slider","Form Fields: Range slider",[new Y(ce,"Range slider")]),new Z("form-field-select","Form Fields: Select",[new Y(Ee,"Selects"),new Y(tt,"Advanced selects")]),new Z("form-field-file-upload","Form Fields: File upload",[new Y(Je,"Upload")]),new Z("form-field-multi-lang","Form Fields: Multi language",[new Y($e,"Multi language")])],at=((Ne=function e(){n(this,e)}).\u0275fac=function(e){return new(e||Ne)},Ne.\u0275mod=u.Nb({type:Ne}),Ne.\u0275inj=u.Mb({imports:[[c.g.forChild(nt)],c.g]}),Ne),it=r("FpXt"),ot=((Ae=function e(){n(this,e)}).\u0275fac=function(e){return new(e||Ae)},Ae.\u0275mod=u.Nb({type:Ae}),Ae.\u0275inj=u.Mb({imports:[[l.c,it.a,at]]}),Ae)}}])}();