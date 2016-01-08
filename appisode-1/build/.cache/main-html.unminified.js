(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.dateStr = function(date) {
	var m = date.getMonth() + 1;
	var d = date.getDate();
	var h = date.getHours();
	var mi = date.getMinutes();
	var s = date.getSeconds();
	return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d < 10?"0" + d:"" + d) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
}
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var Lambda = function() { }
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
var Main = function() { }
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	flambe.System.init();
	util.NDiSaveData.initInstance();
	globals.NDiGameGlobals.initInstance();
	managers.NDiSceneManager.initInstance();
	managers.NDiResourcesManager.initInstance();
	managers.NDiAudioManager.initInstance();
	managers.NDiLocalizationManager.initInstance();
	managers.NDiScenesController.initInstance();
	managers.NDiVideoManager.initInstance();
	managers.NDiResourcesManager.getInstance().loadAssetPack(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,null,Main.onLoadConfigAssets);
}
Main.onLoadConfigAssets = function(pack) {
	globals.NDiGameGlobals.getInstance().initGlobalConfigData();
	managers.NDiLocalizationManager.getInstance().initLocalizationData();
	managers.NDiResourcesManager.getInstance().loadAssetPack(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,null,Main.onLoadInitialAssets);
}
Main.onLoadInitialAssets = function(pack) {
	managers.NDiSceneManager.getInstance().changeScene(globals.NDiGameConstants.SCENES_FLOW[0]);
}
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return x <= 0?0:Math.floor(Math.random() * x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	addSub: function(s,pos,len) {
		this.b += len == null?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
}
var XmlType = $hxClasses["XmlType"] = { __ename__ : ["XmlType"], __constructs__ : [] }
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
}
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,elementsNamed: function(name) {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				if(n.nodeType == Xml.Element && n._nodeName == name) break;
				k++;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k++;
				if(n.nodeType == Xml.Element && n._nodeName == name) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,iterator: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			return this.cur < this.x.length;
		}, next : function() {
			return this.x[this.cur++];
		}};
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,get_nodeValue: function() {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
var data = {}
data.NDiLocalizationData = function() {
	this.id = "";
	this.fontScale = 0;
	this.offsetX = 0;
	this.offsetY = 0;
	this.fontName = "";
	this.description = "";
	this.content = "";
};
$hxClasses["data.NDiLocalizationData"] = data.NDiLocalizationData;
data.NDiLocalizationData.__name__ = ["data","NDiLocalizationData"];
data.NDiLocalizationData.prototype = {
	__class__: data.NDiLocalizationData
}
var factories = {}
factories.NDiSceneFactory = function() { }
$hxClasses["factories.NDiSceneFactory"] = factories.NDiSceneFactory;
factories.NDiSceneFactory.__name__ = ["factories","NDiSceneFactory"];
factories.NDiSceneFactory.createScene = function(sceneType) {
	var newScene = null;
	if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_TEST) newScene = new gui.scenes.NDiTestScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_PLAY) newScene = new gui.scenes.NDiPlayScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO) newScene = new gui.scenes.NDiVideoScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG1) newScene = new gui.scenes.NDiMig1Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG2) newScene = new gui.scenes.NDiMig2Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG3) newScene = new gui.scenes.NDiMig3Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG4) newScene = new gui.scenes.NDiMig4Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG5) newScene = new gui.scenes.NDiMig5Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG6) newScene = new gui.scenes.NDiMig6Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG7) newScene = new gui.scenes.NDiMig7Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_MIG8) newScene = new gui.scenes.NDiMig8Scene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_END_STORY) newScene = new gui.scenes.NDiEndStoryScene(); else if(sceneType == globals.NDiTypeScene.NDI_TYPE_SCENE_GAME) newScene = new gui.scenes.NDiGameScene();
	if(newScene != null) newScene.type = sceneType;
	return newScene;
}
var flambe = {}
flambe.util = {}
flambe.util.Disposable = function() { }
$hxClasses["flambe.util.Disposable"] = flambe.util.Disposable;
flambe.util.Disposable.__name__ = ["flambe","util","Disposable"];
flambe.util.Disposable.prototype = {
	__class__: flambe.util.Disposable
}
flambe.Component = function() { }
$hxClasses["flambe.Component"] = flambe.Component;
flambe.Component.__name__ = ["flambe","Component"];
flambe.Component.__interfaces__ = [flambe.util.Disposable];
flambe.Component.prototype = {
	init: function(owner,next) {
		this.owner = owner;
		this.next = next;
	}
	,get_name: function() {
		return null;
	}
	,dispose: function() {
		if(this.owner != null) this.owner.remove(this);
	}
	,onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
	}
	,__class__: flambe.Component
}
flambe.Entity = function() {
	this.firstComponent = null;
	this.next = null;
	this.firstChild = null;
	this.parent = null;
	this._compMap = { };
};
$hxClasses["flambe.Entity"] = flambe.Entity;
flambe.Entity.__name__ = ["flambe","Entity"];
flambe.Entity.__interfaces__ = [flambe.util.Disposable];
flambe.Entity.prototype = {
	dispose: function() {
		if(this.parent != null) this.parent.removeChild(this);
		while(this.firstComponent != null) this.firstComponent.dispose();
		this.disposeChildren();
	}
	,disposeChildren: function() {
		while(this.firstChild != null) this.firstChild.dispose();
	}
	,removeChild: function(entity) {
		var prev = null, p = this.firstChild;
		while(p != null) {
			var next = p.next;
			if(p == entity) {
				if(prev == null) this.firstChild = next; else prev.next = next;
				p.parent = null;
				p.next = null;
				return;
			}
			prev = p;
			p = next;
		}
	}
	,addChild: function(entity,append) {
		if(append == null) append = true;
		if(entity.parent != null) entity.parent.removeChild(entity);
		entity.parent = this;
		if(append) {
			var tail = null, p = this.firstChild;
			while(p != null) {
				tail = p;
				p = p.next;
			}
			if(tail != null) tail.next = entity; else this.firstChild = entity;
		} else {
			entity.next = this.firstChild;
			this.firstChild = entity;
		}
		return this;
	}
	,remove: function(component) {
		var prev = null, p = this.firstComponent;
		while(p != null) {
			var next = p.next;
			if(p == component) {
				if(prev == null) this.firstComponent = next; else prev.init(this,next);
				delete(this._compMap[p.get_name()]);
				p.onRemoved();
				p.init(null,null);
				return true;
			}
			prev = p;
			p = next;
		}
		return false;
	}
	,add: function(component) {
		if(component.owner != null) component.owner.remove(component);
		var name = component.get_name();
		var prev = this._compMap[name];
		if(prev != null) this.remove(prev);
		this._compMap[name] = component;
		var tail = null, p = this.firstComponent;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		if(tail != null) tail.next = component; else this.firstComponent = component;
		component.init(this,null);
		component.onAdded();
		return this;
	}
	,__class__: flambe.Entity
}
flambe.platform = {}
flambe.platform.Platform = function() { }
$hxClasses["flambe.platform.Platform"] = flambe.platform.Platform;
flambe.platform.Platform.__name__ = ["flambe","platform","Platform"];
flambe.platform.Platform.prototype = {
	__class__: flambe.platform.Platform
}
flambe.platform.html = {}
flambe.platform.html.HtmlPlatform = function() {
};
$hxClasses["flambe.platform.html.HtmlPlatform"] = flambe.platform.html.HtmlPlatform;
flambe.platform.html.HtmlPlatform.__name__ = ["flambe","platform","html","HtmlPlatform"];
flambe.platform.html.HtmlPlatform.__interfaces__ = [flambe.platform.Platform];
flambe.platform.html.HtmlPlatform.prototype = {
	createRenderer: function(canvas) {
		try {
			var gl = js.html._CanvasElement.CanvasUtil.getContextWebGL(canvas,{ depth : false});
			if(gl != null) {
				if(flambe.platform.html.HtmlUtil.detectSlowDriver(gl)) null; else return new flambe.platform.html.WebGLRenderer(this._stage,gl);
			}
		} catch( _ ) {
		}
		return new flambe.platform.html.CanvasRenderer(canvas);
		return null;
	}
	,getY: function(event,bounds) {
		return (event.clientY - bounds.top) * this._stage.get_height() / bounds.height;
	}
	,getX: function(event,bounds) {
		return (event.clientX - bounds.left) * this._stage.get_width() / bounds.width;
	}
	,getRenderer: function() {
		return this._renderer;
	}
	,getExternal: function() {
		if(this._external == null) this._external = new flambe.platform.html.HtmlExternal();
		return this._external;
	}
	,getPointer: function() {
		return this._pointer;
	}
	,update: function(now) {
		var dt = (now - this._lastUpdate) / 1000;
		this._lastUpdate = now;
		if(flambe.System.hidden._value) return;
		if(this._skipFrame) {
			this._skipFrame = false;
			return;
		}
		this.mainLoop.update(dt);
		this.mainLoop.render(this._renderer);
	}
	,getStorage: function() {
		if(this._storage == null) {
			var localStorage = js.Browser.getLocalStorage();
			if(localStorage != null) this._storage = new flambe.platform.html.HtmlStorage(localStorage); else this._storage = new flambe.platform.DummyStorage();
		}
		return this._storage;
	}
	,loadAssetPack: function(manifest) {
		return new flambe.platform.html.HtmlAssetPackLoader(this,manifest).promise;
	}
	,init: function() {
		var _g = this;
		flambe.platform.html.HtmlUtil.fixAndroidMath();
		var canvas = null;
		try {
			canvas = js.Browser.window.flambe.canvas;
		} catch( error ) {
		}
		canvas.setAttribute("tabindex","0");
		canvas.style.outlineStyle = "none";
		this._stage = new flambe.platform.html.HtmlStage(canvas);
		this._pointer = new flambe.platform.BasicPointer();
		this._mouse = new flambe.platform.html.HtmlMouse(this._pointer,canvas);
		this._renderer = this.createRenderer(canvas);
		this.mainLoop = new flambe.platform.MainLoop();
		this.musicPlaying = false;
		this._canvas = canvas;
		this._container = canvas.parentElement;
		this._container.style.overflow = "hidden";
		this._container.style.position = "relative";
		this._container.style.msTouchAction = "none";
		var lastTouchTime = 0;
		var onMouse = function(event) {
			if(event.timeStamp - lastTouchTime < 1000) return;
			var bounds = canvas.getBoundingClientRect();
			var x = _g.getX(event,bounds);
			var y = _g.getY(event,bounds);
			switch(event.type) {
			case "mousedown":
				if(event.target == canvas) {
					event.preventDefault();
					_g._mouse.submitDown(x,y,event.button);
					canvas.focus();
				}
				break;
			case "mousemove":
				_g._mouse.submitMove(x,y);
				break;
			case "mouseup":
				_g._mouse.submitUp(x,y,event.button);
				break;
			case "mousewheel":case "DOMMouseScroll":
				var velocity = event.type == "mousewheel"?event.wheelDelta / 40:-event.detail;
				if(_g._mouse.submitScroll(x,y,velocity)) event.preventDefault();
				break;
			}
		};
		js.Browser.window.addEventListener("mousedown",onMouse,false);
		js.Browser.window.addEventListener("mousemove",onMouse,false);
		js.Browser.window.addEventListener("mouseup",onMouse,false);
		canvas.addEventListener("mousewheel",onMouse,false);
		canvas.addEventListener("DOMMouseScroll",onMouse,false);
		var standardTouch = typeof(js.Browser.window.ontouchstart) != "undefined";
		var msTouch = 'msMaxTouchPoints' in window.navigator && (window.navigator.msMaxTouchPoints > 1);
		if(standardTouch || msTouch) {
			var basicTouch = new flambe.platform.BasicTouch(this._pointer,standardTouch?4:js.Browser.navigator.msMaxTouchPoints);
			this._touch = basicTouch;
			var onTouch = function(event) {
				var changedTouches = standardTouch?event.changedTouches:[event];
				var bounds = event.target.getBoundingClientRect();
				lastTouchTime = event.timeStamp;
				switch(event.type) {
				case "touchstart":case "MSPointerDown":
					event.preventDefault();
					if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) flambe.platform.html.HtmlUtil.hideMobileBrowser();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitDown(id,x,y);
					}
					break;
				case "touchmove":case "MSPointerMove":
					event.preventDefault();
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitMove(id,x,y);
					}
					break;
				case "touchend":case "touchcancel":case "MSPointerUp":
					var _g1 = 0;
					while(_g1 < changedTouches.length) {
						var touch = changedTouches[_g1];
						++_g1;
						var x = _g.getX(touch,bounds);
						var y = _g.getY(touch,bounds);
						var id = (standardTouch?touch.identifier:touch.pointerId) | 0;
						basicTouch.submitUp(id,x,y);
					}
					break;
				}
			};
			if(standardTouch) {
				canvas.addEventListener("touchstart",onTouch,false);
				canvas.addEventListener("touchmove",onTouch,false);
				canvas.addEventListener("touchend",onTouch,false);
				canvas.addEventListener("touchcancel",onTouch,false);
			} else {
				canvas.addEventListener("MSPointerDown",onTouch,false);
				canvas.addEventListener("MSPointerMove",onTouch,false);
				canvas.addEventListener("MSPointerUp",onTouch,false);
			}
		} else this._touch = new flambe.platform.DummyTouch();
		var oldErrorHandler = js.Browser.window.onerror;
		js.Browser.window.onerror = function(message,url,line) {
			flambe.System.uncaughtError.emit(message);
			return oldErrorHandler != null?oldErrorHandler(message,url,line):false;
		};
		var hiddenApi = flambe.platform.html.HtmlUtil.loadExtension("hidden",js.Browser.document);
		if(hiddenApi.value != null) {
			var onVisibilityChanged = function(_) {
				flambe.System.hidden.set__(Reflect.field(js.Browser.document,hiddenApi.field));
			};
			onVisibilityChanged(null);
			js.Browser.document.addEventListener(hiddenApi.prefix + "visibilitychange",onVisibilityChanged,false);
		} else {
			var onPageTransitionChange = function(event) {
				flambe.System.hidden.set__(event.type == "pagehide");
			};
			js.Browser.window.addEventListener("pageshow",onPageTransitionChange,false);
			js.Browser.window.addEventListener("pagehide",onPageTransitionChange,false);
		}
		flambe.System.hidden.get_changed().connect(function(hidden,_) {
			if(!hidden) _g._skipFrame = true;
		});
		this._skipFrame = false;
		this._lastUpdate = Date.now();
		var requestAnimationFrame = flambe.platform.html.HtmlUtil.loadExtension("requestAnimationFrame").value;
		if(requestAnimationFrame != null) {
			var performance = js.Browser.window.performance;
			var hasPerfNow = performance != null && flambe.platform.html.HtmlUtil.polyfill("now",performance);
			if(hasPerfNow) this._lastUpdate = performance.now(); else null;
			var updateFrame = null;
			updateFrame = function(now) {
				_g.update(hasPerfNow?performance.now():now);
				requestAnimationFrame(updateFrame,canvas);
			};
			requestAnimationFrame(updateFrame,canvas);
		} else js.Browser.window.setInterval(function() {
			_g.update(Date.now());
		},16);
		null;
	}
	,__class__: flambe.platform.html.HtmlPlatform
}
flambe.util.Value = function(value,listener) {
	this._value = value;
	this._changed = listener != null?new flambe.util.Signal2(listener):null;
};
$hxClasses["flambe.util.Value"] = flambe.util.Value;
flambe.util.Value.__name__ = ["flambe","util","Value"];
flambe.util.Value.prototype = {
	get_changed: function() {
		if(this._changed == null) this._changed = new flambe.util.Signal2();
		return this._changed;
	}
	,set__: function(newValue) {
		var oldValue = this._value;
		if(newValue != oldValue) {
			this._value = newValue;
			if(this._changed != null) this._changed.emit(newValue,oldValue);
		}
		return newValue;
	}
	,watch: function(listener) {
		listener(this._value,this._value);
		return this.get_changed().connect(listener);
	}
	,__class__: flambe.util.Value
}
flambe.util.SignalConnection = function(signal,listener) {
	this._next = null;
	this._signal = signal;
	this._listener = listener;
	this.stayInList = true;
};
$hxClasses["flambe.util.SignalConnection"] = flambe.util.SignalConnection;
flambe.util.SignalConnection.__name__ = ["flambe","util","SignalConnection"];
flambe.util.SignalConnection.__interfaces__ = [flambe.util.Disposable];
flambe.util.SignalConnection.prototype = {
	dispose: function() {
		if(this._signal != null) {
			this._signal.disconnect(this);
			this._signal = null;
		}
	}
	,once: function() {
		this.stayInList = false;
		return this;
	}
	,__class__: flambe.util.SignalConnection
}
flambe.util.SignalBase = function(listener) {
	this._head = listener != null?new flambe.util.SignalConnection(this,listener):null;
	this._deferredTasks = null;
};
$hxClasses["flambe.util.SignalBase"] = flambe.util.SignalBase;
flambe.util.SignalBase.__name__ = ["flambe","util","SignalBase"];
flambe.util.SignalBase.prototype = {
	listRemove: function(conn) {
		var prev = null, p = this._head;
		while(p != null) {
			if(p == conn) {
				var next = p._next;
				if(prev == null) this._head = next; else prev._next = next;
				return;
			}
			prev = p;
			p = p._next;
		}
	}
	,listAdd: function(conn,prioritize) {
		if(prioritize) {
			conn._next = this._head;
			this._head = conn;
		} else {
			var tail = null, p = this._head;
			while(p != null) {
				tail = p;
				p = p._next;
			}
			if(tail != null) tail._next = conn; else this._head = conn;
		}
	}
	,didEmit: function(head) {
		this._head = head;
		var snapshot = this._deferredTasks;
		this._deferredTasks = null;
		while(snapshot != null) {
			snapshot.fn();
			snapshot = snapshot.next;
		}
	}
	,willEmit: function() {
		var snapshot = this._head;
		this._head = flambe.util.SignalBase.DISPATCHING_SENTINEL;
		return snapshot;
	}
	,defer: function(fn) {
		var tail = null, p = this._deferredTasks;
		while(p != null) {
			tail = p;
			p = p.next;
		}
		var task = new flambe.util._SignalBase.Task(fn);
		if(tail != null) tail.next = task; else this._deferredTasks = task;
	}
	,disconnect: function(conn) {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.listRemove(conn);
		}); else this.listRemove(conn);
	}
	,connectImpl: function(listener,prioritize) {
		var _g = this;
		var conn = new flambe.util.SignalConnection(this,listener);
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.listAdd(conn,prioritize);
		}); else this.listAdd(conn,prioritize);
		return conn;
	}
	,__class__: flambe.util.SignalBase
}
flambe.util.Signal2 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal2"] = flambe.util.Signal2;
flambe.util.Signal2.__name__ = ["flambe","util","Signal2"];
flambe.util.Signal2.__super__ = flambe.util.SignalBase;
flambe.util.Signal2.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1,arg2) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1,arg2);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1,arg2) {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl(arg1,arg2);
		}); else this.emitImpl(arg1,arg2);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal2
});
flambe.util.Signal1 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal1"] = flambe.util.Signal1;
flambe.util.Signal1.__name__ = ["flambe","util","Signal1"];
flambe.util.Signal1.__super__ = flambe.util.SignalBase;
flambe.util.Signal1.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function(arg1) {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener(arg1);
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function(arg1) {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl(arg1);
		}); else this.emitImpl(arg1);
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal1
});
flambe.animation = {}
flambe.animation.AnimatedFloat = function(value,listener) {
	this._behavior = null;
	flambe.util.Value.call(this,value,listener);
};
$hxClasses["flambe.animation.AnimatedFloat"] = flambe.animation.AnimatedFloat;
flambe.animation.AnimatedFloat.__name__ = ["flambe","animation","AnimatedFloat"];
flambe.animation.AnimatedFloat.__super__ = flambe.util.Value;
flambe.animation.AnimatedFloat.prototype = $extend(flambe.util.Value.prototype,{
	set_behavior: function(behavior) {
		this._behavior = behavior;
		this.update(0);
		return behavior;
	}
	,animateTo: function(to,seconds,easing) {
		this.set_behavior(new flambe.animation.Tween(this._value,to,seconds,easing));
	}
	,animate: function(from,to,seconds,easing) {
		this.set__(from);
		this.animateTo(to,seconds,easing);
	}
	,update: function(dt) {
		if(this._behavior != null) {
			flambe.util.Value.prototype.set__.call(this,this._behavior.update(dt));
			if(this._behavior.isComplete()) this._behavior = null;
		}
	}
	,set__: function(value) {
		this._behavior = null;
		return flambe.util.Value.prototype.set__.call(this,value);
	}
	,__class__: flambe.animation.AnimatedFloat
});
flambe.System = function() { }
$hxClasses["flambe.System"] = flambe.System;
flambe.System.__name__ = ["flambe","System"];
flambe.System.init = function() {
	if(!flambe.System._calledInit) {
		flambe.System._platform.init();
		flambe.System._calledInit = true;
	}
}
flambe.SpeedAdjuster = function() {
	this._realDt = 0;
};
$hxClasses["flambe.SpeedAdjuster"] = flambe.SpeedAdjuster;
flambe.SpeedAdjuster.__name__ = ["flambe","SpeedAdjuster"];
flambe.SpeedAdjuster.__super__ = flambe.Component;
flambe.SpeedAdjuster.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		if(this._realDt > 0) {
			dt = this._realDt;
			this._realDt = 0;
		}
		this.scale.update(dt);
	}
	,get_name: function() {
		return "SpeedAdjuster_39";
	}
	,__class__: flambe.SpeedAdjuster
});
flambe.animation.Behavior = function() { }
$hxClasses["flambe.animation.Behavior"] = flambe.animation.Behavior;
flambe.animation.Behavior.__name__ = ["flambe","animation","Behavior"];
flambe.animation.Behavior.prototype = {
	__class__: flambe.animation.Behavior
}
flambe.animation.Ease = function() { }
$hxClasses["flambe.animation.Ease"] = flambe.animation.Ease;
flambe.animation.Ease.__name__ = ["flambe","animation","Ease"];
flambe.animation.Ease.linear = function(t) {
	return t;
}
flambe.animation.Ease.cubeOut = function(t) {
	return 1 + --t * t * t;
}
flambe.animation.Ease.quartOut = function(t) {
	return 1 - --t * t * t * t;
}
flambe.animation.Ease.quintInOut = function(t) {
	return (t *= 2) < 1?t * t * t * t * t / 2:((t -= 2) * t * t * t * t + 2) / 2;
}
flambe.animation.Ease.sineOut = function(t) {
	return Math.sin(3.141592653589793 / 2 * t);
}
flambe.animation.Ease.bounceOut = function(t) {
	if(t < 1 / 2.75) return 7.5625 * t * t;
	if(t < 2 / 2.75) return 7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + .75;
	if(t < 2.5 / 2.75) return 7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + .9375;
	return 7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + .984375;
}
flambe.animation.Ease.circOut = function(t) {
	--t;
	return Math.sqrt(1 - t * t);
}
flambe.animation.Ease.backInOut = function(t) {
	t *= 2;
	if(t < 1) return t * t * (2.70158 * t - 1.70158) / 2;
	t -= 2;
	return (1 - t * t * (-2.70158 * t - 1.70158)) / 2 + .5;
}
flambe.animation.Tween = function(from,to,seconds,easing) {
	this._from = from;
	this._to = to;
	this._duration = seconds;
	this.elapsed = 0;
	this._easing = easing != null?easing:flambe.animation.Ease.linear;
};
$hxClasses["flambe.animation.Tween"] = flambe.animation.Tween;
flambe.animation.Tween.__name__ = ["flambe","animation","Tween"];
flambe.animation.Tween.__interfaces__ = [flambe.animation.Behavior];
flambe.animation.Tween.prototype = {
	isComplete: function() {
		return this.elapsed >= this._duration;
	}
	,update: function(dt) {
		this.elapsed += dt;
		if(this.elapsed >= this._duration) return this._to; else return this._from + (this._to - this._from) * this._easing(this.elapsed / this._duration);
	}
	,__class__: flambe.animation.Tween
}
flambe.asset = {}
flambe.asset.Asset = function() { }
$hxClasses["flambe.asset.Asset"] = flambe.asset.Asset;
flambe.asset.Asset.__name__ = ["flambe","asset","Asset"];
flambe.asset.Asset.__interfaces__ = [flambe.util.Disposable];
flambe.asset.Asset.prototype = {
	__class__: flambe.asset.Asset
}
flambe.asset.AssetFormat = $hxClasses["flambe.asset.AssetFormat"] = { __ename__ : ["flambe","asset","AssetFormat"], __constructs__ : ["WEBP","JXR","PNG","JPG","GIF","DDS","PVR","PKM","MP3","M4A","OPUS","OGG","WAV","Data"] }
flambe.asset.AssetFormat.WEBP = ["WEBP",0];
flambe.asset.AssetFormat.WEBP.toString = $estr;
flambe.asset.AssetFormat.WEBP.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JXR = ["JXR",1];
flambe.asset.AssetFormat.JXR.toString = $estr;
flambe.asset.AssetFormat.JXR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PNG = ["PNG",2];
flambe.asset.AssetFormat.PNG.toString = $estr;
flambe.asset.AssetFormat.PNG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.JPG = ["JPG",3];
flambe.asset.AssetFormat.JPG.toString = $estr;
flambe.asset.AssetFormat.JPG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.GIF = ["GIF",4];
flambe.asset.AssetFormat.GIF.toString = $estr;
flambe.asset.AssetFormat.GIF.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.DDS = ["DDS",5];
flambe.asset.AssetFormat.DDS.toString = $estr;
flambe.asset.AssetFormat.DDS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PVR = ["PVR",6];
flambe.asset.AssetFormat.PVR.toString = $estr;
flambe.asset.AssetFormat.PVR.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.PKM = ["PKM",7];
flambe.asset.AssetFormat.PKM.toString = $estr;
flambe.asset.AssetFormat.PKM.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.MP3 = ["MP3",8];
flambe.asset.AssetFormat.MP3.toString = $estr;
flambe.asset.AssetFormat.MP3.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.M4A = ["M4A",9];
flambe.asset.AssetFormat.M4A.toString = $estr;
flambe.asset.AssetFormat.M4A.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OPUS = ["OPUS",10];
flambe.asset.AssetFormat.OPUS.toString = $estr;
flambe.asset.AssetFormat.OPUS.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.OGG = ["OGG",11];
flambe.asset.AssetFormat.OGG.toString = $estr;
flambe.asset.AssetFormat.OGG.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.WAV = ["WAV",12];
flambe.asset.AssetFormat.WAV.toString = $estr;
flambe.asset.AssetFormat.WAV.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetFormat.Data = ["Data",13];
flambe.asset.AssetFormat.Data.toString = $estr;
flambe.asset.AssetFormat.Data.__enum__ = flambe.asset.AssetFormat;
flambe.asset.AssetEntry = function(name,url,format,bytes) {
	this.name = name;
	this.url = url;
	this.format = format;
	this.bytes = bytes;
};
$hxClasses["flambe.asset.AssetEntry"] = flambe.asset.AssetEntry;
flambe.asset.AssetEntry.__name__ = ["flambe","asset","AssetEntry"];
flambe.asset.AssetEntry.prototype = {
	__class__: flambe.asset.AssetEntry
}
flambe.asset.AssetPack = function() { }
$hxClasses["flambe.asset.AssetPack"] = flambe.asset.AssetPack;
flambe.asset.AssetPack.__name__ = ["flambe","asset","AssetPack"];
flambe.asset.AssetPack.__interfaces__ = [flambe.util.Disposable];
flambe.asset.AssetPack.prototype = {
	__class__: flambe.asset.AssetPack
}
flambe.asset.File = function() { }
$hxClasses["flambe.asset.File"] = flambe.asset.File;
flambe.asset.File.__name__ = ["flambe","asset","File"];
flambe.asset.File.__interfaces__ = [flambe.asset.Asset];
flambe.asset.File.prototype = {
	__class__: flambe.asset.File
}
var js = {}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
js.Browser.getLocalStorage = function() {
	try {
		var s = js.Browser.window.localStorage;
		s.getItem("");
		return s;
	} catch( e ) {
		return null;
	}
}
flambe.asset.Manifest = function() {
	this._entries = [];
};
$hxClasses["flambe.asset.Manifest"] = flambe.asset.Manifest;
flambe.asset.Manifest.__name__ = ["flambe","asset","Manifest"];
flambe.asset.Manifest.build = function(packName,required) {
	if(required == null) required = true;
	var packData = Reflect.field(haxe.rtti.Meta.getType(flambe.asset.Manifest).assets[0],packName);
	if(packData == null) {
		if(required) throw flambe.util.Strings.withFields("Missing asset pack",["name",packName]);
		return null;
	}
	var manifest = new flambe.asset.Manifest();
	manifest.set_relativeBasePath("assets");
	var _g = 0;
	while(_g < packData.length) {
		var asset = packData[_g];
		++_g;
		var name = asset.name;
		var path = packName + "/" + name + "?v=" + Std.string(asset.md5);
		var format = flambe.asset.Manifest.inferFormat(name);
		if(format != flambe.asset.AssetFormat.Data) name = flambe.util.Strings.removeFileExtension(name);
		manifest.add(name,path,asset.bytes,format);
	}
	return manifest;
}
flambe.asset.Manifest.inferFormat = function(url) {
	var extension = flambe.util.Strings.getUrlExtension(url);
	if(extension != null) {
		var _g = extension.toLowerCase();
		switch(_g) {
		case "gif":
			return flambe.asset.AssetFormat.GIF;
		case "jpg":case "jpeg":
			return flambe.asset.AssetFormat.JPG;
		case "jxr":case "wdp":
			return flambe.asset.AssetFormat.JXR;
		case "png":
			return flambe.asset.AssetFormat.PNG;
		case "webp":
			return flambe.asset.AssetFormat.WEBP;
		case "dds":
			return flambe.asset.AssetFormat.DDS;
		case "pvr":
			return flambe.asset.AssetFormat.PVR;
		case "pkm":
			return flambe.asset.AssetFormat.PKM;
		case "m4a":
			return flambe.asset.AssetFormat.M4A;
		case "mp3":
			return flambe.asset.AssetFormat.MP3;
		case "ogg":
			return flambe.asset.AssetFormat.OGG;
		case "opus":
			return flambe.asset.AssetFormat.OPUS;
		case "wav":
			return flambe.asset.AssetFormat.WAV;
		}
	} else null;
	return flambe.asset.AssetFormat.Data;
}
flambe.asset.Manifest.prototype = {
	set_externalBasePath: function(basePath) {
		this._externalBasePath = basePath;
		if(basePath != null) null;
		return basePath;
	}
	,get_externalBasePath: function() {
		return this._externalBasePath;
	}
	,set_relativeBasePath: function(basePath) {
		this._relativeBasePath = basePath;
		if(basePath != null) null;
		return basePath;
	}
	,get_relativeBasePath: function() {
		return this._relativeBasePath;
	}
	,getFullURL: function(entry) {
		var restricted = this.get_externalBasePath() != null && flambe.asset.Manifest._supportsCrossOrigin?this.get_externalBasePath():this.get_relativeBasePath();
		var unrestricted = this.get_externalBasePath() != null?this.get_externalBasePath():this.get_relativeBasePath();
		var base = unrestricted;
		if(entry.format == flambe.asset.AssetFormat.Data) base = restricted;
		return base != null?flambe.util.Strings.joinPath(base,entry.url):entry.url;
	}
	,iterator: function() {
		return HxOverrides.iter(this._entries);
	}
	,add: function(name,url,bytes,format) {
		if(bytes == null) bytes = 0;
		if(format == null) format = flambe.asset.Manifest.inferFormat(url);
		var entry = new flambe.asset.AssetEntry(name,url,format,bytes);
		this._entries.push(entry);
		return entry;
	}
	,__class__: flambe.asset.Manifest
}
flambe.display = {}
flambe.display.BlendMode = $hxClasses["flambe.display.BlendMode"] = { __ename__ : ["flambe","display","BlendMode"], __constructs__ : ["Normal","Add","Mask","Copy"] }
flambe.display.BlendMode.Normal = ["Normal",0];
flambe.display.BlendMode.Normal.toString = $estr;
flambe.display.BlendMode.Normal.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Add = ["Add",1];
flambe.display.BlendMode.Add.toString = $estr;
flambe.display.BlendMode.Add.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Mask = ["Mask",2];
flambe.display.BlendMode.Mask.toString = $estr;
flambe.display.BlendMode.Mask.__enum__ = flambe.display.BlendMode;
flambe.display.BlendMode.Copy = ["Copy",3];
flambe.display.BlendMode.Copy.toString = $estr;
flambe.display.BlendMode.Copy.__enum__ = flambe.display.BlendMode;
flambe.math = {}
flambe.math.Point = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
};
$hxClasses["flambe.math.Point"] = flambe.math.Point;
flambe.math.Point.__name__ = ["flambe","math","Point"];
flambe.math.Point.prototype = {
	__class__: flambe.math.Point
}
flambe.display.Sprite = function() {
	this.scissor = null;
	this.blendMode = null;
	var _g = this;
	this._flags = 139;
	this._localMatrix = new flambe.math.Matrix();
	var dirtyMatrix = function(_,_1) {
		_g._flags = _g._flags | 12;
	};
	this.x = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.y = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.rotation = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.scaleX = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.scaleY = new flambe.animation.AnimatedFloat(1,dirtyMatrix);
	this.anchorX = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.anchorY = new flambe.animation.AnimatedFloat(0,dirtyMatrix);
	this.alpha = new flambe.animation.AnimatedFloat(1);
};
$hxClasses["flambe.display.Sprite"] = flambe.display.Sprite;
flambe.display.Sprite.__name__ = ["flambe","display","Sprite"];
flambe.display.Sprite.hitTest = function(entity,x,y) {
	var sprite = entity._compMap.Sprite_5;
	if(sprite != null) {
		if(!((sprite._flags & 3) == 3)) return null;
		if(sprite.getLocalMatrix().inverseTransform(x,y,flambe.display.Sprite._scratchPoint)) {
			x = flambe.display.Sprite._scratchPoint.x;
			y = flambe.display.Sprite._scratchPoint.y;
		}
		var scissor = sprite.scissor;
		if(scissor != null && !scissor.contains(x,y)) return null;
	}
	var result = flambe.display.Sprite.hitTestBackwards(entity.firstChild,x,y);
	if(result != null) return result;
	return sprite != null && sprite.containsLocal(x,y)?sprite:null;
}
flambe.display.Sprite.render = function(entity,g) {
	var sprite = entity._compMap.Sprite_5;
	if(sprite != null) {
		var alpha = sprite.alpha._value;
		if(!((sprite._flags & 1) != 0) || alpha <= 0) return;
		g.save();
		if(alpha < 1) g.multiplyAlpha(alpha);
		if(sprite.blendMode != null) g.setBlendMode(sprite.blendMode);
		var matrix = sprite.getLocalMatrix();
		var m02 = matrix.m02;
		var m12 = matrix.m12;
		if((sprite._flags & 128) != 0) {
			m02 = Math.round(m02);
			m12 = Math.round(m12);
		}
		g.transform(matrix.m00,matrix.m10,matrix.m01,matrix.m11,m02,m12);
		var scissor = sprite.scissor;
		if(scissor != null) g.applyScissor(scissor.x,scissor.y,scissor.width,scissor.height);
		sprite.draw(g);
	}
	var director = entity._compMap.Director_37;
	if(director != null) {
		var scenes = director.occludedScenes;
		var _g = 0;
		while(_g < scenes.length) {
			var scene = scenes[_g];
			++_g;
			flambe.display.Sprite.render(scene,g);
		}
	}
	var p = entity.firstChild;
	while(p != null) {
		var next = p.next;
		flambe.display.Sprite.render(p,g);
		p = next;
	}
	if(sprite != null) g.restore();
}
flambe.display.Sprite.hitTestBackwards = function(entity,x,y) {
	if(entity != null) {
		var result = flambe.display.Sprite.hitTestBackwards(entity.next,x,y);
		return result != null?result:flambe.display.Sprite.hitTest(entity,x,y);
	}
	return null;
}
flambe.display.Sprite.__super__ = flambe.Component;
flambe.display.Sprite.prototype = $extend(flambe.Component.prototype,{
	set_pointerEnabled: function(pointerEnabled) {
		this._flags = flambe.util.BitSets.set(this._flags,2,pointerEnabled);
		return pointerEnabled;
	}
	,set_visible: function(visible) {
		this._flags = flambe.util.BitSets.set(this._flags,1,visible);
		return visible;
	}
	,get_pointerUp: function() {
		if(this._pointerUp == null) this._pointerUp = new flambe.util.Signal1();
		return this._pointerUp;
	}
	,get_pointerDown: function() {
		if(this._pointerDown == null) this._pointerDown = new flambe.util.Signal1();
		return this._pointerDown;
	}
	,draw: function(g) {
	}
	,onUpdate: function(dt) {
		this.x.update(dt);
		this.y.update(dt);
		this.rotation.update(dt);
		this.scaleX.update(dt);
		this.scaleY.update(dt);
		this.alpha.update(dt);
		this.anchorX.update(dt);
		this.anchorY.update(dt);
	}
	,disablePointer: function() {
		this.set_pointerEnabled(false);
		return this;
	}
	,setScale: function(scale) {
		this.scaleX.set__(scale);
		this.scaleY.set__(scale);
		return this;
	}
	,centerAnchor: function() {
		this.anchorX.set__(this.getNaturalWidth() / 2);
		this.anchorY.set__(this.getNaturalHeight() / 2);
		return this;
	}
	,setAnchor: function(x,y) {
		this.anchorX.set__(x);
		this.anchorY.set__(y);
		return this;
	}
	,getLocalMatrix: function() {
		if((this._flags & 4) != 0) {
			this._flags = this._flags & -5;
			this._localMatrix.compose(this.x._value,this.y._value,this.scaleX._value,this.scaleY._value,this.rotation._value * 3.141592653589793 / 180);
			this._localMatrix.translate(-this.anchorX._value,-this.anchorY._value);
		}
		return this._localMatrix;
	}
	,containsLocal: function(localX,localY) {
		return localX >= 0 && localX < this.getNaturalWidth() && localY >= 0 && localY < this.getNaturalHeight();
	}
	,getNaturalHeight: function() {
		return 0;
	}
	,getNaturalWidth: function() {
		return 0;
	}
	,get_name: function() {
		return "Sprite_5";
	}
	,__class__: flambe.display.Sprite
});
flambe.display.FillSprite = function(color,width,height) {
	flambe.display.Sprite.call(this);
	this.color = color;
	this.width = new flambe.animation.AnimatedFloat(width);
	this.height = new flambe.animation.AnimatedFloat(height);
};
$hxClasses["flambe.display.FillSprite"] = flambe.display.FillSprite;
flambe.display.FillSprite.__name__ = ["flambe","display","FillSprite"];
flambe.display.FillSprite.__super__ = flambe.display.Sprite;
flambe.display.FillSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.width.update(dt);
		this.height.update(dt);
	}
	,getNaturalHeight: function() {
		return this.height._value;
	}
	,getNaturalWidth: function() {
		return this.width._value;
	}
	,draw: function(g) {
		g.fillRect(this.color,0,0,this.width._value,this.height._value);
	}
	,__class__: flambe.display.FillSprite
});
flambe.display.Glyph = function(charCode) {
	this._kernings = null;
	this.xAdvance = 0;
	this.yOffset = 0;
	this.xOffset = 0;
	this.page = null;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.charCode = charCode;
};
$hxClasses["flambe.display.Glyph"] = flambe.display.Glyph;
flambe.display.Glyph.__name__ = ["flambe","display","Glyph"];
flambe.display.Glyph.prototype = {
	setKerning: function(nextCharCode,amount) {
		if(this._kernings == null) this._kernings = new haxe.ds.IntMap();
		this._kernings.set(nextCharCode,amount);
	}
	,getKerning: function(nextCharCode) {
		return this._kernings != null?this._kernings.get(nextCharCode) | 0:0;
	}
	,draw: function(g,destX,destY) {
		if(this.width > 0) g.drawSubImage(this.page,destX + this.xOffset,destY + this.yOffset,this.x,this.y,this.width,this.height);
	}
	,__class__: flambe.display.Glyph
}
flambe.display.Font = function(pack,name) {
	this.name = name;
	this._pack = pack;
	this.reload();
};
$hxClasses["flambe.display.Font"] = flambe.display.Font;
flambe.display.Font.__name__ = ["flambe","display","Font"];
flambe.display.Font.prototype = {
	reload: function() {
		this._glyphs = new haxe.ds.IntMap();
		this._glyphs.set(flambe.display.Font.NEWLINE.charCode,flambe.display.Font.NEWLINE);
		var parser = new flambe.display._Font.ConfigParser(this._pack.getFile(this.name + ".fnt").toString());
		var pages = new haxe.ds.IntMap();
		var idx = this.name.lastIndexOf("/");
		var basePath = idx >= 0?HxOverrides.substr(this.name,0,idx + 1):"";
		var $it0 = parser.keywords();
		while( $it0.hasNext() ) {
			var keyword = $it0.next();
			switch(keyword) {
			case "info":
				var $it1 = parser.pairs();
				while( $it1.hasNext() ) {
					var pair = $it1.next();
					switch(pair.key) {
					case "size":
						this.size = pair.getInt();
						break;
					}
				}
				break;
			case "page":
				var pageId = 0;
				var file = null;
				var $it2 = parser.pairs();
				while( $it2.hasNext() ) {
					var pair = $it2.next();
					switch(pair.key) {
					case "id":
						pageId = pair.getInt();
						break;
					case "file":
						file = pair.getString();
						break;
					}
				}
				pages.set(pageId,this._pack.getTexture(basePath + flambe.util.Strings.removeFileExtension(file)));
				break;
			case "char":
				var glyph = null;
				var $it3 = parser.pairs();
				while( $it3.hasNext() ) {
					var pair = $it3.next();
					switch(pair.key) {
					case "id":
						glyph = new flambe.display.Glyph(pair.getInt());
						break;
					case "x":
						glyph.x = pair.getInt();
						break;
					case "y":
						glyph.y = pair.getInt();
						break;
					case "width":
						glyph.width = pair.getInt();
						break;
					case "height":
						glyph.height = pair.getInt();
						break;
					case "page":
						glyph.page = pages.get(pair.getInt());
						break;
					case "xoffset":
						glyph.xOffset = pair.getInt();
						break;
					case "yoffset":
						glyph.yOffset = pair.getInt();
						break;
					case "xadvance":
						glyph.xAdvance = pair.getInt();
						break;
					}
				}
				this._glyphs.set(glyph.charCode,glyph);
				break;
			case "kerning":
				var first = null;
				var second = -1;
				var $it4 = parser.pairs();
				while( $it4.hasNext() ) {
					var pair = $it4.next();
					switch(pair.key) {
					case "first":
						first = this._glyphs.get(pair.getInt());
						break;
					case "second":
						second = pair.getInt();
						break;
					case "amount":
						first.setKerning(second,pair.getInt());
						break;
					}
				}
				break;
			}
		}
	}
	,layoutText: function(text,align,wrapWidth) {
		if(wrapWidth == null) wrapWidth = 0;
		if(align == null) align = flambe.display.TextAlign.Left;
		return new flambe.display.TextLayout(this,text,align,wrapWidth);
	}
	,__class__: flambe.display.Font
}
flambe.display.TextAlign = $hxClasses["flambe.display.TextAlign"] = { __ename__ : ["flambe","display","TextAlign"], __constructs__ : ["Left","Center","Right"] }
flambe.display.TextAlign.Left = ["Left",0];
flambe.display.TextAlign.Left.toString = $estr;
flambe.display.TextAlign.Left.__enum__ = flambe.display.TextAlign;
flambe.display.TextAlign.Center = ["Center",1];
flambe.display.TextAlign.Center.toString = $estr;
flambe.display.TextAlign.Center.__enum__ = flambe.display.TextAlign;
flambe.display.TextAlign.Right = ["Right",2];
flambe.display.TextAlign.Right.toString = $estr;
flambe.display.TextAlign.Right.__enum__ = flambe.display.TextAlign;
flambe.display.TextLayout = function(font,text,align,wrapWidth) {
	this.lines = 0;
	var _g = this;
	this._font = font;
	this._glyphs = [];
	this._offsets = [];
	this.bounds = new flambe.math.Rectangle();
	var lineWidths = [];
	var ll = text.length;
	var _g1 = 0;
	while(_g1 < ll) {
		var ii = _g1++;
		var charCode = text.charCodeAt(ii);
		var glyph = font._glyphs.get(charCode);
		if(glyph != null) this._glyphs.push(glyph); else null;
	}
	var lastSpaceIdx = -1;
	var lineWidth = 0.0;
	var lineHeight = 0.0;
	var newline = font._glyphs.get(10);
	var addLine = function() {
		_g.bounds.width = flambe.math.FMath.max(_g.bounds.width,lineWidth);
		_g.bounds.height += lineHeight;
		lineWidths[_g.lines] = lineWidth;
		lineWidth = 0;
		lineHeight = 0;
		++_g.lines;
	};
	var ii = 0;
	while(ii < this._glyphs.length) {
		var glyph = this._glyphs[ii];
		this._offsets[ii] = lineWidth;
		var wordWrap = wrapWidth > 0 && lineWidth + glyph.width > wrapWidth;
		if(wordWrap || glyph == newline) {
			if(wordWrap) {
				if(lastSpaceIdx >= 0) {
					this._glyphs[lastSpaceIdx] = newline;
					lineWidth = this._offsets[lastSpaceIdx];
					ii = lastSpaceIdx;
				} else this._glyphs.splice(ii,0,newline);
			}
			lastSpaceIdx = -1;
			lineHeight = font.size;
			addLine();
		} else {
			if(glyph.charCode == 32) lastSpaceIdx = ii;
			lineWidth += glyph.xAdvance;
			lineHeight = flambe.math.FMath.max(lineHeight,glyph.height + glyph.yOffset);
			if(ii + 1 < this._glyphs.length) {
				var nextGlyph = this._glyphs[ii + 1];
				lineWidth += glyph.getKerning(nextGlyph.charCode);
			}
		}
		++ii;
	}
	addLine();
	var lineY = 0.0;
	var alignOffset = flambe.display.TextLayout.getAlignOffset(align,lineWidths[0],wrapWidth);
	var top = 1.79769313486231e+308;
	var bottom = -1.79769313486231e+308;
	var line = 0;
	var ii1 = 0;
	var ll1 = this._glyphs.length;
	while(ii1 < ll1) {
		var glyph = this._glyphs[ii1];
		if(glyph.charCode == 10) {
			lineY += font.size;
			++line;
			alignOffset = flambe.display.TextLayout.getAlignOffset(align,lineWidths[line],wrapWidth);
		}
		this._offsets[ii1] += alignOffset;
		var glyphY = lineY + glyph.yOffset;
		top = top < glyphY?top:glyphY;
		bottom = flambe.math.FMath.max(bottom,glyphY + glyph.height);
		++ii1;
	}
	this.bounds.x = flambe.display.TextLayout.getAlignOffset(align,this.bounds.width,wrapWidth);
	this.bounds.y = top;
	this.bounds.height = bottom - top;
};
$hxClasses["flambe.display.TextLayout"] = flambe.display.TextLayout;
flambe.display.TextLayout.__name__ = ["flambe","display","TextLayout"];
flambe.display.TextLayout.getAlignOffset = function(align,lineWidth,totalWidth) {
	switch( (align)[1] ) {
	case 0:
		return 0;
	case 2:
		return totalWidth - lineWidth;
	case 1:
		return (totalWidth - lineWidth) / 2;
	}
}
flambe.display.TextLayout.prototype = {
	draw: function(g,align) {
		var y = 0.0;
		var ii = 0;
		var ll = this._glyphs.length;
		while(ii < ll) {
			var glyph = this._glyphs[ii];
			if(glyph.charCode == 10) y += this._font.size; else {
				var x = this._offsets[ii];
				glyph.draw(g,x,y);
			}
			++ii;
		}
	}
	,__class__: flambe.display.TextLayout
}
flambe.display._Font = {}
flambe.display._Font.ConfigParser = function(config) {
	this._configText = config;
	this._keywordPattern = new EReg("([a-z]+)(.*)","");
	this._pairPattern = new EReg("([a-z]+)=(\"[^\"]*\"|[^\\s]+)","");
};
$hxClasses["flambe.display._Font.ConfigParser"] = flambe.display._Font.ConfigParser;
flambe.display._Font.ConfigParser.__name__ = ["flambe","display","_Font","ConfigParser"];
flambe.display._Font.ConfigParser.advance = function(text,expr) {
	var m = expr.matchedPos();
	return HxOverrides.substr(text,m.pos + m.len,text.length);
}
flambe.display._Font.ConfigParser.prototype = {
	pairs: function() {
		var _g = this;
		var text = this._pairText;
		return { next : function() {
			text = flambe.display._Font.ConfigParser.advance(text,_g._pairPattern);
			return new flambe.display._Font.ConfigPair(_g._pairPattern.matched(1),_g._pairPattern.matched(2));
		}, hasNext : function() {
			return _g._pairPattern.match(text);
		}};
	}
	,keywords: function() {
		var _g = this;
		var text = this._configText;
		return { next : function() {
			text = flambe.display._Font.ConfigParser.advance(text,_g._keywordPattern);
			_g._pairText = _g._keywordPattern.matched(2);
			return _g._keywordPattern.matched(1);
		}, hasNext : function() {
			return _g._keywordPattern.match(text);
		}};
	}
	,__class__: flambe.display._Font.ConfigParser
}
flambe.display._Font.ConfigPair = function(key,value) {
	this.key = key;
	this._value = value;
};
$hxClasses["flambe.display._Font.ConfigPair"] = flambe.display._Font.ConfigPair;
flambe.display._Font.ConfigPair.__name__ = ["flambe","display","_Font","ConfigPair"];
flambe.display._Font.ConfigPair.prototype = {
	getString: function() {
		if(this._value.charCodeAt(0) != 34) return null;
		return HxOverrides.substr(this._value,1,this._value.length - 2);
	}
	,getInt: function() {
		return Std.parseInt(this._value);
	}
	,__class__: flambe.display._Font.ConfigPair
}
flambe.display.Graphics = function() { }
$hxClasses["flambe.display.Graphics"] = flambe.display.Graphics;
flambe.display.Graphics.__name__ = ["flambe","display","Graphics"];
flambe.display.Graphics.prototype = {
	__class__: flambe.display.Graphics
}
flambe.display.ImageSprite = function(texture) {
	flambe.display.Sprite.call(this);
	this.texture = texture;
};
$hxClasses["flambe.display.ImageSprite"] = flambe.display.ImageSprite;
flambe.display.ImageSprite.__name__ = ["flambe","display","ImageSprite"];
flambe.display.ImageSprite.__super__ = flambe.display.Sprite;
flambe.display.ImageSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.texture.get_height();
	}
	,getNaturalWidth: function() {
		return this.texture.get_width();
	}
	,draw: function(g) {
		g.drawImage(this.texture,0,0);
	}
	,__class__: flambe.display.ImageSprite
});
flambe.display.Orientation = $hxClasses["flambe.display.Orientation"] = { __ename__ : ["flambe","display","Orientation"], __constructs__ : ["Portrait","Landscape"] }
flambe.display.Orientation.Portrait = ["Portrait",0];
flambe.display.Orientation.Portrait.toString = $estr;
flambe.display.Orientation.Portrait.__enum__ = flambe.display.Orientation;
flambe.display.Orientation.Landscape = ["Landscape",1];
flambe.display.Orientation.Landscape.toString = $estr;
flambe.display.Orientation.Landscape.__enum__ = flambe.display.Orientation;
flambe.display.TextSprite = function(font,text) {
	if(text == null) text = "";
	this._layout = null;
	var _g = this;
	flambe.display.Sprite.call(this);
	this._font = font;
	this._text = text;
	this._align = flambe.display.TextAlign.Left;
	this._flags = this._flags | 64;
	this.wrapWidth = new flambe.animation.AnimatedFloat(0,function(_,_1) {
		_g._flags = _g._flags | 64;
	});
};
$hxClasses["flambe.display.TextSprite"] = flambe.display.TextSprite;
flambe.display.TextSprite.__name__ = ["flambe","display","TextSprite"];
flambe.display.TextSprite.__super__ = flambe.display.Sprite;
flambe.display.TextSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.wrapWidth.update(dt);
	}
	,updateLayout: function() {
		if((this._flags & 64) != 0) {
			this._flags = this._flags & -65;
			this._layout = this._font.layoutText(this._text,this._align,this.wrapWidth._value);
		}
	}
	,set_align: function(align) {
		if(align != this._align) {
			this._align = align;
			this._flags = this._flags | 64;
		}
		return align;
	}
	,set_text: function(text) {
		if(text != this._text) {
			this._text = text;
			this._flags = this._flags | 64;
		}
		return text;
	}
	,containsLocal: function(localX,localY) {
		this.updateLayout();
		return this._layout.bounds.contains(localX,localY);
	}
	,getNaturalHeight: function() {
		this.updateLayout();
		return this._layout.lines * this._font.size;
	}
	,getNaturalWidth: function() {
		this.updateLayout();
		return this.wrapWidth._value > 0?this.wrapWidth._value:this._layout.bounds.width;
	}
	,draw: function(g) {
		this.updateLayout();
		this._layout.draw(g,this._align);
	}
	,__class__: flambe.display.TextSprite
});
flambe.display.Texture = function() { }
$hxClasses["flambe.display.Texture"] = flambe.display.Texture;
flambe.display.Texture.__name__ = ["flambe","display","Texture"];
flambe.display.Texture.__interfaces__ = [flambe.asset.Asset];
flambe.display.Texture.prototype = {
	__class__: flambe.display.Texture
}
flambe.input = {}
flambe.input.MouseButton = $hxClasses["flambe.input.MouseButton"] = { __ename__ : ["flambe","input","MouseButton"], __constructs__ : ["Left","Middle","Right","Unknown"] }
flambe.input.MouseButton.Left = ["Left",0];
flambe.input.MouseButton.Left.toString = $estr;
flambe.input.MouseButton.Left.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Middle = ["Middle",1];
flambe.input.MouseButton.Middle.toString = $estr;
flambe.input.MouseButton.Middle.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Right = ["Right",2];
flambe.input.MouseButton.Right.toString = $estr;
flambe.input.MouseButton.Right.__enum__ = flambe.input.MouseButton;
flambe.input.MouseButton.Unknown = function(buttonCode) { var $x = ["Unknown",3,buttonCode]; $x.__enum__ = flambe.input.MouseButton; $x.toString = $estr; return $x; }
flambe.input.MouseCursor = $hxClasses["flambe.input.MouseCursor"] = { __ename__ : ["flambe","input","MouseCursor"], __constructs__ : ["Default","Button","None"] }
flambe.input.MouseCursor.Default = ["Default",0];
flambe.input.MouseCursor.Default.toString = $estr;
flambe.input.MouseCursor.Default.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.Button = ["Button",1];
flambe.input.MouseCursor.Button.toString = $estr;
flambe.input.MouseCursor.Button.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseCursor.None = ["None",2];
flambe.input.MouseCursor.None.toString = $estr;
flambe.input.MouseCursor.None.__enum__ = flambe.input.MouseCursor;
flambe.input.MouseEvent = function() {
	this.init(0,0,0,null);
};
$hxClasses["flambe.input.MouseEvent"] = flambe.input.MouseEvent;
flambe.input.MouseEvent.__name__ = ["flambe","input","MouseEvent"];
flambe.input.MouseEvent.prototype = {
	init: function(id,viewX,viewY,button) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.button = button;
	}
	,__class__: flambe.input.MouseEvent
}
flambe.input.EventSource = $hxClasses["flambe.input.EventSource"] = { __ename__ : ["flambe","input","EventSource"], __constructs__ : ["Mouse","Touch"] }
flambe.input.EventSource.Mouse = function(event) { var $x = ["Mouse",0,event]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.EventSource.Touch = function(point) { var $x = ["Touch",1,point]; $x.__enum__ = flambe.input.EventSource; $x.toString = $estr; return $x; }
flambe.input.PointerEvent = function() {
	this.init(0,0,0,null,null);
};
$hxClasses["flambe.input.PointerEvent"] = flambe.input.PointerEvent;
flambe.input.PointerEvent.__name__ = ["flambe","input","PointerEvent"];
flambe.input.PointerEvent.prototype = {
	init: function(id,viewX,viewY,hit,source) {
		this.id = id;
		this.viewX = viewX;
		this.viewY = viewY;
		this.hit = hit;
		this.source = source;
		this._stopped = false;
	}
	,__class__: flambe.input.PointerEvent
}
flambe.input.TouchPoint = function(id) {
	this.id = id;
	this._source = flambe.input.EventSource.Touch(this);
};
$hxClasses["flambe.input.TouchPoint"] = flambe.input.TouchPoint;
flambe.input.TouchPoint.__name__ = ["flambe","input","TouchPoint"];
flambe.input.TouchPoint.prototype = {
	init: function(viewX,viewY) {
		this.viewX = viewX;
		this.viewY = viewY;
	}
	,__class__: flambe.input.TouchPoint
}
flambe.math.FMath = function() { }
$hxClasses["flambe.math.FMath"] = flambe.math.FMath;
flambe.math.FMath.__name__ = ["flambe","math","FMath"];
flambe.math.FMath.max = function(a,b) {
	return a > b?a:b;
}
flambe.math.FMath.min = function(a,b) {
	return a < b?a:b;
}
flambe.math.FMath.clamp = function(value,min,max) {
	return value < min?min:value > max?max:value;
}
flambe.math.Matrix = function() {
	this.identity();
};
$hxClasses["flambe.math.Matrix"] = flambe.math.Matrix;
flambe.math.Matrix.__name__ = ["flambe","math","Matrix"];
flambe.math.Matrix.multiply = function(lhs,rhs,result) {
	if(result == null) result = new flambe.math.Matrix();
	var a = lhs.m00 * rhs.m00 + lhs.m01 * rhs.m10;
	var b = lhs.m00 * rhs.m01 + lhs.m01 * rhs.m11;
	var c = lhs.m00 * rhs.m02 + lhs.m01 * rhs.m12 + lhs.m02;
	result.m00 = a;
	result.m01 = b;
	result.m02 = c;
	a = lhs.m10 * rhs.m00 + lhs.m11 * rhs.m10;
	b = lhs.m10 * rhs.m01 + lhs.m11 * rhs.m11;
	c = lhs.m10 * rhs.m02 + lhs.m11 * rhs.m12 + lhs.m12;
	result.m10 = a;
	result.m11 = b;
	result.m12 = c;
	return result;
}
flambe.math.Matrix.prototype = {
	clone: function(result) {
		if(result == null) result = new flambe.math.Matrix();
		result.set(this.m00,this.m10,this.m01,this.m11,this.m02,this.m12);
		return result;
	}
	,inverseTransform: function(x,y,result) {
		var det = this.determinant();
		if(det == 0) return false;
		x -= this.m02;
		y -= this.m12;
		result.x = (x * this.m11 - y * this.m01) / det;
		result.y = (y * this.m00 - x * this.m10) / det;
		return true;
	}
	,determinant: function() {
		return this.m00 * this.m11 - this.m01 * this.m10;
	}
	,transformArray: function(points,length,result) {
		var ii = 0;
		while(ii < length) {
			var x = points[ii], y = points[ii + 1];
			result[ii++] = x * this.m00 + y * this.m01 + this.m02;
			result[ii++] = x * this.m10 + y * this.m11 + this.m12;
		}
	}
	,invert: function() {
		var det = this.determinant();
		if(det == 0) return false;
		this.set(this.m11 / det,-this.m01 / det,-this.m10 / det,this.m00 / det,(this.m01 * this.m12 - this.m11 * this.m02) / det,(this.m10 * this.m02 - this.m00 * this.m12) / det);
		return true;
	}
	,translate: function(x,y) {
		this.m02 += this.m00 * x + this.m01 * y;
		this.m12 += this.m11 * y + this.m10 * x;
	}
	,compose: function(x,y,scaleX,scaleY,rotation) {
		var sin = Math.sin(rotation);
		var cos = Math.cos(rotation);
		this.set(cos * scaleX,sin * scaleX,-sin * scaleY,cos * scaleY,x,y);
	}
	,identity: function() {
		this.set(1,0,0,1,0,0);
	}
	,set: function(m00,m10,m01,m11,m02,m12) {
		this.m00 = m00;
		this.m01 = m01;
		this.m02 = m02;
		this.m10 = m10;
		this.m11 = m11;
		this.m12 = m12;
	}
	,__class__: flambe.math.Matrix
}
flambe.math.Rectangle = function(x,y,width,height) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.set(x,y,width,height);
};
$hxClasses["flambe.math.Rectangle"] = flambe.math.Rectangle;
flambe.math.Rectangle.__name__ = ["flambe","math","Rectangle"];
flambe.math.Rectangle.prototype = {
	equals: function(other) {
		return this.x == other.x && this.y == other.y && this.width == other.width && this.height == other.height;
	}
	,clone: function(result) {
		if(result == null) result = new flambe.math.Rectangle();
		result.set(this.x,this.y,this.width,this.height);
		return result;
	}
	,contains: function(x,y) {
		x -= this.x;
		if(this.width >= 0) {
			if(x < 0 || x > this.width) return false;
		} else if(x > 0 || x < this.width) return false;
		y -= this.y;
		if(this.height >= 0) {
			if(y < 0 || y > this.height) return false;
		} else if(y > 0 || y < this.height) return false;
		return true;
	}
	,set: function(x,y,width,height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
	,__class__: flambe.math.Rectangle
}
flambe.platform.BasicAsset = function() {
	this._disposed = false;
};
$hxClasses["flambe.platform.BasicAsset"] = flambe.platform.BasicAsset;
flambe.platform.BasicAsset.__name__ = ["flambe","platform","BasicAsset"];
flambe.platform.BasicAsset.__interfaces__ = [flambe.asset.Asset];
flambe.platform.BasicAsset.prototype = {
	onDisposed: function() {
		null;
	}
	,dispose: function() {
		if(!this._disposed) {
			this._disposed = true;
			this.onDisposed();
		}
	}
	,__class__: flambe.platform.BasicAsset
}
flambe.platform.BasicAssetPackLoader = function(platform,manifest) {
	var _g = this;
	this.manifest = manifest;
	this._platform = platform;
	this.promise = new flambe.util.Promise();
	this._bytesLoaded = new haxe.ds.StringMap();
	this._pack = new flambe.platform._BasicAssetPackLoader.BasicAssetPack(manifest,this);
	var entries = Lambda.array(manifest);
	if(entries.length == 0) this.handleSuccess(); else {
		var groups = new haxe.ds.StringMap();
		var _g1 = 0;
		while(_g1 < entries.length) {
			var entry = entries[_g1];
			++_g1;
			var group = groups.get(entry.name);
			if(group == null) {
				group = [];
				groups.set(entry.name,group);
			}
			group.push(entry);
		}
		this._assetsRemaining = Lambda.count(groups);
		var $it0 = (((function() {
			return function(_e) {
				return (function() {
					return function() {
						return _e.iterator();
					};
				})();
			};
		})())(groups))();
		while( $it0.hasNext() ) {
			var group = $it0.next();
			var group1 = [group];
			this.pickBestEntry(group1[0],(function(group1) {
				return function(bestEntry) {
					if(bestEntry != null) {
						var url = manifest.getFullURL(bestEntry);
						try {
							_g.loadEntry(url,bestEntry);
						} catch( error ) {
							_g.handleError(bestEntry,"Unexpected error: " + Std.string(error));
						}
						var _g1 = _g.promise;
						_g1.set_total(_g1._total + bestEntry.bytes);
					} else {
						var badEntry = group1[0][0];
						if(flambe.platform.BasicAssetPackLoader.isAudio(badEntry.format)) _g.handleLoad(badEntry,flambe.platform.DummySound.getInstance()); else _g.handleError(badEntry,"Could not find a supported format to load");
					}
				};
			})(group1));
		}
	}
};
$hxClasses["flambe.platform.BasicAssetPackLoader"] = flambe.platform.BasicAssetPackLoader;
flambe.platform.BasicAssetPackLoader.__name__ = ["flambe","platform","BasicAssetPackLoader"];
flambe.platform.BasicAssetPackLoader.isAudio = function(format) {
	switch( (format)[1] ) {
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
		return true;
	default:
		return false;
	}
}
flambe.platform.BasicAssetPackLoader.prototype = {
	handleTextureError: function(entry) {
		this.handleError(entry,"Failed to create texture. Is the GPU context unavailable?");
	}
	,handleError: function(entry,message) {
		this.promise.error.emit(flambe.util.Strings.withFields(message,["url",entry.url]));
	}
	,handleSuccess: function() {
		this.promise.set_result(this._pack);
	}
	,handleProgress: function(entry,bytesLoaded) {
		this._bytesLoaded.set(entry.name,bytesLoaded);
		var bytesTotal = 0;
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this._bytesLoaded))();
		while( $it0.hasNext() ) {
			var bytes = $it0.next();
			bytesTotal += bytes;
		}
		this.promise.set_progress(bytesTotal);
	}
	,handleLoad: function(entry,asset) {
		if(this._pack.disposed) return;
		this.handleProgress(entry,entry.bytes);
		var map;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			map = this._pack.textures;
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			map = this._pack.sounds;
			break;
		case 13:
			map = this._pack.files;
			break;
		}
		map.set(entry.name,asset);
		this._assetsRemaining -= 1;
		if(this._assetsRemaining == 0) this.handleSuccess();
	}
	,getAssetFormats: function(fn) {
		null;
	}
	,loadEntry: function(url,entry) {
		null;
	}
	,pickBestEntry: function(entries,fn) {
		var onFormatsAvailable = function(formats) {
			var _g = 0;
			while(_g < formats.length) {
				var format = formats[_g];
				++_g;
				var _g1 = 0;
				while(_g1 < entries.length) {
					var entry = entries[_g1];
					++_g1;
					if(entry.format == format) {
						fn(entry);
						return;
					}
				}
			}
			fn(null);
		};
		this.getAssetFormats(onFormatsAvailable);
	}
	,onDisposed: function() {
	}
	,__class__: flambe.platform.BasicAssetPackLoader
}
flambe.platform._BasicAssetPackLoader = {}
flambe.platform._BasicAssetPackLoader.BasicAssetPack = function(manifest,loader) {
	this.disposed = false;
	this._manifest = manifest;
	this.loader = loader;
	this.textures = new haxe.ds.StringMap();
	this.sounds = new haxe.ds.StringMap();
	this.files = new haxe.ds.StringMap();
};
$hxClasses["flambe.platform._BasicAssetPackLoader.BasicAssetPack"] = flambe.platform._BasicAssetPackLoader.BasicAssetPack;
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__name__ = ["flambe","platform","_BasicAssetPackLoader","BasicAssetPack"];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.__interfaces__ = [flambe.asset.AssetPack];
flambe.platform._BasicAssetPackLoader.BasicAssetPack.prototype = {
	dispose: function() {
		if(!this.disposed) {
			this.disposed = true;
			var $it0 = ((function(_e) {
				return function() {
					return _e.iterator();
				};
			})(this.textures))();
			while( $it0.hasNext() ) {
				var texture = $it0.next();
				texture.dispose();
			}
			this.textures = null;
			var $it1 = ((function(_e1) {
				return function() {
					return _e1.iterator();
				};
			})(this.sounds))();
			while( $it1.hasNext() ) {
				var sound = $it1.next();
				sound.dispose();
			}
			this.sounds = null;
			var $it2 = ((function(_e2) {
				return function() {
					return _e2.iterator();
				};
			})(this.files))();
			while( $it2.hasNext() ) {
				var file = $it2.next();
				file.dispose();
			}
			this.files = null;
			this.loader.onDisposed();
		}
	}
	,getFile: function(name,required) {
		if(required == null) required = true;
		var file = this.files.get(name);
		if(file == null && required) throw flambe.util.Strings.withFields("Missing file",["name",name]);
		return file;
	}
	,getSound: function(name,required) {
		if(required == null) required = true;
		var sound = this.sounds.get(name);
		if(sound == null && required) throw flambe.util.Strings.withFields("Missing sound",["name",name]);
		return sound;
	}
	,getTexture: function(name,required) {
		if(required == null) required = true;
		var texture = this.textures.get(name);
		if(texture == null && required) throw flambe.util.Strings.withFields("Missing texture",["name",name]);
		return texture;
	}
	,__class__: flambe.platform._BasicAssetPackLoader.BasicAssetPack
}
flambe.platform.BasicFile = function(content) {
	flambe.platform.BasicAsset.call(this);
	this._content = content;
};
$hxClasses["flambe.platform.BasicFile"] = flambe.platform.BasicFile;
flambe.platform.BasicFile.__name__ = ["flambe","platform","BasicFile"];
flambe.platform.BasicFile.__interfaces__ = [flambe.asset.File];
flambe.platform.BasicFile.__super__ = flambe.platform.BasicAsset;
flambe.platform.BasicFile.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this._content = null;
	}
	,toString: function() {
		return this._content;
	}
	,__class__: flambe.platform.BasicFile
});
flambe.subsystem = {}
flambe.subsystem.MouseSystem = function() { }
$hxClasses["flambe.subsystem.MouseSystem"] = flambe.subsystem.MouseSystem;
flambe.subsystem.MouseSystem.__name__ = ["flambe","subsystem","MouseSystem"];
flambe.platform.BasicMouse = function(pointer) {
	this._pointer = pointer;
	this._source = flambe.input.EventSource.Mouse(flambe.platform.BasicMouse._sharedEvent);
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this.scroll = new flambe.util.Signal1();
	this._x = 0;
	this._y = 0;
	this._cursor = flambe.input.MouseCursor.Default;
	this._buttonStates = new haxe.ds.IntMap();
};
$hxClasses["flambe.platform.BasicMouse"] = flambe.platform.BasicMouse;
flambe.platform.BasicMouse.__name__ = ["flambe","platform","BasicMouse"];
flambe.platform.BasicMouse.__interfaces__ = [flambe.subsystem.MouseSystem];
flambe.platform.BasicMouse.prototype = {
	prepare: function(viewX,viewY,button) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicMouse._sharedEvent.init(flambe.platform.BasicMouse._sharedEvent.id + 1,viewX,viewY,button);
	}
	,submitScroll: function(viewX,viewY,velocity) {
		this._x = viewX;
		this._y = viewY;
		if(!(this.scroll._head != null)) return false;
		this.scroll.emit(velocity);
		return true;
	}
	,submitUp: function(viewX,viewY,buttonCode) {
		if(this._buttonStates.exists(buttonCode)) {
			this._buttonStates.remove(buttonCode);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitUp(viewX,viewY,this._source);
			this.up.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,submitMove: function(viewX,viewY) {
		this.prepare(viewX,viewY,null);
		this._pointer.submitMove(viewX,viewY,this._source);
		this.move.emit(flambe.platform.BasicMouse._sharedEvent);
	}
	,submitDown: function(viewX,viewY,buttonCode) {
		if(!this._buttonStates.exists(buttonCode)) {
			this._buttonStates.set(buttonCode,true);
			this.prepare(viewX,viewY,flambe.platform.MouseCodes.toButton(buttonCode));
			this._pointer.submitDown(viewX,viewY,this._source);
			this.down.emit(flambe.platform.BasicMouse._sharedEvent);
		}
	}
	,__class__: flambe.platform.BasicMouse
}
flambe.subsystem.PointerSystem = function() { }
$hxClasses["flambe.subsystem.PointerSystem"] = flambe.subsystem.PointerSystem;
flambe.subsystem.PointerSystem.__name__ = ["flambe","subsystem","PointerSystem"];
flambe.subsystem.PointerSystem.prototype = {
	__class__: flambe.subsystem.PointerSystem
}
flambe.platform.BasicPointer = function(x,y,isDown) {
	if(isDown == null) isDown = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
	this._x = x;
	this._y = y;
	this._isDown = isDown;
};
$hxClasses["flambe.platform.BasicPointer"] = flambe.platform.BasicPointer;
flambe.platform.BasicPointer.__name__ = ["flambe","platform","BasicPointer"];
flambe.platform.BasicPointer.__interfaces__ = [flambe.subsystem.PointerSystem];
flambe.platform.BasicPointer.prototype = {
	prepare: function(viewX,viewY,hit,source) {
		this._x = viewX;
		this._y = viewY;
		flambe.platform.BasicPointer._sharedEvent.init(flambe.platform.BasicPointer._sharedEvent.id + 1,viewX,viewY,hit,source);
	}
	,submitUp: function(viewX,viewY,source) {
		if(!this._isDown) return;
		this._isDown = false;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_5;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerUp;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.up.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitMove: function(viewX,viewY,source) {
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_5;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerMove;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.move.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,submitDown: function(viewX,viewY,source) {
		if(this._isDown) return;
		this._isDown = true;
		var chain = [];
		var hit = flambe.display.Sprite.hitTest(flambe.System.root,viewX,viewY);
		if(hit != null) {
			var entity = hit.owner;
			do {
				var sprite = entity._compMap.Sprite_5;
				if(sprite != null) chain.push(sprite);
				entity = entity.parent;
			} while(entity != null);
		}
		this.prepare(viewX,viewY,hit,source);
		var _g = 0;
		while(_g < chain.length) {
			var sprite = chain[_g];
			++_g;
			var signal = sprite._pointerDown;
			if(signal != null) {
				signal.emit(flambe.platform.BasicPointer._sharedEvent);
				if(flambe.platform.BasicPointer._sharedEvent._stopped) return;
			}
		}
		this.down.emit(flambe.platform.BasicPointer._sharedEvent);
	}
	,__class__: flambe.platform.BasicPointer
}
flambe.subsystem.TouchSystem = function() { }
$hxClasses["flambe.subsystem.TouchSystem"] = flambe.subsystem.TouchSystem;
flambe.subsystem.TouchSystem.__name__ = ["flambe","subsystem","TouchSystem"];
flambe.platform.BasicTouch = function(pointer,maxPoints) {
	if(maxPoints == null) maxPoints = 4;
	this._pointer = pointer;
	this._maxPoints = maxPoints;
	this._pointMap = new haxe.ds.IntMap();
	this._points = [];
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.BasicTouch"] = flambe.platform.BasicTouch;
flambe.platform.BasicTouch.__name__ = ["flambe","platform","BasicTouch"];
flambe.platform.BasicTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.BasicTouch.prototype = {
	submitUp: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			this._pointMap.remove(id);
			HxOverrides.remove(this._points,point);
			if(this._pointerTouch == point) {
				this._pointerTouch = null;
				this._pointer.submitUp(viewX,viewY,point._source);
			}
			this.up.emit(point);
		}
	}
	,submitMove: function(id,viewX,viewY) {
		var point = this._pointMap.get(id);
		if(point != null) {
			point.init(viewX,viewY);
			if(this._pointerTouch == point) this._pointer.submitMove(viewX,viewY,point._source);
			this.move.emit(point);
		}
	}
	,submitDown: function(id,viewX,viewY) {
		if(!this._pointMap.exists(id)) {
			var point = new flambe.input.TouchPoint(id);
			point.init(viewX,viewY);
			this._pointMap.set(id,point);
			this._points.push(point);
			if(this._pointerTouch == null) {
				this._pointerTouch = point;
				this._pointer.submitDown(viewX,viewY,point._source);
			}
			this.down.emit(point);
		}
	}
	,__class__: flambe.platform.BasicTouch
}
flambe.sound = {}
flambe.sound.Sound = function() { }
$hxClasses["flambe.sound.Sound"] = flambe.sound.Sound;
flambe.sound.Sound.__name__ = ["flambe","sound","Sound"];
flambe.sound.Sound.__interfaces__ = [flambe.asset.Asset];
flambe.sound.Sound.prototype = {
	__class__: flambe.sound.Sound
}
flambe.platform.DummySound = function() {
	flambe.platform.BasicAsset.call(this);
	this._playback = new flambe.platform.DummyPlayback(this);
};
$hxClasses["flambe.platform.DummySound"] = flambe.platform.DummySound;
flambe.platform.DummySound.__name__ = ["flambe","platform","DummySound"];
flambe.platform.DummySound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.DummySound.getInstance = function() {
	if(flambe.platform.DummySound._instance == null) flambe.platform.DummySound._instance = new flambe.platform.DummySound();
	return flambe.platform.DummySound._instance;
}
flambe.platform.DummySound.__super__ = flambe.platform.BasicAsset;
flambe.platform.DummySound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	loop: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return this._playback;
	}
	,__class__: flambe.platform.DummySound
});
flambe.sound.Playback = function() { }
$hxClasses["flambe.sound.Playback"] = flambe.sound.Playback;
flambe.sound.Playback.__name__ = ["flambe","sound","Playback"];
flambe.sound.Playback.__interfaces__ = [flambe.util.Disposable];
flambe.sound.Playback.prototype = {
	__class__: flambe.sound.Playback
}
flambe.platform.DummyPlayback = function(sound) {
	this._sound = sound;
	this.volume = new flambe.animation.AnimatedFloat(0);
};
$hxClasses["flambe.platform.DummyPlayback"] = flambe.platform.DummyPlayback;
flambe.platform.DummyPlayback.__name__ = ["flambe","platform","DummyPlayback"];
flambe.platform.DummyPlayback.__interfaces__ = [flambe.sound.Playback];
flambe.platform.DummyPlayback.prototype = {
	dispose: function() {
	}
	,set_paused: function(paused) {
		return true;
	}
	,__class__: flambe.platform.DummyPlayback
}
flambe.subsystem.StorageSystem = function() { }
$hxClasses["flambe.subsystem.StorageSystem"] = flambe.subsystem.StorageSystem;
flambe.subsystem.StorageSystem.__name__ = ["flambe","subsystem","StorageSystem"];
flambe.subsystem.StorageSystem.prototype = {
	__class__: flambe.subsystem.StorageSystem
}
flambe.platform.DummyStorage = function() {
	this.clear();
};
$hxClasses["flambe.platform.DummyStorage"] = flambe.platform.DummyStorage;
flambe.platform.DummyStorage.__name__ = ["flambe","platform","DummyStorage"];
flambe.platform.DummyStorage.__interfaces__ = [flambe.subsystem.StorageSystem];
flambe.platform.DummyStorage.prototype = {
	clear: function() {
		this._hash = new haxe.ds.StringMap();
	}
	,get: function(key,defaultValue) {
		return this._hash.exists(key)?this._hash.get(key):defaultValue;
	}
	,set: function(key,value) {
		var value1 = value;
		this._hash.set(key,value1);
		return true;
	}
	,__class__: flambe.platform.DummyStorage
}
flambe.platform.DummyTouch = function() {
	this.down = new flambe.util.Signal1();
	this.move = new flambe.util.Signal1();
	this.up = new flambe.util.Signal1();
};
$hxClasses["flambe.platform.DummyTouch"] = flambe.platform.DummyTouch;
flambe.platform.DummyTouch.__name__ = ["flambe","platform","DummyTouch"];
flambe.platform.DummyTouch.__interfaces__ = [flambe.subsystem.TouchSystem];
flambe.platform.DummyTouch.prototype = {
	__class__: flambe.platform.DummyTouch
}
flambe.platform.EventGroup = function() {
	this._entries = [];
};
$hxClasses["flambe.platform.EventGroup"] = flambe.platform.EventGroup;
flambe.platform.EventGroup.__name__ = ["flambe","platform","EventGroup"];
flambe.platform.EventGroup.__interfaces__ = [flambe.util.Disposable];
flambe.platform.EventGroup.prototype = {
	dispose: function() {
		var _g = 0, _g1 = this._entries;
		while(_g < _g1.length) {
			var entry = _g1[_g];
			++_g;
			entry.dispatcher.removeEventListener(entry.type,entry.listener,false);
		}
		this._entries = [];
	}
	,addDisposingListener: function(dispatcher,type,listener) {
		var _g = this;
		this.addListener(dispatcher,type,function(event) {
			_g.dispose();
			listener(event);
		});
	}
	,addListener: function(dispatcher,type,listener) {
		dispatcher.addEventListener(type,listener,false);
		this._entries.push(new flambe.platform._EventGroup.Entry(dispatcher,type,listener));
	}
	,__class__: flambe.platform.EventGroup
}
flambe.platform._EventGroup = {}
flambe.platform._EventGroup.Entry = function(dispatcher,type,listener) {
	this.dispatcher = dispatcher;
	this.type = type;
	this.listener = listener;
};
$hxClasses["flambe.platform._EventGroup.Entry"] = flambe.platform._EventGroup.Entry;
flambe.platform._EventGroup.Entry.__name__ = ["flambe","platform","_EventGroup","Entry"];
flambe.platform._EventGroup.Entry.prototype = {
	__class__: flambe.platform._EventGroup.Entry
}
flambe.platform.InternalGraphics = function() { }
$hxClasses["flambe.platform.InternalGraphics"] = flambe.platform.InternalGraphics;
flambe.platform.InternalGraphics.__name__ = ["flambe","platform","InternalGraphics"];
flambe.platform.InternalGraphics.__interfaces__ = [flambe.display.Graphics];
flambe.platform.InternalGraphics.prototype = {
	__class__: flambe.platform.InternalGraphics
}
flambe.platform.MainLoop = function() {
	this._tickables = [];
};
$hxClasses["flambe.platform.MainLoop"] = flambe.platform.MainLoop;
flambe.platform.MainLoop.__name__ = ["flambe","platform","MainLoop"];
flambe.platform.MainLoop.updateEntity = function(entity,dt) {
	var speed = entity._compMap.SpeedAdjuster_39;
	if(speed != null) {
		speed._realDt = dt;
		dt *= speed.scale._value;
		if(dt <= 0) {
			speed.onUpdate(dt);
			return;
		}
	}
	var p = entity.firstComponent;
	while(p != null) {
		var next = p.next;
		p.onUpdate(dt);
		p = next;
	}
	var p1 = entity.firstChild;
	while(p1 != null) {
		var next = p1.next;
		flambe.platform.MainLoop.updateEntity(p1,dt);
		p1 = next;
	}
}
flambe.platform.MainLoop.prototype = {
	addTickable: function(t) {
		this._tickables.push(t);
	}
	,render: function(renderer) {
		var graphics = renderer.graphics;
		if(graphics != null) {
			renderer.willRender();
			flambe.display.Sprite.render(flambe.System.root,graphics);
			renderer.didRender();
		}
	}
	,update: function(dt) {
		if(dt <= 0) return;
		if(dt > 1) dt = 1;
		var ii = 0;
		while(ii < this._tickables.length) {
			var t = this._tickables[ii];
			if(t == null || t.update(dt)) this._tickables.splice(ii,1); else ++ii;
		}
		flambe.System.volume.update(dt);
		flambe.platform.MainLoop.updateEntity(flambe.System.root,dt);
	}
	,__class__: flambe.platform.MainLoop
}
flambe.platform.MouseCodes = function() { }
$hxClasses["flambe.platform.MouseCodes"] = flambe.platform.MouseCodes;
flambe.platform.MouseCodes.__name__ = ["flambe","platform","MouseCodes"];
flambe.platform.MouseCodes.toButton = function(buttonCode) {
	switch(buttonCode) {
	case 0:
		return flambe.input.MouseButton.Left;
	case 1:
		return flambe.input.MouseButton.Middle;
	case 2:
		return flambe.input.MouseButton.Right;
	}
	return flambe.input.MouseButton.Unknown(buttonCode);
}
flambe.platform.Renderer = function() { }
$hxClasses["flambe.platform.Renderer"] = flambe.platform.Renderer;
flambe.platform.Renderer.__name__ = ["flambe","platform","Renderer"];
flambe.platform.Renderer.prototype = {
	__class__: flambe.platform.Renderer
}
flambe.platform.Tickable = function() { }
$hxClasses["flambe.platform.Tickable"] = flambe.platform.Tickable;
flambe.platform.Tickable.__name__ = ["flambe","platform","Tickable"];
flambe.platform.Tickable.prototype = {
	__class__: flambe.platform.Tickable
}
flambe.platform.html.CanvasGraphics = function(canvas) {
	this._firstDraw = false;
	this._canvasCtx = canvas.getContext("2d");
};
$hxClasses["flambe.platform.html.CanvasGraphics"] = flambe.platform.html.CanvasGraphics;
flambe.platform.html.CanvasGraphics.__name__ = ["flambe","platform","html","CanvasGraphics"];
flambe.platform.html.CanvasGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.CanvasGraphics.prototype = {
	onResize: function(width,height) {
	}
	,didRender: function() {
	}
	,willRender: function() {
		this._firstDraw = true;
	}
	,applyScissor: function(x,y,width,height) {
		this._canvasCtx.beginPath();
		this._canvasCtx.rect(x | 0,y | 0,width | 0,height | 0);
		this._canvasCtx.clip();
	}
	,setBlendMode: function(blendMode) {
		var op;
		switch( (blendMode)[1] ) {
		case 0:
			op = "source-over";
			break;
		case 1:
			op = "lighter";
			break;
		case 2:
			op = "destination-in";
			break;
		case 3:
			op = "copy";
			break;
		}
		this._canvasCtx.globalCompositeOperation = op;
	}
	,multiplyAlpha: function(factor) {
		this._canvasCtx.globalAlpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.fillRect(color,x,y,width,height);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var hex = (16777215 & color).toString(16);
		while(hex.length < 6) hex = "0" + Std.string(hex);
		this._canvasCtx.fillStyle = "#" + Std.string(hex);
		this._canvasCtx.fillRect(x | 0,y | 0,width | 0,height | 0);
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawSubImage(texture,destX,destY,sourceX,sourceY,sourceW,sourceH);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		this._canvasCtx.drawImage(texture1.image,sourceX | 0,sourceY | 0,sourceW | 0,sourceH | 0,destX | 0,destY | 0,sourceW | 0,sourceH | 0);
	}
	,drawImage: function(texture,x,y) {
		if(this._firstDraw) {
			this._firstDraw = false;
			this._canvasCtx.globalCompositeOperation = "copy";
			this.drawImage(texture,x,y);
			this._canvasCtx.globalCompositeOperation = "source-over";
			return;
		}
		var texture1 = texture;
		this._canvasCtx.drawImage(texture1.image,x | 0,y | 0);
	}
	,restore: function() {
		this._canvasCtx.restore();
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		this._canvasCtx.transform(m00,m10,m01,m11,m02,m12);
	}
	,save: function() {
		this._canvasCtx.save();
	}
	,__class__: flambe.platform.html.CanvasGraphics
}
flambe.platform.html.CanvasRenderer = function(canvas) {
	this.graphics = new flambe.platform.html.CanvasGraphics(canvas);
	flambe.System.hasGPU.set__(true);
};
$hxClasses["flambe.platform.html.CanvasRenderer"] = flambe.platform.html.CanvasRenderer;
flambe.platform.html.CanvasRenderer.__name__ = ["flambe","platform","html","CanvasRenderer"];
flambe.platform.html.CanvasRenderer.__interfaces__ = [flambe.platform.Renderer];
flambe.platform.html.CanvasRenderer.prototype = {
	didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createTexture: function(image) {
		return new flambe.platform.html.CanvasTexture(flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES?flambe.platform.html.HtmlUtil.createCanvas(image):image);
	}
	,__class__: flambe.platform.html.CanvasRenderer
}
flambe.platform.html.CanvasTexture = function(image) {
	this._graphics = null;
	this.pattern = null;
	flambe.platform.BasicAsset.call(this);
	this.image = image;
};
$hxClasses["flambe.platform.html.CanvasTexture"] = flambe.platform.html.CanvasTexture;
flambe.platform.html.CanvasTexture.__name__ = ["flambe","platform","html","CanvasTexture"];
flambe.platform.html.CanvasTexture.__interfaces__ = [flambe.display.Texture];
flambe.platform.html.CanvasTexture.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.CanvasTexture.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.image = null;
		this.pattern = null;
		this._graphics = null;
	}
	,get_height: function() {
		return this.image.height;
	}
	,get_width: function() {
		return this.image.width;
	}
	,__class__: flambe.platform.html.CanvasTexture
});
flambe.platform.html.HtmlAssetPackLoader = function(platform,manifest) {
	flambe.platform.BasicAssetPackLoader.call(this,platform,manifest);
};
$hxClasses["flambe.platform.html.HtmlAssetPackLoader"] = flambe.platform.html.HtmlAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.__name__ = ["flambe","platform","html","HtmlAssetPackLoader"];
flambe.platform.html.HtmlAssetPackLoader.detectImageFormats = function(fn) {
	var formats = [flambe.asset.AssetFormat.PNG,flambe.asset.AssetFormat.JPG,flambe.asset.AssetFormat.GIF];
	var formatTests = 2;
	var checkRemaining = function() {
		--formatTests;
		if(formatTests == 0) fn(formats);
	};
	var webp = js.Browser.document.createElement("img");
	webp.onload = webp.onerror = function(_) {
		if(webp.width == 1) formats.unshift(flambe.asset.AssetFormat.WEBP);
		checkRemaining();
	};
	webp.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==";
	var jxr = js.Browser.document.createElement("img");
	jxr.onload = jxr.onerror = function(_) {
		if(jxr.width == 1) formats.unshift(flambe.asset.AssetFormat.JXR);
		checkRemaining();
	};
	jxr.src = "data:image/vnd.ms-photo;base64,SUm8AQgAAAAFAAG8AQAQAAAASgAAAIC8BAABAAAAAQAAAIG8BAABAAAAAQAAAMC8BAABAAAAWgAAAMG8BAABAAAAHwAAAAAAAAAkw91vA07+S7GFPXd2jckNV01QSE9UTwAZAYBxAAAAABP/gAAEb/8AAQAAAQAAAA==";
}
flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats = function() {
	var audio = js.Browser.document.createElement("audio");
	if(audio == null || $bind(audio,audio.canPlayType) == null) return [];
	var blacklist = new EReg("\\b(iPhone|iPod|iPad|Android)\\b","");
	var userAgent = js.Browser.window.navigator.userAgent;
	if(!flambe.platform.html.WebAudioSound.get_supported() && blacklist.match(userAgent)) return [];
	var types = [{ format : flambe.asset.AssetFormat.M4A, mimeType : "audio/mp4; codecs=mp4a"},{ format : flambe.asset.AssetFormat.MP3, mimeType : "audio/mpeg"},{ format : flambe.asset.AssetFormat.OPUS, mimeType : "audio/ogg; codecs=opus"},{ format : flambe.asset.AssetFormat.OGG, mimeType : "audio/ogg; codecs=vorbis"},{ format : flambe.asset.AssetFormat.WAV, mimeType : "audio/wav"}];
	var result = [];
	var _g = 0;
	while(_g < types.length) {
		var type = types[_g];
		++_g;
		var canPlayType = "";
		try {
			canPlayType = audio.canPlayType(type.mimeType);
		} catch( _ ) {
		}
		if(canPlayType != "") result.push(type.format);
	}
	return result;
}
flambe.platform.html.HtmlAssetPackLoader.supportsBlob = function() {
	if(flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport) {
		flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = false;
		var xhr = new XMLHttpRequest();
		xhr.open("GET",".",true);
		xhr.responseType = "blob";
		if(xhr.responseType != "blob") return false;
		flambe.platform.html.HtmlAssetPackLoader._URL = flambe.platform.html.HtmlUtil.loadExtension("URL").value;
	}
	return flambe.platform.html.HtmlAssetPackLoader._URL != null && flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL != null;
}
flambe.platform.html.HtmlAssetPackLoader.__super__ = flambe.platform.BasicAssetPackLoader;
flambe.platform.html.HtmlAssetPackLoader.prototype = $extend(flambe.platform.BasicAssetPackLoader.prototype,{
	download: function(url,entry,responseType,onLoad) {
		var _g = this;
		var xhr = new XMLHttpRequest();
		var lastActivity = 0.0;
		var start = function() {
			lastActivity = Date.now();
			xhr.open("GET",url,true);
			xhr.responseType = responseType;
			if(xhr.responseType == "") xhr.responseType = "arraybuffer";
			xhr.send();
		};
		var interval = 0;
		if(typeof(xhr.onprogress) != "undefined") {
			var attempts = 4;
			xhr.onprogress = function(event) {
				lastActivity = Date.now();
				_g.handleProgress(entry,event.loaded);
			};
		}
		xhr.onload = function(_) {
			js.Browser.window.clearInterval(interval);
			var response = xhr.response;
			if(response == null) response = xhr.responseText; else if(responseType == "blob" && xhr.responseType == "arraybuffer") response = new Blob([xhr.response]);
			onLoad(response);
		};
		xhr.onerror = function(_) {
			js.Browser.window.clearInterval(interval);
			_g.handleError(entry,"Failed to load asset: error #" + xhr.status);
		};
		start();
		return xhr;
	}
	,getAssetFormats: function(fn) {
		var _g = this;
		if(flambe.platform.html.HtmlAssetPackLoader._supportedFormats == null) {
			flambe.platform.html.HtmlAssetPackLoader._supportedFormats = new flambe.util.Promise();
			flambe.platform.html.HtmlAssetPackLoader.detectImageFormats(function(imageFormats) {
				flambe.platform.html.HtmlAssetPackLoader._supportedFormats.set_result(_g._platform.getRenderer().getCompressedTextureFormats().concat(imageFormats).concat(flambe.platform.html.HtmlAssetPackLoader.detectAudioFormats()).concat([flambe.asset.AssetFormat.Data]));
			});
		}
		flambe.platform.html.HtmlAssetPackLoader._supportedFormats.get(fn);
	}
	,loadEntry: function(url,entry) {
		var _g = this;
		switch( (entry.format)[1] ) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
			var image = js.Browser.document.createElement("img");
			var events = new flambe.platform.EventGroup();
			events.addDisposingListener(image,"load",function(_) {
				if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) flambe.platform.html.HtmlAssetPackLoader._URL.revokeObjectURL(image.src);
				var texture = _g._platform.getRenderer().createTexture(image);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			events.addDisposingListener(image,"error",function(_) {
				_g.handleError(entry,"Failed to load image");
			});
			if(flambe.platform.html.HtmlAssetPackLoader.supportsBlob()) this.download(url,entry,"blob",function(blob) {
				image.src = flambe.platform.html.HtmlAssetPackLoader._URL.createObjectURL(blob);
			}); else image.src = url;
			break;
		case 5:
		case 6:
		case 7:
			this.download(url,entry,"arraybuffer",function(buffer) {
				var texture = _g._platform.getRenderer().createCompressedTexture(entry.format,null);
				if(texture != null) _g.handleLoad(entry,texture); else _g.handleTextureError(entry);
			});
			break;
		case 8:
		case 9:
		case 10:
		case 11:
		case 12:
			if(flambe.platform.html.WebAudioSound.get_supported()) this.download(url,entry,"arraybuffer",function(buffer) {
				flambe.platform.html.WebAudioSound.ctx.decodeAudioData(buffer,function(decoded) {
					_g.handleLoad(entry,new flambe.platform.html.WebAudioSound(decoded));
				},function() {
					_g.handleLoad(entry,flambe.platform.DummySound.getInstance());
				});
			}); else {
				var audio = js.Browser.document.createElement("audio");
				audio.preload = "auto";
				var ref = ++flambe.platform.html.HtmlAssetPackLoader._mediaRefCount;
				if(flambe.platform.html.HtmlAssetPackLoader._mediaElements == null) flambe.platform.html.HtmlAssetPackLoader._mediaElements = new haxe.ds.IntMap();
				flambe.platform.html.HtmlAssetPackLoader._mediaElements.set(ref,audio);
				var events = new flambe.platform.EventGroup();
				events.addDisposingListener(audio,"canplaythrough",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					_g.handleLoad(entry,new flambe.platform.html.HtmlSound(audio));
				});
				events.addDisposingListener(audio,"error",function(_) {
					flambe.platform.html.HtmlAssetPackLoader._mediaElements.remove(ref);
					var code = audio.error.code;
					if(code == 3 || code == 4) _g.handleLoad(entry,flambe.platform.DummySound.getInstance()); else _g.handleError(entry,"Failed to load audio: " + audio.error.code);
				});
				events.addListener(audio,"progress",function(_) {
					if(audio.buffered.length > 0 && audio.duration > 0) {
						var progress = audio.buffered.end(0) / audio.duration;
						_g.handleProgress(entry,progress * entry.bytes | 0);
					}
				});
				audio.src = url;
				audio.load();
			}
			break;
		case 13:
			this.download(url,entry,"text",function(text) {
				_g.handleLoad(entry,new flambe.platform.BasicFile(text));
			});
			break;
		}
	}
	,__class__: flambe.platform.html.HtmlAssetPackLoader
});
flambe.subsystem.ExternalSystem = function() { }
$hxClasses["flambe.subsystem.ExternalSystem"] = flambe.subsystem.ExternalSystem;
flambe.subsystem.ExternalSystem.__name__ = ["flambe","subsystem","ExternalSystem"];
flambe.subsystem.ExternalSystem.prototype = {
	__class__: flambe.subsystem.ExternalSystem
}
flambe.platform.html.HtmlExternal = function() {
};
$hxClasses["flambe.platform.html.HtmlExternal"] = flambe.platform.html.HtmlExternal;
flambe.platform.html.HtmlExternal.__name__ = ["flambe","platform","html","HtmlExternal"];
flambe.platform.html.HtmlExternal.__interfaces__ = [flambe.subsystem.ExternalSystem];
flambe.platform.html.HtmlExternal.prototype = {
	bind: function(name,fn) {
		js.Browser.window[name] = fn;
	}
	,call: function(name,params) {
		if(params == null) params = [];
		var method = Reflect.field(js.Browser.window,name);
		return method.apply(null,params);
	}
	,__class__: flambe.platform.html.HtmlExternal
}
flambe.platform.html.HtmlMouse = function(pointer,canvas) {
	flambe.platform.BasicMouse.call(this,pointer);
	this._canvas = canvas;
};
$hxClasses["flambe.platform.html.HtmlMouse"] = flambe.platform.html.HtmlMouse;
flambe.platform.html.HtmlMouse.__name__ = ["flambe","platform","html","HtmlMouse"];
flambe.platform.html.HtmlMouse.__super__ = flambe.platform.BasicMouse;
flambe.platform.html.HtmlMouse.prototype = $extend(flambe.platform.BasicMouse.prototype,{
	__class__: flambe.platform.html.HtmlMouse
});
flambe.platform.html.HtmlSound = function(audioElement) {
	flambe.platform.BasicAsset.call(this);
	this.audioElement = audioElement;
};
$hxClasses["flambe.platform.html.HtmlSound"] = flambe.platform.html.HtmlSound;
flambe.platform.html.HtmlSound.__name__ = ["flambe","platform","html","HtmlSound"];
flambe.platform.html.HtmlSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.HtmlSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.HtmlSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.audioElement = null;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._HtmlSound.HtmlPlayback(this,volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._HtmlSound.HtmlPlayback(this,volume,false);
	}
	,__class__: flambe.platform.html.HtmlSound
});
flambe.platform.html._HtmlSound = {}
flambe.platform.html._HtmlSound.HtmlPlayback = function(sound,volume,loop) {
	this._disposed = false;
	var _g = this;
	this._sound = sound;
	this._tickableAdded = false;
	this._clonedElement = js.Browser.document.createElement("audio");
	this._clonedElement.loop = loop;
	this._clonedElement.src = sound.audioElement.src;
	this.volume = new flambe.animation.AnimatedFloat(volume,function(_,_1) {
		_g.updateVolume();
	});
	this.updateVolume();
	this.playAudio();
	if(flambe.System.hidden._value) this.set_paused(true);
};
$hxClasses["flambe.platform.html._HtmlSound.HtmlPlayback"] = flambe.platform.html._HtmlSound.HtmlPlayback;
flambe.platform.html._HtmlSound.HtmlPlayback.__name__ = ["flambe","platform","html","_HtmlSound","HtmlPlayback"];
flambe.platform.html._HtmlSound.HtmlPlayback.__interfaces__ = [flambe.platform.Tickable,flambe.sound.Playback];
flambe.platform.html._HtmlSound.HtmlPlayback.prototype = {
	updateVolume: function() {
		this._clonedElement.volume = flambe.System.volume._value * this.volume._value;
	}
	,playAudio: function() {
		var _g = this;
		this._clonedElement.play();
		if(!this._tickableAdded) {
			flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._volumeBinding = flambe.System.volume.get_changed().connect(function(_,_1) {
				_g.updateVolume();
			});
			this._hideBinding = flambe.System.hidden.get_changed().connect(function(hidden,_) {
				if(hidden) {
					_g._wasPaused = _g._clonedElement.paused;
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,dispose: function() {
		this.set_paused(true);
		this._disposed = true;
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this.get_ended() || this._clonedElement.paused) {
			this._tickableAdded = false;
			this._volumeBinding.dispose();
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,get_ended: function() {
		return this._disposed || this._clonedElement.ended;
	}
	,set_paused: function(paused) {
		if(this._clonedElement.paused != paused) {
			if(paused) this._clonedElement.pause(); else this.playAudio();
		}
		return paused;
	}
	,__class__: flambe.platform.html._HtmlSound.HtmlPlayback
}
flambe.subsystem.StageSystem = function() { }
$hxClasses["flambe.subsystem.StageSystem"] = flambe.subsystem.StageSystem;
flambe.subsystem.StageSystem.__name__ = ["flambe","subsystem","StageSystem"];
flambe.platform.html.HtmlStage = function(canvas) {
	var _g = this;
	this._canvas = canvas;
	this.resize = new flambe.util.Signal0();
	this.scaleFactor = flambe.platform.html.HtmlStage.computeScaleFactor();
	if(this.scaleFactor != 1) {
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform-origin","top left");
		flambe.platform.html.HtmlUtil.setVendorStyle(this._canvas,"transform","scale(" + 1 / this.scaleFactor + ")");
	}
	if(flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER) {
		js.Browser.window.addEventListener("orientationchange",function(_) {
			flambe.platform.html.HtmlUtil.callLater($bind(_g,_g.hideMobileBrowser),200);
		},false);
		this.hideMobileBrowser();
	}
	js.Browser.window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.onWindowResize(null);
	this.orientation = new flambe.util.Value(null);
	if(js.Browser.window.orientation != null) {
		js.Browser.window.addEventListener("orientationchange",$bind(this,this.onOrientationChange),false);
		this.onOrientationChange(null);
	}
	this.fullscreen = new flambe.util.Value(false);
	flambe.platform.html.HtmlUtil.addVendorListener(js.Browser.document,"fullscreenchange",function(_) {
		_g.updateFullscreen();
	},false);
	this.updateFullscreen();
};
$hxClasses["flambe.platform.html.HtmlStage"] = flambe.platform.html.HtmlStage;
flambe.platform.html.HtmlStage.__name__ = ["flambe","platform","html","HtmlStage"];
flambe.platform.html.HtmlStage.__interfaces__ = [flambe.subsystem.StageSystem];
flambe.platform.html.HtmlStage.computeScaleFactor = function() {
	var devicePixelRatio = js.Browser.window.devicePixelRatio;
	if(devicePixelRatio == null) devicePixelRatio = 1;
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	var backingStorePixelRatio = flambe.platform.html.HtmlUtil.loadExtension("backingStorePixelRatio",ctx).value;
	if(backingStorePixelRatio == null) backingStorePixelRatio = 1;
	var scale = devicePixelRatio / backingStorePixelRatio;
	var screenWidth = js.Browser.window.screen.width;
	var screenHeight = js.Browser.window.screen.height;
	if(scale * screenWidth > 1136 || scale * screenHeight > 1136) return 1;
	return scale;
}
flambe.platform.html.HtmlStage.prototype = {
	updateFullscreen: function() {
		var state = flambe.platform.html.HtmlUtil.loadFirstExtension(["fullscreen","fullScreen","isFullScreen"],js.Browser.document).value;
		this.fullscreen.set__(state == true);
	}
	,onOrientationChange: function(_) {
		var value = flambe.platform.html.HtmlUtil.orientation(js.Browser.window.orientation);
		this.orientation.set__(value);
	}
	,hideMobileBrowser: function() {
		var _g = this;
		var mobileAddressBar = 100;
		var htmlStyle = js.Browser.document.documentElement.style;
		htmlStyle.height = js.Browser.window.innerHeight + mobileAddressBar + "px";
		htmlStyle.width = js.Browser.window.innerWidth + "px";
		htmlStyle.overflow = "visible";
		flambe.platform.html.HtmlUtil.callLater(function() {
			flambe.platform.html.HtmlUtil.hideMobileBrowser();
			flambe.platform.html.HtmlUtil.callLater(function() {
				htmlStyle.height = js.Browser.window.innerHeight + "px";
				_g.onWindowResize(null);
			},100);
		});
	}
	,resizeCanvas: function(width,height) {
		var scaledWidth = this.scaleFactor * width;
		var scaledHeight = this.scaleFactor * height;
		if(this._canvas.width == scaledWidth && this._canvas.height == scaledHeight) return false;
		this._canvas.width = scaledWidth | 0;
		this._canvas.height = scaledHeight | 0;
		this.resize.emit();
		return true;
	}
	,onWindowResize: function(_) {
		var container = this._canvas.parentElement;
		var rect = container.getBoundingClientRect();
		this.resizeCanvas(rect.width,rect.height);
	}
	,get_height: function() {
		return this._canvas.height;
	}
	,get_width: function() {
		return this._canvas.width;
	}
	,__class__: flambe.platform.html.HtmlStage
}
flambe.platform.html.HtmlStorage = function(storage) {
	this._storage = storage;
};
$hxClasses["flambe.platform.html.HtmlStorage"] = flambe.platform.html.HtmlStorage;
flambe.platform.html.HtmlStorage.__name__ = ["flambe","platform","html","HtmlStorage"];
flambe.platform.html.HtmlStorage.__interfaces__ = [flambe.subsystem.StorageSystem];
flambe.platform.html.HtmlStorage.prototype = {
	get: function(key,defaultValue) {
		var encoded = null;
		try {
			encoded = this._storage.getItem("flambe:" + key);
		} catch( error ) {
			null;
		}
		if(encoded != null) try {
			return haxe.Unserializer.run(encoded);
		} catch( error ) {
			null;
		}
		return defaultValue;
	}
	,set: function(key,value) {
		var encoded;
		try {
			var serializer = new haxe.Serializer();
			serializer.useCache = true;
			serializer.useEnumIndex = false;
			serializer.serialize(value);
			encoded = serializer.toString();
		} catch( error ) {
			return false;
		}
		try {
			this._storage.setItem("flambe:" + key,encoded);
		} catch( error ) {
			return false;
		}
		return true;
	}
	,__class__: flambe.platform.html.HtmlStorage
}
flambe.platform.html.HtmlUtil = function() { }
$hxClasses["flambe.platform.html.HtmlUtil"] = flambe.platform.html.HtmlUtil;
flambe.platform.html.HtmlUtil.__name__ = ["flambe","platform","html","HtmlUtil"];
flambe.platform.html.HtmlUtil.callLater = function(func,delay) {
	if(delay == null) delay = 0;
	js.Browser.window.setTimeout(func,delay);
}
flambe.platform.html.HtmlUtil.hideMobileBrowser = function() {
	js.Browser.window.scrollTo(1,0);
}
flambe.platform.html.HtmlUtil.loadExtension = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var extension = Reflect.field(obj,name);
	if(extension != null) return { prefix : "", field : name, value : extension};
	var capitalized = name.charAt(0).toUpperCase() + HxOverrides.substr(name,1,null);
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		var field = prefix + capitalized;
		var extension1 = Reflect.field(obj,field);
		if(extension1 != null) return { prefix : prefix, field : field, value : extension1};
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.loadFirstExtension = function(names,obj) {
	var _g = 0;
	while(_g < names.length) {
		var name = names[_g];
		++_g;
		var extension = flambe.platform.html.HtmlUtil.loadExtension(name,obj);
		if(extension.field != null) return extension;
	}
	return { prefix : null, field : null, value : null};
}
flambe.platform.html.HtmlUtil.polyfill = function(name,obj) {
	if(obj == null) obj = js.Browser.window;
	var value = flambe.platform.html.HtmlUtil.loadExtension(name,obj).value;
	if(value == null) return false;
	obj[name] = value;
	return true;
}
flambe.platform.html.HtmlUtil.setVendorStyle = function(element,name,value) {
	var style = element.style;
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		style.setProperty("-" + prefix + "-" + name,value);
	}
	style.setProperty(name,value);
}
flambe.platform.html.HtmlUtil.addVendorListener = function(dispatcher,type,listener,useCapture) {
	var _g = 0, _g1 = flambe.platform.html.HtmlUtil.VENDOR_PREFIXES;
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		dispatcher.addEventListener(prefix + type,listener,useCapture);
	}
	dispatcher.addEventListener(type,listener,useCapture);
}
flambe.platform.html.HtmlUtil.orientation = function(angle) {
	switch(angle) {
	case -90:case 90:
		return flambe.display.Orientation.Landscape;
	default:
		return flambe.display.Orientation.Portrait;
	}
}
flambe.platform.html.HtmlUtil.createEmptyCanvas = function(width,height) {
	var canvas = js.Browser.document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	return canvas;
}
flambe.platform.html.HtmlUtil.createCanvas = function(source) {
	var canvas = flambe.platform.html.HtmlUtil.createEmptyCanvas(source.width,source.height);
	var ctx = canvas.getContext("2d");
	ctx.save();
	ctx.globalCompositeOperation = "copy";
	ctx.drawImage(source,0,0);
	ctx.restore();
	return canvas;
}
flambe.platform.html.HtmlUtil.detectSlowDriver = function(gl) {
	var windows = js.Browser.navigator.platform.indexOf("Win") >= 0;
	if(windows) {
		var chrome = js.Browser.window.chrome != null;
		if(chrome) {
			var _g = 0, _g1 = gl.getSupportedExtensions();
			while(_g < _g1.length) {
				var ext = _g1[_g];
				++_g;
				if(ext.indexOf("WEBGL_compressed_texture") >= 0) return false;
			}
			return true;
		}
	}
	return false;
}
flambe.platform.html.HtmlUtil.fixAndroidMath = function() {
	if(js.Browser.navigator.userAgent.indexOf("Linux; U; Android 4") >= 0) {
		var sin = Math.sin, cos = Math.cos;
		Math.sin = function(x) {
			return x == 0?0:sin(x);
		};
		Math.cos = function(x) {
			return x == 0?1:cos(x);
		};
	}
}
flambe.platform.html.WebAudioSound = function(buffer) {
	flambe.platform.BasicAsset.call(this);
	this.buffer = buffer;
};
$hxClasses["flambe.platform.html.WebAudioSound"] = flambe.platform.html.WebAudioSound;
flambe.platform.html.WebAudioSound.__name__ = ["flambe","platform","html","WebAudioSound"];
flambe.platform.html.WebAudioSound.__interfaces__ = [flambe.sound.Sound];
flambe.platform.html.WebAudioSound.get_supported = function() {
	if(flambe.platform.html.WebAudioSound._detectSupport) {
		flambe.platform.html.WebAudioSound._detectSupport = false;
		var AudioContext = flambe.platform.html.HtmlUtil.loadExtension("AudioContext").value;
		if(AudioContext != null) {
			flambe.platform.html.WebAudioSound.ctx = new AudioContext();
			flambe.platform.html.WebAudioSound.gain = flambe.platform.html.WebAudioSound.createGain();
			flambe.platform.html.WebAudioSound.gain.connect(flambe.platform.html.WebAudioSound.ctx.destination);
			flambe.System.volume.watch(function(volume,_) {
				flambe.platform.html.WebAudioSound.gain.gain.value = volume;
			});
		}
	}
	return flambe.platform.html.WebAudioSound.ctx != null;
}
flambe.platform.html.WebAudioSound.createGain = function() {
	return flambe.platform.html.WebAudioSound.ctx.createGain != null?flambe.platform.html.WebAudioSound.ctx.createGain():flambe.platform.html.WebAudioSound.ctx.createGainNode();
}
flambe.platform.html.WebAudioSound.start = function(node,time) {
	if(node.start != null) node.start(time); else node.noteOn(time);
}
flambe.platform.html.WebAudioSound.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebAudioSound.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	onDisposed: function() {
		this.buffer = null;
	}
	,get_duration: function() {
		return this.buffer.duration;
	}
	,loop: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._WebAudioSound.WebAudioPlayback(this,volume,true);
	}
	,play: function(volume) {
		if(volume == null) volume = 1.0;
		return new flambe.platform.html._WebAudioSound.WebAudioPlayback(this,volume,false);
	}
	,__class__: flambe.platform.html.WebAudioSound
});
flambe.platform.html._WebAudioSound = {}
flambe.platform.html._WebAudioSound.WebAudioPlayback = function(sound,volume,loop) {
	this._ended = false;
	var _g = this;
	this._sound = sound;
	this._head = flambe.platform.html.WebAudioSound.gain;
	this._sourceNode = flambe.platform.html.WebAudioSound.ctx.createBufferSource();
	this._sourceNode.buffer = sound.buffer;
	this._sourceNode.loop = loop;
	this._sourceNode.onended = function() {
		_g._ended = true;
	};
	flambe.platform.html.WebAudioSound.start(this._sourceNode,0);
	this.playAudio();
	this.volume = new flambe.animation.AnimatedFloat(volume,function(v,_) {
		_g.setVolume(v);
	});
	if(volume != 1) this.setVolume(volume);
	if(flambe.System.hidden._value) this.set_paused(true);
};
$hxClasses["flambe.platform.html._WebAudioSound.WebAudioPlayback"] = flambe.platform.html._WebAudioSound.WebAudioPlayback;
flambe.platform.html._WebAudioSound.WebAudioPlayback.__name__ = ["flambe","platform","html","_WebAudioSound","WebAudioPlayback"];
flambe.platform.html._WebAudioSound.WebAudioPlayback.__interfaces__ = [flambe.platform.Tickable,flambe.sound.Playback];
flambe.platform.html._WebAudioSound.WebAudioPlayback.prototype = {
	playAudio: function() {
		var _g = this;
		this._sourceNode.connect(this._head);
		this._startedAt = flambe.platform.html.WebAudioSound.ctx.currentTime;
		this._pausedAt = -1;
		if(!this._tickableAdded) {
			flambe.platform.html.HtmlPlatform.instance.mainLoop.addTickable(this);
			this._tickableAdded = true;
			this._hideBinding = flambe.System.hidden.get_changed().connect(function(hidden,_) {
				if(hidden) {
					_g._wasPaused = _g._pausedAt >= 0;
					_g.set_paused(true);
				} else _g.set_paused(_g._wasPaused);
			});
		}
	}
	,insertNode: function(head) {
		if(!(this._pausedAt >= 0)) {
			this._sourceNode.disconnect();
			this._sourceNode.connect(head);
		}
		head.connect(this._head);
		this._head = head;
	}
	,setVolume: function(volume) {
		if(this._gainNode == null) {
			this._gainNode = flambe.platform.html.WebAudioSound.createGain();
			this.insertNode(this._gainNode);
		}
		this._gainNode.gain.value = volume;
	}
	,dispose: function() {
		this.set_paused(true);
		this._ended = true;
	}
	,update: function(dt) {
		this.volume.update(dt);
		if(this.get_ended() || this._pausedAt >= 0) {
			this._tickableAdded = false;
			this._hideBinding.dispose();
			return true;
		}
		return false;
	}
	,get_position: function() {
		if(this.get_ended()) return this._sound.get_duration(); else if(this._pausedAt >= 0) return this._pausedAt; else {
			var elapsed = flambe.platform.html.WebAudioSound.ctx.currentTime - this._startedAt;
			return elapsed % this._sound.get_duration();
		}
	}
	,get_ended: function() {
		return this._ended || this._sourceNode.playbackState == 3;
	}
	,set_paused: function(paused) {
		if(paused != this._pausedAt >= 0) {
			if(paused) {
				this._sourceNode.disconnect();
				this._pausedAt = this.get_position();
			} else this.playAudio();
		}
		return paused;
	}
	,__class__: flambe.platform.html._WebAudioSound.WebAudioPlayback
}
flambe.platform.html.WebGLBatcher = function(gl) {
	this._backbufferHeight = 0;
	this._backbufferWidth = 0;
	this._dataOffset = 0;
	this._maxQuads = 0;
	this._quads = 0;
	this._pendingSetScissor = false;
	this._currentRenderTarget = null;
	this._currentTexture = null;
	this._currentShader = null;
	this._currentBlendMode = null;
	this._lastScissor = null;
	this._lastTexture = null;
	this._lastShader = null;
	this._lastRenderTarget = null;
	this._lastBlendMode = null;
	this._gl = gl;
	gl.clearColor(0,0,0,0);
	gl.enable(3042);
	gl.pixelStorei(37441,1);
	this._vertexBuffer = gl.createBuffer();
	gl.bindBuffer(34962,this._vertexBuffer);
	this._quadIndexBuffer = gl.createBuffer();
	gl.bindBuffer(34963,this._quadIndexBuffer);
	this._drawImageShader = new flambe.platform.shader.DrawImageGL(gl);
	this._drawPatternShader = new flambe.platform.shader.DrawPatternGL(gl);
	this._fillRectShader = new flambe.platform.shader.FillRectGL(gl);
	this.resize(16);
};
$hxClasses["flambe.platform.html.WebGLBatcher"] = flambe.platform.html.WebGLBatcher;
flambe.platform.html.WebGLBatcher.__name__ = ["flambe","platform","html","WebGLBatcher"];
flambe.platform.html.WebGLBatcher.prototype = {
	bindRenderTarget: function(texture) {
		if(texture != null) {
			this._gl.bindFramebuffer(36160,texture.framebuffer);
			this._gl.viewport(0,0,texture._width,texture._height);
		} else {
			this._gl.bindFramebuffer(36160,null);
			this._gl.viewport(0,0,this._backbufferWidth,this._backbufferHeight);
		}
		this._currentRenderTarget = texture;
		this._lastRenderTarget = texture;
	}
	,resize: function(maxQuads) {
		this.flush();
		if(maxQuads > 1024) return;
		this._maxQuads = maxQuads;
		this.data = new Float32Array(maxQuads * 4 * 6);
		this._gl.bufferData(34962,this.data.length * 4,35040);
		var indices = new Uint16Array(6 * maxQuads);
		var _g = 0;
		while(_g < maxQuads) {
			var ii = _g++;
			indices[ii * 6] = ii * 4;
			indices[ii * 6 + 1] = ii * 4 + 1;
			indices[ii * 6 + 2] = ii * 4 + 2;
			indices[ii * 6 + 3] = ii * 4 + 2;
			indices[ii * 6 + 4] = ii * 4 + 3;
			indices[ii * 6 + 5] = ii * 4;
		}
		this._gl.bufferData(34963,indices,35044);
	}
	,flush: function() {
		if(this._quads < 1) return;
		if(this._lastRenderTarget != this._currentRenderTarget) this.bindRenderTarget(this._lastRenderTarget);
		if(this._lastBlendMode != this._currentBlendMode) {
			var _g = this;
			switch( (_g._lastBlendMode)[1] ) {
			case 0:
				this._gl.blendFunc(1,771);
				break;
			case 1:
				this._gl.blendFunc(1,1);
				break;
			case 2:
				this._gl.blendFunc(0,770);
				break;
			case 3:
				this._gl.blendFunc(1,0);
				break;
			}
			this._currentBlendMode = this._lastBlendMode;
		}
		if(this._pendingSetScissor) {
			if(this._lastScissor != null) {
				this._gl.enable(3089);
				this._gl.scissor(this._lastScissor.x | 0,this._lastScissor.y | 0,this._lastScissor.width | 0,this._lastScissor.height | 0);
			} else this._gl.disable(3089);
			this._pendingSetScissor = false;
		}
		if(this._lastTexture != this._currentTexture) {
			this._gl.bindTexture(3553,this._lastTexture.nativeTexture);
			this._currentTexture = this._lastTexture;
		}
		if(this._lastShader != this._currentShader) {
			this._lastShader.useProgram();
			this._lastShader.prepare();
			this._currentShader = this._lastShader;
		}
		if(this._lastShader == this._drawPatternShader) this._drawPatternShader.setMaxUV(this._lastTexture.maxU,this._lastTexture.maxV);
		this._gl.bufferData(34962,this.data.subarray(0,this._dataOffset),35040);
		this._gl.drawElements(4,6 * this._quads,5123,0);
		this._quads = 0;
		this._dataOffset = 0;
	}
	,prepareQuad: function(elementsPerVertex,renderTarget,blendMode,scissor,shader) {
		if(renderTarget != this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = renderTarget;
		}
		if(blendMode != this._lastBlendMode) {
			this.flush();
			this._lastBlendMode = blendMode;
		}
		if(shader != this._lastShader) {
			this.flush();
			this._lastShader = shader;
		}
		if(scissor != null || this._lastScissor != null) {
			if(scissor == null || this._lastScissor == null || !this._lastScissor.equals(scissor)) {
				this.flush();
				this._lastScissor = scissor != null?scissor.clone(this._lastScissor):null;
				this._pendingSetScissor = true;
			}
		}
		if(this._quads >= this._maxQuads) this.resize(2 * this._maxQuads);
		++this._quads;
		var offset = this._dataOffset;
		this._dataOffset += 4 * elementsPerVertex;
		return offset;
	}
	,prepareFillRect: function(renderTarget,blendMode,scissor) {
		return this.prepareQuad(6,renderTarget,blendMode,scissor,this._fillRectShader);
	}
	,prepareDrawImage: function(renderTarget,blendMode,scissor,texture) {
		if(texture != this._lastTexture) {
			this.flush();
			this._lastTexture = texture;
		}
		return this.prepareQuad(5,renderTarget,blendMode,scissor,this._drawImageShader);
	}
	,deleteFramebuffer: function(texture) {
		if(texture == this._lastRenderTarget) {
			this.flush();
			this._lastRenderTarget = null;
			this._currentRenderTarget = null;
		}
		this._gl.deleteFramebuffer(texture.framebuffer);
	}
	,deleteTexture: function(texture) {
		if(texture == this._lastTexture) {
			this.flush();
			this._lastTexture = null;
			this._currentTexture = null;
		}
		this._gl.deleteTexture(texture.nativeTexture);
	}
	,bindTexture: function(texture) {
		this.flush();
		this._lastTexture = null;
		this._currentTexture = null;
		this._gl.bindTexture(3553,texture);
	}
	,didRender: function() {
		this.flush();
	}
	,willRender: function() {
		this._gl.clear(16384);
	}
	,resizeBackbuffer: function(width,height) {
		this._gl.viewport(0,0,width,height);
		this._backbufferWidth = width;
		this._backbufferHeight = height;
	}
	,__class__: flambe.platform.html.WebGLBatcher
}
flambe.platform.html.WebGLGraphics = function(batcher,renderTarget) {
	this._stateList = null;
	this._inverseProjection = null;
	if(flambe.platform.html.WebGLGraphics._scratchQuadArray == null) flambe.platform.html.WebGLGraphics._scratchQuadArray = new Float32Array(8);
	this._batcher = batcher;
	this._renderTarget = renderTarget;
};
$hxClasses["flambe.platform.html.WebGLGraphics"] = flambe.platform.html.WebGLGraphics;
flambe.platform.html.WebGLGraphics.__name__ = ["flambe","platform","html","WebGLGraphics"];
flambe.platform.html.WebGLGraphics.__interfaces__ = [flambe.platform.InternalGraphics];
flambe.platform.html.WebGLGraphics.prototype = {
	transformQuad: function(x,y,width,height) {
		var x2 = x + width;
		var y2 = y + height;
		var pos = flambe.platform.html.WebGLGraphics._scratchQuadArray;
		pos[0] = x;
		pos[1] = y;
		pos[2] = x2;
		pos[3] = y;
		pos[4] = x2;
		pos[5] = y2;
		pos[6] = x;
		pos[7] = y2;
		this._stateList.matrix.transformArray(pos,8,pos);
		return pos;
	}
	,onResize: function(width,height) {
		this._stateList = new flambe.platform.html._WebGLGraphics.DrawingState();
		var flip = this._renderTarget != null?-1:1;
		this._stateList.matrix.set(2 / width,0,0,flip * -2 / height,-1,flip);
		this._inverseProjection = new flambe.math.Matrix();
		this._inverseProjection.set(2 / width,0,0,2 / height,-1,-1);
		this._inverseProjection.invert();
	}
	,didRender: function() {
		this._batcher.didRender();
	}
	,willRender: function() {
		this._batcher.willRender();
	}
	,applyScissor: function(x,y,width,height) {
		var state = this._stateList;
		var rect = flambe.platform.html.WebGLGraphics._scratchQuadArray;
		rect[0] = x;
		rect[1] = y;
		rect[2] = x + width;
		rect[3] = y + height;
		state.matrix.transformArray(rect,4,rect);
		this._inverseProjection.transformArray(rect,4,rect);
		x = rect[0];
		y = rect[1];
		width = rect[2] - x;
		height = rect[3] - y;
		if(width < 0) {
			x += width;
			width = -width;
		}
		if(height < 0) {
			y += height;
			height = -height;
		}
		state.applyScissor(x,y,width,height);
	}
	,setBlendMode: function(blendMode) {
		this._stateList.blendMode = blendMode;
	}
	,multiplyAlpha: function(factor) {
		this._stateList.alpha *= factor;
	}
	,fillRect: function(color,x,y,width,height) {
		var state = this._stateList;
		var pos = this.transformQuad(x,y,width,height);
		var r = (color & 16711680) / 16711680;
		var g = (color & 65280) / 65280;
		var b = (color & 255) / 255;
		var a = state.alpha;
		var offset = this._batcher.prepareFillRect(this._renderTarget,state.blendMode,state.scissor);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = r;
		data[++offset] = g;
		data[++offset] = b;
		data[++offset] = a;
	}
	,drawSubImage: function(texture,destX,destY,sourceX,sourceY,sourceW,sourceH) {
		var state = this._stateList;
		var texture1 = texture;
		var pos = this.transformQuad(destX,destY,sourceW,sourceH);
		var w = texture1._width;
		var h = texture1._height;
		var u1 = texture1.maxU * sourceX / w;
		var v1 = texture1.maxV * sourceY / h;
		var u2 = texture1.maxU * (sourceX + sourceW) / w;
		var v2 = texture1.maxV * (sourceY + sourceH) / h;
		var alpha = state.alpha;
		var offset = this._batcher.prepareDrawImage(this._renderTarget,state.blendMode,state.scissor,texture1);
		var data = this._batcher.data;
		data[offset] = pos[0];
		data[++offset] = pos[1];
		data[++offset] = u1;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[2];
		data[++offset] = pos[3];
		data[++offset] = u2;
		data[++offset] = v1;
		data[++offset] = alpha;
		data[++offset] = pos[4];
		data[++offset] = pos[5];
		data[++offset] = u2;
		data[++offset] = v2;
		data[++offset] = alpha;
		data[++offset] = pos[6];
		data[++offset] = pos[7];
		data[++offset] = u1;
		data[++offset] = v2;
		data[++offset] = alpha;
	}
	,drawImage: function(texture,x,y) {
		this.drawSubImage(texture,x,y,0,0,texture.get_width(),texture.get_height());
	}
	,restore: function() {
		this._stateList = this._stateList.prev;
	}
	,transform: function(m00,m10,m01,m11,m02,m12) {
		var state = this._stateList;
		flambe.platform.html.WebGLGraphics._scratchMatrix.set(m00,m10,m01,m11,m02,m12);
		flambe.math.Matrix.multiply(state.matrix,flambe.platform.html.WebGLGraphics._scratchMatrix,state.matrix);
	}
	,save: function() {
		var current = this._stateList;
		var state = this._stateList.next;
		if(state == null) {
			state = new flambe.platform.html._WebGLGraphics.DrawingState();
			state.prev = current;
			current.next = state;
		}
		current.matrix.clone(state.matrix);
		state.alpha = current.alpha;
		state.blendMode = current.blendMode;
		state.scissor = current.scissor != null?current.scissor.clone(state.scissor):null;
		this._stateList = state;
	}
	,__class__: flambe.platform.html.WebGLGraphics
}
flambe.platform.html._WebGLGraphics = {}
flambe.platform.html._WebGLGraphics.DrawingState = function() {
	this.next = null;
	this.prev = null;
	this.scissor = null;
	this.matrix = new flambe.math.Matrix();
	this.alpha = 1;
	this.blendMode = flambe.display.BlendMode.Normal;
};
$hxClasses["flambe.platform.html._WebGLGraphics.DrawingState"] = flambe.platform.html._WebGLGraphics.DrawingState;
flambe.platform.html._WebGLGraphics.DrawingState.__name__ = ["flambe","platform","html","_WebGLGraphics","DrawingState"];
flambe.platform.html._WebGLGraphics.DrawingState.prototype = {
	applyScissor: function(x,y,width,height) {
		if(this.scissor != null) {
			var x1 = flambe.math.FMath.max(this.scissor.x,x);
			var y1 = flambe.math.FMath.max(this.scissor.y,y);
			var x2 = flambe.math.FMath.min(this.scissor.x + this.scissor.width,x + width);
			var y2 = flambe.math.FMath.min(this.scissor.y + this.scissor.height,y + height);
			x = x1;
			y = y1;
			width = x2 - x1;
			height = y2 - y1;
		} else this.scissor = new flambe.math.Rectangle();
		this.scissor.set(Math.round(x),Math.round(y),Math.round(width),Math.round(height));
	}
	,__class__: flambe.platform.html._WebGLGraphics.DrawingState
}
flambe.platform.html.WebGLRenderer = function(stage,gl) {
	var _g = this;
	this.gl = gl;
	gl.canvas.addEventListener("webglcontextlost",function(event) {
		event.preventDefault();
		flambe.System.hasGPU.set__(false);
	},false);
	gl.canvas.addEventListener("webglcontextrestore",function(event) {
		_g.init();
	},false);
	stage.resize.connect($bind(this,this.onResize));
	this.init();
};
$hxClasses["flambe.platform.html.WebGLRenderer"] = flambe.platform.html.WebGLRenderer;
flambe.platform.html.WebGLRenderer.__name__ = ["flambe","platform","html","WebGLRenderer"];
flambe.platform.html.WebGLRenderer.__interfaces__ = [flambe.platform.Renderer];
flambe.platform.html.WebGLRenderer.prototype = {
	init: function() {
		this.batcher = new flambe.platform.html.WebGLBatcher(this.gl);
		this.graphics = new flambe.platform.html.WebGLGraphics(this.batcher,null);
		this.onResize();
		flambe.System.hasGPU.set__(true);
	}
	,onResize: function() {
		var width = this.gl.canvas.width, height = this.gl.canvas.height;
		this.batcher.resizeBackbuffer(width,height);
		this.graphics.onResize(width,height);
	}
	,didRender: function() {
		this.graphics.didRender();
	}
	,willRender: function() {
		this.graphics.willRender();
	}
	,createCompressedTexture: function(format,data) {
		if(this.gl.isContextLost()) return null;
		return null;
	}
	,getCompressedTextureFormats: function() {
		return [];
	}
	,createTexture: function(image) {
		if(this.gl.isContextLost()) return null;
		var texture = new flambe.platform.html.WebGLTexture(this,image.width,image.height);
		texture.uploadImageData(image);
		return texture;
	}
	,__class__: flambe.platform.html.WebGLRenderer
}
flambe.platform.html.WebGLTexture = function(renderer,width,height) {
	this._graphics = null;
	this.framebuffer = null;
	flambe.platform.BasicAsset.call(this);
	this._renderer = renderer;
	this._width = width;
	this._height = height;
	this._widthPow2 = flambe.platform.html.WebGLTexture.nextPowerOfTwo(width);
	this._heightPow2 = flambe.platform.html.WebGLTexture.nextPowerOfTwo(height);
	this.maxU = width / this._widthPow2;
	this.maxV = height / this._heightPow2;
	var gl = renderer.gl;
	this.nativeTexture = gl.createTexture();
	renderer.batcher.bindTexture(this.nativeTexture);
	gl.texParameteri(3553,10242,33071);
	gl.texParameteri(3553,10243,33071);
	gl.texParameteri(3553,10240,9729);
	gl.texParameteri(3553,10241,9728);
};
$hxClasses["flambe.platform.html.WebGLTexture"] = flambe.platform.html.WebGLTexture;
flambe.platform.html.WebGLTexture.__name__ = ["flambe","platform","html","WebGLTexture"];
flambe.platform.html.WebGLTexture.__interfaces__ = [flambe.display.Texture];
flambe.platform.html.WebGLTexture.nextPowerOfTwo = function(n) {
	var p = 1;
	while(p < n) p <<= 1;
	return p;
}
flambe.platform.html.WebGLTexture.drawBorder = function(canvas,width,height) {
	var ctx = canvas.getContext("2d");
	ctx.drawImage(canvas,width - 1,0,1,height,width,0,1,height);
	ctx.drawImage(canvas,0,height - 1,width,1,0,height,width,1);
}
flambe.platform.html.WebGLTexture.__super__ = flambe.platform.BasicAsset;
flambe.platform.html.WebGLTexture.prototype = $extend(flambe.platform.BasicAsset.prototype,{
	get_height: function() {
		return this._height;
	}
	,get_width: function() {
		return this._width;
	}
	,onDisposed: function() {
		var batcher = this._renderer.batcher;
		batcher.deleteTexture(this);
		if(this.framebuffer != null) batcher.deleteFramebuffer(this);
		this.nativeTexture = null;
		this.framebuffer = null;
		this._graphics = null;
	}
	,uploadImageData: function(image) {
		if(this._widthPow2 != image.width || this._heightPow2 != image.height) {
			var resized = flambe.platform.html.HtmlUtil.createEmptyCanvas(this._widthPow2,this._heightPow2);
			resized.getContext("2d").drawImage(image,0,0);
			flambe.platform.html.WebGLTexture.drawBorder(resized,image.width,image.height);
			image = resized;
		}
		this._renderer.batcher.bindTexture(this.nativeTexture);
		var gl = this._renderer.gl;
		gl.texImage2D(3553,0,6408,6408,5121,image);
	}
	,__class__: flambe.platform.html.WebGLTexture
});
flambe.platform.shader = {}
flambe.platform.shader.ShaderGL = function(gl,vertSource,fragSource) {
	fragSource = ["#ifdef GL_ES","precision mediump float;","#endif"].join("\n") + "\n" + fragSource;
	this._gl = gl;
	this._program = gl.createProgram();
	gl.attachShader(this._program,flambe.platform.shader.ShaderGL.createShader(gl,35633,vertSource));
	gl.attachShader(this._program,flambe.platform.shader.ShaderGL.createShader(gl,35632,fragSource));
	gl.linkProgram(this._program);
	gl.useProgram(this._program);
};
$hxClasses["flambe.platform.shader.ShaderGL"] = flambe.platform.shader.ShaderGL;
flambe.platform.shader.ShaderGL.__name__ = ["flambe","platform","shader","ShaderGL"];
flambe.platform.shader.ShaderGL.createShader = function(gl,type,source) {
	var shader = gl.createShader(type);
	gl.shaderSource(shader,source);
	gl.compileShader(shader);
	return shader;
}
flambe.platform.shader.ShaderGL.prototype = {
	getUniformLocation: function(name) {
		var loc = this._gl.getUniformLocation(this._program,name);
		return loc;
	}
	,getAttribLocation: function(name) {
		var loc = this._gl.getAttribLocation(this._program,name);
		return loc;
	}
	,prepare: function() {
		null;
	}
	,useProgram: function() {
		this._gl.useProgram(this._program);
	}
	,__class__: flambe.platform.shader.ShaderGL
}
flambe.platform.shader.DrawImageGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","void main (void) {","gl_FragColor = texture2D(u_texture, v_uv) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawImageGL"] = flambe.platform.shader.DrawImageGL;
flambe.platform.shader.DrawImageGL.__name__ = ["flambe","platform","shader","DrawImageGL"];
flambe.platform.shader.DrawImageGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.DrawImageGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,__class__: flambe.platform.shader.DrawImageGL
});
flambe.platform.shader.DrawPatternGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute mediump vec2 a_uv;","attribute lowp float a_alpha;","varying mediump vec2 v_uv;","varying lowp float v_alpha;","void main (void) {","v_uv = a_uv;","v_alpha = a_alpha;","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying mediump vec2 v_uv;","varying lowp float v_alpha;","uniform lowp sampler2D u_texture;","uniform mediump vec2 u_maxUV;","void main (void) {","gl_FragColor = texture2D(u_texture, mod(v_uv, u_maxUV)) * v_alpha;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_uv = this.getAttribLocation("a_uv");
	this.a_alpha = this.getAttribLocation("a_alpha");
	this.u_texture = this.getUniformLocation("u_texture");
	this.u_maxUV = this.getUniformLocation("u_maxUV");
	this.setTexture(0);
};
$hxClasses["flambe.platform.shader.DrawPatternGL"] = flambe.platform.shader.DrawPatternGL;
flambe.platform.shader.DrawPatternGL.__name__ = ["flambe","platform","shader","DrawPatternGL"];
flambe.platform.shader.DrawPatternGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.DrawPatternGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_uv);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 5 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_uv,2,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,4 * bytesPerFloat);
	}
	,setMaxUV: function(maxU,maxV) {
		this._gl.uniform2f(this.u_maxUV,maxU,maxV);
	}
	,setTexture: function(unit) {
		this._gl.uniform1i(this.u_texture,unit);
	}
	,__class__: flambe.platform.shader.DrawPatternGL
});
flambe.platform.shader.FillRectGL = function(gl) {
	flambe.platform.shader.ShaderGL.call(this,gl,["attribute highp vec2 a_pos;","attribute lowp vec3 a_rgb;","attribute lowp float a_alpha;","varying lowp vec4 v_color;","void main (void) {","v_color = vec4(a_rgb*a_alpha, a_alpha);","gl_Position = vec4(a_pos, 0, 1);","}"].join("\n"),["varying lowp vec4 v_color;","void main (void) {","gl_FragColor = v_color;","}"].join("\n"));
	this.a_pos = this.getAttribLocation("a_pos");
	this.a_rgb = this.getAttribLocation("a_rgb");
	this.a_alpha = this.getAttribLocation("a_alpha");
};
$hxClasses["flambe.platform.shader.FillRectGL"] = flambe.platform.shader.FillRectGL;
flambe.platform.shader.FillRectGL.__name__ = ["flambe","platform","shader","FillRectGL"];
flambe.platform.shader.FillRectGL.__super__ = flambe.platform.shader.ShaderGL;
flambe.platform.shader.FillRectGL.prototype = $extend(flambe.platform.shader.ShaderGL.prototype,{
	prepare: function() {
		this._gl.enableVertexAttribArray(this.a_pos);
		this._gl.enableVertexAttribArray(this.a_rgb);
		this._gl.enableVertexAttribArray(this.a_alpha);
		var bytesPerFloat = 4;
		var stride = 6 * bytesPerFloat;
		this._gl.vertexAttribPointer(this.a_pos,2,5126,false,stride,0 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_rgb,3,5126,false,stride,2 * bytesPerFloat);
		this._gl.vertexAttribPointer(this.a_alpha,1,5126,false,stride,5 * bytesPerFloat);
	}
	,__class__: flambe.platform.shader.FillRectGL
});
flambe.scene = {}
flambe.scene.Director = function() {
	this._transitor = null;
	this.scenes = [];
	this.occludedScenes = [];
	this._root = new flambe.Entity();
};
$hxClasses["flambe.scene.Director"] = flambe.scene.Director;
flambe.scene.Director.__name__ = ["flambe","scene","Director"];
flambe.scene.Director.__super__ = flambe.Component;
flambe.scene.Director.prototype = $extend(flambe.Component.prototype,{
	playTransition: function(from,to,transition,onComplete) {
		this.completeTransition();
		this.add(to);
		if(transition != null) {
			this.occludedScenes.push(from);
			this._transitor = new flambe.scene._Director.Transitor(from,to,transition,onComplete);
			this._transitor.init(this);
		} else {
			onComplete();
			this.invalidateVisibility();
		}
	}
	,completeTransition: function() {
		if(this._transitor != null) {
			this._transitor.complete();
			this._transitor = null;
			this.invalidateVisibility();
		}
	}
	,invalidateVisibility: function() {
		var ii = this.scenes.length;
		while(ii > 0) {
			var scene = this.scenes[--ii];
			var comp = scene._compMap.Scene_0;
			if(comp == null || comp.opaque) break;
		}
		this.occludedScenes = this.scenes.length > 0?this.scenes.slice(ii,this.scenes.length - 1):[];
		var scene = this.get_topScene();
		if(scene != null) this.show(scene);
	}
	,show: function(scene) {
		var events = scene._compMap.Scene_0;
		if(events != null) events.shown.emit();
	}
	,hideAndDispose: function(scene) {
		this.hide(scene);
		scene.dispose();
	}
	,hide: function(scene) {
		var events = scene._compMap.Scene_0;
		if(events != null) events.hidden.emit();
	}
	,add: function(scene) {
		var oldTop = this.get_topScene();
		if(oldTop != null) this._root.removeChild(oldTop);
		HxOverrides.remove(this.scenes,scene);
		this.scenes.push(scene);
		this._root.addChild(scene);
	}
	,get_topScene: function() {
		var ll = this.scenes.length;
		return ll > 0?this.scenes[ll - 1]:null;
	}
	,onUpdate: function(dt) {
		if(this._transitor != null && this._transitor.update(dt)) this.completeTransition();
	}
	,onRemoved: function() {
		this.completeTransition();
		var _g = 0, _g1 = this.scenes;
		while(_g < _g1.length) {
			var scene = _g1[_g];
			++_g;
			scene.dispose();
		}
		this.scenes = [];
		this.occludedScenes = [];
		this._root.dispose();
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,unwindToScene: function(scene,transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) {
			if(oldTop == scene) return;
			this.scenes.pop();
			while(this.scenes.length > 0 && this.scenes[this.scenes.length - 1] != scene) this.scenes.pop().dispose();
			this.playTransition(oldTop,scene,transition,function() {
				_g.hideAndDispose(oldTop);
			});
		} else this.pushScene(scene,transition);
	}
	,popScene: function(transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) {
			this.scenes.pop();
			var newTop = this.get_topScene();
			if(newTop != null) this.playTransition(oldTop,newTop,transition,function() {
				_g.hideAndDispose(oldTop);
			}); else {
				this.hideAndDispose(oldTop);
				this.invalidateVisibility();
			}
		}
	}
	,pushScene: function(scene,transition) {
		var _g = this;
		this.completeTransition();
		var oldTop = this.get_topScene();
		if(oldTop != null) this.playTransition(oldTop,scene,transition,function() {
			_g.hide(oldTop);
		}); else {
			this.add(scene);
			this.invalidateVisibility();
		}
	}
	,get_name: function() {
		return "Director_37";
	}
	,__class__: flambe.scene.Director
});
flambe.scene._Director = {}
flambe.scene._Director.Transitor = function(from,to,transition,onComplete) {
	this._from = from;
	this._to = to;
	this._transition = transition;
	this._onComplete = onComplete;
};
$hxClasses["flambe.scene._Director.Transitor"] = flambe.scene._Director.Transitor;
flambe.scene._Director.Transitor.__name__ = ["flambe","scene","_Director","Transitor"];
flambe.scene._Director.Transitor.prototype = {
	complete: function() {
		this._transition.complete();
		this._onComplete();
	}
	,update: function(dt) {
		return this._transition.update(dt);
	}
	,init: function(director) {
		this._transition.init(director,this._from,this._to);
	}
	,__class__: flambe.scene._Director.Transitor
}
flambe.scene.Transition = function() { }
$hxClasses["flambe.scene.Transition"] = flambe.scene.Transition;
flambe.scene.Transition.__name__ = ["flambe","scene","Transition"];
flambe.scene.Transition.prototype = {
	complete: function() {
	}
	,update: function(dt) {
		return true;
	}
	,init: function(director,from,to) {
		this._director = director;
		this._from = from;
		this._to = to;
	}
	,__class__: flambe.scene.Transition
}
flambe.scene.TweenTransition = function(duration,ease) {
	this._duration = duration;
	this._ease = ease != null?ease:flambe.animation.Ease.linear;
};
$hxClasses["flambe.scene.TweenTransition"] = flambe.scene.TweenTransition;
flambe.scene.TweenTransition.__name__ = ["flambe","scene","TweenTransition"];
flambe.scene.TweenTransition.__super__ = flambe.scene.Transition;
flambe.scene.TweenTransition.prototype = $extend(flambe.scene.Transition.prototype,{
	interp: function(from,to) {
		return from + (to - from) * this._ease(this._elapsed / this._duration);
	}
	,update: function(dt) {
		this._elapsed += dt;
		return this._elapsed >= this._duration;
	}
	,init: function(director,from,to) {
		flambe.scene.Transition.prototype.init.call(this,director,from,to);
		this._elapsed = 0;
	}
	,__class__: flambe.scene.TweenTransition
});
flambe.scene.FadeTransition = function(duration,ease) {
	flambe.scene.TweenTransition.call(this,duration,ease);
};
$hxClasses["flambe.scene.FadeTransition"] = flambe.scene.FadeTransition;
flambe.scene.FadeTransition.__name__ = ["flambe","scene","FadeTransition"];
flambe.scene.FadeTransition.__super__ = flambe.scene.TweenTransition;
flambe.scene.FadeTransition.prototype = $extend(flambe.scene.TweenTransition.prototype,{
	complete: function() {
		this._to._compMap.Sprite_5.alpha.set__(1);
	}
	,update: function(dt) {
		var done = flambe.scene.TweenTransition.prototype.update.call(this,dt);
		this._to._compMap.Sprite_5.alpha.set__(this.interp(0,1));
		return done;
	}
	,init: function(director,from,to) {
		flambe.scene.TweenTransition.prototype.init.call(this,director,from,to);
		var sprite = this._to._compMap.Sprite_5;
		if(sprite == null) this._to.add(sprite = new flambe.display.Sprite());
		sprite.alpha.set__(0);
	}
	,__class__: flambe.scene.FadeTransition
});
flambe.scene.Scene = function(opaque) {
	if(opaque == null) opaque = true;
	this.opaque = opaque;
	this.shown = new flambe.util.Signal0();
	this.hidden = new flambe.util.Signal0();
};
$hxClasses["flambe.scene.Scene"] = flambe.scene.Scene;
flambe.scene.Scene.__name__ = ["flambe","scene","Scene"];
flambe.scene.Scene.__super__ = flambe.Component;
flambe.scene.Scene.prototype = $extend(flambe.Component.prototype,{
	get_name: function() {
		return "Scene_0";
	}
	,__class__: flambe.scene.Scene
});
flambe.script = {}
flambe.script.Action = function() { }
$hxClasses["flambe.script.Action"] = flambe.script.Action;
flambe.script.Action.__name__ = ["flambe","script","Action"];
flambe.script.Action.prototype = {
	__class__: flambe.script.Action
}
flambe.script.CallFunction = function(fn) {
	this._fn = fn;
};
$hxClasses["flambe.script.CallFunction"] = flambe.script.CallFunction;
flambe.script.CallFunction.__name__ = ["flambe","script","CallFunction"];
flambe.script.CallFunction.__interfaces__ = [flambe.script.Action];
flambe.script.CallFunction.prototype = {
	update: function(dt,actor) {
		this._fn();
		return 0;
	}
	,__class__: flambe.script.CallFunction
}
flambe.script.Delay = function(seconds) {
	this._duration = seconds;
	this._elapsed = 0;
};
$hxClasses["flambe.script.Delay"] = flambe.script.Delay;
flambe.script.Delay.__name__ = ["flambe","script","Delay"];
flambe.script.Delay.__interfaces__ = [flambe.script.Action];
flambe.script.Delay.prototype = {
	update: function(dt,actor) {
		this._elapsed += dt;
		if(this._elapsed >= this._duration) {
			var overtime = this._elapsed - this._duration;
			this._elapsed = 0;
			return dt - overtime;
		}
		return -1;
	}
	,__class__: flambe.script.Delay
}
flambe.script.Script = function() {
	this.stopAll();
};
$hxClasses["flambe.script.Script"] = flambe.script.Script;
flambe.script.Script.__name__ = ["flambe","script","Script"];
flambe.script.Script.__super__ = flambe.Component;
flambe.script.Script.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		var ii = 0;
		while(ii < this._handles.length) {
			var handle = this._handles[ii];
			if(handle.removed || handle.action.update(dt,this.owner) >= 0) this._handles.splice(ii,1); else ++ii;
		}
	}
	,stopAll: function() {
		this._handles = [];
	}
	,run: function(action) {
		var handle = new flambe.script._Script.Handle(action);
		this._handles.push(handle);
		return handle;
	}
	,get_name: function() {
		return "Script_36";
	}
	,__class__: flambe.script.Script
});
flambe.script._Script = {}
flambe.script._Script.Handle = function(action) {
	this.removed = false;
	this.action = action;
};
$hxClasses["flambe.script._Script.Handle"] = flambe.script._Script.Handle;
flambe.script._Script.Handle.__name__ = ["flambe","script","_Script","Handle"];
flambe.script._Script.Handle.__interfaces__ = [flambe.util.Disposable];
flambe.script._Script.Handle.prototype = {
	dispose: function() {
		this.removed = true;
		this.action = null;
	}
	,__class__: flambe.script._Script.Handle
}
flambe.script.Sequence = function(actions) {
	this._idx = 0;
	this._runningActions = actions != null?actions.slice():[];
};
$hxClasses["flambe.script.Sequence"] = flambe.script.Sequence;
flambe.script.Sequence.__name__ = ["flambe","script","Sequence"];
flambe.script.Sequence.__interfaces__ = [flambe.script.Action];
flambe.script.Sequence.prototype = {
	update: function(dt,actor) {
		var total = 0.0;
		while(true) {
			var action = this._runningActions[this._idx];
			if(action != null) {
				var spent = action.update(dt - total,actor);
				if(spent >= 0) total += spent; else return -1;
			}
			++this._idx;
			if(this._idx >= this._runningActions.length) {
				this._idx = 0;
				break;
			} else if(total > dt) return -1;
		}
		return total;
	}
	,__class__: flambe.script.Sequence
}
flambe.swf = {}
flambe.swf.BitmapSprite = function(symbol) {
	flambe.display.Sprite.call(this);
	this.symbol = symbol;
	this.anchorX.set__(symbol.anchorX);
	this.anchorY.set__(symbol.anchorY);
};
$hxClasses["flambe.swf.BitmapSprite"] = flambe.swf.BitmapSprite;
flambe.swf.BitmapSprite.__name__ = ["flambe","swf","BitmapSprite"];
flambe.swf.BitmapSprite.__super__ = flambe.display.Sprite;
flambe.swf.BitmapSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	getNaturalHeight: function() {
		return this.symbol.height;
	}
	,getNaturalWidth: function() {
		return this.symbol.width;
	}
	,draw: function(g) {
		g.drawSubImage(this.symbol.atlas,0,0,this.symbol.x,this.symbol.y,this.symbol.width,this.symbol.height);
	}
	,__class__: flambe.swf.BitmapSprite
});
flambe.swf.Symbol = function() { }
$hxClasses["flambe.swf.Symbol"] = flambe.swf.Symbol;
flambe.swf.Symbol.__name__ = ["flambe","swf","Symbol"];
flambe.swf.Symbol.prototype = {
	__class__: flambe.swf.Symbol
}
flambe.swf.BitmapSymbol = function(json,atlas) {
	this._name = json.symbol;
	this.atlas = atlas;
	var rect = json.rect;
	this.x = rect[0];
	this.y = rect[1];
	this.width = rect[2];
	this.height = rect[3];
	var origin = json.origin;
	if(origin != null) {
		this.anchorX = origin[0];
		this.anchorY = origin[1];
	} else {
		this.anchorX = 0;
		this.anchorY = 0;
	}
};
$hxClasses["flambe.swf.BitmapSymbol"] = flambe.swf.BitmapSymbol;
flambe.swf.BitmapSymbol.__name__ = ["flambe","swf","BitmapSymbol"];
flambe.swf.BitmapSymbol.__interfaces__ = [flambe.swf.Symbol];
flambe.swf.BitmapSymbol.prototype = {
	get_name: function() {
		return this._name;
	}
	,createSprite: function() {
		return new flambe.swf.BitmapSprite(this);
	}
	,__class__: flambe.swf.BitmapSymbol
}
flambe.swf.Library = function(pack,baseDir) {
	this._symbols = new haxe.ds.StringMap();
	var json = haxe.Json.parse(pack.getFile(baseDir + "/library.json").toString());
	this.frameRate = json.frameRate;
	var movies = [];
	var _g = 0, _g1 = json.movies;
	while(_g < _g1.length) {
		var movieObject = _g1[_g];
		++_g;
		var movie = new flambe.swf.MovieSymbol(this,movieObject);
		movies.push(movie);
		this._symbols.set(movie.get_name(),movie);
	}
	var groups = json.textureGroups;
	if(groups[0].scaleFactor != 1 || groups.length > 1) null;
	var atlases = groups[0].atlases;
	var _g = 0;
	while(_g < atlases.length) {
		var atlasObject = atlases[_g];
		++_g;
		var atlas = pack.getTexture(baseDir + "/" + flambe.util.Strings.removeFileExtension(atlasObject.file));
		var _g1 = 0, _g2 = atlasObject.textures;
		while(_g1 < _g2.length) {
			var textureObject = _g2[_g1];
			++_g1;
			var bitmap = new flambe.swf.BitmapSymbol(textureObject,atlas);
			this._symbols.set(bitmap.get_name(),bitmap);
		}
	}
	var _g = 0;
	while(_g < movies.length) {
		var movie = movies[_g];
		++_g;
		var _g1 = 0, _g2 = movie.layers;
		while(_g1 < _g2.length) {
			var layer = _g2[_g1];
			++_g1;
			var keyframes = layer.keyframes;
			var ll = keyframes.length;
			var _g3 = 0;
			while(_g3 < ll) {
				var ii = _g3++;
				var kf = keyframes[ii];
				if(kf.symbolName != null) {
					var symbol = this._symbols.get(kf.symbolName);
					kf.symbol = symbol;
				}
				if(kf.tweened && kf.duration == 1 && ii + 1 < ll) {
					var nextKf = keyframes[ii + 1];
					if(!nextKf.visible || nextKf.symbolName == null) kf.visible = false;
				}
			}
		}
	}
};
$hxClasses["flambe.swf.Library"] = flambe.swf.Library;
flambe.swf.Library.__name__ = ["flambe","swf","Library"];
flambe.swf.Library.prototype = {
	createSprite: function(symbolName,required) {
		if(required == null) required = true;
		var symbol = this._symbols.get(symbolName);
		if(symbol == null) {
			if(required) throw flambe.util.Strings.withFields("Missing symbol",["name",symbolName]);
			return null;
		}
		return symbol.createSprite();
	}
	,__class__: flambe.swf.Library
}
flambe.swf.MoviePlayer = function(lib) {
	this._loopingSprite = null;
	this._oneshotSprite = null;
	this._lib = lib;
	this._root = new flambe.Entity();
	this.movie = new flambe.util.Value(null);
	this.setCache(true);
};
$hxClasses["flambe.swf.MoviePlayer"] = flambe.swf.MoviePlayer;
flambe.swf.MoviePlayer.__name__ = ["flambe","swf","MoviePlayer"];
flambe.swf.MoviePlayer.__super__ = flambe.Component;
flambe.swf.MoviePlayer.prototype = $extend(flambe.Component.prototype,{
	setCurrent: function(current) {
		this._root.add(current);
		return this.movie.set__(current);
	}
	,createMovie: function(name) {
		var sprite = this._lib.createSprite(name,true);
		if(this._decorator != null) this._decorator(sprite);
		return sprite;
	}
	,playFromCache: function(name) {
		var sprite;
		if(this._cache != null) {
			sprite = this._cache.get(name);
			if(sprite != null) sprite.set_position(0); else {
				sprite = this.createMovie(name);
				this._cache.set(name,sprite);
			}
		} else sprite = this.createMovie(name);
		return this.setCurrent(sprite);
	}
	,onUpdate: function(dt) {
		if(this._oneshotSprite != null && this._oneshotSprite._position + dt > this._oneshotSprite.symbol.duration) {
			this._oneshotSprite = null;
			this.setCurrent(this._loopingSprite);
		}
	}
	,onRemoved: function() {
		this._root.dispose();
		this._oneshotSprite = this._loopingSprite = null;
		this.movie.set__(null);
	}
	,onAdded: function() {
		this.owner.addChild(this._root);
	}
	,loop: function(name,restart) {
		if(restart == null) restart = true;
		if(restart || this._loopingSprite == null || this._loopingSprite.symbol.get_name() != name) {
			this._oneshotSprite = null;
			this._loopingSprite = this.playFromCache(name);
		}
		return this;
	}
	,play: function(name,restart) {
		if(restart == null) restart = true;
		if(restart || this._oneshotSprite == null || this._oneshotSprite.symbol.get_name() != name) this._oneshotSprite = this.playFromCache(name);
		return this;
	}
	,setCache: function(cache) {
		this._cache = cache?new haxe.ds.StringMap():null;
		return this;
	}
	,get_name: function() {
		return "MoviePlayer_33";
	}
	,__class__: flambe.swf.MoviePlayer
});
flambe.swf.MovieSprite = function(symbol) {
	this._looped = null;
	flambe.display.Sprite.call(this);
	this.symbol = symbol;
	this.speed = new flambe.animation.AnimatedFloat(1);
	this._animators = new Array(symbol.layers.length);
	var _g1 = 0, _g = this._animators.length;
	while(_g1 < _g) {
		var ii = _g1++;
		var layer = symbol.layers[ii];
		this._animators[ii] = new flambe.swf._MovieSprite.LayerAnimator(layer);
	}
	this._frame = 0;
	this._position = 0;
	this["goto"](1);
};
$hxClasses["flambe.swf.MovieSprite"] = flambe.swf.MovieSprite;
flambe.swf.MovieSprite.__name__ = ["flambe","swf","MovieSprite"];
flambe.swf.MovieSprite.__super__ = flambe.display.Sprite;
flambe.swf.MovieSprite.prototype = $extend(flambe.display.Sprite.prototype,{
	rewind: function() {
		this._position = 0;
		this._flags = this._flags | 32;
	}
	,set_position: function(position) {
		return this._position = flambe.math.FMath.clamp(position,0,this.symbol.duration);
	}
	,'goto': function(newFrame) {
		if(this._frame == newFrame) return;
		var wrapped = newFrame < this._frame;
		if(wrapped) {
			var _g = 0, _g1 = this._animators;
			while(_g < _g1.length) {
				var animator = _g1[_g];
				++_g;
				animator.needsKeyframeUpdate = true;
				animator.keyframeIdx = 0;
			}
		}
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			animator.composeFrame(newFrame);
		}
		this._frame = newFrame;
	}
	,onUpdate: function(dt) {
		flambe.display.Sprite.prototype.onUpdate.call(this,dt);
		this.speed.update(dt);
		var _g = this._flags & 48;
		switch(_g) {
		case 0:
			this._position += this.speed._value * dt;
			if(this._position > this.symbol.duration) {
				this._position = this._position % this.symbol.duration;
				if(this._looped != null) this._looped.emit();
			}
			break;
		case 32:
			this._flags = this._flags & -33;
			break;
		}
		var newFrame = this._position * this.symbol.frameRate;
		this["goto"](newFrame);
	}
	,onRemoved: function() {
		flambe.display.Sprite.prototype.onRemoved.call(this);
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.removeChild(animator.content);
		}
	}
	,onAdded: function() {
		flambe.display.Sprite.prototype.onAdded.call(this);
		var _g = 0, _g1 = this._animators;
		while(_g < _g1.length) {
			var animator = _g1[_g];
			++_g;
			this.owner.addChild(animator.content);
		}
	}
	,__class__: flambe.swf.MovieSprite
});
flambe.swf._MovieSprite = {}
flambe.swf._MovieSprite.LayerAnimator = function(layer) {
	this.keyframeIdx = 0;
	this.needsKeyframeUpdate = false;
	this.layer = layer;
	this.content = new flambe.Entity();
	if(layer.empty) this._sprites = null; else {
		this._sprites = new Array(layer.keyframes.length);
		var _g1 = 0, _g = this._sprites.length;
		while(_g1 < _g) {
			var ii = _g1++;
			var kf = layer.keyframes[ii];
			if(ii > 0 && layer.keyframes[ii - 1].symbol == kf.symbol) this._sprites[ii] = this._sprites[ii - 1]; else if(kf.symbol == null) this._sprites[ii] = new flambe.display.Sprite(); else this._sprites[ii] = kf.symbol.createSprite();
		}
		this.content.add(this._sprites[0]);
	}
};
$hxClasses["flambe.swf._MovieSprite.LayerAnimator"] = flambe.swf._MovieSprite.LayerAnimator;
flambe.swf._MovieSprite.LayerAnimator.__name__ = ["flambe","swf","_MovieSprite","LayerAnimator"];
flambe.swf._MovieSprite.LayerAnimator.prototype = {
	composeFrame: function(frame) {
		if(this._sprites == null) return;
		var keyframes = this.layer.keyframes;
		var finalFrame = keyframes.length - 1;
		if(frame > this.layer.frames) {
			this.content._compMap.Sprite_5.set_visible(false);
			this.keyframeIdx = finalFrame;
			this.needsKeyframeUpdate = true;
			return;
		}
		while(this.keyframeIdx < finalFrame && keyframes[this.keyframeIdx + 1].index <= frame) {
			++this.keyframeIdx;
			this.needsKeyframeUpdate = true;
		}
		var sprite;
		if(this.needsKeyframeUpdate) {
			this.needsKeyframeUpdate = false;
			sprite = this._sprites[this.keyframeIdx];
			if(sprite != this.content._compMap.Sprite_5) {
				if(Type.getClass(sprite) == flambe.swf.MovieSprite) {
					var movie = sprite;
					movie.rewind();
				}
				this.content.add(sprite);
			}
		} else sprite = this.content._compMap.Sprite_5;
		var kf = keyframes[this.keyframeIdx];
		var visible = kf.visible && kf.symbol != null;
		sprite.set_visible(visible);
		if(!visible) return;
		var x = kf.x;
		var y = kf.y;
		var scaleX = kf.scaleX;
		var scaleY = kf.scaleY;
		var skewX = kf.skewX;
		var skewY = kf.skewY;
		var alpha = kf.alpha;
		if(kf.tweened && this.keyframeIdx < finalFrame) {
			var interp = (frame - kf.index) / kf.duration;
			var ease = kf.ease;
			if(ease != 0) {
				var t;
				if(ease < 0) {
					var inv = 1 - interp;
					t = 1 - inv * inv;
					ease = -ease;
				} else t = interp * interp;
				interp = ease * t + (1 - ease) * interp;
			}
			var nextKf = keyframes[this.keyframeIdx + 1];
			x += (nextKf.x - x) * interp;
			y += (nextKf.y - y) * interp;
			scaleX += (nextKf.scaleX - scaleX) * interp;
			scaleY += (nextKf.scaleY - scaleY) * interp;
			skewX += (nextKf.skewX - skewX) * interp;
			skewY += (nextKf.skewY - skewY) * interp;
			alpha += (nextKf.alpha - alpha) * interp;
		}
		var matrix = sprite.getLocalMatrix();
		var sinX = Math.sin(skewX), cosX = Math.cos(skewX);
		var sinY = Math.sin(skewY), cosY = Math.cos(skewY);
		matrix.set(cosY * scaleX,sinY * scaleX,-sinX * scaleY,cosX * scaleY,x,y);
		matrix.translate(-kf.pivotX,-kf.pivotY);
		sprite.alpha.set__(alpha);
	}
	,__class__: flambe.swf._MovieSprite.LayerAnimator
}
flambe.swf.MovieSymbol = function(lib,json) {
	this._name = json.id;
	this.frameRate = lib.frameRate;
	this.frames = 0;
	this.layers = new Array(json.layers.length);
	var _g1 = 0, _g = this.layers.length;
	while(_g1 < _g) {
		var ii = _g1++;
		var layer = new flambe.swf.MovieLayer(json.layers[ii]);
		this.frames = Math.max(layer.frames,this.frames);
		this.layers[ii] = layer;
	}
	this.duration = this.frames / this.frameRate;
};
$hxClasses["flambe.swf.MovieSymbol"] = flambe.swf.MovieSymbol;
flambe.swf.MovieSymbol.__name__ = ["flambe","swf","MovieSymbol"];
flambe.swf.MovieSymbol.__interfaces__ = [flambe.swf.Symbol];
flambe.swf.MovieSymbol.prototype = {
	createSprite: function() {
		return new flambe.swf.MovieSprite(this);
	}
	,get_name: function() {
		return this._name;
	}
	,__class__: flambe.swf.MovieSymbol
}
flambe.swf.MovieLayer = function(json) {
	this.empty = true;
	this.name = json.name;
	var prevKf = null;
	this.keyframes = new Array(json.keyframes.length);
	var _g1 = 0, _g = this.keyframes.length;
	while(_g1 < _g) {
		var ii = _g1++;
		prevKf = new flambe.swf.MovieKeyframe(json.keyframes[ii],prevKf);
		this.keyframes[ii] = prevKf;
		this.empty = this.empty && prevKf.symbolName == null;
	}
	this.frames = prevKf != null?prevKf.index + (prevKf.duration | 0):0;
};
$hxClasses["flambe.swf.MovieLayer"] = flambe.swf.MovieLayer;
flambe.swf.MovieLayer.__name__ = ["flambe","swf","MovieLayer"];
flambe.swf.MovieLayer.prototype = {
	__class__: flambe.swf.MovieLayer
}
flambe.swf.MovieKeyframe = function(json,prevKf) {
	this.ease = 0;
	this.tweened = true;
	this.visible = true;
	this.alpha = 1;
	this.pivotY = 0;
	this.pivotX = 0;
	this.skewY = 0;
	this.skewX = 0;
	this.scaleY = 1;
	this.scaleX = 1;
	this.y = 0;
	this.x = 0;
	this.symbol = null;
	this.index = prevKf != null?prevKf.index + prevKf.duration:0;
	this.duration = json.duration;
	this.label = json.label;
	this.symbolName = json.ref;
	var loc = json.loc;
	if(loc != null) {
		this.x = loc[0];
		this.y = loc[1];
	}
	var scale = json.scale;
	if(scale != null) {
		this.scaleX = scale[0];
		this.scaleY = scale[1];
	}
	var skew = json.skew;
	if(skew != null) {
		this.skewX = skew[0];
		this.skewY = skew[1];
	}
	var pivot = json.pivot;
	if(pivot != null) {
		this.pivotX = pivot[0];
		this.pivotY = pivot[1];
	}
	if(json.alpha != null) this.alpha = json.alpha;
	if(json.visible != null) this.visible = json.visible;
	if(json.tweened != null) this.tweened = json.tweened;
	if(json.ease != null) this.ease = json.ease;
};
$hxClasses["flambe.swf.MovieKeyframe"] = flambe.swf.MovieKeyframe;
flambe.swf.MovieKeyframe.__name__ = ["flambe","swf","MovieKeyframe"];
flambe.swf.MovieKeyframe.prototype = {
	__class__: flambe.swf.MovieKeyframe
}
flambe.util.BitSets = function() { }
$hxClasses["flambe.util.BitSets"] = flambe.util.BitSets;
flambe.util.BitSets.__name__ = ["flambe","util","BitSets"];
flambe.util.BitSets.set = function(bits,mask,enabled) {
	return enabled?bits | mask:bits & ~mask;
}
flambe.util.Promise = function() {
	this.success = new flambe.util.Signal1();
	this.error = new flambe.util.Signal1();
	this.progressChanged = new flambe.util.Signal0();
	this.hasResult = false;
	this._progress = 0;
	this._total = 0;
};
$hxClasses["flambe.util.Promise"] = flambe.util.Promise;
flambe.util.Promise.__name__ = ["flambe","util","Promise"];
flambe.util.Promise.prototype = {
	set_total: function(total) {
		if(this._total != total) {
			this._total = total;
			this.progressChanged.emit();
		}
		return total;
	}
	,set_progress: function(progress) {
		if(this._progress != progress) {
			this._progress = progress;
			this.progressChanged.emit();
		}
		return progress;
	}
	,get: function(fn) {
		if(this.hasResult) {
			fn(this._result);
			return null;
		}
		return this.success.connect(fn).once();
	}
	,set_result: function(result) {
		if(this.hasResult) throw "Promise result already assigned";
		this._result = result;
		this.hasResult = true;
		this.success.emit(result);
		return result;
	}
	,__class__: flambe.util.Promise
}
flambe.util.Signal0 = function(listener) {
	flambe.util.SignalBase.call(this,listener);
};
$hxClasses["flambe.util.Signal0"] = flambe.util.Signal0;
flambe.util.Signal0.__name__ = ["flambe","util","Signal0"];
flambe.util.Signal0.__super__ = flambe.util.SignalBase;
flambe.util.Signal0.prototype = $extend(flambe.util.SignalBase.prototype,{
	emitImpl: function() {
		var head = this.willEmit();
		var p = head;
		while(p != null) {
			p._listener();
			if(!p.stayInList) p.dispose();
			p = p._next;
		}
		this.didEmit(head);
	}
	,emit: function() {
		var _g = this;
		if(this._head == flambe.util.SignalBase.DISPATCHING_SENTINEL) this.defer(function() {
			_g.emitImpl();
		}); else this.emitImpl();
	}
	,connect: function(listener,prioritize) {
		if(prioritize == null) prioritize = false;
		return this.connectImpl(listener,prioritize);
	}
	,__class__: flambe.util.Signal0
});
flambe.util._SignalBase = {}
flambe.util._SignalBase.Task = function(fn) {
	this.next = null;
	this.fn = fn;
};
$hxClasses["flambe.util._SignalBase.Task"] = flambe.util._SignalBase.Task;
flambe.util._SignalBase.Task.__name__ = ["flambe","util","_SignalBase","Task"];
flambe.util._SignalBase.Task.prototype = {
	__class__: flambe.util._SignalBase.Task
}
flambe.util.Strings = function() { }
$hxClasses["flambe.util.Strings"] = flambe.util.Strings;
flambe.util.Strings.__name__ = ["flambe","util","Strings"];
flambe.util.Strings.getFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,dot + 1,null):null;
}
flambe.util.Strings.removeFileExtension = function(fileName) {
	var dot = fileName.lastIndexOf(".");
	return dot > 0?HxOverrides.substr(fileName,0,dot):fileName;
}
flambe.util.Strings.getUrlExtension = function(url) {
	var question = url.lastIndexOf("?");
	if(question >= 0) url = HxOverrides.substr(url,0,question);
	var slash = url.lastIndexOf("/");
	if(slash >= 0) url = HxOverrides.substr(url,slash + 1,null);
	return flambe.util.Strings.getFileExtension(url);
}
flambe.util.Strings.joinPath = function(base,relative) {
	if(base.charCodeAt(base.length - 1) != 47) base += "/";
	return base + relative;
}
flambe.util.Strings.withFields = function(message,fields) {
	var ll = fields.length;
	if(ll > 0) {
		message += message.length > 0?" [":"[";
		var ii = 0;
		while(ii < ll) {
			if(ii > 0) message += ", ";
			var name = fields[ii];
			var value = fields[ii + 1];
			if(js.Boot.__instanceof(value,Error)) {
				var stack = value.stack;
				if(stack != null) value = stack;
			}
			message += name + "=" + Std.string(value);
			ii += 2;
		}
		message += "]";
	}
	return message;
}
var globals = {}
globals.NDiTypeScene = $hxClasses["globals.NDiTypeScene"] = { __ename__ : ["globals","NDiTypeScene"], __constructs__ : ["NDI_TYPE_SCENE_NONE","NDI_TYPE_SCENE_LOADING","NDI_TYPE_SCENE_TEST","NDI_TYPE_SCENE_PLAY","NDI_TYPE_SCENE_VIDEO","NDI_TYPE_SCENE_MIG1","NDI_TYPE_SCENE_MIG2","NDI_TYPE_SCENE_MIG3","NDI_TYPE_SCENE_MIG4","NDI_TYPE_SCENE_MIG5","NDI_TYPE_SCENE_MIG6","NDI_TYPE_SCENE_MIG7","NDI_TYPE_SCENE_MIG8","NDI_TYPE_SCENE_END_STORY","NDI_TYPE_SCENE_GAME"] }
globals.NDiTypeScene.NDI_TYPE_SCENE_NONE = ["NDI_TYPE_SCENE_NONE",0];
globals.NDiTypeScene.NDI_TYPE_SCENE_NONE.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_NONE.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING = ["NDI_TYPE_SCENE_LOADING",1];
globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_TEST = ["NDI_TYPE_SCENE_TEST",2];
globals.NDiTypeScene.NDI_TYPE_SCENE_TEST.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_TEST.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_PLAY = ["NDI_TYPE_SCENE_PLAY",3];
globals.NDiTypeScene.NDI_TYPE_SCENE_PLAY.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_PLAY.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO = ["NDI_TYPE_SCENE_VIDEO",4];
globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG1 = ["NDI_TYPE_SCENE_MIG1",5];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG1.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG1.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG2 = ["NDI_TYPE_SCENE_MIG2",6];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG2.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG2.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG3 = ["NDI_TYPE_SCENE_MIG3",7];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG3.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG3.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG4 = ["NDI_TYPE_SCENE_MIG4",8];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG4.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG4.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG5 = ["NDI_TYPE_SCENE_MIG5",9];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG5.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG5.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG6 = ["NDI_TYPE_SCENE_MIG6",10];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG6.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG6.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG7 = ["NDI_TYPE_SCENE_MIG7",11];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG7.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG7.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG8 = ["NDI_TYPE_SCENE_MIG8",12];
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG8.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_MIG8.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_END_STORY = ["NDI_TYPE_SCENE_END_STORY",13];
globals.NDiTypeScene.NDI_TYPE_SCENE_END_STORY.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_END_STORY.__enum__ = globals.NDiTypeScene;
globals.NDiTypeScene.NDI_TYPE_SCENE_GAME = ["NDI_TYPE_SCENE_GAME",14];
globals.NDiTypeScene.NDI_TYPE_SCENE_GAME.toString = $estr;
globals.NDiTypeScene.NDI_TYPE_SCENE_GAME.__enum__ = globals.NDiTypeScene;
globals.NDiVarsToSave = $hxClasses["globals.NDiVarsToSave"] = { __ename__ : ["globals","NDiVarsToSave"], __constructs__ : ["MUTE_MUSIC","MUTE_SOUNDS"] }
globals.NDiVarsToSave.MUTE_MUSIC = ["MUTE_MUSIC",0];
globals.NDiVarsToSave.MUTE_MUSIC.toString = $estr;
globals.NDiVarsToSave.MUTE_MUSIC.__enum__ = globals.NDiVarsToSave;
globals.NDiVarsToSave.MUTE_SOUNDS = ["MUTE_SOUNDS",1];
globals.NDiVarsToSave.MUTE_SOUNDS.toString = $estr;
globals.NDiVarsToSave.MUTE_SOUNDS.__enum__ = globals.NDiVarsToSave;
var math = {}
math.NDiVector2D = function(_x,_y) {
	this.x = _x;
	this.y = _y;
};
$hxClasses["math.NDiVector2D"] = math.NDiVector2D;
math.NDiVector2D.__name__ = ["math","NDiVector2D"];
math.NDiVector2D.getComponentDistance = function(startingPoint,endingPoint) {
	return new math.NDiVector2D(endingPoint.x - startingPoint.x,endingPoint.y - startingPoint.y);
}
math.NDiVector2D.getDistance = function(startingPoint,endingPoint) {
	var d = Math.pow(endingPoint.x - startingPoint.x,2) + Math.pow(endingPoint.y - startingPoint.y,2);
	d = Math.pow(d,0.5);
	return d;
}
math.NDiVector2D.prototype = {
	__class__: math.NDiVector2D
}
globals.NDiGameConstants = function() { }
$hxClasses["globals.NDiGameConstants"] = globals.NDiGameConstants;
globals.NDiGameConstants.__name__ = ["globals","NDiGameConstants"];
globals.NDiGameGlobals = function() {
	this.currentScaleGame = 1;
};
$hxClasses["globals.NDiGameGlobals"] = globals.NDiGameGlobals;
globals.NDiGameGlobals.__name__ = ["globals","NDiGameGlobals"];
globals.NDiGameGlobals.initInstance = function() {
	if(globals.NDiGameGlobals.instance == null) globals.NDiGameGlobals.instance = new globals.NDiGameGlobals();
}
globals.NDiGameGlobals.getInstance = function() {
	return globals.NDiGameGlobals.instance;
}
globals.NDiGameGlobals.prototype = {
	initGlobalConfigData: function() {
		var sXML = managers.NDiResourcesManager.loadXML(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,globals.NDiGameConstants.CONFIG_ASSET_CONFIG_XML);
		var oXML = new haxe.xml.Fast(Xml.parse(sXML).firstElement());
		var $it0 = oXML.nodes.resolve("debug").iterator();
		while( $it0.hasNext() ) {
			var debugNode = $it0.next();
		}
		var $it1 = oXML.nodes.resolve("activators").iterator();
		while( $it1.hasNext() ) {
			var debugNode = $it1.next();
		}
	}
	,__class__: globals.NDiGameGlobals
}
var gui = {}
gui.components = {}
gui.components.NDiAnimationMovie = function(lib,name) {
	this.libraryAnimation = lib;
	flambe.swf.MoviePlayer.call(this,lib);
	this.transform = new flambe.display.Sprite();
	this.animationName = name;
};
$hxClasses["gui.components.NDiAnimationMovie"] = gui.components.NDiAnimationMovie;
gui.components.NDiAnimationMovie.__name__ = ["gui","components","NDiAnimationMovie"];
gui.components.NDiAnimationMovie.__super__ = flambe.swf.MoviePlayer;
gui.components.NDiAnimationMovie.prototype = $extend(flambe.swf.MoviePlayer.prototype,{
	'delete': function() {
		this.owner.dispose();
	}
	,onAdded: function() {
		flambe.swf.MoviePlayer.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
	}
	,animationCreate: function(posfix) {
		if(posfix == null) posfix = "_create";
		this.transform.set_visible(true);
		this.play(this.animationName + "" + posfix);
	}
	,animationIdle: function(isLoop,time,posfix,func,param1) {
		if(posfix == null) posfix = "_idle";
		if(time == null) time = 0;
		if(isLoop == null) isLoop = true;
		var _g = this;
		this.loop(this.animationName + "" + posfix);
		if(!isLoop) {
			var f1 = new flambe.script.CallFunction(function() {
				_g["delete"]();
				if(func != null) func(param1);
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(time),f1]);
			this.owner._compMap.Script_36.run(seq1);
		}
	}
	,__class__: gui.components.NDiAnimationMovie
});
gui.components.NDiBarLoading = function() {
	this.transform = new flambe.display.Sprite();
};
$hxClasses["gui.components.NDiBarLoading"] = gui.components.NDiBarLoading;
gui.components.NDiBarLoading.__name__ = ["gui","components","NDiBarLoading"];
gui.components.NDiBarLoading.__super__ = flambe.Component;
gui.components.NDiBarLoading.prototype = $extend(flambe.Component.prototype,{
	addToEntity: function() {
		new flambe.Entity().add(this);
		return this.owner;
	}
	,onAdded: function() {
		this.owner.add(this.transform);
		this.addBar();
	}
	,addBar: function() {
		var barLifeTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,globals.NDiGameConstants.BAR_LOADING);
		this.bar = new flambe.display.ImageSprite(barLifeTexture);
		this.owner.addChild(new flambe.Entity().add(this.bar));
		this.bar.scaleX.set__(0);
		var lifeIconTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,globals.NDiGameConstants.ICON_BAR_LOADING);
		var lifeIcon = new flambe.display.ImageSprite(lifeIconTexture);
		lifeIcon.centerAnchor();
		lifeIcon.y.set__(15);
		lifeIcon.x.set__(-40);
		this.owner.addChild(new flambe.Entity().add(lifeIcon));
	}
	,updateBar: function(value) {
		if(value > 1) value = 1; else if(value < 0) value = 0;
		this.bar.scaleX.animateTo(value,0.3);
	}
	,get_name: function() {
		return "NDiBarLoading_2";
	}
	,__class__: gui.components.NDiBarLoading
});
gui.components.NDiButton = function(texture) {
	flambe.display.ImageSprite.call(this,texture);
	this.isSelected = false;
	this.nameButton = flambe.display.ImageSprite.prototype.get_name.call(this);
	this.primaryTexture = texture;
	this.centerAnchor();
	this.originalDelta = new math.NDiVector2D(0,0);
	this.originalPosition = new math.NDiVector2D(0,0);
	this.moveDistance = 0;
};
$hxClasses["gui.components.NDiButton"] = gui.components.NDiButton;
gui.components.NDiButton.__name__ = ["gui","components","NDiButton"];
gui.components.NDiButton.__super__ = flambe.display.ImageSprite;
gui.components.NDiButton.prototype = $extend(flambe.display.ImageSprite.prototype,{
	onAdded: function() {
		flambe.display.ImageSprite.prototype.onAdded.call(this);
	}
	,getMoveDistance: function() {
		return this.moveDistance;
	}
	,updateMoveDistance: function(newPosition) {
		this.moveDistance = math.NDiVector2D.getDistance(this.originalPosition,newPosition);
	}
	,setOriginalPosition: function(x,y) {
		this.originalPosition.x = x;
		this.originalPosition.y = y;
	}
	,getOriginalPosition: function() {
		return this.originalPosition;
	}
	,setOriginalDelta: function(x,y) {
		this.originalDelta.x = x;
		this.originalDelta.y = y;
	}
	,getOriginalDelta: function() {
		return this.originalDelta;
	}
	,changeTexture: function(value) {
		if(value == null) value = false;
		if(this.secondTexture != null) {
			if(value) this.texture = this.primaryTexture; else this.texture = this.secondTexture;
		}
	}
	,bottomCenterAnchor: function() {
		this.setAnchor(this.getNaturalWidth() * 0.5,this.getNaturalHeight());
	}
	,__class__: gui.components.NDiButton
});
gui.components.NDiButtonFill = function(color,width,height) {
	flambe.display.FillSprite.call(this,color,width,height);
	this.isSelected = false;
	this.nameButton = flambe.display.FillSprite.prototype.get_name.call(this);
	this.centerAnchor();
	this.originalDelta = new math.NDiVector2D(0,0);
	this.originalPosition = new math.NDiVector2D(0,0);
	this.moveDistance = 0;
};
$hxClasses["gui.components.NDiButtonFill"] = gui.components.NDiButtonFill;
gui.components.NDiButtonFill.__name__ = ["gui","components","NDiButtonFill"];
gui.components.NDiButtonFill.__super__ = flambe.display.FillSprite;
gui.components.NDiButtonFill.prototype = $extend(flambe.display.FillSprite.prototype,{
	onAdded: function() {
		flambe.display.FillSprite.prototype.onAdded.call(this);
	}
	,getMoveDistance: function() {
		return this.moveDistance;
	}
	,updateMoveDistance: function(newPosition) {
		this.moveDistance = math.NDiVector2D.getDistance(this.originalPosition,newPosition);
	}
	,setOriginalPosition: function(x,y) {
		this.originalPosition.x = x;
		this.originalPosition.y = y;
	}
	,setOriginalDelta: function(x,y) {
		this.originalDelta.x = x;
		this.originalDelta.y = y;
	}
	,getOriginalDelta: function() {
		return this.originalDelta;
	}
	,resetAnchor: function() {
		this.setAnchor(0,0);
	}
	,__class__: gui.components.NDiButtonFill
});
gui.components.NDiButtonFillText = function(color,width,height) {
	gui.components.NDiButtonFill.call(this,color,width,height);
	var font = managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri");
	this.text = new flambe.display.TextSprite(font);
	this.text.set_align(flambe.display.TextAlign.Center);
	this.text.x.set__(this.getNaturalWidth() * 0.5);
	this.text.y.set__(this.getNaturalHeight() * 0.5);
	this.text.centerAnchor();
	this.text.disablePointer();
};
$hxClasses["gui.components.NDiButtonFillText"] = gui.components.NDiButtonFillText;
gui.components.NDiButtonFillText.__name__ = ["gui","components","NDiButtonFillText"];
gui.components.NDiButtonFillText.__super__ = gui.components.NDiButtonFill;
gui.components.NDiButtonFillText.prototype = $extend(gui.components.NDiButtonFill.prototype,{
	onAdded: function() {
		gui.components.NDiButtonFill.prototype.onAdded.call(this);
		this.owner.addChild(new flambe.Entity().add(this.text));
	}
	,__class__: gui.components.NDiButtonFillText
});
gui.components.NDiControlPanel = function() {
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/controls/background"));
	this.background.transform.disablePointer();
	this.prevButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/controls/prev_button"));
	this.prevButton.x.set__(-97);
	this.prevButton.nameButton = "PREV_BUTTON";
	this.prevButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.nextButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/controls/prev_button"));
	this.nextButton.scaleX.set__(-1);
	this.nextButton.x.set__(98);
	this.nextButton.nameButton = "NEXT_BUTTON";
	this.nextButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.stopButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/controls/stop_button"));
	this.stopButton.x.set__(-31);
	this.stopButton.nameButton = "STOP_BUTTON";
	this.stopButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.pauseButtonTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/controls/pause_button");
	this.pauseButton = new gui.components.NDiButton(this.pauseButtonTexture);
	this.pauseButton.x.set__(33);
	this.pauseButton.nameButton = "PAUSE_BUTTON";
	this.pauseButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.playButtonTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/controls/play_button");
	this.pauseButton.secondTexture = this.playButtonTexture;
	this.transform = new flambe.display.Sprite();
	this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT - this.background.image.getNaturalHeight() * 0.5);
	this.backgroundAlpha = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/alpha_bg"));
	this.backgroundAlpha.transform.y.set__(-(this.backgroundAlpha.image.getNaturalHeight() * 0.5 - this.background.image.getNaturalHeight() * 0.5));
	this.backgroundAlpha.transform.disablePointer();
};
$hxClasses["gui.components.NDiControlPanel"] = gui.components.NDiControlPanel;
gui.components.NDiControlPanel.__name__ = ["gui","components","NDiControlPanel"];
gui.components.NDiControlPanel.__super__ = flambe.Component;
gui.components.NDiControlPanel.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.backgroundAlpha));
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.prevButton));
		this.owner.addChild(new flambe.Entity().add(this.stopButton));
		this.owner.addChild(new flambe.Entity().add(this.pauseButton));
		this.owner.addChild(new flambe.Entity().add(this.nextButton));
		if(managers.NDiScenesController.getInstance().isGamePause) this.pauseButton.changeTexture(false); else this.pauseButton.changeTexture(true);
	}
	,pauseGameButton: function() {
		if(managers.NDiVideoManager.getInstance().playingVideo) {
			if(!managers.NDiScenesController.getInstance().isGamePause) managers.NDiVideoManager.pauseVideo(true); else managers.NDiVideoManager.pauseVideo(false);
		} else managers.NDiScenesController.getInstance().pauseGame();
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButton);
		if(tmpButton.nameButton == "PREV_BUTTON") {
			managers.NDiVideoManager.stopVideo();
			managers.NDiScenesController.getInstance().previousScene();
		} else if(tmpButton.nameButton == "STOP_BUTTON") managers.NDiScenesController.getInstance().stopGame(); else if(tmpButton.nameButton == "PAUSE_BUTTON") this.pauseGameButton(); else if(tmpButton.nameButton == "NEXT_BUTTON") {
			managers.NDiVideoManager.stopVideo();
			managers.NDiScenesController.getInstance().nextScene();
		}
	}
	,get_name: function() {
		return "NDiControlPanel_35";
	}
	,__class__: gui.components.NDiControlPanel
});
gui.components.NDiImage = function(texture) {
	this.image = new flambe.display.ImageSprite(texture);
	this.image.centerAnchor();
	this.transform = new flambe.display.Sprite();
};
$hxClasses["gui.components.NDiImage"] = gui.components.NDiImage;
gui.components.NDiImage.__name__ = ["gui","components","NDiImage"];
gui.components.NDiImage.__super__ = flambe.Component;
gui.components.NDiImage.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.image));
	}
	,bottomCenterAnchor: function() {
		this.image.setAnchor(this.image.getNaturalWidth() * 0.5,this.image.getNaturalHeight());
	}
	,get_name: function() {
		return "NDiImage_7";
	}
	,__class__: gui.components.NDiImage
});
gui.components.NDiHighlightSignal = function(texture,textureCorrect,textureWrong,isNormal) {
	if(isNormal == null) isNormal = true;
	this.highlightSignalDirection = true;
	gui.components.NDiImage.call(this,texture);
	this.normalTexture = texture;
	this.correctTexture = textureCorrect;
	this.wrongTexture = textureWrong;
	this.elapsedTime = 0;
	this.elapsedTimePause = 0;
	this.totalTimePause = 1.5;
	this.highlightSignalDirection = true;
	this.isPaused = false;
	this.showNormal = isNormal;
};
$hxClasses["gui.components.NDiHighlightSignal"] = gui.components.NDiHighlightSignal;
gui.components.NDiHighlightSignal.__name__ = ["gui","components","NDiHighlightSignal"];
gui.components.NDiHighlightSignal.__super__ = gui.components.NDiImage;
gui.components.NDiHighlightSignal.prototype = $extend(gui.components.NDiImage.prototype,{
	onUpdate: function(dt) {
		gui.components.NDiImage.prototype.onUpdate.call(this,dt);
		this.highlightSignalTimer(dt);
		this.highlightTempTimer(dt);
	}
	,toggleHide: function() {
		if((this.transform._flags & 1) != 0) this.transform.set_visible(false); else {
			this.elapsedTime = 0;
			this.transform.alpha.set__(this.elapsedTime);
			this.transform.set_visible(true);
		}
	}
	,highlightSignalTimer: function(dt) {
		if(!((this.transform._flags & 1) != 0) || this.isPaused || !this.showNormal) return;
		this.transform.alpha.set__(this.elapsedTime);
		if(this.elapsedTime > 1) this.highlightSignalDirection = false; else if(this.elapsedTime < 0) this.highlightSignalDirection = true;
		if(this.highlightSignalDirection) this.elapsedTime += dt * 1.6; else this.elapsedTime -= dt * 1.6;
	}
	,highlightTempTimer: function(dt) {
		if(!((this.transform._flags & 1) != 0) || !this.isPaused) return;
		if(this.elapsedTimePause >= this.totalTimePause) {
			this.elapsedTimePause = 0;
			this.isPaused = false;
			this.showNormalTexture();
		}
		this.elapsedTimePause += dt;
	}
	,pause: function() {
		this.elapsedTimePause = 0;
		this.isPaused = true;
	}
	,showNormalTexture: function() {
		this.elapsedTimePause = 0;
		this.isPaused = false;
		this.image.texture = this.normalTexture;
		this.image.centerAnchor();
		if(!this.showNormal) this.transform.set_visible(false); else this.transform.set_visible(true);
	}
	,showWrongTexture: function() {
		if(this.wrongTexture == null) return;
		this.image.texture = this.wrongTexture;
		this.pause();
		this.transform.alpha.set__(1);
		this.image.centerAnchor();
	}
	,showCorrectTexture: function() {
		if(this.correctTexture == null) return;
		this.image.texture = this.correctTexture;
		this.pause();
		this.transform.alpha.set__(1);
		this.image.centerAnchor();
	}
	,__class__: gui.components.NDiHighlightSignal
});
gui.components.NDiRulerUnit = function(isHotspot) {
	if(isHotspot == null) isHotspot = false;
	this.transform = new flambe.display.Sprite();
	this.clickArea = new gui.components.NDiButtonFill(0,50,50);
	this.clickArea.alpha.set__(0.0);
	this.footprint = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/ruler"));
	if(isHotspot) this.hotspot = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/rulerHotspot"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/rulerHighlightCorrect"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/rulerHighlightWrong")); else this.hotspot = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/rulerHighlight"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/rulerHighlightCorrect"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/rulerHighlightWrong"));
	this.hotspot.transform.set_visible(false);
	this.hotspot.transform.disablePointer();
	this.originalPosition = new math.NDiVector2D(0,0);
	this.isBlocked = false;
};
$hxClasses["gui.components.NDiRulerUnit"] = gui.components.NDiRulerUnit;
gui.components.NDiRulerUnit.__name__ = ["gui","components","NDiRulerUnit"];
gui.components.NDiRulerUnit.__super__ = flambe.Component;
gui.components.NDiRulerUnit.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.hotspot));
		this.owner.addChild(new flambe.Entity().add(this.footprint));
		this.owner.addChild(new flambe.Entity().add(this.clickArea));
	}
	,show: function() {
		this.footprint.transform.set_visible(true);
		this.hotspot.transform.set_visible(true);
		this.transform.set_visible(true);
	}
	,returnPosition: function() {
		this.transform.x.set__(this.originalPosition.x);
		this.transform.y.set__(this.originalPosition.y);
		this.hotspot.showNormalTexture();
	}
	,setOriginalPosition: function() {
		this.originalPosition.x = this.transform.x._value;
		this.originalPosition.y = this.transform.y._value;
	}
	,get_name: function() {
		return "NDiRulerUnit_15";
	}
	,__class__: gui.components.NDiRulerUnit
});
gui.components.NDiUmi = function() {
	var lib = managers.NDiResourcesManager.loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"animations/mig8/UMIposses");
	gui.components.NDiAnimationMovie.call(this,lib,"UMI");
	this.animationIdle(true,0,"_idle3");
	this.text = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"");
	this.text.set_align(flambe.display.TextAlign.Center);
	var _g = this.text.y;
	_g.set__(_g._value + 25);
	this.text.disablePointer();
};
$hxClasses["gui.components.NDiUmi"] = gui.components.NDiUmi;
gui.components.NDiUmi.__name__ = ["gui","components","NDiUmi"];
gui.components.NDiUmi.__super__ = gui.components.NDiAnimationMovie;
gui.components.NDiUmi.prototype = $extend(gui.components.NDiAnimationMovie.prototype,{
	onAdded: function() {
		gui.components.NDiAnimationMovie.prototype.onAdded.call(this);
		this.owner.addChild(new flambe.Entity().add(this.text));
	}
	,reset: function() {
		this.animationIdle(true,0,"_idle3");
		this.transform.set_visible(true);
		this.transform.x.set__(0);
		this.toggleHideText();
	}
	,jump: function() {
		this.animationCreate("_jump");
	}
	,toggleHideText: function(toHide) {
		if(toHide == null) toHide = false;
		if(toHide) this.text.set_visible(false); else this.text.set_visible(true);
	}
	,getOut: function() {
		this.animationIdle(true,0,"_idle");
		var despX = -globals.NDiGameConstants.GAME_WIDTH * 0.5;
		despX += 55;
		this.transform.x.animateTo(despX,0.6,flambe.animation.Ease.sineOut);
	}
	,__class__: gui.components.NDiUmi
});
gui.components.game = {}
gui.components.game.NDiPanelControllerGame = function() {
	this.loadInit();
};
$hxClasses["gui.components.game.NDiPanelControllerGame"] = gui.components.game.NDiPanelControllerGame;
gui.components.game.NDiPanelControllerGame.__name__ = ["gui","components","game","NDiPanelControllerGame"];
gui.components.game.NDiPanelControllerGame.__super__ = flambe.Component;
gui.components.game.NDiPanelControllerGame.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.zoomPanel));
		this.owner.addChild(new flambe.Entity().add(this.selectorPanel));
		this.owner.addChild(new flambe.Entity().add(this.umiCharacter));
	}
	,handlerPointerUp: function(e) {
		var selectedBitmap = js.Boot.__cast(e.hit , flambe.swf.BitmapSprite);
		var umi = selectedBitmap.owner.parent.parent.firstComponent;
		if(umi.animationName == "UMI" && !this.selectorPanel.isConfigured) this.zoomPanel.addRulerUnit();
	}
	,getCurrentGap: function() {
		var parent = this.owner.parent.parent._compMap.Scene_0;
		return parent.getGapsManager().currentGap;
	}
	,changeGap: function(numberBridges) {
		this.totalBridges = numberBridges;
		this.zoomPanel.loadZoomBrokenRail(numberBridges);
		this.selectorPanel.cleanAnswers();
		this.selectorPanel.transform.set_visible(false);
		this.transform.set_visible(true);
		this.transform.scaleX.animate(0,1,0.6,flambe.animation.Ease.cubeOut);
		this.transform.scaleY.animate(0,1,0.6,flambe.animation.Ease.cubeOut);
		var f1 = new flambe.script.CallFunction(function() {
		});
		var seq = new flambe.script.Sequence([new flambe.script.Delay(0.64),f1]);
		this.owner._compMap.Script_36.run(seq);
	}
	,hide: function() {
		this.selectorPanel.cleanAnswers();
		this.zoomPanel.cleanBrokenRails();
		this.umiCharacter.reset();
		this.transform.set_visible(false);
	}
	,getParent: function() {
		var parent = this.owner.parent.parent._compMap.Scene_0;
		return parent;
	}
	,getZoomPanel: function() {
		return this.zoomPanel;
	}
	,getSelectorPanel: function() {
		return this.selectorPanel;
	}
	,getUmiCharacter: function() {
		return this.umiCharacter;
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.zoomPanel = new gui.components.game.NDiRailZoomPanelGame();
		this.selectorPanel = new gui.components.game.NDiRailSelectorPanelGame();
		this.umiCharacter = new gui.components.NDiUmi();
		this.umiCharacter.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.25 - 16);
		this.umiCharacter.transform.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	}
	,get_name: function() {
		return "NDiPanelControllerGame_30";
	}
	,__class__: gui.components.game.NDiPanelControllerGame
});
gui.components.game.NDiRailSelectorPanelGame = function() {
	this.loadInit();
};
$hxClasses["gui.components.game.NDiRailSelectorPanelGame"] = gui.components.game.NDiRailSelectorPanelGame;
gui.components.game.NDiRailSelectorPanelGame.__name__ = ["gui","components","game","NDiRailSelectorPanelGame"];
gui.components.game.NDiRailSelectorPanelGame.__super__ = flambe.Component;
gui.components.game.NDiRailSelectorPanelGame.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
	}
	,loadAnswers: function(totalBridges) {
		if(this.isConfigured) return;
		if(this.getParent().getParent().getGapsManager().currentGap == 0) {
			managers.NDiAudioManager.getInstance().stopSoundEffect();
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Finish-Measure"));
		}
		this.cleanAnswers();
		this.createAnswers(totalBridges);
		this.transform.y.animate(this.transform.y._value + 200,this.transform.y._value,0.5,flambe.animation.Ease.circOut);
		this.transform.set_visible(true);
		this.getParent().getUmiCharacter().toggleHideText(true);
		this.getParent().getUmiCharacter().getOut();
		this.isConfigured = true;
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.mig8.NDiAnswerButton);
		this.validateAnswerButton(tmpButton);
	}
	,checkIsRepaired: function() {
		var _g = this;
		var parent = this.getParent();
		if(parent.getZoomPanel().isRepaired()) {
			var f1 = new flambe.script.CallFunction(function() {
				parent.getUmiCharacter().animationCreate("_thumbsUP");
				managers.NDiAudioManager.getInstance().stopSoundEffect();
				if(_g.getParent().getParent().getGapsManager().isEndingGap()) managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob")); else managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Finish-Gap"));
				parent.getZoomPanel().cleanRulers();
			});
			var f2 = new flambe.script.CallFunction(function() {
				_g.isSelecting = false;
				parent.getParent().showMessagePopup("");
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.1),f1,new flambe.script.Delay(1),f2]);
			this.owner._compMap.Script_36.run(seq1);
		} else {
			var f1 = new flambe.script.CallFunction(function() {
				_g.getParent().getUmiCharacter().getOut();
				_g.isSelecting = false;
			});
			var seq = new flambe.script.Sequence([new flambe.script.Delay(1.1),f1]);
			this.owner._compMap.Script_36.run(seq);
		}
	}
	,umiJump: function(tmpButton,isWrong) {
		if(isWrong == null) isWrong = false;
		var _g = this;
		this.isSelecting = true;
		var umi = this.getParent().getUmiCharacter();
		umi.transform.x.set__(tmpButton.x._value);
		umi.jump();
		var f1 = new flambe.script.CallFunction(function() {
			umi.animationCreate("_handsUP");
			if(isWrong == true) {
				_g.getParent().getZoomPanel().createWrongSelectedPiece(tmpButton.answer);
				var f2 = new flambe.script.CallFunction(function() {
					_g.getParent().getZoomPanel().cleanWrongPieces();
				});
				var seq2 = new flambe.script.Sequence([new flambe.script.Delay(0.9),f2]);
				_g.owner._compMap.Script_36.run(seq2);
			} else _g.getParent().getZoomPanel().createSelectedPiece(tmpButton.answer);
			_g.checkIsRepaired();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.6),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,validateAnswerButton: function(tmpButton) {
		if(this.isSelecting) return;
		var parent = this.getParent();
		if(parent.getZoomPanel().checkAnswer(tmpButton.answer)) this.umiJump(tmpButton); else {
			this.umiJump(tmpButton,true);
			tmpButton.scaleX.animate(1.5,1,0.8,flambe.animation.Ease.bounceOut);
			tmpButton.scaleY.animate(1.5,1,0.8,flambe.animation.Ease.bounceOut);
		}
	}
	,getParent: function() {
		return this.owner.parent._compMap.NDiPanelControllerGame_30;
	}
	,createAnswers: function(totalBridges) {
		var arrayAnswers = new Array();
		this.correctAnswer = totalBridges;
		arrayAnswers.push(totalBridges);
		var _g1 = 0, _g = this.totalAnswers - 1;
		while(_g1 < _g) {
			var index = _g1++;
			var parent = this.getParent();
			var level = parent.getParent().getLevel();
			var answerPredefined = globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_ANSWERS")[parent.getCurrentGap()][index];
			arrayAnswers.push(answerPredefined);
		}
		arrayAnswers = util.NDiRandomUtils.shuffle(arrayAnswers);
		var _g1 = 0, _g = arrayAnswers.length;
		while(_g1 < _g) {
			var index = _g1++;
			var tmpButton = new gui.components.mig8.NDiAnswerButton(arrayAnswers[index]);
			var widthButton = tmpButton.getNaturalWidth() + 40;
			tmpButton.x.set__(widthButton * index);
			var _g2 = tmpButton.x;
			_g2.set__(_g2._value - widthButton * ((arrayAnswers.length - 1) * 0.5));
			tmpButton.y.set__(10);
			tmpButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
			tmpButton.nameButton = "ANSWER_" + index;
			this.arrayAnswersButtons.push(tmpButton);
			this.owner.addChild(new flambe.Entity().add(tmpButton));
		}
	}
	,cleanAnswers: function() {
		var _g1 = 0, _g = this.arrayAnswersButtons.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayAnswersButtons[index] != null) this.arrayAnswersButtons[index].owner.dispose();
		}
		this.arrayAnswersButtons.splice(0,this.arrayAnswersButtons.length);
		this.isConfigured = false;
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.isSelecting = false;
		this.isConfigured = false;
		this.totalAnswers = 5;
		this.arrayAnswersButtons = new Array();
		var tmpButton = new gui.components.mig8.NDiAnswerButton(0);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - tmpButton.getNaturalHeight() * 0.5);
		var _g = this.transform.y;
		_g.set__(_g._value - 40);
	}
	,get_name: function() {
		return "NDiRailSelectorPanelGame_31";
	}
	,__class__: gui.components.game.NDiRailSelectorPanelGame
});
gui.components.game.NDiRailZoomPanelGame = function() {
	this.loadInit();
};
$hxClasses["gui.components.game.NDiRailZoomPanelGame"] = gui.components.game.NDiRailZoomPanelGame;
gui.components.game.NDiRailZoomPanelGame.__name__ = ["gui","components","game","NDiRailZoomPanelGame"];
gui.components.game.NDiRailZoomPanelGame.__super__ = flambe.Component;
gui.components.game.NDiRailZoomPanelGame.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.cleanButton));
	}
	,loadZoomBrokenRail: function(numberGaps) {
		this.cleanBrokenRails();
		this.totalBridges = numberGaps;
		this.countBridges = numberGaps;
		var indexGaps = Math.floor(this.totalUnits / this.totalBridges);
		if(this.totalBridges == 1) indexGaps = Math.floor(this.totalUnits * 0.5);
		var countGaps = 0;
		var _g1 = 0, _g = this.totalUnits;
		while(_g1 < _g) {
			var index = _g1++;
			if(index == indexGaps && countGaps < numberGaps) {
				indexGaps++;
				countGaps++;
				this.arrayBridges[index] = null;
			} else this.addNewBridge(index);
		}
	}
	,addNewBridge: function(index) {
		this.arrayBridges[index] = new gui.components.mig8.NDiBridge(this.bridgeTexture);
		this.arrayBridges[index].setAnchor(0,this.arrayBridges[index].anchorY._value);
		this.arrayBridges[index].x.set__(-(this.background.image.getNaturalWidth() * 0.5) + this.arrayBridges[index].getNaturalWidth() * index);
		this.arrayBridges[index].y.set__(0);
		this.arrayBridges[index].railIndex = index;
		this.owner.addChild(new flambe.Entity().add(this.arrayBridges[index]));
	}
	,cleanBrokenRails: function() {
		this.cleanRulers();
		this.cleanNewBridges();
		this.showCleanButton(true);
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] != null) this.arrayBridges[index].owner.dispose();
		}
		this.arrayBridges.splice(0,this.arrayBridges.length);
		this.isFinishedMeasurement = false;
	}
	,undoNewBridges: function() {
		if(this.arrayNewBridges.length <= 0) return;
		var index = this.arrayNewBridges.length - 1;
		var indexGroup = this.arrayNewBridges[index].groupIndex;
		while(index >= 0) {
			if(this.arrayNewBridges[index].groupIndex == indexGroup && this.arrayNewBridges[index].owner != null) {
				this.arrayNewBridges[index].owner.dispose();
				this.arrayBridges[this.arrayNewBridges[index].railIndex] = null;
				this.arrayNewBridges.pop();
			} else break;
			index--;
		}
		if(this.arrayNewBridges.length == 0) this.showCleanButton(true);
	}
	,cleanNewBridges: function() {
		this.countBridges = this.totalBridges;
		var _g1 = 0, _g = this.arrayNewBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayNewBridges[index] != null) {
				this.arrayNewBridges[index].owner.dispose();
				this.arrayBridges[this.arrayNewBridges[index].railIndex] = null;
			}
		}
		this.arrayNewBridges.splice(0,this.arrayNewBridges.length);
	}
	,cleanRulers: function() {
		var _g1 = 0, _g = this.arrayRulers.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayRulers[index] != null) this.arrayRulers[index].owner.dispose();
		}
		this.arrayRulers.splice(0,this.arrayRulers.length);
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButton);
		if(tmpButton.nameButton == "UNDO_BUTTON") this.undoNewBridges(); else if(tmpButton.nameButton == "BRIDGE") this.deleteBridge(js.Boot.__cast(tmpButton , gui.components.mig8.NDiBridge));
	}
	,deleteBridge: function(tmpButton) {
		var index = 0;
		var countBridgeGroup = 0;
		var clickedIndex = 0;
		while(index < this.arrayNewBridges.length) {
			if(this.arrayNewBridges[index].groupIndex == tmpButton.groupIndex) {
				if(tmpButton == this.arrayNewBridges[index]) clickedIndex = index;
				this.arrayNewBridges[index].dispose();
				var railIndex = this.arrayNewBridges[index].railIndex;
				this.arrayBridges[railIndex] = null;
				HxOverrides.remove(this.arrayNewBridges,this.arrayNewBridges[index]);
				index--;
				countBridgeGroup++;
			}
			index++;
		}
		this.countGroups--;
		this.countBridges += countBridgeGroup;
		this.realignBridges(countBridgeGroup,clickedIndex);
	}
	,realignBridges: function(numberNewGaps,clickedIndex) {
		if(this.arrayNewBridges.length > 0) {
			var _g1 = clickedIndex, _g = this.arrayNewBridges.length;
			while(_g1 < _g) {
				var index = _g1++;
				var despX = this.arrayNewBridges[index].x._value - this.arrayNewBridges[index].getNaturalWidth() * numberNewGaps;
				this.arrayNewBridges[index].x.animateTo(despX,0.3,flambe.animation.Ease.sineOut);
				var railIndex = this.arrayNewBridges[index].railIndex;
				this.arrayBridges[railIndex - numberNewGaps] = this.arrayBridges[railIndex];
				this.arrayBridges[railIndex - numberNewGaps].railIndex -= numberNewGaps;
				this.arrayBridges[railIndex - numberNewGaps].groupIndex--;
				this.arrayBridges[railIndex] = null;
			}
		}
	}
	,checkAnswer: function(answer) {
		var countEmptys = 0;
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] == null) countEmptys++;
		}
		if(answer <= countEmptys) return true; else return false;
	}
	,createSelectedPiece: function(answer) {
		var countEmptys = 0;
		var arrayEmptyIndex = new Array();
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] == null) {
				countEmptys++;
				arrayEmptyIndex.push(index);
			}
		}
		if(answer <= countEmptys) {
			this.countGroups++;
			var _g = 0;
			while(_g < answer) {
				var index = _g++;
				this.showCleanButton();
				this.addNewBridge(arrayEmptyIndex[index]);
				this.countBridges--;
				this.arrayBridges[arrayEmptyIndex[index]].get_pointerUp().connect($bind(this,this.handlerPointerUp));
				this.arrayBridges[arrayEmptyIndex[index]].nameButton = "BRIDGE";
				this.arrayBridges[arrayEmptyIndex[index]].alpha.animate(0,1,0.8,flambe.animation.Ease.quartOut);
				this.arrayBridges[arrayEmptyIndex[index]].groupIndex = this.countGroups;
				this.arrayBridges[arrayEmptyIndex[index]].highlight.transform.set_visible(true);
				this.arrayBridges[arrayEmptyIndex[index]].highlight.showCorrectTexture();
				var fromPosX = this.getParent().getUmiCharacter().transform.x._value;
				var fromPosY = this.getParent().getUmiCharacter().transform.y._value;
				this.arrayBridges[arrayEmptyIndex[index]].y.animate(fromPosY,this.arrayBridges[arrayEmptyIndex[index]].y._value,0.3,flambe.animation.Ease.sineOut);
				this.arrayBridges[arrayEmptyIndex[index]].x.animate(fromPosX,this.arrayBridges[arrayEmptyIndex[index]].x._value,0.3,flambe.animation.Ease.sineOut);
				this.arrayNewBridges.push(this.arrayBridges[arrayEmptyIndex[index]]);
			}
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			return true;
		} else return false;
	}
	,createWrongSelectedPiece: function(answer) {
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
		var _g = 0;
		while(_g < answer) {
			var index = _g++;
			this.wrongSelection[index] = new gui.components.mig8.NDiBridge(this.bridgeTexture);
			this.wrongSelection[index].setAnchor(0,this.wrongSelection[index].anchorY._value);
			this.wrongSelection[index].railIndex = index;
			this.owner.addChild(new flambe.Entity().add(this.wrongSelection[index]));
			this.wrongSelection[index].alpha.animate(0,1,0.8,flambe.animation.Ease.quartOut);
			var fromPosX = this.getParent().getUmiCharacter().transform.x._value;
			var fromPosY = this.getParent().getUmiCharacter().transform.y._value;
			this.wrongSelection[index].highlight.transform.set_visible(true);
			this.wrongSelection[index].highlight.showWrongTexture();
			var toPosX = 0;
			var toPosY = 30;
			if(index > 0) toPosX = this.wrongSelection[index - 1].getNaturalWidth() * index;
			var descX = this.wrongSelection[index].getNaturalWidth() * answer * 0.5;
			toPosX -= descX;
			this.wrongSelection[index].y.animate(fromPosY,toPosY,0.3,flambe.animation.Ease.sineOut);
			this.wrongSelection[index].x.animate(fromPosX,toPosX,0.3,flambe.animation.Ease.sineOut);
		}
	}
	,cleanWrongPieces: function() {
		var _g = this;
		var _g1 = 0, _g2 = this.wrongSelection.length;
		while(_g1 < _g2) {
			var index = _g1++;
			this.wrongSelection[index].y.animateTo(this.wrongSelection[index].y._value + 250,0.4,flambe.animation.Ease.sineOut);
			this.wrongSelection[index].alpha.animateTo(0,0.4);
		}
		var f1 = new flambe.script.CallFunction(function() {
			var _g2 = 0, _g1 = _g.wrongSelection.length;
			while(_g2 < _g1) {
				var index = _g2++;
				_g.wrongSelection[index].owner.dispose();
				_g.wrongSelection[index] = null;
			}
			_g.wrongSelection.splice(0,_g.wrongSelection.length);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.4),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,isRepaired: function() {
		return this.arrayNewBridges.length == this.totalBridges?true:false;
	}
	,addRulerUnit: function() {
		if(this.isFinishedMeasurement) return;
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] == null) {
				if(this.arrayRulers.length > 0) {
					var isMeasured = false;
					var _g3 = 0, _g2 = this.arrayRulers.length;
					while(_g3 < _g2) {
						var i = _g3++;
						if(this.arrayRulers[i].indexBridge == index) {
							isMeasured = true;
							break;
						}
					}
					if(!isMeasured) {
						this.createRuler(index);
						return;
					}
				} else {
					this.createRuler(index);
					return;
				}
			}
		}
	}
	,createRuler: function(indexRail) {
		var tmp = new gui.components.mig8.NDiRuler(this.rulerTexture,indexRail,this.arrayRulers.length);
		tmp.transform.y.set__(-30);
		tmp.image.setAnchor(0,tmp.image.anchorY._value);
		var fromPosY = this.getParent().getUmiCharacter().transform.y._value;
		var fromPosX = this.getParent().getUmiCharacter().transform.x._value;
		tmp.transform.x.set__(-(this.background.image.getNaturalWidth() * 0.5) + tmp.image.getNaturalWidth() * indexRail);
		tmp.transform.x.animate(fromPosX,tmp.transform.x._value,0.3,flambe.animation.Ease.sineOut);
		tmp.transform.y.animate(fromPosY,tmp.transform.y._value,0.3,flambe.animation.Ease.sineOut);
		this.arrayRulers.push(tmp);
		this.owner.addChild(new flambe.Entity().add(tmp));
		this.getParent().getUmiCharacter().animationCreate("_handsUP");
		this.timeOutFinished();
	}
	,timeOutFinished: function() {
		var _g = this;
		if(this.arrayRulers.length == this.countBridges) {
			var f1 = new flambe.script.CallFunction(function() {
				_g.getParent().getSelectorPanel().loadAnswers(_g.totalBridges);
				_g.isFinishedMeasurement = false;
			});
			var seq0 = new flambe.script.Sequence([new flambe.script.Delay(1.5),f1]);
			this.owner._compMap.Script_36.run(seq0);
			this.isFinishedMeasurement = true;
		}
	}
	,getParent: function() {
		return this.owner.parent._compMap.NDiPanelControllerGame_30;
	}
	,showCleanButton: function(hide) {
		if(hide == null) hide = false;
		if(hide) {
			if((this.cleanButton._flags & 1) != 0 == true) this.cleanButton.set_visible(false);
		} else if((this.cleanButton._flags & 1) != 0 == false) this.cleanButton.set_visible(true);
	}
	,loadInit: function() {
		this.isFinishedMeasurement = false;
		this.transform = new flambe.display.Sprite();
		this.arrayBridges = new Array();
		this.arrayNewBridges = new Array();
		this.arrayRulers = new Array();
		this.wrongSelection = new Array();
		this.totalUnits = 12;
		this.totalBridges = 0;
		this.countBridges = 0;
		this.countGroups = 0;
		this.errorSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/error_x"));
		this.errorSignal.transform.y.set__(-8);
		this.isActiveErrorSignal = false;
		this.rulerTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/ruler");
		this.bridgeTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/bridge_rail");
		this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/rail_zoom_panel"));
		this.background.transform.x.set__(0);
		this.background.transform.y.set__(0);
		this.background.image.disablePointer();
		this.cleanButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/clean_button"));
		this.cleanButton.x.set__(this.background.image.getNaturalWidth() * 0.5 - 73);
		this.cleanButton.y.set__(-59);
		this.cleanButton.nameButton = "UNDO_BUTTON";
		this.cleanButton.set_visible(false);
		this.cleanButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	}
	,get_name: function() {
		return "NDiRailZoomPanelGame_32";
	}
	,__class__: gui.components.game.NDiRailZoomPanelGame
});
gui.components.mig2 = {}
gui.components.mig2.NDiBitCharacterMig2 = function() {
	this.transform = new flambe.display.Sprite();
	this.originalPosition = new math.NDiVector2D(0,0);
	this.character = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/bit"));
	this.highlightSignal = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/highlightFootNormal"),null,null);
	this.highlightSignal.transform.x.set__(-85);
	this.highlightSignal.transform.y.set__(0);
	this.highlightSignal.transform.alpha.set__(0);
	this.footBitArea = new gui.components.NDiButtonFillText(0,65,65);
	this.footBitArea.nameButton = "CLICK_FOOT";
	this.footBitArea.text.set_text("Click here");
	this.footBitArea.x.set__(-95);
	this.footBitArea.y.set__(0);
	this.footBitArea.alpha.set__(0.0);
	this.footBitArea.text.setAnchor(0,0);
};
$hxClasses["gui.components.mig2.NDiBitCharacterMig2"] = gui.components.mig2.NDiBitCharacterMig2;
gui.components.mig2.NDiBitCharacterMig2.__name__ = ["gui","components","mig2","NDiBitCharacterMig2"];
gui.components.mig2.NDiBitCharacterMig2.__super__ = flambe.Component;
gui.components.mig2.NDiBitCharacterMig2.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.highlightSignal));
		this.owner.addChild(new flambe.Entity().add(this.character));
		this.owner.addChild(new flambe.Entity().add(this.footBitArea));
	}
	,get_name: function() {
		return "NDiBitCharacterMig2_26";
	}
	,__class__: gui.components.mig2.NDiBitCharacterMig2
});
gui.components.mig2.NDiFootprintBitMig2 = function() {
	this.transform = new flambe.display.Sprite();
	this.footprint = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/footprint"));
	this.footprint.transform.set_visible(false);
	this.hotspot = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/footprintCue"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/footprintCorrect"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/footprintWrong"));
	this.hotspot.transform.set_visible(false);
};
$hxClasses["gui.components.mig2.NDiFootprintBitMig2"] = gui.components.mig2.NDiFootprintBitMig2;
gui.components.mig2.NDiFootprintBitMig2.__name__ = ["gui","components","mig2","NDiFootprintBitMig2"];
gui.components.mig2.NDiFootprintBitMig2.__super__ = flambe.Component;
gui.components.mig2.NDiFootprintBitMig2.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.hotspot));
		this.owner.addChild(new flambe.Entity().add(this.footprint));
	}
	,show: function() {
		this.footprint.transform.set_visible(true);
		this.hotspot.transform.set_visible(true);
	}
	,get_name: function() {
		return "NDiFootprintBitMig2_25";
	}
	,__class__: gui.components.mig2.NDiFootprintBitMig2
});
gui.components.mig3 = {}
gui.components.mig3.NDiFootprintBitMig3 = function() {
	this.transform = new flambe.display.Sprite();
	this.footprint = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/foot"));
	this.footprint.bottomCenterAnchor();
	this.hotspot = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/footprintNormal"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/footprintCorrect"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/footprintWrong"));
	this.hotspot.transform.set_visible(false);
	this.hotspot.bottomCenterAnchor();
	this.hotspot.transform.disablePointer();
};
$hxClasses["gui.components.mig3.NDiFootprintBitMig3"] = gui.components.mig3.NDiFootprintBitMig3;
gui.components.mig3.NDiFootprintBitMig3.__name__ = ["gui","components","mig3","NDiFootprintBitMig3"];
gui.components.mig3.NDiFootprintBitMig3.__super__ = flambe.Component;
gui.components.mig3.NDiFootprintBitMig3.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.hotspot));
		this.owner.addChild(new flambe.Entity().add(this.footprint));
	}
	,show: function() {
		this.footprint.set_visible(true);
		this.hotspot.transform.set_visible(true);
		this.transform.set_visible(true);
	}
	,centerHotspot: function() {
		this.hotspot.bottomCenterAnchor();
		var dif = this.hotspot.image.getNaturalHeight() - this.footprint.getNaturalHeight();
		dif = Math.abs(dif);
		this.hotspot.transform.y.set__(dif * 0.5);
	}
	,get_name: function() {
		return "NDiFootprintBitMig3_22";
	}
	,__class__: gui.components.mig3.NDiFootprintBitMig3
});
gui.components.mig4 = {}
gui.components.mig4.NDiHandMig4 = function() {
	this.transform = new flambe.display.Sprite();
	this.normalState = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/hand"));
	this.normalState.centerAnchor();
	this.correctState = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/handWithRuler"));
	this.correctState.centerAnchor();
	this.highlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/hand_highlight"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/handWithRuler_highlight"),null);
	this.highlight.image.centerAnchor();
	this.highlight.transform.disablePointer();
};
$hxClasses["gui.components.mig4.NDiHandMig4"] = gui.components.mig4.NDiHandMig4;
gui.components.mig4.NDiHandMig4.__name__ = ["gui","components","mig4","NDiHandMig4"];
gui.components.mig4.NDiHandMig4.__super__ = flambe.Component;
gui.components.mig4.NDiHandMig4.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.highlight));
		this.owner.addChild(new flambe.Entity().add(this.normalState));
		this.owner.addChild(new flambe.Entity().add(this.correctState));
	}
	,setRightState: function() {
		this.normalState.set_visible(false);
		this.correctState.set_visible(true);
		this.highlight.transform.set_visible(true);
		this.highlight.showCorrectTexture();
	}
	,setWrongState: function() {
		this.normalState.set_visible(true);
		this.correctState.set_visible(false);
		this.highlight.transform.set_visible(true);
		this.highlight.showNormalTexture();
	}
	,setInitialState: function() {
		this.normalState.set_visible(true);
		this.correctState.set_visible(false);
		this.highlight.transform.set_visible(false);
	}
	,get_name: function() {
		return "NDiHandMig4_18";
	}
	,__class__: gui.components.mig4.NDiHandMig4
});
gui.components.mig4.NDiItemMig4 = function(texture,highlightTexture) {
	this.isValid = false;
	this.transform = new flambe.display.Sprite();
	this.object = new gui.components.NDiButton(texture);
	this.object.centerAnchor();
	if(highlightTexture != null) {
		this.highlight = new gui.components.NDiHighlightSignal(highlightTexture,null,null);
		this.highlight.image.centerAnchor();
		this.highlight.transform.disablePointer();
	}
};
$hxClasses["gui.components.mig4.NDiItemMig4"] = gui.components.mig4.NDiItemMig4;
gui.components.mig4.NDiItemMig4.__name__ = ["gui","components","mig4","NDiItemMig4"];
gui.components.mig4.NDiItemMig4.__super__ = flambe.Component;
gui.components.mig4.NDiItemMig4.prototype = $extend(flambe.Component.prototype,{
	setOnTop: function() {
		var tmpEntity = this.owner.parent;
		tmpEntity.removeChild(this.owner);
		tmpEntity.addChild(this.owner);
	}
	,stopHighlight: function() {
		if(this.highlight != null) this.highlight.transform.set_visible(false);
	}
	,resumeHighlight: function() {
		if(this.highlight != null) this.highlight.transform.set_visible(true);
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		if(this.highlight != null) this.owner.addChild(new flambe.Entity().add(this.highlight));
		this.owner.addChild(new flambe.Entity().add(this.object));
	}
	,get_name: function() {
		return "NDiItemMig4_19";
	}
	,__class__: gui.components.mig4.NDiItemMig4
});
gui.components.mig7 = {}
gui.components.mig7.NDiPieceRobot = function(texture,sizePiece) {
	this.transform = new flambe.display.Sprite();
	this.piece = new gui.components.NDiButton(texture);
	this.isPlaced = false;
	this.piece.setOriginalPosition(0,0);
	this.size = sizePiece;
	if(this.size == 1) this.createSingleHighlight(); else this.createDoubleHighlight();
	this.centerHightlight();
	this.highlight.transform.disablePointer();
	this.highlight.transform.set_visible(false);
};
$hxClasses["gui.components.mig7.NDiPieceRobot"] = gui.components.mig7.NDiPieceRobot;
gui.components.mig7.NDiPieceRobot.__name__ = ["gui","components","mig7","NDiPieceRobot"];
gui.components.mig7.NDiPieceRobot.__super__ = flambe.Component;
gui.components.mig7.NDiPieceRobot.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.highlight));
		this.owner.addChild(new flambe.Entity().add(this.piece));
		flambe.Component.prototype.onAdded.call(this);
	}
	,createDoubleHighlight: function() {
		this.highlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/pieces/bigobj_highlight"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/pieces/bigobj_correct"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/pieces/bigobj_incorrect"));
	}
	,createSingleHighlight: function() {
		this.highlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/pieces/smalobj_highlight"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/pieces/smalobj_correct"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/pieces/smalobj_incorrect"));
	}
	,centerHightlight: function() {
		this.highlight.transform.y.set__(-this.piece.getNaturalHeight() * 0.5);
	}
	,showIncorrectHighlight: function() {
		this.highlight.showNormal = false;
		this.highlight.toggleHide();
		this.highlight.showWrongTexture();
	}
	,showCorrectHighlight: function() {
		this.highlight.showNormal = false;
		this.highlight.toggleHide();
		this.highlight.showCorrectTexture();
	}
	,hideHiglight: function() {
		if(!((this.highlight.transform._flags & 1) != 0)) return;
		this.highlight.transform.set_visible(false);
	}
	,get_name: function() {
		return "NDiPieceRobot_10";
	}
	,__class__: gui.components.mig7.NDiPieceRobot
});
gui.components.mig8 = {}
gui.components.mig8.NDiAnswerButton = function(value) {
	gui.components.NDiButton.call(this,managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/rail_selector"));
	this.answer = value;
	var font = managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri");
	var valueStr = "" + value;
	this.numberSprite = new flambe.display.TextSprite(font,valueStr);
	this.numberSprite.x.set__(this.getNaturalWidth() * 0.5);
	this.numberSprite.y.set__(this.getNaturalHeight() * 0.5);
	this.numberSprite.centerAnchor();
	this.numberSprite.disablePointer();
	this.centerAnchor();
};
$hxClasses["gui.components.mig8.NDiAnswerButton"] = gui.components.mig8.NDiAnswerButton;
gui.components.mig8.NDiAnswerButton.__name__ = ["gui","components","mig8","NDiAnswerButton"];
gui.components.mig8.NDiAnswerButton.__super__ = gui.components.NDiButton;
gui.components.mig8.NDiAnswerButton.prototype = $extend(gui.components.NDiButton.prototype,{
	onAdded: function() {
		gui.components.NDiButton.prototype.onAdded.call(this);
		this.owner.addChild(new flambe.Entity().add(this.numberSprite));
	}
	,__class__: gui.components.mig8.NDiAnswerButton
});
gui.components.mig8.NDiBridge = function(texture) {
	gui.components.NDiButton.call(this,texture);
	this.highlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/railCorrect"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/railCorrect"),managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/railWrong"));
	this.highlight.transform.set_visible(false);
	this.highlight.transform.disablePointer();
	this.highlight.showNormal = false;
};
$hxClasses["gui.components.mig8.NDiBridge"] = gui.components.mig8.NDiBridge;
gui.components.mig8.NDiBridge.__name__ = ["gui","components","mig8","NDiBridge"];
gui.components.mig8.NDiBridge.__super__ = gui.components.NDiButton;
gui.components.mig8.NDiBridge.prototype = $extend(gui.components.NDiButton.prototype,{
	setOnTop: function() {
		var tmpEntity = this.owner.parent;
		tmpEntity.removeChild(this.owner);
		tmpEntity.addChild(this.owner);
	}
	,onRemoved: function() {
		this.highlight.owner.dispose();
		this.owner.dispose();
		gui.components.NDiButton.prototype.onRemoved.call(this);
	}
	,onAdded: function() {
		var _g = this;
		gui.components.NDiButton.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		var f1 = new flambe.script.CallFunction(function() {
			_g.centerHotspot();
			_g.owner.addChild(new flambe.Entity().add(_g.highlight));
			_g.setOnTop();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.05),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,centerHotspot: function() {
		var dif = this.highlight.image.getNaturalHeight() - this.getNaturalHeight();
		dif = Math.abs(dif);
		this.highlight.transform.y.set__(this.highlight.image.getNaturalHeight() * 0.5);
		var _g = this.highlight.transform.y;
		_g.set__(_g._value - dif * 0.5);
		dif = this.highlight.image.getNaturalWidth() - this.getNaturalWidth();
		dif = Math.abs(dif);
		this.highlight.transform.x.set__(this.highlight.image.getNaturalWidth() * 0.5);
		var _g = this.highlight.transform.x;
		_g.set__(_g._value - dif * 0.5);
	}
	,__class__: gui.components.mig8.NDiBridge
});
gui.components.mig8.NDiGapButton = function(numBridges) {
	gui.components.NDiButtonFill.call(this,16777215,27,4);
	this.totalBridges = numBridges;
};
$hxClasses["gui.components.mig8.NDiGapButton"] = gui.components.mig8.NDiGapButton;
gui.components.mig8.NDiGapButton.__name__ = ["gui","components","mig8","NDiGapButton"];
gui.components.mig8.NDiGapButton.__super__ = gui.components.NDiButtonFill;
gui.components.mig8.NDiGapButton.prototype = $extend(gui.components.NDiButtonFill.prototype,{
	__class__: gui.components.mig8.NDiGapButton
});
gui.components.mig8.NDiPanelControllerMig8 = function() {
	this.loadInit();
};
$hxClasses["gui.components.mig8.NDiPanelControllerMig8"] = gui.components.mig8.NDiPanelControllerMig8;
gui.components.mig8.NDiPanelControllerMig8.__name__ = ["gui","components","mig8","NDiPanelControllerMig8"];
gui.components.mig8.NDiPanelControllerMig8.__super__ = flambe.Component;
gui.components.mig8.NDiPanelControllerMig8.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.zoomPanel));
		this.owner.addChild(new flambe.Entity().add(this.selectorPanel));
		this.owner.addChild(new flambe.Entity().add(this.umiCharacter));
	}
	,handlerPointerUp: function(e) {
		var selectedBitmap = js.Boot.__cast(e.hit , flambe.swf.BitmapSprite);
		var umi = selectedBitmap.owner.parent.parent.firstComponent;
		if(umi.animationName == "UMI" && !this.selectorPanel.isConfigured) this.zoomPanel.addRulerUnit();
	}
	,getCurrentGap: function() {
		var parent = this.owner.parent.parent._compMap.Scene_0;
		return parent.getGapsManager().currentGap;
	}
	,changeGap: function(numberBridges) {
		this.totalBridges = numberBridges;
		this.zoomPanel.loadZoomBrokenRail(numberBridges);
		this.selectorPanel.cleanAnswers();
		this.selectorPanel.transform.set_visible(false);
		this.transform.set_visible(true);
		this.transform.scaleX.animate(0,1,0.6,flambe.animation.Ease.cubeOut);
		this.transform.scaleY.animate(0,1,0.6,flambe.animation.Ease.cubeOut);
		var f1 = new flambe.script.CallFunction(function() {
		});
		var seq = new flambe.script.Sequence([new flambe.script.Delay(0.64),f1]);
		this.owner._compMap.Script_36.run(seq);
	}
	,hide: function() {
		this.selectorPanel.cleanAnswers();
		this.zoomPanel.cleanBrokenRails();
		this.umiCharacter.reset();
		this.transform.set_visible(false);
	}
	,getParent: function() {
		var parent = this.owner.parent.parent._compMap.Scene_0;
		return parent;
	}
	,getZoomPanel: function() {
		return this.zoomPanel;
	}
	,getSelectorPanel: function() {
		return this.selectorPanel;
	}
	,getUmiCharacter: function() {
		return this.umiCharacter;
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.zoomPanel = new gui.components.mig8.NDiRailZoomPanel();
		this.selectorPanel = new gui.components.mig8.NDiRailSelectorPanel();
		this.umiCharacter = new gui.components.NDiUmi();
		this.umiCharacter.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.25 - 16);
		this.umiCharacter.transform.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	}
	,get_name: function() {
		return "NDiPanelControllerMig8_3";
	}
	,__class__: gui.components.mig8.NDiPanelControllerMig8
});
gui.components.mig8.NDiRailSelectorPanel = function() {
	this.loadInit();
};
$hxClasses["gui.components.mig8.NDiRailSelectorPanel"] = gui.components.mig8.NDiRailSelectorPanel;
gui.components.mig8.NDiRailSelectorPanel.__name__ = ["gui","components","mig8","NDiRailSelectorPanel"];
gui.components.mig8.NDiRailSelectorPanel.__super__ = flambe.Component;
gui.components.mig8.NDiRailSelectorPanel.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
	}
	,loadAnswers: function(totalBridges) {
		if(this.isConfigured) return;
		if(this.getParent().getParent().getGapsManager().currentGap == 0) {
			managers.NDiAudioManager.getInstance().stopSoundEffect();
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Finish-Measure"));
		}
		this.cleanAnswers();
		this.createAnswers(totalBridges);
		this.transform.y.animate(this.transform.y._value + 200,this.transform.y._value,0.5,flambe.animation.Ease.circOut);
		this.transform.set_visible(true);
		this.getParent().getUmiCharacter().toggleHideText(true);
		this.getParent().getUmiCharacter().getOut();
		this.isConfigured = true;
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.mig8.NDiAnswerButton);
		this.validateAnswerButton(tmpButton);
	}
	,checkIsRepaired: function() {
		var _g = this;
		var parent = this.getParent();
		if(parent.getZoomPanel().isRepaired()) {
			var f1 = new flambe.script.CallFunction(function() {
				parent.getUmiCharacter().animationCreate("_thumbsUP");
				managers.NDiAudioManager.getInstance().stopSoundEffect();
				if(_g.getParent().getParent().getGapsManager().isEndingGap()) managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob")); else managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Finish-Gap"));
				parent.getZoomPanel().cleanRulers();
			});
			var f2 = new flambe.script.CallFunction(function() {
				_g.isSelecting = false;
				parent.getParent().showMessagePopup("");
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.1),f1,new flambe.script.Delay(1),f2]);
			this.owner._compMap.Script_36.run(seq1);
		} else {
			var f1 = new flambe.script.CallFunction(function() {
				_g.getParent().getUmiCharacter().getOut();
				_g.isSelecting = false;
			});
			var seq = new flambe.script.Sequence([new flambe.script.Delay(1.1),f1]);
			this.owner._compMap.Script_36.run(seq);
		}
	}
	,umiJump: function(tmpButton,isWrong) {
		if(isWrong == null) isWrong = false;
		var _g = this;
		this.isSelecting = true;
		var umi = this.getParent().getUmiCharacter();
		umi.transform.x.set__(tmpButton.x._value);
		umi.jump();
		var f1 = new flambe.script.CallFunction(function() {
			umi.animationCreate("_handsUP");
			if(isWrong == true) {
				_g.getParent().getZoomPanel().createWrongSelectedPiece(tmpButton.answer);
				var f2 = new flambe.script.CallFunction(function() {
					_g.getParent().getZoomPanel().cleanWrongPieces();
				});
				var seq2 = new flambe.script.Sequence([new flambe.script.Delay(0.9),f2]);
				_g.owner._compMap.Script_36.run(seq2);
			} else _g.getParent().getZoomPanel().createSelectedPiece(tmpButton.answer);
			_g.checkIsRepaired();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.6),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,validateAnswerButton: function(tmpButton) {
		if(this.isSelecting) return;
		var parent = this.getParent();
		if(parent.getZoomPanel().checkAnswer(tmpButton.answer)) this.umiJump(tmpButton); else {
			this.umiJump(tmpButton,true);
			tmpButton.scaleX.animate(1.5,1,0.8,flambe.animation.Ease.bounceOut);
			tmpButton.scaleY.animate(1.5,1,0.8,flambe.animation.Ease.bounceOut);
		}
	}
	,getParent: function() {
		return this.owner.parent._compMap.NDiPanelControllerMig8_3;
	}
	,createAnswers: function(totalBridges) {
		var arrayAnswers = new Array();
		this.correctAnswer = totalBridges;
		arrayAnswers.push(totalBridges);
		var _g1 = 0, _g = this.totalAnswers - 1;
		while(_g1 < _g) {
			var index = _g1++;
			var parent = this.getParent();
			var answerPredefined = globals.NDiGameConstants.ARRAY_ANSWERS[parent.getCurrentGap()][index];
			arrayAnswers.push(answerPredefined);
		}
		arrayAnswers = util.NDiRandomUtils.shuffle(arrayAnswers);
		var _g1 = 0, _g = arrayAnswers.length;
		while(_g1 < _g) {
			var index = _g1++;
			var tmpButton = new gui.components.mig8.NDiAnswerButton(arrayAnswers[index]);
			var widthButton = tmpButton.getNaturalWidth() + 40;
			tmpButton.x.set__(widthButton * index);
			var _g2 = tmpButton.x;
			_g2.set__(_g2._value - widthButton * ((arrayAnswers.length - 1) * 0.5));
			tmpButton.y.set__(10);
			tmpButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
			tmpButton.nameButton = "ANSWER_" + index;
			this.arrayAnswersButtons.push(tmpButton);
			this.owner.addChild(new flambe.Entity().add(tmpButton));
		}
	}
	,cleanAnswers: function() {
		var _g1 = 0, _g = this.arrayAnswersButtons.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayAnswersButtons[index] != null) this.arrayAnswersButtons[index].owner.dispose();
		}
		this.arrayAnswersButtons.splice(0,this.arrayAnswersButtons.length);
		this.isConfigured = false;
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.isSelecting = false;
		this.isConfigured = false;
		this.totalAnswers = 5;
		this.arrayAnswersButtons = new Array();
		var tmpButton = new gui.components.mig8.NDiAnswerButton(0);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - tmpButton.getNaturalHeight() * 0.5);
		var _g = this.transform.y;
		_g.set__(_g._value - 40);
	}
	,get_name: function() {
		return "NDiRailSelectorPanel_4";
	}
	,__class__: gui.components.mig8.NDiRailSelectorPanel
});
gui.components.mig8.NDiRailZoomPanel = function() {
	this.loadInit();
};
$hxClasses["gui.components.mig8.NDiRailZoomPanel"] = gui.components.mig8.NDiRailZoomPanel;
gui.components.mig8.NDiRailZoomPanel.__name__ = ["gui","components","mig8","NDiRailZoomPanel"];
gui.components.mig8.NDiRailZoomPanel.__super__ = flambe.Component;
gui.components.mig8.NDiRailZoomPanel.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.cleanButton));
	}
	,loadZoomBrokenRail: function(numberGaps) {
		this.cleanBrokenRails();
		this.totalBridges = numberGaps;
		this.countBridges = numberGaps;
		var indexGaps = Math.floor(this.totalUnits / this.totalBridges);
		if(this.totalBridges == 1) indexGaps = Math.floor(this.totalUnits * 0.5);
		var countGaps = 0;
		var _g1 = 0, _g = this.totalUnits;
		while(_g1 < _g) {
			var index = _g1++;
			if(index == indexGaps && countGaps < numberGaps) {
				indexGaps++;
				countGaps++;
				this.arrayBridges[index] = null;
			} else this.addNewBridge(index);
		}
	}
	,addNewBridge: function(index) {
		this.arrayBridges[index] = new gui.components.mig8.NDiBridge(this.bridgeTexture);
		this.arrayBridges[index].setAnchor(0,this.arrayBridges[index].anchorY._value);
		this.arrayBridges[index].x.set__(-(this.background.image.getNaturalWidth() * 0.5) + this.arrayBridges[index].getNaturalWidth() * index);
		this.arrayBridges[index].y.set__(0);
		this.arrayBridges[index].railIndex = index;
		this.owner.addChild(new flambe.Entity().add(this.arrayBridges[index]));
	}
	,cleanBrokenRails: function() {
		this.cleanRulers();
		this.cleanNewBridges();
		this.showCleanButton(true);
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] != null) this.arrayBridges[index].owner.dispose();
		}
		this.arrayBridges.splice(0,this.arrayBridges.length);
		this.isFinishedMeasurement = false;
	}
	,undoNewBridges: function() {
		if(this.arrayNewBridges.length <= 0) return;
		var index = this.arrayNewBridges.length - 1;
		var indexGroup = this.arrayNewBridges[index].groupIndex;
		while(index >= 0) {
			if(this.arrayNewBridges[index].groupIndex == indexGroup && this.arrayNewBridges[index].owner != null) {
				this.arrayNewBridges[index].owner.dispose();
				this.arrayBridges[this.arrayNewBridges[index].railIndex] = null;
				this.arrayNewBridges.pop();
			} else break;
			index--;
		}
		if(this.arrayNewBridges.length == 0) this.showCleanButton(true);
	}
	,cleanNewBridges: function() {
		this.countBridges = this.totalBridges;
		var _g1 = 0, _g = this.arrayNewBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayNewBridges[index] != null) {
				this.arrayNewBridges[index].owner.dispose();
				this.arrayBridges[this.arrayNewBridges[index].railIndex] = null;
			}
		}
		this.arrayNewBridges.splice(0,this.arrayNewBridges.length);
	}
	,cleanRulers: function() {
		var _g1 = 0, _g = this.arrayRulers.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayRulers[index] != null) this.arrayRulers[index].owner.dispose();
		}
		this.arrayRulers.splice(0,this.arrayRulers.length);
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButton);
		if(tmpButton.nameButton == "UNDO_BUTTON") this.undoNewBridges(); else if(tmpButton.nameButton == "BRIDGE") this.deleteBridge(js.Boot.__cast(tmpButton , gui.components.mig8.NDiBridge));
	}
	,deleteBridge: function(tmpButton) {
		var index = 0;
		var countBridgeGroup = 0;
		var clickedIndex = 0;
		while(index < this.arrayNewBridges.length) {
			if(this.arrayNewBridges[index].groupIndex == tmpButton.groupIndex) {
				if(tmpButton == this.arrayNewBridges[index]) clickedIndex = index;
				this.arrayNewBridges[index].dispose();
				var railIndex = this.arrayNewBridges[index].railIndex;
				this.arrayBridges[railIndex] = null;
				HxOverrides.remove(this.arrayNewBridges,this.arrayNewBridges[index]);
				index--;
				countBridgeGroup++;
			}
			index++;
		}
		this.countGroups--;
		this.countBridges += countBridgeGroup;
		this.realignBridges(countBridgeGroup,clickedIndex);
	}
	,realignBridges: function(numberNewGaps,clickedIndex) {
		if(this.arrayNewBridges.length > 0) {
			var _g1 = clickedIndex, _g = this.arrayNewBridges.length;
			while(_g1 < _g) {
				var index = _g1++;
				var despX = this.arrayNewBridges[index].x._value - this.arrayNewBridges[index].getNaturalWidth() * numberNewGaps;
				this.arrayNewBridges[index].x.animateTo(despX,0.3,flambe.animation.Ease.sineOut);
				var railIndex = this.arrayNewBridges[index].railIndex;
				this.arrayBridges[railIndex - numberNewGaps] = this.arrayBridges[railIndex];
				this.arrayBridges[railIndex - numberNewGaps].railIndex -= numberNewGaps;
				this.arrayBridges[railIndex - numberNewGaps].groupIndex--;
				this.arrayBridges[railIndex] = null;
			}
		}
	}
	,checkAnswer: function(answer) {
		var countEmptys = 0;
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] == null) countEmptys++;
		}
		if(answer <= countEmptys) return true; else return false;
	}
	,createSelectedPiece: function(answer) {
		var countEmptys = 0;
		var arrayEmptyIndex = new Array();
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] == null) {
				countEmptys++;
				arrayEmptyIndex.push(index);
			}
		}
		if(answer <= countEmptys) {
			this.countGroups++;
			var _g = 0;
			while(_g < answer) {
				var index = _g++;
				this.showCleanButton();
				this.addNewBridge(arrayEmptyIndex[index]);
				this.countBridges--;
				this.arrayBridges[arrayEmptyIndex[index]].get_pointerUp().connect($bind(this,this.handlerPointerUp));
				this.arrayBridges[arrayEmptyIndex[index]].nameButton = "BRIDGE";
				this.arrayBridges[arrayEmptyIndex[index]].alpha.animate(0,1,0.8,flambe.animation.Ease.quartOut);
				this.arrayBridges[arrayEmptyIndex[index]].groupIndex = this.countGroups;
				this.arrayBridges[arrayEmptyIndex[index]].highlight.transform.set_visible(true);
				this.arrayBridges[arrayEmptyIndex[index]].highlight.showCorrectTexture();
				var fromPosX = this.getParent().getUmiCharacter().transform.x._value;
				var fromPosY = this.getParent().getUmiCharacter().transform.y._value;
				this.arrayBridges[arrayEmptyIndex[index]].y.animate(fromPosY,this.arrayBridges[arrayEmptyIndex[index]].y._value,0.3,flambe.animation.Ease.sineOut);
				this.arrayBridges[arrayEmptyIndex[index]].x.animate(fromPosX,this.arrayBridges[arrayEmptyIndex[index]].x._value,0.3,flambe.animation.Ease.sineOut);
				this.arrayNewBridges.push(this.arrayBridges[arrayEmptyIndex[index]]);
			}
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			return true;
		} else return false;
	}
	,createWrongSelectedPiece: function(answer) {
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
		var _g = 0;
		while(_g < answer) {
			var index = _g++;
			this.wrongSelection[index] = new gui.components.mig8.NDiBridge(this.bridgeTexture);
			this.wrongSelection[index].setAnchor(0,this.wrongSelection[index].anchorY._value);
			this.wrongSelection[index].railIndex = index;
			this.owner.addChild(new flambe.Entity().add(this.wrongSelection[index]));
			this.wrongSelection[index].alpha.animate(0,1,0.8,flambe.animation.Ease.quartOut);
			var fromPosX = this.getParent().getUmiCharacter().transform.x._value;
			var fromPosY = this.getParent().getUmiCharacter().transform.y._value;
			this.wrongSelection[index].highlight.transform.set_visible(true);
			this.wrongSelection[index].highlight.showWrongTexture();
			var toPosX = 0;
			var toPosY = 30;
			if(index > 0) toPosX = this.wrongSelection[index - 1].getNaturalWidth() * index;
			var descX = this.wrongSelection[index].getNaturalWidth() * answer * 0.5;
			toPosX -= descX;
			this.wrongSelection[index].y.animate(fromPosY,toPosY,0.3,flambe.animation.Ease.sineOut);
			this.wrongSelection[index].x.animate(fromPosX,toPosX,0.3,flambe.animation.Ease.sineOut);
		}
	}
	,cleanWrongPieces: function() {
		var _g = this;
		var _g1 = 0, _g2 = this.wrongSelection.length;
		while(_g1 < _g2) {
			var index = _g1++;
			this.wrongSelection[index].y.animateTo(this.wrongSelection[index].y._value + 250,0.4,flambe.animation.Ease.sineOut);
			this.wrongSelection[index].alpha.animateTo(0,0.4);
		}
		var f1 = new flambe.script.CallFunction(function() {
			var _g2 = 0, _g1 = _g.wrongSelection.length;
			while(_g2 < _g1) {
				var index = _g2++;
				_g.wrongSelection[index].owner.dispose();
				_g.wrongSelection[index] = null;
			}
			_g.wrongSelection.splice(0,_g.wrongSelection.length);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.4),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,isRepaired: function() {
		return this.arrayNewBridges.length == this.totalBridges?true:false;
	}
	,addRulerUnit: function() {
		if(this.isFinishedMeasurement) return;
		var _g1 = 0, _g = this.arrayBridges.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayBridges[index] == null) {
				if(this.arrayRulers.length > 0) {
					var isMeasured = false;
					var _g3 = 0, _g2 = this.arrayRulers.length;
					while(_g3 < _g2) {
						var i = _g3++;
						if(this.arrayRulers[i].indexBridge == index) {
							isMeasured = true;
							break;
						}
					}
					if(!isMeasured) {
						this.createRuler(index);
						return;
					}
				} else {
					this.createRuler(index);
					return;
				}
			}
		}
	}
	,createRuler: function(indexRail) {
		var tmp = new gui.components.mig8.NDiRuler(this.rulerTexture,indexRail,this.arrayRulers.length);
		tmp.transform.y.set__(-30);
		tmp.image.setAnchor(0,tmp.image.anchorY._value);
		var fromPosY = this.getParent().getUmiCharacter().transform.y._value;
		var fromPosX = this.getParent().getUmiCharacter().transform.x._value;
		tmp.transform.x.set__(-(this.background.image.getNaturalWidth() * 0.5) + tmp.image.getNaturalWidth() * indexRail);
		tmp.transform.x.animate(fromPosX,tmp.transform.x._value,0.3,flambe.animation.Ease.sineOut);
		tmp.transform.y.animate(fromPosY,tmp.transform.y._value,0.3,flambe.animation.Ease.sineOut);
		this.arrayRulers.push(tmp);
		this.owner.addChild(new flambe.Entity().add(tmp));
		this.getParent().getUmiCharacter().animationCreate("_handsUP");
		this.timeOutFinished();
	}
	,timeOutFinished: function() {
		var _g = this;
		if(this.arrayRulers.length == this.countBridges) {
			var f1 = new flambe.script.CallFunction(function() {
				_g.getParent().getSelectorPanel().loadAnswers(_g.totalBridges);
				_g.isFinishedMeasurement = false;
			});
			var seq0 = new flambe.script.Sequence([new flambe.script.Delay(1.5),f1]);
			this.owner._compMap.Script_36.run(seq0);
			this.isFinishedMeasurement = true;
		}
	}
	,getParent: function() {
		return this.owner.parent._compMap.NDiPanelControllerMig8_3;
	}
	,showCleanButton: function(hide) {
		if(hide == null) hide = false;
		if(hide) {
			if((this.cleanButton._flags & 1) != 0 == true) this.cleanButton.set_visible(false);
		} else if((this.cleanButton._flags & 1) != 0 == false) this.cleanButton.set_visible(true);
	}
	,loadInit: function() {
		this.isFinishedMeasurement = false;
		this.transform = new flambe.display.Sprite();
		this.arrayBridges = new Array();
		this.arrayNewBridges = new Array();
		this.arrayRulers = new Array();
		this.wrongSelection = new Array();
		this.totalUnits = 12;
		this.totalBridges = 0;
		this.countBridges = 0;
		this.countGroups = 0;
		this.errorSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/error_x"));
		this.errorSignal.transform.y.set__(-8);
		this.isActiveErrorSignal = false;
		this.rulerTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/ruler");
		this.bridgeTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/bridge_rail");
		this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/rail_zoom_panel"));
		this.background.transform.x.set__(0);
		this.background.transform.y.set__(0);
		this.background.image.disablePointer();
		this.cleanButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/clean_button"));
		this.cleanButton.x.set__(this.background.image.getNaturalWidth() * 0.5 - 73);
		this.cleanButton.y.set__(-59);
		this.cleanButton.nameButton = "UNDO_BUTTON";
		this.cleanButton.set_visible(false);
		this.cleanButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	}
	,get_name: function() {
		return "NDiRailZoomPanel_6";
	}
	,__class__: gui.components.mig8.NDiRailZoomPanel
});
gui.components.mig8.NDiRuler = function(texture,indexRail,indexRule) {
	gui.components.NDiImage.call(this,texture);
	this.indexBridge = indexRail;
	var valueStr = "" + (indexRule + 1);
	this.number = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),valueStr);
	this.number.centerAnchor();
	this.number.set_align(flambe.display.TextAlign.Center);
	this.number.x.set__(this.image.getNaturalWidth() * 0.5);
	this.number.y.set__(-25);
};
$hxClasses["gui.components.mig8.NDiRuler"] = gui.components.mig8.NDiRuler;
gui.components.mig8.NDiRuler.__name__ = ["gui","components","mig8","NDiRuler"];
gui.components.mig8.NDiRuler.__super__ = gui.components.NDiImage;
gui.components.mig8.NDiRuler.prototype = $extend(gui.components.NDiImage.prototype,{
	onAdded: function() {
		gui.components.NDiImage.prototype.onAdded.call(this);
	}
	,__class__: gui.components.mig8.NDiRuler
});
gui.popups = {}
gui.popups.mig8 = {}
gui.popups.mig8.NDiMessagePopup = function() {
	this.loadInit();
};
$hxClasses["gui.popups.mig8.NDiMessagePopup"] = gui.popups.mig8.NDiMessagePopup;
gui.popups.mig8.NDiMessagePopup.__name__ = ["gui","popups","mig8","NDiMessagePopup"];
gui.popups.mig8.NDiMessagePopup.__super__ = flambe.Component;
gui.popups.mig8.NDiMessagePopup.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.transform.centerAnchor();
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.message));
	}
	,setup: function(msg,alphaBackground) {
		if(alphaBackground == null) alphaBackground = 0.0;
		this.message.set_text(msg);
		this.background.alpha.set__(alphaBackground);
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.background = new flambe.display.FillSprite(2236962,globals.NDiGameConstants.GAME_WIDTH,globals.NDiGameConstants.GAME_HEIGHT);
		this.background.centerAnchor();
		this.message = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"));
		this.message.set_align(flambe.display.TextAlign.Center);
	}
	,get_name: function() {
		return "NDiMessagePopup_29";
	}
	,__class__: gui.popups.mig8.NDiMessagePopup
});
gui.popups.mig8.NDiResultsPopup = function() {
	this.loadInit();
};
$hxClasses["gui.popups.mig8.NDiResultsPopup"] = gui.popups.mig8.NDiResultsPopup;
gui.popups.mig8.NDiResultsPopup.__name__ = ["gui","popups","mig8","NDiResultsPopup"];
gui.popups.mig8.NDiResultsPopup.__super__ = flambe.Component;
gui.popups.mig8.NDiResultsPopup.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.transform.centerAnchor();
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.message));
		this.addTextReplayButton();
	}
	,addTextReplayButton: function() {
		this.owner.addChild(new flambe.Entity().add(this.replayButton));
		this.replayButton.owner.addChild(new flambe.Entity().add(this.replayButtonText));
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButtonFill);
		managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_END_STORY);
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.replayButton = new gui.components.NDiButtonFill(3904256,130,30);
		this.replayButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 * 0.8);
		this.replayButton.y.set__(220);
		this.replayButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
		var font = managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri");
		this.replayButtonText = new flambe.display.TextSprite(font,"End Game");
		this.replayButtonText.centerAnchor();
		this.replayButtonText.x.set__(this.replayButton.getNaturalWidth() * 0.5);
		this.replayButtonText.y.set__(this.replayButton.getNaturalHeight() * 0.5);
		this.replayButtonText.disablePointer();
		this.background = new flambe.display.FillSprite(3355443,globals.NDiGameConstants.GAME_WIDTH,globals.NDiGameConstants.GAME_HEIGHT);
		this.background.centerAnchor();
		this.message = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"...RESULTS...\nPLACEHOLDER");
		this.message.set_align(flambe.display.TextAlign.Center);
	}
	,get_name: function() {
		return "NDiResultsPopup_28";
	}
	,__class__: gui.popups.mig8.NDiResultsPopup
});
gui.popups.mig8.NDiVideoPopup = function() {
	this.loadInit();
};
$hxClasses["gui.popups.mig8.NDiVideoPopup"] = gui.popups.mig8.NDiVideoPopup;
gui.popups.mig8.NDiVideoPopup.__name__ = ["gui","popups","mig8","NDiVideoPopup"];
gui.popups.mig8.NDiVideoPopup.__super__ = flambe.Component;
gui.popups.mig8.NDiVideoPopup.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.transform.centerAnchor();
		this.owner.add(this.transform);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.owner.addChild(new flambe.Entity().add(this.message));
		this.owner.addChild(new flambe.Entity().add(this.preloader));
	}
	,setup: function(msg,alphaBackground) {
		if(alphaBackground == null) alphaBackground = 1;
		this.message.set_text("");
		this.background.alpha.set__(alphaBackground);
	}
	,startingVideo: function() {
		if(this.owner != null) this.owner.dispose();
	}
	,endingVideo: function() {
		managers.NDiVideoManager.stopVideo();
		managers.NDiScenesController.getInstance().nextScene();
	}
	,loadVideo: function(url,startingFunction,endingFunction) {
		this.setup(url);
		this.transform.scaleX.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		this.transform.scaleY.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		if(startingFunction == null) startingFunction = $bind(this,this.startingVideo);
		if(endingFunction == null) endingFunction = $bind(this,this.endingVideo);
		var f1 = new flambe.script.CallFunction(function() {
			managers.NDiVideoManager.loadVideo(url,endingFunction,startingFunction);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.4),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		this.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.background = new flambe.display.FillSprite(0,globals.NDiGameConstants.GAME_WIDTH,globals.NDiGameConstants.GAME_HEIGHT);
		this.background.centerAnchor();
		this.preloader = new gui.components.NDiAnimationMovie(managers.NDiResourcesManager.loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"animations/preloader"),"preloader");
		this.preloader.animationIdle();
		this.message = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"");
		this.message.set_align(flambe.display.TextAlign.Center);
	}
	,get_name: function() {
		return "NDiVideoPopup_34";
	}
	,__class__: gui.popups.mig8.NDiVideoPopup
});
gui.scenes = {}
gui.scenes.NDiAbstractScene = function(opaque) {
	if(opaque == null) opaque = true;
	flambe.scene.Scene.call(this,opaque);
	this.lastWidth = 0;
	this.lastHeight = 0;
	this.lastPosX = 0;
	this.lastPosY = 0;
	this.transform = new flambe.display.Sprite();
	this.thereAudio = false;
	managers.NDiScenesController.getInstance().initPauseScene();
};
$hxClasses["gui.scenes.NDiAbstractScene"] = gui.scenes.NDiAbstractScene;
gui.scenes.NDiAbstractScene.__name__ = ["gui","scenes","NDiAbstractScene"];
gui.scenes.NDiAbstractScene.__super__ = flambe.scene.Scene;
gui.scenes.NDiAbstractScene.prototype = $extend(flambe.scene.Scene.prototype,{
	dispose: function() {
		flambe.scene.Scene.prototype.dispose.call(this);
	}
	,updateDisplaySize: function() {
		var tScale = Std.parseFloat(flambe.System._platform.getExternal().call("getCanvasScale"));
		this.transform.setScale(tScale);
		globals.NDiGameGlobals.getInstance().currentScaleGame = tScale;
	}
	,onUpdate: function(dt) {
		this.updateDisplaySize();
	}
	,onAdded: function() {
		flambe.scene.Scene.prototype.onAdded.call(this);
		if(this.type != globals.NDiTypeScene.NDI_TYPE_SCENE_GAME) {
			if(this.type == globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO) managers.NDiAudioManager.getInstance().pauseSoundBackground(); else managers.NDiAudioManager.getInstance().setEnabledSoundBackground();
		}
		this.owner.add(this.transform);
		this.updateDisplaySize();
	}
	,__class__: gui.scenes.NDiAbstractScene
});
gui.scenes.NDiEndStoryScene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.videoPopup = new gui.popups.mig8.NDiVideoPopup();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig1/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.replayGameButton = new gui.components.NDiButtonFillText(0,150,40);
	this.replayGameButton.text.set_text("Play Game");
	this.replayGameButton.nameButton = "PLAY_GAME_BUTTON";
	this.replayGameButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.replayGameButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.replayGameButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.replayAppisodeButton = new gui.components.NDiButtonFillText(0,190,40);
	this.replayAppisodeButton.text.set_text("Replay Appisode");
	this.replayAppisodeButton.nameButton = "REPLAY_APPISODE_BUTTON";
	this.replayAppisodeButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.replayAppisodeButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 50);
	this.replayAppisodeButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.musicVideoButton = new gui.components.NDiButtonFillText(0,190,40);
	this.musicVideoButton.text.set_text("Music Video");
	this.musicVideoButton.nameButton = "MUSIC_VIDEO_BUTTON";
	this.musicVideoButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.musicVideoButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 - 50);
	this.musicVideoButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
};
$hxClasses["gui.scenes.NDiEndStoryScene"] = gui.scenes.NDiEndStoryScene;
gui.scenes.NDiEndStoryScene.__name__ = ["gui","scenes","NDiEndStoryScene"];
gui.scenes.NDiEndStoryScene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiEndStoryScene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.replayGameButton));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.replayAppisodeButton));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.musicVideoButton));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButtonFillText);
		if(tmpButton.nameButton == "PLAY_GAME_BUTTON") managers.NDiSceneManager.getInstance().changeScene(globals.NDiTypeScene.NDI_TYPE_SCENE_GAME); else if(tmpButton.nameButton == "REPLAY_APPISODE_BUTTON") managers.NDiScenesController.getInstance().initialScene(); else if(tmpButton.nameButton == "MUSIC_VIDEO_BUTTON") {
		}
	}
	,__class__: gui.scenes.NDiEndStoryScene
});
gui.scenes.NDiGameScene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.loadInit();
};
$hxClasses["gui.scenes.NDiGameScene"] = gui.scenes.NDiGameScene;
gui.scenes.NDiGameScene.__name__ = ["gui","scenes","NDiGameScene"];
gui.scenes.NDiGameScene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiGameScene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
		gui.scenes.NDiAbstractScene.prototype.onRemoved.call(this);
		managers.NDiAudioManager.getInstance().pauseSoundBackground();
	}
	,onAdded: function() {
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.gapsManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.panelController));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Intro"));
	}
	,showMessagePopup: function(message,video) {
		if(video == null) video = true;
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.4);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		if(video) {
			var f1 = new flambe.script.CallFunction(function() {
				_g.messagePopup.owner.dispose();
				_g.endingGap();
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
			this.owner._compMap.Script_36.run(seq1);
		}
	}
	,showResultsPopup: function() {
		this.resultsPopup.transform.scaleX.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		this.resultsPopup.transform.scaleY.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		this.owner.addChild(new flambe.Entity().add(this.resultsPopup));
	}
	,showVideoPopup: function() {
		if(this.getLevel() < globals.NDiGameConstants.ARRAY_LEVELS_CONFIG.length - 1) {
			this.checkEndingGap();
			return;
		}
		if(this.gapsManager.currentGap < this.gapsManager.totalGaps - 1) {
			this.checkEndingGap();
			return;
		}
		this.toggleTransparency();
		this.owner.addChild(new flambe.Entity().add(this.videoPopup));
		this.videoPopup.loadVideo(globals.NDiGameConstants.VIDEO_MIG8_GAPS,null,$bind(this,this.endingVideo));
	}
	,checkEndingGap: function() {
		if(this.gapsManager.currentGap >= this.gapsManager.totalGaps - 1) {
			if(this.getLevel() >= globals.NDiGameConstants.ARRAY_LEVELS_CONFIG.length - 1) this.showResultsPopup(); else if(this.nextLevel()) {
				this.gapsManager.initGapsButtons();
				this.gapsManager.nextGap();
			}
		} else this.gapsManager.nextGap();
	}
	,endingGap: function() {
		var _g = this;
		this.gapsManager.fillGap();
		this.panelController.hide();
		var f1 = new flambe.script.CallFunction(function() {
			_g.gapsManager.endingWagonAnimation();
			managers.NDiAudioManager.getInstance().stopSoundEffect();
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Way-Continue"));
		});
		var f2 = new flambe.script.CallFunction(function() {
			_g.gapsManager.hideWagon();
			_g.showVideoPopup();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.6),f1,new flambe.script.Delay(0.7),f2]);
		this.gapsManager.owner._compMap.Script_36.run(seq1);
	}
	,endingVideo: function() {
		this.toggleTransparency();
		this.checkEndingGap();
	}
	,toggleTransparency: function() {
		if((this.background.transform._flags & 1) != 0) {
			this.gapsManager.transform.set_visible(false);
			this.panelController.transform.set_visible(false);
			this.background.transform.set_visible(false);
		} else {
			this.gapsManager.transform.set_visible(true);
			this.background.transform.set_visible(true);
		}
	}
	,getGapsManager: function() {
		return this.gapsManager;
	}
	,getPanelController: function() {
		return this.panelController;
	}
	,nextLevel: function() {
		if(this.currentLevel + 1 > globals.NDiGameConstants.ARRAY_LEVELS_CONFIG.length - 1) return false;
		this.currentLevel++;
		return true;
	}
	,getLevel: function() {
		return this.currentLevel;
	}
	,loadInit: function() {
		this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"GAME");
		this.currentLevel = 0;
		this.entityGamePlay = new flambe.Entity();
		this.entityControls = new flambe.Entity();
		this.controlPanel = new gui.components.NDiControlPanel();
		this.gapsManager = new managers.game.NDiGapsManagerGame($bind(this,this.getLevel));
		this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
		this.resultsPopup = new gui.popups.mig8.NDiResultsPopup();
		this.videoPopup = new gui.popups.mig8.NDiVideoPopup();
		this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/background"));
		this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.panelController = new gui.components.game.NDiPanelControllerGame();
		this.panelController.transform.set_visible(false);
	}
	,__class__: gui.scenes.NDiGameScene
});
gui.scenes.NDiLoadingScene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.numPackagesLoaded = 0;
	this.background = new flambe.display.ImageSprite(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_LOADING,globals.NDiGameConstants.BACKGROUND_LOADING));
	this.background.centerAnchor();
	this.background.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.barLoading = new gui.components.NDiBarLoading();
	this.barLoading.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 155);
	this.barLoading.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 192);
};
$hxClasses["gui.scenes.NDiLoadingScene"] = gui.scenes.NDiLoadingScene;
gui.scenes.NDiLoadingScene.__name__ = ["gui","scenes","NDiLoadingScene"];
gui.scenes.NDiLoadingScene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiLoadingScene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onLoadAssetPack: function(pack) {
		this.numPackagesLoaded++;
	}
	,loadAssets: function() {
		if(this.listPackageDependences == null || this.listPackageDependences.length == 0) {
			var loadingScene = js.Boot.__cast(managers.NDiSceneManager.getInstance().currentScene , gui.scenes.NDiLoadingScene);
			managers.NDiSceneManager.getInstance().changeScene(loadingScene.nextScene);
		} else {
			var _g = 0, _g1 = this.listPackageDependences;
			while(_g < _g1.length) {
				var pack = _g1[_g];
				++_g;
				if(managers.NDiResourcesManager.getInstance().loadedAssetPacks.exists(pack)) this.numPackagesLoaded++; else managers.NDiResourcesManager.getInstance().loadAssetPack(pack,$bind(this,this.progressEvent),$bind(this,this.onLoadAssetPack));
			}
		}
	}
	,pushScene: function() {
		var loadingScene = js.Boot.__cast(managers.NDiSceneManager.getInstance().currentScene , gui.scenes.NDiLoadingScene);
		managers.NDiSceneManager.getInstance().changeScene(loadingScene.nextScene);
	}
	,onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
		if(!this.bAllPackagesLoaded && this.numPackagesLoaded >= this.listPackageDependences.length) {
			this.bAllPackagesLoaded = true;
			var seq = new flambe.script.Sequence([new flambe.script.Delay(0),new flambe.script.CallFunction($bind(this,this.pushScene))]);
			this.rootEntity._compMap.Script_36.run(seq);
		}
	}
	,onRemoved: function() {
		this.rootEntity.dispose();
	}
	,progressEvent: function(percent) {
		this.barLoading.updateBar(percent);
	}
	,onAdded: function() {
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.rootEntity = new flambe.Entity();
		this.rootEntity.add(new flambe.script.Script());
		this.rootEntity.add(this.background);
		this.owner.addChild(this.rootEntity);
		this.owner.addChild(this.barLoading.addToEntity());
		this.loadAssets();
	}
	,__class__: gui.scenes.NDiLoadingScene
});
gui.scenes.NDiMig1Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig1/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.goButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig1/go_button"));
	this.goButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.goButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.goButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.goButtonHighlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig1/go_buttonHighlight"),null,null);
	this.goButtonHighlight.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.goButtonHighlight.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.goButtonHighlight.transform.disablePointer();
};
$hxClasses["gui.scenes.NDiMig1Scene"] = gui.scenes.NDiMig1Scene;
gui.scenes.NDiMig1Scene.__name__ = ["gui","scenes","NDiMig1Scene"];
gui.scenes.NDiMig1Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig1Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.goButtonHighlight));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.goButton));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG1-Intro"));
		managers.NDiAudioManager.getInstance().playSoundBackground(globals.NDiGameConstants.ARRAY_SOUNDS.get("THEME_1"));
	}
	,handlerPointerUp: function(e) {
		this.gameOver();
	}
	,gameOver: function() {
		managers.NDiVideoManager.loadVideo("",null,null);
		var f1 = new flambe.script.CallFunction(function() {
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig1Scene
});
gui.scenes.NDiMig2Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-01");
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.characterManager = new managers.mig2.NDiCharacterManagerMig2();
	this.footprintManager = new managers.mig2.NDiFootprintManagerMig2();
	this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
};
$hxClasses["gui.scenes.NDiMig2Scene"] = gui.scenes.NDiMig2Scene;
gui.scenes.NDiMig2Scene.__name__ = ["gui","scenes","NDiMig2Scene"];
gui.scenes.NDiMig2Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig2Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.footprintManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.characterManager));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG2-Intro"));
	}
	,getFootsprintManager: function() {
		return this.footprintManager;
	}
	,showMessagePopup: function(message) {
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.2,flambe.animation.Ease.linear);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		var f1 = new flambe.script.CallFunction(function() {
			_g.messagePopup.owner.dispose();
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,gameOver: function() {
		var _g = this;
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1 = new flambe.script.CallFunction(function() {
			_g.showMessagePopup("");
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig2Scene
});
gui.scenes.NDiMig3Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-02");
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.characterManager = new managers.mig3.NDiCharacterManagerMig3();
	this.footprintManager = new managers.mig3.NDiFootprintManagerMig3();
	this.footprintManager.transform.x.set__(502.5);
	this.footprintManager.transform.y.set__(385.0);
	this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
};
$hxClasses["gui.scenes.NDiMig3Scene"] = gui.scenes.NDiMig3Scene;
gui.scenes.NDiMig3Scene.__name__ = ["gui","scenes","NDiMig3Scene"];
gui.scenes.NDiMig3Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig3Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.characterManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.footprintManager));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG3-Intro"));
	}
	,showMessagePopup: function(message) {
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.2,flambe.animation.Ease.linear);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		var f1 = new flambe.script.CallFunction(function() {
			_g.messagePopup.owner.dispose();
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,gameOver: function() {
		var _g = this;
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1 = new flambe.script.CallFunction(function() {
			_g.showMessagePopup("");
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.9),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig3Scene
});
gui.scenes.NDiMig4Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-03");
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.piecesManager = new managers.mig4.NDiPiecesManagerMig4();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
};
$hxClasses["gui.scenes.NDiMig4Scene"] = gui.scenes.NDiMig4Scene;
gui.scenes.NDiMig4Scene.__name__ = ["gui","scenes","NDiMig4Scene"];
gui.scenes.NDiMig4Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig4Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.piecesManager));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG4-Intro"));
	}
	,showMessagePopup: function(message) {
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.2,flambe.animation.Ease.linear);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		var f1 = new flambe.script.CallFunction(function() {
			_g.messagePopup.owner.dispose();
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,gameOver: function() {
		var _g = this;
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1 = new flambe.script.CallFunction(function() {
			_g.showMessagePopup("");
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig4Scene
});
gui.scenes.NDiMig5Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.isCharacterOnTop = true;
	this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-04");
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig5/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.characterManager = new managers.mig5.NDiCharacterManagerMig5();
	this.footprintManager = new managers.mig5.NDiFootprintManagerMig5();
	this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
};
$hxClasses["gui.scenes.NDiMig5Scene"] = gui.scenes.NDiMig5Scene;
gui.scenes.NDiMig5Scene.__name__ = ["gui","scenes","NDiMig5Scene"];
gui.scenes.NDiMig5Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig5Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.footprintManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.characterManager));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG5-Intro"));
	}
	,sendFrontDepthCharacter: function() {
		if(this.isCharacterOnTop) return;
		var tmpEntity = null;
		var managerEntity = null;
		managerEntity = this.characterManager.owner;
		tmpEntity = this.characterManager.owner.parent;
		tmpEntity.removeChild(managerEntity);
		tmpEntity.addChild(managerEntity);
		this.isCharacterOnTop = true;
	}
	,sendBackDepthCharacter: function() {
		if(!this.isCharacterOnTop) return;
		var tmpEntity = null;
		var managerEntity = null;
		managerEntity = this.footprintManager.owner;
		tmpEntity = this.footprintManager.owner.parent;
		tmpEntity.removeChild(managerEntity);
		tmpEntity.addChild(managerEntity);
		this.isCharacterOnTop = false;
	}
	,showMessagePopup: function(message) {
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.2,flambe.animation.Ease.linear);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		var f1 = new flambe.script.CallFunction(function() {
			_g.messagePopup.owner.dispose();
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,gameOver: function() {
		var _g = this;
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1 = new flambe.script.CallFunction(function() {
			_g.showMessagePopup("");
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig5Scene
});
gui.scenes.NDiMig6Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.isCharacterOnTop = true;
	this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-05");
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig6/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.characterManager = new managers.mig6.NDiCharacterManagerMig6();
	this.footprintManager = new managers.mig6.NDiFootprintManagerMig6();
	this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
};
$hxClasses["gui.scenes.NDiMig6Scene"] = gui.scenes.NDiMig6Scene;
gui.scenes.NDiMig6Scene.__name__ = ["gui","scenes","NDiMig6Scene"];
gui.scenes.NDiMig6Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig6Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.footprintManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.characterManager));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG6-Intro"));
	}
	,sendFrontDepthCharacter: function() {
		if(this.isCharacterOnTop) return;
		var tmpEntity = null;
		var managerEntity = null;
		managerEntity = this.characterManager.owner;
		tmpEntity = this.characterManager.owner.parent;
		tmpEntity.removeChild(managerEntity);
		tmpEntity.addChild(managerEntity);
		this.isCharacterOnTop = true;
	}
	,sendBackDepthCharacter: function() {
		if(!this.isCharacterOnTop) return;
		var tmpEntity = null;
		var managerEntity = null;
		managerEntity = this.footprintManager.owner;
		tmpEntity = this.footprintManager.owner.parent;
		tmpEntity.removeChild(managerEntity);
		tmpEntity.addChild(managerEntity);
		this.isCharacterOnTop = false;
	}
	,showMessagePopup: function(message) {
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.2,flambe.animation.Ease.linear);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		var f1 = new flambe.script.CallFunction(function() {
			_g.messagePopup.owner.dispose();
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,gameOver: function() {
		var _g = this;
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1 = new flambe.script.CallFunction(function() {
			_g.showMessagePopup("");
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig6Scene
});
gui.scenes.NDiMig7Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-06");
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig7/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.characterManager = new managers.mig7.NDiCharacterManagerMig7();
	this.footprintManager = new managers.mig7.NDiPiecesManagerMig7();
	this.footprintManager.transform.x.set__(0);
	this.footprintManager.transform.y.set__(0);
	this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
};
$hxClasses["gui.scenes.NDiMig7Scene"] = gui.scenes.NDiMig7Scene;
gui.scenes.NDiMig7Scene.__name__ = ["gui","scenes","NDiMig7Scene"];
gui.scenes.NDiMig7Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig7Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.characterManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.footprintManager));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG7-Intro"));
	}
	,showMessagePopup: function(message) {
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.alpha.animate(0,1,0.2,flambe.animation.Ease.linear);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		var f1 = new flambe.script.CallFunction(function() {
			_g.messagePopup.owner.dispose();
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,gameOver: function() {
		var _g = this;
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-GoodJob"));
		var f1 = new flambe.script.CallFunction(function() {
			_g.showMessagePopup("");
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiMig7Scene
});
gui.scenes.NDiMig8Scene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.loadInit();
};
$hxClasses["gui.scenes.NDiMig8Scene"] = gui.scenes.NDiMig8Scene;
gui.scenes.NDiMig8Scene.__name__ = ["gui","scenes","NDiMig8Scene"];
gui.scenes.NDiMig8Scene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiMig8Scene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.gapsManager));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.panelController));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.entityControls.addChild(new flambe.Entity().add(this.titleMig));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Intro"));
	}
	,showMessagePopup: function(message,video) {
		if(video == null) video = true;
		var _g = this;
		this.messagePopup.setup(message);
		this.messagePopup.transform.scaleX.animate(0,1,0.4,flambe.animation.Ease.bounceOut);
		this.messagePopup.transform.scaleY.animate(0,1,0.4,flambe.animation.Ease.bounceOut);
		this.owner.addChild(new flambe.Entity().add(this.messagePopup));
		if(video) {
			var f1 = new flambe.script.CallFunction(function() {
				_g.messagePopup.owner.dispose();
				_g.endingGap();
			});
			var seq1 = new flambe.script.Sequence([new flambe.script.Delay(2),f1]);
			this.owner._compMap.Script_36.run(seq1);
		}
	}
	,showVideoPopup: function() {
		if(this.gapsManager.currentGap < this.gapsManager.totalGaps - 1) {
			this.checkEndingGap();
			return;
		}
		this.toggleTransparency();
		this.owner.addChild(new flambe.Entity().add(this.videoPopup));
		this.videoPopup.loadVideo(globals.NDiGameConstants.VIDEO_MIG8_GAPS,null,$bind(this,this.endingVideo));
	}
	,checkEndingGap: function() {
		if(this.gapsManager.currentGap >= this.gapsManager.totalGaps - 1) managers.NDiScenesController.getInstance().nextScene(); else this.gapsManager.nextGap();
	}
	,endingGap: function() {
		var _g = this;
		this.gapsManager.fillGap();
		this.panelController.hide();
		var f1 = new flambe.script.CallFunction(function() {
			_g.gapsManager.endingWagonAnimation();
			managers.NDiAudioManager.getInstance().stopSoundEffect();
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("MIG8-Way-Continue"));
		});
		var f2 = new flambe.script.CallFunction(function() {
			_g.gapsManager.hideWagon();
			_g.showVideoPopup();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.6),f1,new flambe.script.Delay(0.7),f2]);
		this.gapsManager.owner._compMap.Script_36.run(seq1);
	}
	,endingVideo: function() {
		this.toggleTransparency();
		this.checkEndingGap();
	}
	,toggleTransparency: function() {
		if((this.background.transform._flags & 1) != 0) {
			this.gapsManager.transform.set_visible(false);
			this.panelController.transform.set_visible(false);
			this.background.transform.set_visible(false);
		} else {
			this.gapsManager.transform.set_visible(true);
			this.background.transform.set_visible(true);
		}
	}
	,getGapsManager: function() {
		return this.gapsManager;
	}
	,getPanelController: function() {
		return this.panelController;
	}
	,loadInit: function() {
		this.titleMig = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"Mig-07");
		this.entityGamePlay = new flambe.Entity();
		this.entityControls = new flambe.Entity();
		this.controlPanel = new gui.components.NDiControlPanel();
		this.gapsManager = new managers.mig8.NDiGapsManager();
		this.messagePopup = new gui.popups.mig8.NDiMessagePopup();
		this.resultsPopup = new gui.popups.mig8.NDiResultsPopup();
		this.videoPopup = new gui.popups.mig8.NDiVideoPopup();
		this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/background"));
		this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.panelController = new gui.components.mig8.NDiPanelControllerMig8();
		this.panelController.transform.set_visible(false);
	}
	,__class__: gui.scenes.NDiMig8Scene
});
gui.scenes.NDiPause = function() {
	gui.scenes.NDiAbstractScene.call(this,false);
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.controlPanel = new gui.components.NDiControlPanel();
	this.background = new flambe.display.FillSprite(0,globals.NDiGameConstants.GAME_WIDTH,globals.NDiGameConstants.GAME_HEIGHT);
	this.background.alpha.set__(0.4);
	this.backgroundText = new flambe.display.TextSprite(managers.NDiResourcesManager.loadFont(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"fonts/calibri/calibri"),"GAME PAUSE");
	this.backgroundText.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.backgroundText.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.backgroundText.set_align(flambe.display.TextAlign.Center);
};
$hxClasses["gui.scenes.NDiPause"] = gui.scenes.NDiPause;
gui.scenes.NDiPause.__name__ = ["gui","scenes","NDiPause"];
gui.scenes.NDiPause.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiPause.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.backgroundText));
		this.entityControls.addChild(new flambe.Entity().add(this.controlPanel));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
	}
	,__class__: gui.scenes.NDiPause
});
gui.scenes.NDiPlayScene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig1/background_play"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.goButton = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/play_button"));
	this.goButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.goButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.goButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.goButtonHighlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/play_buttonHightlight"),null,null);
	this.goButtonHighlight.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.goButtonHighlight.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.goButtonHighlight.transform.disablePointer();
};
$hxClasses["gui.scenes.NDiPlayScene"] = gui.scenes.NDiPlayScene;
gui.scenes.NDiPlayScene.__name__ = ["gui","scenes","NDiPlayScene"];
gui.scenes.NDiPlayScene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiPlayScene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.goButtonHighlight));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.goButton));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
	}
	,handlerPointerUp: function(e) {
		this.gameOver();
	}
	,gameOver: function() {
		managers.NDiVideoManager.loadVideo("",null,null);
		var f1 = new flambe.script.CallFunction(function() {
			managers.NDiScenesController.getInstance().nextScene();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,__class__: gui.scenes.NDiPlayScene
});
gui.scenes.NDiStop = function() {
	gui.scenes.NDiAbstractScene.call(this,false);
	this.entityGamePlay = new flambe.Entity();
	this.entityControls = new flambe.Entity();
	this.videoPopup = new gui.popups.mig8.NDiVideoPopup();
	this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig1/background"));
	this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.umigoHomeButton = new gui.components.NDiButtonFillText(0,150,40);
	this.umigoHomeButton.text.set_text("UMIGO HOME");
	this.umigoHomeButton.nameButton = "UMIGO_HOME_BUTTON";
	this.umigoHomeButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.umigoHomeButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
	this.umigoHomeButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
	this.keepPlayingButton = new gui.components.NDiButtonFillText(0,190,40);
	this.keepPlayingButton.text.set_text("KEEP PLAYING");
	this.keepPlayingButton.nameButton = "KEEP_PLAYING_BUTTON";
	this.keepPlayingButton.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
	this.keepPlayingButton.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 50);
	this.keepPlayingButton.get_pointerUp().connect($bind(this,this.handlerPointerUp));
};
$hxClasses["gui.scenes.NDiStop"] = gui.scenes.NDiStop;
gui.scenes.NDiStop.__name__ = ["gui","scenes","NDiStop"];
gui.scenes.NDiStop.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiStop.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		if(managers.NDiScenesController.getInstance().isGamePause) managers.NDiScenesController.getInstance().pauseGame(true);
		this.owner.add(new flambe.script.Script());
		this.entityGamePlay.addChild(new flambe.Entity().add(this.background));
		this.entityGamePlay.addChild(new flambe.Entity().add(this.umigoHomeButton));
		this.owner.addChild(this.entityGamePlay);
		this.owner.addChild(this.entityControls);
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButtonFillText);
		if(tmpButton.nameButton == "UMIGO_HOME_BUTTON") {
			managers.NDiSceneManager.getInstance().director.popScene();
			managers.NDiScenesController.getInstance().initialScene();
		} else if(tmpButton.nameButton == "KEEP_PLAYING_BUTTON") managers.NDiSceneManager.getInstance().director.popScene();
	}
	,__class__: gui.scenes.NDiStop
});
gui.scenes.NDiTestScene = function() {
	gui.scenes.NDiAbstractScene.call(this);
};
$hxClasses["gui.scenes.NDiTestScene"] = gui.scenes.NDiTestScene;
gui.scenes.NDiTestScene.__name__ = ["gui","scenes","NDiTestScene"];
gui.scenes.NDiTestScene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiTestScene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
		var background = new flambe.display.ImageSprite(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/backgrounds/test_background"));
		background.centerAnchor();
		background.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		background.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
		this.rootEntity = new flambe.Entity();
		this.rootEntity.add(background);
		this.owner.addChild(this.rootEntity);
	}
	,__class__: gui.scenes.NDiTestScene
});
gui.scenes.NDiVideoScene = function() {
	gui.scenes.NDiAbstractScene.call(this);
	this.videoPopup = new gui.popups.mig8.NDiVideoPopup();
	this.controlPanel = new gui.components.NDiControlPanel();
};
$hxClasses["gui.scenes.NDiVideoScene"] = gui.scenes.NDiVideoScene;
gui.scenes.NDiVideoScene.__name__ = ["gui","scenes","NDiVideoScene"];
gui.scenes.NDiVideoScene.__super__ = gui.scenes.NDiAbstractScene;
gui.scenes.NDiVideoScene.prototype = $extend(gui.scenes.NDiAbstractScene.prototype,{
	onUpdate: function(dt) {
		gui.scenes.NDiAbstractScene.prototype.onUpdate.call(this,dt);
	}
	,onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.showVideoPopup();
		this.owner.addChild(new flambe.Entity().add(this.controlPanel));
		gui.scenes.NDiAbstractScene.prototype.onAdded.call(this);
	}
	,showVideoPopup: function() {
		var indexVideo = managers.NDiScenesController.getInstance().countVideos;
		this.videoPopup.setup(globals.NDiGameConstants.VIDEO_SCENES_URL[indexVideo]);
		this.owner.addChild(new flambe.Entity().add(this.videoPopup));
		this.videoPopup.loadVideo(globals.NDiGameConstants.VIDEO_SCENES_URL[indexVideo]);
	}
	,__class__: gui.scenes.NDiVideoScene
});
var haxe = {}
haxe.Json = function() {
};
$hxClasses["haxe.Json"] = haxe.Json;
haxe.Json.__name__ = ["haxe","Json"];
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
}
haxe.Json.prototype = {
	parseNumber: function(c) {
		var start = this.pos - 1;
		var minus = c == 45, digit = !minus, zero = c == 48;
		var point = false, e = false, pm = false, end = false;
		while(true) {
			c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 48:
				if(zero && !point) this.invalidNumber(start);
				if(minus) {
					minus = false;
					zero = true;
				}
				digit = true;
				break;
			case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
				if(zero && !point) this.invalidNumber(start);
				if(minus) minus = false;
				digit = true;
				zero = false;
				break;
			case 46:
				if(minus || point) this.invalidNumber(start);
				digit = false;
				point = true;
				break;
			case 101:case 69:
				if(minus || zero || e) this.invalidNumber(start);
				digit = false;
				e = true;
				break;
			case 43:case 45:
				if(!e || pm) this.invalidNumber(start);
				digit = false;
				pm = true;
				break;
			default:
				if(!digit) this.invalidNumber(start);
				this.pos--;
				end = true;
			}
			if(end) break;
		}
		var f = Std.parseFloat(HxOverrides.substr(this.str,start,this.pos - start));
		var i = f | 0;
		return i == f?i:f;
	}
	,invalidNumber: function(start) {
		throw "Invalid number at position " + start + ": " + HxOverrides.substr(this.str,start,this.pos - start);
	}
	,parseString: function() {
		var start = this.pos;
		var buf = new StringBuf();
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			if(c == 34) break;
			if(c == 92) {
				buf.addSub(this.str,start,this.pos - start - 1);
				c = this.str.charCodeAt(this.pos++);
				switch(c) {
				case 114:
					buf.b += "\r";
					break;
				case 110:
					buf.b += "\n";
					break;
				case 116:
					buf.b += "\t";
					break;
				case 98:
					buf.b += "";
					break;
				case 102:
					buf.b += "";
					break;
				case 47:case 92:case 34:
					buf.b += String.fromCharCode(c);
					break;
				case 117:
					var uc = Std.parseInt("0x" + HxOverrides.substr(this.str,this.pos,4));
					this.pos += 4;
					buf.b += String.fromCharCode(uc);
					break;
				default:
					throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
				}
				start = this.pos;
			} else if(c != c) throw "Unclosed string";
		}
		buf.addSub(this.str,start,this.pos - start - 1);
		return buf.b;
	}
	,parseRec: function() {
		while(true) {
			var c = this.str.charCodeAt(this.pos++);
			switch(c) {
			case 32:case 13:case 10:case 9:
				break;
			case 123:
				var obj = { }, field = null, comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 125:
						if(field != null || comma == false) this.invalidChar();
						return obj;
					case 58:
						if(field == null) this.invalidChar();
						obj[field] = this.parseRec();
						field = null;
						comma = true;
						break;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					case 34:
						if(comma) this.invalidChar();
						field = this.parseString();
						break;
					default:
						this.invalidChar();
					}
				}
				break;
			case 91:
				var arr = [], comma = null;
				while(true) {
					var c1 = this.str.charCodeAt(this.pos++);
					switch(c1) {
					case 32:case 13:case 10:case 9:
						break;
					case 93:
						if(comma == false) this.invalidChar();
						return arr;
					case 44:
						if(comma) comma = false; else this.invalidChar();
						break;
					default:
						if(comma) this.invalidChar();
						this.pos--;
						arr.push(this.parseRec());
						comma = true;
					}
				}
				break;
			case 116:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 114 || this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return true;
			case 102:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 97 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 115 || this.str.charCodeAt(this.pos++) != 101) {
					this.pos = save;
					this.invalidChar();
				}
				return false;
			case 110:
				var save = this.pos;
				if(this.str.charCodeAt(this.pos++) != 117 || this.str.charCodeAt(this.pos++) != 108 || this.str.charCodeAt(this.pos++) != 108) {
					this.pos = save;
					this.invalidChar();
				}
				return null;
			case 34:
				return this.parseString();
			case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
				return this.parseNumber(c);
			default:
				this.invalidChar();
			}
		}
	}
	,invalidChar: function() {
		this.pos--;
		throw "Invalid char " + this.str.charCodeAt(this.pos) + " at position " + this.pos;
	}
	,doParse: function(str) {
		this.str = str;
		this.pos = 0;
		return this.parseRec();
	}
	,__class__: haxe.Json
}
haxe.Serializer = function() {
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new haxe.ds.StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe.Serializer;
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.prototype = {
	serialize: function(v) {
		var _g = Type["typeof"](v);
		var $e = (_g);
		switch( $e[1] ) {
		case 0:
			this.buf.b += "n";
			break;
		case 1:
			if(v == 0) {
				this.buf.b += "z";
				return;
			}
			this.buf.b += "i";
			this.buf.b += Std.string(v);
			break;
		case 2:
			if(Math.isNaN(v)) this.buf.b += "k"; else if(!Math.isFinite(v)) this.buf.b += Std.string(v < 0?"m":"p"); else {
				this.buf.b += "d";
				this.buf.b += Std.string(v);
			}
			break;
		case 3:
			this.buf.b += Std.string(v?"t":"f");
			break;
		case 6:
			var c = $e[2];
			if(c == String) {
				this.serializeString(v);
				return;
			}
			if(this.useCache && this.serializeRef(v)) return;
			switch(c) {
			case Array:
				var ucount = 0;
				this.buf.b += "a";
				var l = v.length;
				var _g1 = 0;
				while(_g1 < l) {
					var i = _g1++;
					if(v[i] == null) ucount++; else {
						if(ucount > 0) {
							if(ucount == 1) this.buf.b += "n"; else {
								this.buf.b += "u";
								this.buf.b += Std.string(ucount);
							}
							ucount = 0;
						}
						this.serialize(v[i]);
					}
				}
				if(ucount > 0) {
					if(ucount == 1) this.buf.b += "n"; else {
						this.buf.b += "u";
						this.buf.b += Std.string(ucount);
					}
				}
				this.buf.b += "h";
				break;
			case List:
				this.buf.b += "l";
				var v1 = v;
				var $it0 = v1.iterator();
				while( $it0.hasNext() ) {
					var i = $it0.next();
					this.serialize(i);
				}
				this.buf.b += "h";
				break;
			case Date:
				var d = v;
				this.buf.b += "v";
				this.buf.b += Std.string(HxOverrides.dateStr(d));
				break;
			case haxe.ds.StringMap:
				this.buf.b += "b";
				var v1 = v;
				var $it1 = v1.keys();
				while( $it1.hasNext() ) {
					var k = $it1.next();
					this.serializeString(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.IntMap:
				this.buf.b += "q";
				var v1 = v;
				var $it2 = v1.keys();
				while( $it2.hasNext() ) {
					var k = $it2.next();
					this.buf.b += ":";
					this.buf.b += Std.string(k);
					this.serialize(v1.get(k));
				}
				this.buf.b += "h";
				break;
			case haxe.ds.ObjectMap:
				this.buf.b += "M";
				var v1 = v;
				var $it3 = v1.keys();
				while( $it3.hasNext() ) {
					var k = $it3.next();
					var id = Reflect.field(k,"__id__");
					Reflect.deleteField(k,"__id__");
					this.serialize(k);
					k.__id__ = id;
					this.serialize(v1.h[k.__id__]);
				}
				this.buf.b += "h";
				break;
			case haxe.io.Bytes:
				var v1 = v;
				var i = 0;
				var max = v1.length - 2;
				var charsBuf = new StringBuf();
				var b64 = haxe.Serializer.BASE64;
				while(i < max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					var b3 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt((b2 << 2 | b3 >> 6) & 63));
					charsBuf.b += Std.string(b64.charAt(b3 & 63));
				}
				if(i == max) {
					var b1 = v1.b[i++];
					var b2 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt((b1 << 4 | b2 >> 4) & 63));
					charsBuf.b += Std.string(b64.charAt(b2 << 2 & 63));
				} else if(i == max + 1) {
					var b1 = v1.b[i++];
					charsBuf.b += Std.string(b64.charAt(b1 >> 2));
					charsBuf.b += Std.string(b64.charAt(b1 << 4 & 63));
				}
				var chars = charsBuf.b;
				this.buf.b += "s";
				this.buf.b += Std.string(chars.length);
				this.buf.b += ":";
				this.buf.b += Std.string(chars);
				break;
			default:
				this.cache.pop();
				if(v.hxSerialize != null) {
					this.buf.b += "C";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					v.hxSerialize(this);
					this.buf.b += "g";
				} else {
					this.buf.b += "c";
					this.serializeString(Type.getClassName(c));
					this.cache.push(v);
					this.serializeFields(v);
				}
			}
			break;
		case 4:
			if(this.useCache && this.serializeRef(v)) return;
			this.buf.b += "o";
			this.serializeFields(v);
			break;
		case 7:
			var e = $e[2];
			if(this.useCache && this.serializeRef(v)) return;
			this.cache.pop();
			this.buf.b += Std.string(this.useEnumIndex?"j":"w");
			this.serializeString(Type.getEnumName(e));
			if(this.useEnumIndex) {
				this.buf.b += ":";
				this.buf.b += Std.string(v[1]);
			} else this.serializeString(v[0]);
			this.buf.b += ":";
			var l = v.length;
			this.buf.b += Std.string(l - 2);
			var _g1 = 2;
			while(_g1 < l) {
				var i = _g1++;
				this.serialize(v[i]);
			}
			this.cache.push(v);
			break;
		case 5:
			throw "Cannot serialize function";
			break;
		default:
			throw "Cannot serialize " + Std.string(v);
		}
	}
	,serializeFields: function(v) {
		var _g = 0, _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0, _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				this.buf.b += Std.string(i);
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			this.buf.b += Std.string(x);
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = StringTools.urlEncode(s);
		this.buf.b += Std.string(s.length);
		this.buf.b += ":";
		this.buf.b += Std.string(s);
	}
	,toString: function() {
		return this.buf.b;
	}
	,__class__: haxe.Serializer
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	__class__: haxe.io.Bytes
}
haxe.rtti = {}
haxe.rtti.Meta = function() { }
$hxClasses["haxe.rtti.Meta"] = haxe.rtti.Meta;
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.xml = {}
haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeAccess"] = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype = {
	__class__: haxe.xml._Fast.NodeAccess
}
haxe.xml._Fast.AttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.AttribAccess"] = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype = {
	resolve: function(name) {
		if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
		var v = this.__x.get(name);
		if(v == null) throw this.__x.get_nodeName() + " is missing attribute " + name;
		return v;
	}
	,__class__: haxe.xml._Fast.AttribAccess
}
haxe.xml._Fast.HasAttribAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasAttribAccess"] = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype = {
	__class__: haxe.xml._Fast.HasAttribAccess
}
haxe.xml._Fast.HasNodeAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.HasNodeAccess"] = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype = {
	__class__: haxe.xml._Fast.HasNodeAccess
}
haxe.xml._Fast.NodeListAccess = function(x) {
	this.__x = x;
};
$hxClasses["haxe.xml._Fast.NodeListAccess"] = haxe.xml._Fast.NodeListAccess;
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype = {
	resolve: function(name) {
		var l = new List();
		var $it0 = this.__x.elementsNamed(name);
		while( $it0.hasNext() ) {
			var x = $it0.next();
			l.add(new haxe.xml.Fast(x));
		}
		return l;
	}
	,__class__: haxe.xml._Fast.NodeListAccess
}
haxe.xml.Fast = function(x) {
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + Std.string(x.nodeType);
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
};
$hxClasses["haxe.xml.Fast"] = haxe.xml.Fast;
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype = {
	get_innerData: function() {
		var it = this.x.iterator();
		if(!it.hasNext()) throw this.get_name() + " does not have data";
		var v = it.next();
		var n = it.next();
		if(n != null) {
			if(v.nodeType == Xml.PCData && n.nodeType == Xml.CData && StringTools.trim(v.get_nodeValue()) == "") {
				var n2 = it.next();
				if(n2 == null || n2.nodeType == Xml.PCData && StringTools.trim(n2.get_nodeValue()) == "" && it.next() == null) return n.get_nodeValue();
			}
			throw this.get_name() + " does not only have data";
		}
		if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.get_name() + " does not have data";
		return v.get_nodeValue();
	}
	,get_name: function() {
		return this.x.nodeType == Xml.Document?"Document":this.x.get_nodeName();
	}
	,__class__: haxe.xml.Fast
}
haxe.xml.Parser = function() { }
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i = s.charCodeAt(1) == 120?Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)):Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += Std.string(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.b += Std.string(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = str.charCodeAt(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.html = {}
js.html._CanvasElement = {}
js.html._CanvasElement.CanvasUtil = function() { }
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0, _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
}
var managers = {}
managers.NDiAudioManager = function() {
	this.enabledSoundEffects = true;
	this.enabledSoundBackground = true;
	this.backgroundSoundVolume = 1;
	this.soundFXVolume = 1;
};
$hxClasses["managers.NDiAudioManager"] = managers.NDiAudioManager;
managers.NDiAudioManager.__name__ = ["managers","NDiAudioManager"];
managers.NDiAudioManager.initInstance = function() {
	if(managers.NDiAudioManager.instance == null) managers.NDiAudioManager.instance = new managers.NDiAudioManager();
}
managers.NDiAudioManager.getInstance = function() {
	return managers.NDiAudioManager.instance;
}
managers.NDiAudioManager.prototype = {
	playSoundBackground: function(path) {
		if(this.backgroundSound != null) {
			this.backgroundSound.dispose();
			this.backgroundSound = null;
		}
		var bgSound = managers.NDiResourcesManager.loadSound(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,path);
		this.backgroundSound = bgSound.loop(this.backgroundSoundVolume);
		this.enabledSoundBackground = true;
		this.setEnabledSoundBackground();
	}
	,stopSoundEffect: function() {
		if(this.soundFX != null) this.soundFX.dispose();
	}
	,playSoundEffect: function(path,vol) {
		if(vol == null) vol = 1;
		if(!this.enabledSoundEffects) return;
		var newSoundFX = managers.NDiResourcesManager.loadSound(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,path);
		vol = vol * this.soundFXVolume;
		this.soundFX = newSoundFX.play(vol);
	}
	,pauseSoundBackground: function() {
		if(this.backgroundSound == null) return;
		this.backgroundSound.set_paused(true);
		this.enabledSoundBackground = true;
		util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.MUTE_MUSIC[0],!this.enabledSoundBackground);
	}
	,setEnabledSoundBackground: function() {
		if(this.backgroundSound == null) return;
		if(!this.enabledSoundBackground) {
			this.backgroundSound.set_paused(true);
			this.enabledSoundBackground = true;
		} else {
			this.backgroundSound.set_paused(false);
			this.enabledSoundBackground = false;
		}
		util.NDiSaveData.getInstance().setData(globals.NDiVarsToSave.MUTE_MUSIC[0],!this.enabledSoundBackground);
	}
	,__class__: managers.NDiAudioManager
}
managers.NDiLocalizationManager = function() {
	this.localizationData = new haxe.ds.StringMap();
};
$hxClasses["managers.NDiLocalizationManager"] = managers.NDiLocalizationManager;
managers.NDiLocalizationManager.__name__ = ["managers","NDiLocalizationManager"];
managers.NDiLocalizationManager.initInstance = function() {
	if(managers.NDiLocalizationManager.instance == null) managers.NDiLocalizationManager.instance = new managers.NDiLocalizationManager();
}
managers.NDiLocalizationManager.getInstance = function() {
	return managers.NDiLocalizationManager.instance;
}
managers.NDiLocalizationManager.prototype = {
	initLocalizationData: function() {
		var sXML = managers.NDiResourcesManager.loadXML(globals.NDiGameConstants.ASSET_PACKAGE_CONFIG,globals.NDiGameConstants.CONFIG_ASSET_LOCALIZATION_XML);
		var r1 = new EReg(">\\s+<!","g");
		var r2 = new EReg("]>\\s+<","g");
		sXML = r1.replace(sXML,"><!");
		sXML = r2.replace(sXML,"]><");
		var oXML = new haxe.xml.Fast(Xml.parse(sXML).firstElement());
		var $it0 = oXML.nodes.resolve("string").iterator();
		while( $it0.hasNext() ) {
			var stringNode = $it0.next();
			var id = stringNode.att.resolve("id");
			var fontScale = stringNode.att.resolve("fontScale");
			var offsetX = stringNode.att.resolve("offsetX");
			var offsetY = stringNode.att.resolve("offsetY");
			var fontName = stringNode.att.resolve("fontName");
			var content = stringNode.get_innerData();
			var description = stringNode.att.resolve("description");
			var data1 = new data.NDiLocalizationData();
			data1.id = id;
			data1.fontScale = Std.parseFloat(fontScale);
			data1.offsetX = Std.parseFloat(offsetX);
			data1.offsetY = Std.parseFloat(offsetY);
			data1.fontName = fontName;
			data1.content = content;
			data1.description = description;
			this.localizationData.set(id,data1);
		}
	}
	,__class__: managers.NDiLocalizationManager
}
managers.NDiResourcesManager = function() {
	this.loadedAssetPacks = new haxe.ds.StringMap();
	this.loadedCache = new haxe.ds.StringMap();
};
$hxClasses["managers.NDiResourcesManager"] = managers.NDiResourcesManager;
managers.NDiResourcesManager.__name__ = ["managers","NDiResourcesManager"];
managers.NDiResourcesManager.loadFont = function(packName,path) {
	var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
	var key = packName + "_" + path;
	if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.display.Font); else {
		var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
		var font = new flambe.display.Font(pack,path);
		mapCache.set(key,font);
		return font;
	}
}
managers.NDiResourcesManager.loadImage = function(packName,path) {
	var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
	var key = packName + "_" + path;
	if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.display.Texture); else {
		var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
		var texture = pack.getTexture(path);
		mapCache.set(key,texture);
		return texture;
	}
}
managers.NDiResourcesManager.loadXML = function(packName,path) {
	var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
	var textFile = pack.getFile(path);
	var xmlString = textFile.toString();
	return xmlString;
}
managers.NDiResourcesManager.loadSetAnimations = function(packName,path) {
	var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
	var key = packName + "_" + path;
	if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.swf.Library); else {
		var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
		var library = new flambe.swf.Library(pack,path);
		mapCache.set(key,library);
		return library;
	}
}
managers.NDiResourcesManager.loadSound = function(packName,path) {
	var mapCache = managers.NDiResourcesManager.getInstance().loadedCache;
	var key = packName + "_" + path;
	if(mapCache.exists(key)) return js.Boot.__cast(mapCache.get(key) , flambe.sound.Sound); else {
		var pack = managers.NDiResourcesManager.getInstance().loadedAssetPacks.get(packName);
		var sound = pack.getSound(path);
		mapCache.set(key,sound);
		return sound;
	}
}
managers.NDiResourcesManager.initInstance = function() {
	if(managers.NDiResourcesManager.instance == null) managers.NDiResourcesManager.instance = new managers.NDiResourcesManager();
}
managers.NDiResourcesManager.getInstance = function() {
	return managers.NDiResourcesManager.instance;
}
managers.NDiResourcesManager.prototype = {
	loadAssetPack: function(assetName,progressFunction,completeFunction) {
		var _g = this;
		if(!this.loadedAssetPacks.exists(assetName)) {
			var manifest = flambe.asset.Manifest.build(assetName);
			var base = "";
			base = util.JSEmbedProxy.get_base();
			if(base != "") manifest.set_externalBasePath(base + "assets/");
			var loader = flambe.System._platform.loadAssetPack(manifest);
			loader.progressChanged.connect(function() {
				var ratio = loader._progress / loader._total;
				if(progressFunction != null) progressFunction(ratio);
			});
			loader.get(function(pack) {
				_g.loadedAssetPacks.set(assetName,pack);
				if(completeFunction != null) completeFunction(pack);
			});
		} else if(completeFunction != null) completeFunction(this.loadedAssetPacks.get(assetName));
	}
	,__class__: managers.NDiResourcesManager
}
managers.NDiSceneManager = function() {
	this.director = new flambe.scene.Director();
	this.transform = new flambe.display.Sprite();
	flambe.System.root.add(this.director);
};
$hxClasses["managers.NDiSceneManager"] = managers.NDiSceneManager;
managers.NDiSceneManager.__name__ = ["managers","NDiSceneManager"];
managers.NDiSceneManager.initInstance = function() {
	if(managers.NDiSceneManager.instance == null) managers.NDiSceneManager.instance = new managers.NDiSceneManager();
}
managers.NDiSceneManager.getInstance = function() {
	return managers.NDiSceneManager.instance;
}
managers.NDiSceneManager.prototype = {
	executeChangeScene: function(sceneType) {
		var _g = this;
		var nextScene = null;
		var listPackageDependences = new Array();
		if(this.currentScene != null && this.currentScene.type == globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING) {
			var loadingScene = js.Boot.__cast(this.currentScene , gui.scenes.NDiLoadingScene);
			nextScene = factories.NDiSceneFactory.createScene(loadingScene.nextScene);
		} else listPackageDependences.push(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL);
		var bAllLoaded = true;
		var _g1 = 0;
		while(_g1 < listPackageDependences.length) {
			var pack = listPackageDependences[_g1];
			++_g1;
			if(!managers.NDiResourcesManager.getInstance().loadedAssetPacks.exists(pack)) {
				bAllLoaded = false;
				break;
			}
		}
		if(!bAllLoaded) {
			var loadingScene = new gui.scenes.NDiLoadingScene();
			loadingScene.nextScene = sceneType;
			loadingScene.listPackageDependences = listPackageDependences;
			sceneType = globals.NDiTypeScene.NDI_TYPE_SCENE_LOADING;
			nextScene = loadingScene;
		} else if(nextScene == null) nextScene = factories.NDiSceneFactory.createScene(sceneType);
		var sceneEntity = new flambe.Entity();
		sceneEntity.add(new flambe.script.Script());
		sceneEntity.add(nextScene);
		if(!bAllLoaded) {
			var transition = new flambe.scene.FadeTransition(0.3,flambe.animation.Ease.quintInOut);
			this.director.unwindToScene(sceneEntity,transition);
		} else {
			var seq = new flambe.script.Sequence([new flambe.script.Delay(0.1),new flambe.script.CallFunction(function() {
				var transition = new flambe.scene.FadeTransition(0.3,flambe.animation.Ease.quintInOut);
				_g.director.unwindToScene(sceneEntity,transition);
			})]);
			this.currentScene.owner._compMap.Script_36.run(seq);
		}
		if(this.currentScene != null) this.currentScene.owner.disposeChildren();
		this.currentScene = nextScene;
		this.currentScene.type = sceneType;
	}
	,changeScene: function(sceneType) {
		this.executeChangeScene(sceneType);
	}
	,__class__: managers.NDiSceneManager
}
managers.NDiScenesController = function() {
	this.currentScene = 0;
	this.countVideos = 0;
	this.isGamePause = true;
};
$hxClasses["managers.NDiScenesController"] = managers.NDiScenesController;
managers.NDiScenesController.__name__ = ["managers","NDiScenesController"];
managers.NDiScenesController.initInstance = function() {
	if(managers.NDiScenesController.instance == null) managers.NDiScenesController.instance = new managers.NDiScenesController();
}
managers.NDiScenesController.getInstance = function() {
	return managers.NDiScenesController.instance;
}
managers.NDiScenesController.prototype = {
	previousScene: function() {
		if(this.currentScene - 1 < 0) return;
		managers.NDiAudioManager.getInstance().stopSoundEffect();
		if(this.isGamePause) this.pauseGame();
		this.currentScene--;
		var typeScene = globals.NDiGameConstants.SCENES_FLOW[this.currentScene];
		if(typeScene == globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO) managers.NDiScenesController.getInstance().countVideos--;
		managers.NDiSceneManager.getInstance().changeScene(typeScene);
	}
	,nextScene: function() {
		if(this.currentScene + 1 >= globals.NDiGameConstants.SCENES_FLOW.length) return;
		managers.NDiAudioManager.getInstance().stopSoundEffect();
		if(this.isGamePause) this.pauseGame();
		var typeScene = globals.NDiGameConstants.SCENES_FLOW[this.currentScene];
		if(typeScene == globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO) managers.NDiScenesController.getInstance().countVideos++;
		this.currentScene++;
		typeScene = globals.NDiGameConstants.SCENES_FLOW[this.currentScene];
		managers.NDiSceneManager.getInstance().changeScene(typeScene);
	}
	,stopGame: function() {
		new flambe.Entity().add(this.stopScene);
		managers.NDiVideoManager.stopVideo();
		managers.NDiSceneManager.getInstance().director.pushScene(this.stopScene.owner);
	}
	,pauseGame: function(resume) {
		if(resume == null) resume = false;
		if(!this.isGamePause && !resume) {
			this.isGamePause = true;
			new flambe.Entity().add(this.pauseScene);
			managers.NDiSceneManager.getInstance().director.pushScene(this.pauseScene.owner);
		} else {
			this.isGamePause = false;
			managers.NDiSceneManager.getInstance().director.popScene();
		}
	}
	,initialScene: function() {
		this.currentScene = 2;
		this.countVideos = 1;
		var typeScene = globals.NDiGameConstants.SCENES_FLOW[this.currentScene];
		managers.NDiSceneManager.getInstance().changeScene(typeScene);
	}
	,initPauseScene: function() {
		if(managers.NDiResourcesManager.getInstance() != null && !managers.NDiResourcesManager.getInstance().loadedAssetPacks.exists(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL)) return;
		if(this.isGamePause == true) {
			this.isGamePause = false;
			this.pauseScene = new gui.scenes.NDiPause();
			this.stopScene = new gui.scenes.NDiStop();
		}
	}
	,__class__: managers.NDiScenesController
}
managers.NDiVideoManager = function() {
	this.playingVideo = false;
};
$hxClasses["managers.NDiVideoManager"] = managers.NDiVideoManager;
managers.NDiVideoManager.__name__ = ["managers","NDiVideoManager"];
managers.NDiVideoManager.loadVideo = function(url,endingCallBack,startingCallBack) {
	if(endingCallBack != null) flambe.System._platform.getExternal().bind("flambeBackToGame",function() {
		endingCallBack();
	});
	if(startingCallBack != null) flambe.System._platform.getExternal().bind("flambeStartVideo",function() {
		startingCallBack();
	});
	flambe.System._platform.getExternal().call("showVideoTag",[url]);
	managers.NDiVideoManager.getInstance().playingVideo = true;
}
managers.NDiVideoManager.stopVideo = function() {
	if(!managers.NDiVideoManager.getInstance().playingVideo) return;
	managers.NDiVideoManager.getInstance().playingVideo = false;
	flambe.System._platform.getExternal().call("stopVideo");
}
managers.NDiVideoManager.pauseVideo = function(value) {
	flambe.System._platform.getExternal().bind("flambePauseVideo",function() {
		managers.NDiScenesController.getInstance().pauseGame();
	});
	if(value) flambe.System._platform.getExternal().call("pauseVideo"); else flambe.System._platform.getExternal().call("playVideo");
}
managers.NDiVideoManager.initInstance = function() {
	if(managers.NDiVideoManager.instance == null) managers.NDiVideoManager.instance = new managers.NDiVideoManager();
}
managers.NDiVideoManager.getInstance = function() {
	return managers.NDiVideoManager.instance;
}
managers.NDiVideoManager.prototype = {
	__class__: managers.NDiVideoManager
}
managers.game = {}
managers.game.NDiGapsManagerGame = function(getLevelFunction) {
	this.getLevel = getLevelFunction;
	this.loadInit();
};
$hxClasses["managers.game.NDiGapsManagerGame"] = managers.game.NDiGapsManagerGame;
managers.game.NDiGapsManagerGame.__name__ = ["managers","game","NDiGapsManagerGame"];
managers.game.NDiGapsManagerGame.__super__ = flambe.Component;
managers.game.NDiGapsManagerGame.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		var _g = this;
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.wagon));
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.addGapsButtons();
		this.owner.addChild(new flambe.Entity().add(this.arrowSignal));
		var f1 = new flambe.script.CallFunction(function() {
			_g.nextGap();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.9),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,hideWagon: function() {
		this.wagon.transform.set_visible(false);
	}
	,nextGap: function() {
		var _g = this;
		this.wagon.animationCreate("_entry");
		this.currentGap++;
		this.arrowSignal.transform.set_visible(true);
		this.arrowSignal.transform.x.animateTo(this.gapButtons[this.currentGap].x._value,0.8,flambe.animation.Ease.backInOut);
		this.arrowSignal.transform.y.set__(this.gapButtons[this.currentGap].y._value - 50);
		var f1 = new flambe.script.CallFunction(function() {
			var parent = _g.owner.parent.parent._compMap.Scene_0;
			parent.getPanelController().changeGap(globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[_g.getLevel()].get("ARRAY_CONFIG_UNITS_GAPS")[_g.currentGap]);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,endingWagonAnimation: function() {
		this.wagon.animationCreate("_exit");
	}
	,fillGap: function() {
		this.gapButtons[this.currentGap].set_visible(true);
	}
	,addGapsButtons: function() {
		var _g1 = 0, _g = this.gapButtons.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.gapButtons[index]));
		}
	}
	,initGapsButtons: function() {
		this.currentGap = -1;
		this.gapButtons.splice(0,this.gapButtons.length);
		var level = this.getLevel();
		this.totalGaps = globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("TOTAL_GAPS");
		var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("TOTAL_GAPS");
		while(_g1 < _g) {
			var index = _g1++;
			this.gapButtons[index] = new gui.components.mig8.NDiGapButton(globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_CONFIG_UNITS_GAPS")[index]);
			this.gapButtons[index].x.set__(globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_CONFIG_POSITION_GAPS")[index].x);
			this.gapButtons[index].y.set__(globals.NDiGameConstants.ARRAY_LEVELS_CONFIG[level].get("ARRAY_CONFIG_POSITION_GAPS")[index].y);
			this.gapButtons[index].nameButton = "GAP_BUTTON_" + index;
			this.gapButtons[index].indexGap = index;
			this.gapButtons[index].set_visible(false);
		}
	}
	,isEndingGap: function() {
		if(this.currentGap == this.totalGaps - 1) return true; else return false;
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		var lib = managers.NDiResourcesManager.loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"animations/mig8/rollerCoasterAnimations");
		this.wagon = new gui.components.NDiAnimationMovie(lib,"bigcart");
		this.wagon.animationIdle();
		this.wagon.transform.set_visible(false);
		this.currentGap = -1;
		this.gapButtons = new Array();
		this.initGapsButtons();
		this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/background_gaps"));
		this.background.bottomCenterAnchor();
		this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT);
		var arrowSignalTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/arrow_down");
		this.arrowSignal = new gui.components.NDiImage(arrowSignalTexture);
		this.arrowSignal.transform.set_visible(false);
		this.arrowSignal.transform.x.set__(-28);
	}
	,get_name: function() {
		return "NDiGapsManagerGame_27";
	}
	,__class__: managers.game.NDiGapsManagerGame
});
managers.mig2 = {}
managers.mig2.NDiCharacterManagerMig2 = function() {
	this.bean = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/bean"));
	this.bean.transform.x.set__(340.5);
	this.bean.transform.y.set__(256);
	this.bean.transform.set_visible(false);
	this.dizzy = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/dizzy"));
	this.dizzy.transform.x.set__(211.5);
	this.dizzy.transform.y.set__(313.5);
	this.dizzy.transform.set_visible(false);
	this.bit = new gui.components.mig2.NDiBitCharacterMig2();
	this.bit.transform.x.set__(700);
	this.bit.transform.y.set__(366);
	this.bit.originalPosition.x = this.bit.transform.x._value;
	this.bit.originalPosition.y = this.bit.transform.y._value;
	this.bit.footBitArea.get_pointerDown().connect($bind(this,this.handlerPointerDown));
	flambe.System._platform.getPointer().move.connect($bind(this,this.handlerPointerMove));
	flambe.System._platform.getPointer().up.connect($bind(this,this.handlerPointerUp));
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_large2"));
};
$hxClasses["managers.mig2.NDiCharacterManagerMig2"] = managers.mig2.NDiCharacterManagerMig2;
managers.mig2.NDiCharacterManagerMig2.__name__ = ["managers","mig2","NDiCharacterManagerMig2"];
managers.mig2.NDiCharacterManagerMig2.__super__ = flambe.Component;
managers.mig2.NDiCharacterManagerMig2.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		flambe.Component.prototype.onUpdate.call(this,dt);
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.bean));
		this.owner.addChild(new flambe.Entity().add(this.dizzy));
		this.owner.addChild(new flambe.Entity().add(this.bit));
		this.addHeightLineSignal();
	}
	,handlerPointerMove: function(e) {
		if(!this.isClicking) return;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
	}
	,handlerPointerDown: function(e) {
		this.isClicking = false;
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButtonFillText);
		var factor = 1 / globals.NDiGameGlobals.getInstance().currentScaleGame;
		var delta = math.NDiVector2D.getComponentDistance(new math.NDiVector2D(e.viewX * factor,e.viewY * factor),new math.NDiVector2D(this.bit.transform.x._value,this.bit.transform.y._value));
		tmpButton.setOriginalDelta(delta.x,delta.y);
		this.bit.highlightSignal.toggleHide();
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
		this.isClicking = true;
	}
	,handlerPointerUp: function(e) {
		if(!this.isClicking) return;
		this.bit.highlightSignal.toggleHide();
		this.validateItem();
		this.isClicking = false;
	}
	,validateItem: function() {
		var currentObjectPosition = new math.NDiVector2D(0,0);
		currentObjectPosition.x = this.bit.transform.x._value + this.bit.footBitArea.x._value;
		currentObjectPosition.y = this.bit.transform.y._value + this.bit.footBitArea.y._value;
		var latestObject = this.owner.parent.parent._compMap.Scene_0.getFootsprintManager().getLatestFootprint();
		var hitPosition = new math.NDiVector2D(0,0);
		hitPosition.x = latestObject.transform.x._value;
		hitPosition.y = latestObject.transform.y._value - latestObject.footprint.image.getNaturalHeight();
		var dist = math.NDiVector2D.getDistance(currentObjectPosition,hitPosition);
		if(dist < 14) this.endingAction(true); else this.endingAction(false);
		this.owner.parent.parent._compMap.Scene_0.getFootsprintManager().resetTimerHint();
	}
	,endingAction: function(isGood) {
		if(isGood) {
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			this.owner.parent.parent._compMap.Scene_0.getFootsprintManager().addFootPrint();
		} else {
			var distanceBit = math.NDiVector2D.getDistance(new math.NDiVector2D(this.bit.transform.x._value,this.bit.transform.y._value),this.bit.originalPosition);
			if(distanceBit > 10) {
				managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
				var badPosition = new math.NDiVector2D(this.bit.transform.x._value,this.bit.transform.y._value);
				badPosition.x += this.bit.highlightSignal.transform.x._value;
				badPosition.y += this.bit.highlightSignal.transform.y._value;
				this.owner.parent.parent._compMap.Scene_0.getFootsprintManager().createBadFootprint(badPosition);
			}
		}
		this.bit.transform.x.animateTo(this.bit.originalPosition.x,0.3,flambe.animation.Ease.sineOut);
		this.bit.transform.y.animateTo(this.bit.originalPosition.y,0.3,flambe.animation.Ease.sineOut);
	}
	,moveCurrentItem: function(newPosition) {
		if(this.bit != null) {
			var deltaX = newPosition.x * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame);
			deltaX += this.bit.footBitArea.getOriginalDelta().x;
			this.bit.transform.x.set__(deltaX);
			var deltaY = newPosition.y * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame);
			deltaY += this.bit.footBitArea.getOriginalDelta().y;
			this.bit.transform.y.set__(deltaY);
		}
		this.owner.parent.parent._compMap.Scene_0.getFootsprintManager().resetTimerHint();
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.bean.transform.x._value + 17);
		this.lineHeightSignal.transform.y.set__(this.bean.transform.y._value);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.bean.image.getNaturalHeight() * 0.5);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - 10);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,get_name: function() {
		return "NDiCharacterManagerMig2_24";
	}
	,__class__: managers.mig2.NDiCharacterManagerMig2
});
managers.mig2.NDiFootprintManagerMig2 = function() {
	this.transform = new flambe.display.Sprite();
	this.footprintScale = 1;
	this.totalFootprints = 6;
	this.elapsedTimeHint = 0;
	this.totalTimeHint = 7;
	this.showingHint = false;
	this.arrayFootprints = new Array();
	this.initArrayFootPrints();
	this.currentFootprint = 0;
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_short"));
};
$hxClasses["managers.mig2.NDiFootprintManagerMig2"] = managers.mig2.NDiFootprintManagerMig2;
managers.mig2.NDiFootprintManagerMig2.__name__ = ["managers","mig2","NDiFootprintManagerMig2"];
managers.mig2.NDiFootprintManagerMig2.__super__ = flambe.Component;
managers.mig2.NDiFootprintManagerMig2.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		flambe.Component.prototype.onUpdate.call(this,dt);
		this.timerToHint(dt);
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.addHeightLineSignal();
		this.addArrayFootPrints();
	}
	,timerToHint: function(dt) {
		if(this.showingHint) return;
		if(this.elapsedTimeHint >= this.totalTimeHint) {
			var latestIndex = this.getLatestFootprintIndex();
			this.arrayFootprints[latestIndex + 1].hotspot.transform.set_visible(true);
			this.showingHint = true;
		}
		this.elapsedTimeHint += dt;
	}
	,resetTimerHint: function() {
		this.elapsedTimeHint = 0;
		this.showingHint = false;
	}
	,addArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayFootprints[index]));
			if(index == this.currentFootprint) {
				this.arrayFootprints[index].footprint.transform.set_visible(true);
				this.arrayFootprints[index].hotspot.transform.set_visible(false);
			}
		}
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.arrayFootprints[this.currentFootprint].transform.x._value);
		this.lineHeightSignal.transform.y.set__(this.arrayFootprints[this.currentFootprint].transform.y._value);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * 0.5 * this.footprintScale);
		this.lineHeightSignal.transform.disablePointer();
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,createBadFootprint: function(position) {
		var tmpFoot = new gui.components.mig2.NDiFootprintBitMig2();
		tmpFoot.transform.x.set__(position.x - tmpFoot.footprint.image.getNaturalWidth() * 0.5);
		tmpFoot.transform.y.set__(position.y);
		tmpFoot.show();
		tmpFoot.hotspot.showWrongTexture();
		this.owner.addChild(new flambe.Entity().add(tmpFoot));
		var f1 = new flambe.script.CallFunction(function() {
			tmpFoot.owner.dispose();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.45),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,addFootPrint: function() {
		if(this.currentFootprint + 1 >= this.totalFootprints) return;
		this.currentFootprint++;
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * this.footprintScale);
		if(this.currentFootprint == this.totalFootprints - 1) {
			this.lineHeightSignal.transform.set_visible(false);
			this.owner.parent.parent._compMap.Scene_0.gameOver();
		}
		this.arrayFootprints[this.currentFootprint].transform.alpha.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].hotspot.showNormal = false;
		this.arrayFootprints[this.currentFootprint].show();
		this.arrayFootprints[this.currentFootprint].hotspot.showCorrectTexture();
	}
	,getLatestFootprintIndex: function() {
		var index = this.arrayFootprints.length - 1;
		while(index >= 0) {
			if((this.arrayFootprints[index].footprint.transform._flags & 1) != 0) return index;
			index--;
		}
		return 0;
	}
	,getLatestFootprint: function() {
		var index = this.arrayFootprints.length - 1;
		while(index >= 0) {
			if((this.arrayFootprints[index].footprint.transform._flags & 1) != 0) return this.arrayFootprints[index];
			index--;
		}
		return this.arrayFootprints[0];
	}
	,initArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.arrayFootprints[index] = new gui.components.mig2.NDiFootprintBitMig2();
			this.arrayFootprints[index].transform.setScale(this.footprintScale);
			var _g2 = this.arrayFootprints[index].transform.x;
			_g2.set__(_g2._value + 502.5);
			var _g2 = this.arrayFootprints[index].transform.y;
			_g2.set__(_g2._value - this.arrayFootprints[index].footprint.image.getNaturalHeight() * this.footprintScale * index);
			var _g2 = this.arrayFootprints[index].transform.y;
			_g2.set__(_g2._value + 385);
		}
	}
	,get_name: function() {
		return "NDiFootprintManagerMig2_23";
	}
	,__class__: managers.mig2.NDiFootprintManagerMig2
});
managers.mig3 = {}
managers.mig3.NDiCharacterManagerMig3 = function() {
	this.bean = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/bean"));
	this.bean.transform.set_visible(false);
	this.bean.transform.x.set__(340.5);
	this.bean.transform.y.set__(256);
	this.dizzy = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/dizzy"));
	this.dizzy.transform.set_visible(false);
	this.dizzy.transform.x.set__(211.5);
	this.dizzy.transform.y.set__(313.5);
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_large2"));
};
$hxClasses["managers.mig3.NDiCharacterManagerMig3"] = managers.mig3.NDiCharacterManagerMig3;
managers.mig3.NDiCharacterManagerMig3.__name__ = ["managers","mig3","NDiCharacterManagerMig3"];
managers.mig3.NDiCharacterManagerMig3.__super__ = flambe.Component;
managers.mig3.NDiCharacterManagerMig3.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.bean));
		this.owner.addChild(new flambe.Entity().add(this.dizzy));
		this.addHeightLineSignal();
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.bean.transform.x._value + 17);
		this.lineHeightSignal.transform.y.set__(this.bean.transform.y._value);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.bean.image.getNaturalHeight() * 0.5);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - 9);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,get_name: function() {
		return "NDiCharacterManagerMig3_20";
	}
	,__class__: managers.mig3.NDiCharacterManagerMig3
});
managers.mig3.NDiFootprintManagerMig3 = function() {
	this.transform = new flambe.display.Sprite();
	this.totalFootprints = 5;
	this.footprintScale = 1;
	this.totalBitFootprints = 6;
	this.arrayFootprints = new Array();
	this.arrayBitFootprints = new Array();
	this.arrayHotspot = new Array();
	this.initArrayFootPrints();
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_short"));
	this.currentItemSelected = null;
	this.isClicking = false;
	this.elapsedTimeHint = 0;
	this.totalTimeHint = 7;
	this.showingHint = false;
};
$hxClasses["managers.mig3.NDiFootprintManagerMig3"] = managers.mig3.NDiFootprintManagerMig3;
managers.mig3.NDiFootprintManagerMig3.__name__ = ["managers","mig3","NDiFootprintManagerMig3"];
managers.mig3.NDiFootprintManagerMig3.__super__ = flambe.Component;
managers.mig3.NDiFootprintManagerMig3.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		flambe.Component.prototype.onUpdate.call(this,dt);
		this.timerToHint(dt);
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.addArrayFootPrints();
	}
	,timerToHint: function(dt) {
		if(this.showingHint) return;
		if(this.elapsedTimeHint >= this.totalTimeHint) {
			var latestIndex = this.arrayFootprints.length;
			this.arrayHotspot[latestIndex].transform.set_visible(true);
			this.showingHint = true;
		}
		this.elapsedTimeHint += dt;
	}
	,resetTimerHint: function() {
		this.elapsedTimeHint = 0;
		this.showingHint = false;
	}
	,handlerPointerMove: function(e) {
		if(!this.isClicking) return;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
	}
	,handlerPointerDown: function(e) {
		this.isClicking = false;
		this.currentItemSelected = null;
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButton);
		var tmpFoot = tmpButton.owner.parent._compMap.NDiFootprintBitMig3_22;
		var factor = 1 / globals.NDiGameGlobals.getInstance().currentScaleGame;
		var delta = math.NDiVector2D.getComponentDistance(new math.NDiVector2D(e.viewX * factor,e.viewY * factor),new math.NDiVector2D(tmpFoot.transform.x._value,tmpFoot.transform.y._value));
		tmpButton.setOriginalDelta(delta.x,delta.y);
		tmpButton.setOriginalPosition(tmpFoot.transform.x._value,tmpFoot.transform.y._value);
		this.currentItemSelected = tmpButton.owner.parent._compMap.NDiFootprintBitMig3_22;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
		this.isClicking = true;
	}
	,handlerPointerUp: function(e) {
		if(!this.isClicking) return;
		this.validateItem();
		this.currentItemSelected = null;
		this.isClicking = false;
	}
	,moveCurrentItem: function(newPosition) {
		if(this.currentItemSelected != null) {
			this.currentItemSelected.footprint.updateMoveDistance(new math.NDiVector2D(this.currentItemSelected.transform.x._value,this.currentItemSelected.transform.y._value));
			this.currentItemSelected.transform.x.set__(newPosition.x * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.x;
			_g.set__(_g._value + this.currentItemSelected.footprint.getOriginalDelta().x);
			this.currentItemSelected.transform.y.set__(newPosition.y * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.y;
			_g.set__(_g._value + this.currentItemSelected.footprint.getOriginalDelta().y);
		}
		this.resetTimerHint();
	}
	,validateItem: function() {
		var currentObjectPosition = new math.NDiVector2D(0,0);
		currentObjectPosition.x = this.currentItemSelected.transform.x._value;
		currentObjectPosition.y = this.currentItemSelected.transform.y._value;
		var latestObject = this.arrayFootprints[this.arrayFootprints.length - 1];
		var hitPosition = new math.NDiVector2D(0,0);
		if(latestObject == null) {
			hitPosition.x = 35;
			hitPosition.y = 37.5;
		} else {
			hitPosition.x = latestObject.transform.x._value;
			hitPosition.y = latestObject.transform.y._value - latestObject.footprint.getNaturalHeight();
		}
		var dist = math.NDiVector2D.getDistance(currentObjectPosition,hitPosition);
		if(dist < 20) {
			this.currentItemSelected.hotspot.toggleHide();
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			this.addFootPrint(this.currentItemSelected);
			this.currentItemSelected.hotspot.showNormal = false;
			this.currentItemSelected.show();
			this.currentItemSelected.hotspot.showCorrectTexture();
			this.currentItemSelected.centerHotspot();
		} else {
			var distanceBit = this.currentItemSelected.footprint.getMoveDistance();
			if(distanceBit > 10) {
				managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
				this.currentItemSelected.hotspot.showNormal = false;
				this.currentItemSelected.show();
				this.currentItemSelected.hotspot.showWrongTexture();
				this.currentItemSelected.centerHotspot();
			} else {
			}
		}
		this.resetTimerHint();
	}
	,addArrayFootPrints: function() {
		var _g1 = 0, _g = this.arrayBitFootprints.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayBitFootprints[index]));
		}
		this.addHeightLineSignal();
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayHotspot[index]));
		}
		var _g1 = 0, _g = this.arrayFootprints.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayFootprints[index]));
		}
		var selectedRandom = util.NDiRandomUtils.getRandomInt(1,10);
		var _g = 0;
		while(_g < 10) {
			var index = _g++;
			var tmp = this.createFootPrint();
			tmp.transform.x.set__(globals.NDiGameConstants.ARRAY_FOOTPRINT_POSITIONS_MIG2[index].x);
			tmp.transform.y.set__(globals.NDiGameConstants.ARRAY_FOOTPRINT_POSITIONS_MIG2[index].y);
			tmp.transform.get_pointerDown().connect($bind(this,this.handlerPointerDown));
			this.owner.addChild(new flambe.Entity().add(tmp));
			if(index == 0) this.addFootPrint(tmp);
			if(index == selectedRandom) {
				tmp.show();
				tmp.hotspot.showNormalTexture();
				tmp.centerHotspot();
			}
		}
		flambe.System._platform.getPointer().move.connect($bind(this,this.handlerPointerMove));
		flambe.System._platform.getPointer().up.connect($bind(this,this.handlerPointerUp));
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(35);
		this.lineHeightSignal.transform.y.set__(35);
		this.lineHeightSignal.transform.disablePointer();
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,addFootPrint: function(tmpButton) {
		if(this.arrayFootprints.length >= this.totalFootprints) return;
		var posX = 35;
		var posY = 37.5;
		if(this.arrayFootprints.length > 0) {
			posX = this.arrayFootprints[this.arrayFootprints.length - 1].transform.x._value;
			posY = this.arrayFootprints[this.arrayFootprints.length - 1].transform.y._value - this.arrayFootprints[this.arrayFootprints.length - 1].footprint.getNaturalHeight();
		}
		tmpButton.transform.x.animateTo(posX,0.2,flambe.animation.Ease.sineOut);
		tmpButton.transform.y.animateTo(posY,0.2,flambe.animation.Ease.sineOut);
		this.arrayHotspot[this.arrayFootprints.length].transform.set_visible(false);
		this.resetTimerHint();
		this.arrayFootprints.push(tmpButton);
		tmpButton.transform.disablePointer();
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.arrayFootprints[this.arrayFootprints.length - 1].footprint.getNaturalHeight());
		if(this.arrayFootprints.length == this.totalFootprints) {
			this.lineHeightSignal.transform.set_visible(false);
			this.owner.parent.parent._compMap.Scene_0.gameOver();
		}
	}
	,createFootPrint: function() {
		var tmp = new gui.components.mig3.NDiFootprintBitMig3();
		return tmp;
	}
	,initArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.arrayHotspot[index] = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/footprintHotspot"),null,null);
			var _g2 = this.arrayHotspot[index].transform.y;
			_g2.set__(_g2._value - this.arrayHotspot[index].image.getNaturalHeight() * index);
			var _g2 = this.arrayHotspot[index].transform.y;
			_g2.set__(_g2._value + 35);
			this.arrayHotspot[index].transform.x.set__(35);
			this.arrayHotspot[index].transform.set_visible(false);
			this.arrayHotspot[index].bottomCenterAnchor();
		}
		var _g1 = 0, _g = this.totalBitFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.arrayBitFootprints[index] = new gui.components.NDiButton(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig3/footprint"));
			var _g2 = this.arrayBitFootprints[index].y;
			_g2.set__(_g2._value - this.arrayBitFootprints[index].getNaturalHeight() * this.footprintScale * index);
			var _g2 = this.arrayBitFootprints[index].y;
			_g2.set__(_g2._value + 35);
			var _g2 = this.arrayBitFootprints[index].x;
			_g2.set__(_g2._value - 40);
			this.arrayBitFootprints[index].setScale(this.footprintScale);
			this.arrayBitFootprints[index].bottomCenterAnchor();
		}
	}
	,get_name: function() {
		return "NDiFootprintManagerMig3_21";
	}
	,__class__: managers.mig3.NDiFootprintManagerMig3
});
managers.mig4 = {}
managers.mig4.NDiPiecesManagerMig4 = function() {
	this.isObjectSelectedFirtsTime = false;
	this.transform = new flambe.display.Sprite();
	this.isClicking = false;
	this.currentItemSelected = null;
	this.arrayItem = new Array();
	this.initArrayItem();
	this.arrayItem[0].stopHighlight();
	this.handItem = new gui.components.mig4.NDiHandMig4();
	this.handItem.normalState.nameButton = "HAND_ITEM";
	this.handItem.correctState.nameButton = "HAND_ITEM";
	this.handItem.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH);
	this.handItem.transform.y.set__(0);
	var _g = this.handItem.transform.x;
	_g.set__(_g._value - this.handItem.normalState.getNaturalWidth() * 0.5);
	var _g = this.handItem.transform.y;
	_g.set__(_g._value + this.handItem.normalState.getNaturalHeight() * 0.5);
	this.handItem.setInitialState();
};
$hxClasses["managers.mig4.NDiPiecesManagerMig4"] = managers.mig4.NDiPiecesManagerMig4;
managers.mig4.NDiPiecesManagerMig4.__name__ = ["managers","mig4","NDiPiecesManagerMig4"];
managers.mig4.NDiPiecesManagerMig4.__super__ = flambe.Component;
managers.mig4.NDiPiecesManagerMig4.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.handItem));
		this.addItems();
		flambe.Component.prototype.onAdded.call(this);
	}
	,handlerPointerMove: function(e) {
		if(!this.isClicking) return;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
	}
	,handlerPointerUp: function(e) {
		if(!this.isClicking) return;
		this.validateItem();
		this.currentItemSelected = null;
		this.isClicking = false;
	}
	,handlerPointerDown: function(e) {
		if(!this.isObjectSelectedFirtsTime) this.arrayItem[globals.NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS.length - 1].stopHighlight();
		this.isClicking = false;
		this.currentItemSelected = null;
		var tmpObject = js.Boot.__cast(e.hit , gui.components.NDiButton);
		var tmpButton = tmpObject.owner.parent._compMap.NDiItemMig4_19;
		tmpButton.setOnTop();
		var factor = 1 / globals.NDiGameGlobals.getInstance().currentScaleGame;
		var delta = math.NDiVector2D.getComponentDistance(new math.NDiVector2D(e.viewX * factor,e.viewY * factor),new math.NDiVector2D(tmpButton.transform.x._value,tmpButton.transform.y._value));
		tmpButton.object.setOriginalDelta(delta.x,delta.y);
		this.currentItemSelected = tmpButton;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
		this.isClicking = true;
	}
	,moveCurrentItem: function(newPosition) {
		if(this.currentItemSelected != null) {
			this.currentItemSelected.transform.x.set__(newPosition.x * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.x;
			_g.set__(_g._value + this.currentItemSelected.object.getOriginalDelta().x);
			this.currentItemSelected.transform.y.set__(newPosition.y * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.y;
			_g.set__(_g._value + this.currentItemSelected.object.getOriginalDelta().y);
		}
	}
	,validateItem: function() {
		var sp = flambe.display.Sprite.hitTest(this.handItem.owner,this.currentItemSelected.transform.x._value,this.currentItemSelected.transform.y._value);
		if(sp != null) {
			if(this.currentItemSelected.isValid) {
				this.owner.parent.parent._compMap.Scene_0.gameOver();
				this.handItem.setRightState();
				this.currentItemSelected.transform.set_visible(false);
				managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			} else {
				this.currentItemSelected.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.8 + util.NDiRandomUtils.getRandomFloat(-50,50));
				this.currentItemSelected.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.8 + util.NDiRandomUtils.getRandomFloat(-50,50));
				managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
			}
		} else if(this.currentItemSelected.isValid) {
			this.arrayItem[0].resumeHighlight();
			this.handItem.setWrongState();
		}
	}
	,addItems: function() {
		var _g1 = 0, _g = this.arrayItem.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayItem[index]));
		}
	}
	,initArrayItem: function() {
		var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS.length;
		while(_g1 < _g) {
			var index = _g1++;
			var highlightTexture = null;
			if(index == 0) highlightTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/objFinalHihglight"); else if(index == globals.NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS.length - 1) highlightTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig4/obj5_highlight");
			this.arrayItem[index] = new gui.components.mig4.NDiItemMig4(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,globals.NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS[index]),highlightTexture);
			this.arrayItem[index].transform.rotation.set__(util.NDiRandomUtils.getRandomFloat(-45,45));
			this.arrayItem[index].object.nameButton = globals.NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS[index];
			this.arrayItem[index].transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + util.NDiRandomUtils.getRandomFloat(-50,50));
			this.arrayItem[index].transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + util.NDiRandomUtils.getRandomFloat(-50,50));
			this.arrayItem[index].object.get_pointerDown().connect($bind(this,this.handlerPointerDown));
		}
		this.arrayItem[0].isValid = true;
		flambe.System._platform.getPointer().move.connect($bind(this,this.handlerPointerMove));
		flambe.System._platform.getPointer().up.connect($bind(this,this.handlerPointerUp));
	}
	,get_name: function() {
		return "NDiPiecesManagerMig4_17";
	}
	,__class__: managers.mig4.NDiPiecesManagerMig4
});
managers.mig5 = {}
managers.mig5.NDiCharacterManagerMig5 = function() {
	this.bean = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/bean"));
	this.bean.transform.set_visible(false);
	this.bean.transform.x.set__(340.5);
	this.bean.transform.y.set__(256);
	this.bit = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig5/bit"));
	this.bit.transform.x.set__(230);
	this.bit.transform.y.set__(325);
	this.bit.transform.disablePointer();
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_large2"));
	this.lineHeightSignal.transform.disablePointer();
};
$hxClasses["managers.mig5.NDiCharacterManagerMig5"] = managers.mig5.NDiCharacterManagerMig5;
managers.mig5.NDiCharacterManagerMig5.__name__ = ["managers","mig5","NDiCharacterManagerMig5"];
managers.mig5.NDiCharacterManagerMig5.__super__ = flambe.Component;
managers.mig5.NDiCharacterManagerMig5.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.bit));
		this.addHeightLineSignal();
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.bean.transform.x._value + 17);
		this.lineHeightSignal.transform.y.set__(this.bean.transform.y._value);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - 4);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.bean.image.getNaturalHeight() * 0.5);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,get_name: function() {
		return "NDiCharacterManagerMig5_16";
	}
	,__class__: managers.mig5.NDiCharacterManagerMig5
});
managers.mig5.NDiFootprintManagerMig5 = function() {
	this.transform = new flambe.display.Sprite();
	this.totalFootprints = 7;
	this.arrayFootprints = new Array();
	this.initArrayFootPrints();
	this.currentFootprint = 0;
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_short"));
	this.currentItemSelected = null;
	this.isClicking = false;
};
$hxClasses["managers.mig5.NDiFootprintManagerMig5"] = managers.mig5.NDiFootprintManagerMig5;
managers.mig5.NDiFootprintManagerMig5.__name__ = ["managers","mig5","NDiFootprintManagerMig5"];
managers.mig5.NDiFootprintManagerMig5.__super__ = flambe.Component;
managers.mig5.NDiFootprintManagerMig5.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.addArrayFootPrints();
		this.addHeightLineSignal();
		this.createHandlerRuler();
		flambe.System._platform.getPointer().move.connect($bind(this,this.handlerPointerMove));
		flambe.System._platform.getPointer().up.connect($bind(this,this.handlerPointerUp));
	}
	,handlerPointerMove: function(e) {
		if(!this.isClicking) return;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
	}
	,handlerPointerDown: function(e) {
		if(this.currentItemSelected.isBlocked) return;
		this.isClicking = false;
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButtonFill);
		var tmpFoot = tmpButton.owner.parent._compMap.NDiRulerUnit_15;
		var factor = 1 / globals.NDiGameGlobals.getInstance().currentScaleGame;
		var delta = math.NDiVector2D.getComponentDistance(new math.NDiVector2D(e.viewX * factor,e.viewY * factor),new math.NDiVector2D(tmpFoot.transform.x._value,tmpFoot.transform.y._value));
		tmpButton.setOriginalDelta(delta.x,delta.y);
		tmpButton.setOriginalPosition(tmpFoot.transform.x._value,tmpFoot.transform.y._value);
		this.currentItemSelected = tmpButton.owner.parent._compMap.NDiRulerUnit_15;
		this.currentItemSelected.hotspot.toggleHide();
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
		this.owner.parent.parent._compMap.Scene_0.sendBackDepthCharacter();
		this.isClicking = true;
	}
	,handlerPointerUp: function(e) {
		if(!this.isClicking) return;
		this.currentItemSelected.hotspot.toggleHide();
		this.validateItem();
		this.isClicking = false;
	}
	,moveCurrentItem: function(newPosition) {
		if(this.currentItemSelected != null) {
			this.currentItemSelected.clickArea.updateMoveDistance(new math.NDiVector2D(this.currentItemSelected.transform.x._value,this.currentItemSelected.transform.y._value));
			this.currentItemSelected.transform.x.set__(newPosition.x * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.x;
			_g.set__(_g._value + this.currentItemSelected.clickArea.getOriginalDelta().x);
			this.currentItemSelected.transform.y.set__(newPosition.y * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.y;
			_g.set__(_g._value + this.currentItemSelected.clickArea.getOriginalDelta().y);
		}
	}
	,validateItem: function() {
		var _g = this;
		var currentObjectPosition = new math.NDiVector2D(0,0);
		currentObjectPosition.x = this.currentItemSelected.transform.x._value;
		currentObjectPosition.y = this.currentItemSelected.transform.y._value;
		var latestObject = this.getLatestFootprint();
		var hitPosition = new math.NDiVector2D(0,0);
		if(latestObject == null) {
			hitPosition.x = 35;
			hitPosition.y = 37.5;
		} else {
			hitPosition.x = latestObject.transform.x._value;
			hitPosition.y = latestObject.transform.y._value - latestObject.footprint.image.getNaturalHeight();
		}
		var dist = math.NDiVector2D.getDistance(currentObjectPosition,hitPosition);
		if(dist < 20) {
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			this.addFootPrint();
			this.currentItemSelected.returnPosition();
			this.owner.parent.parent._compMap.Scene_0.sendFrontDepthCharacter();
			var tmpRuler = this.getLatestFootprint();
			tmpRuler.hotspot.showNormal = false;
			tmpRuler.show();
			tmpRuler.hotspot.showCorrectTexture();
		} else {
			var distanceBit = this.currentItemSelected.clickArea.getMoveDistance();
			if(distanceBit > 10) {
				managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
				this.currentItemSelected.hotspot.showWrongTexture();
				var f1 = new flambe.script.CallFunction(function() {
					_g.currentItemSelected.isBlocked = false;
				});
				var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.0),f1]);
				this.currentItemSelected.owner._compMap.Script_36.run(seq1);
			} else this.currentItemSelected.isBlocked = false;
		}
	}
	,getLatestFootprint: function() {
		var index = this.arrayFootprints.length - 1;
		while(index >= 0) {
			if((this.arrayFootprints[index].transform._flags & 1) != 0) return this.arrayFootprints[index];
			index--;
		}
		return this.arrayFootprints[0];
	}
	,addArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayFootprints[index]));
			if(index == this.currentFootprint) this.arrayFootprints[index].transform.set_visible(true);
		}
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.arrayFootprints[this.currentFootprint].transform.x._value);
		this.lineHeightSignal.transform.y.set__(this.arrayFootprints[this.currentFootprint].transform.y._value);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * 0.5);
		this.lineHeightSignal.image.disablePointer();
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,createHandlerRuler: function() {
		var tmpRuler = new gui.components.NDiRulerUnit();
		tmpRuler.transform.x.set__(316);
		tmpRuler.transform.y.set__(194);
		tmpRuler.setOriginalPosition();
		this.owner.addChild(new flambe.Entity().add(tmpRuler));
		tmpRuler.hotspot.toggleHide();
		tmpRuler.clickArea.get_pointerDown().connect($bind(this,this.handlerPointerDown));
		this.currentItemSelected = tmpRuler;
	}
	,addFootPrint: function() {
		if(this.currentFootprint + 1 >= this.totalFootprints) return;
		this.currentFootprint++;
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight());
		if(this.currentFootprint == this.totalFootprints - 1) {
			this.lineHeightSignal.transform.set_visible(false);
			this.owner.parent.parent._compMap.Scene_0.gameOver();
		}
		this.arrayFootprints[this.currentFootprint].transform.y.animate(this.currentItemSelected.transform.y._value,this.arrayFootprints[this.currentFootprint].transform.y._value,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.x.animate(this.currentItemSelected.transform.x._value,this.arrayFootprints[this.currentFootprint].transform.x._value,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.alpha.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.set_visible(true);
	}
	,initArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.arrayFootprints[index] = new gui.components.NDiRulerUnit();
			this.arrayFootprints[index].transform.y.set__(390);
			var _g2 = this.arrayFootprints[index].transform.y;
			_g2.set__(_g2._value - this.arrayFootprints[index].footprint.image.getNaturalHeight() * index);
			this.arrayFootprints[index].transform.x.set__(400);
			this.arrayFootprints[index].transform.set_visible(false);
			if(index == this.currentFootprint) {
			} else {
			}
		}
	}
	,get_name: function() {
		return "NDiFootprintManagerMig5_14";
	}
	,__class__: managers.mig5.NDiFootprintManagerMig5
});
managers.mig6 = {}
managers.mig6.NDiCharacterManagerMig6 = function() {
	this.bit = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig6/bit"));
	this.bit.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 - 90);
	this.bit.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5 + 29);
	this.bit.transform.disablePointer();
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_large3"));
	this.lineHeightSignal.transform.disablePointer();
	this.lineHeightSignal.image.disablePointer();
};
$hxClasses["managers.mig6.NDiCharacterManagerMig6"] = managers.mig6.NDiCharacterManagerMig6;
managers.mig6.NDiCharacterManagerMig6.__name__ = ["managers","mig6","NDiCharacterManagerMig6"];
managers.mig6.NDiCharacterManagerMig6.__super__ = flambe.Component;
managers.mig6.NDiCharacterManagerMig6.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.addHeightLineSignal();
		this.owner.addChild(new flambe.Entity().add(this.bit));
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.bit.transform.x._value + 110);
		this.lineHeightSignal.transform.y.set__(this.bit.transform.y._value + 5);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.bit.image.getNaturalHeight() * 0.5);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,get_name: function() {
		return "NDiCharacterManagerMig6_13";
	}
	,__class__: managers.mig6.NDiCharacterManagerMig6
});
managers.mig6.NDiFootprintManagerMig6 = function() {
	this.transform = new flambe.display.Sprite();
	this.totalFootprints = 4;
	this.arrayFootprints = new Array();
	this.initArrayFootPrints();
	this.currentFootprint = 0;
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_short"));
	this.currentItemSelected = null;
	this.isClicking = false;
	this.elapsedTimeHint = 7;
	this.totalTimeHint = 7;
	this.showingHint = false;
};
$hxClasses["managers.mig6.NDiFootprintManagerMig6"] = managers.mig6.NDiFootprintManagerMig6;
managers.mig6.NDiFootprintManagerMig6.__name__ = ["managers","mig6","NDiFootprintManagerMig6"];
managers.mig6.NDiFootprintManagerMig6.__super__ = flambe.Component;
managers.mig6.NDiFootprintManagerMig6.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
		flambe.Component.prototype.onUpdate.call(this,dt);
		this.timerToHint(dt);
	}
	,onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.addArrayFootPrints();
		this.addHeightLineSignal();
		this.createHandlerRuler();
		flambe.System._platform.getPointer().move.connect($bind(this,this.handlerPointerMove));
		flambe.System._platform.getPointer().up.connect($bind(this,this.handlerPointerUp));
	}
	,timerToHint: function(dt) {
		if(this.showingHint) return;
		if(this.elapsedTimeHint >= this.totalTimeHint) {
			var latestIndex = this.getLatestFootprintIndex();
			this.arrayFootprints[latestIndex + 1].hotspot.transform.set_visible(true);
			this.showingHint = true;
		}
		this.elapsedTimeHint += dt;
	}
	,resetTimerHint: function() {
		this.elapsedTimeHint = 0;
		this.showingHint = false;
	}
	,handlerPointerMove: function(e) {
		if(!this.isClicking) return;
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
	}
	,handlerPointerDown: function(e) {
		if(this.currentItemSelected.isBlocked) return;
		this.isClicking = false;
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButtonFill);
		var tmpFoot = tmpButton.owner.parent._compMap.NDiRulerUnit_15;
		var factor = 1 / globals.NDiGameGlobals.getInstance().currentScaleGame;
		var delta = math.NDiVector2D.getComponentDistance(new math.NDiVector2D(e.viewX * factor,e.viewY * factor),new math.NDiVector2D(tmpFoot.transform.x._value,tmpFoot.transform.y._value));
		tmpButton.setOriginalDelta(delta.x,delta.y);
		tmpButton.setOriginalPosition(tmpFoot.transform.x._value,tmpFoot.transform.y._value);
		this.currentItemSelected = tmpButton.owner.parent._compMap.NDiRulerUnit_15;
		this.currentItemSelected.hotspot.toggleHide();
		this.moveCurrentItem(new math.NDiVector2D(e.viewX,e.viewY));
		this.owner.parent.parent._compMap.Scene_0.sendBackDepthCharacter();
		this.isClicking = true;
	}
	,handlerPointerUp: function(e) {
		if(!this.isClicking) return;
		this.currentItemSelected.hotspot.toggleHide();
		this.validateItem();
		this.isClicking = false;
	}
	,moveCurrentItem: function(newPosition) {
		if(this.currentItemSelected != null) {
			this.currentItemSelected.clickArea.updateMoveDistance(new math.NDiVector2D(this.currentItemSelected.transform.x._value,this.currentItemSelected.transform.y._value));
			this.currentItemSelected.transform.x.set__(newPosition.x * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.x;
			_g.set__(_g._value + this.currentItemSelected.clickArea.getOriginalDelta().x);
			this.currentItemSelected.transform.y.set__(newPosition.y * (1 / globals.NDiGameGlobals.getInstance().currentScaleGame));
			var _g = this.currentItemSelected.transform.y;
			_g.set__(_g._value + this.currentItemSelected.clickArea.getOriginalDelta().y);
		}
		this.resetTimerHint();
	}
	,validateItem: function() {
		var _g = this;
		var currentObjectPosition = new math.NDiVector2D(0,0);
		currentObjectPosition.x = this.currentItemSelected.transform.x._value;
		currentObjectPosition.y = this.currentItemSelected.transform.y._value;
		var latestObject = this.getLatestFootprint();
		var hitPosition = new math.NDiVector2D(0,0);
		if(latestObject == null) {
			hitPosition.x = this.arrayFootprints[0].transform.x._value;
			hitPosition.y = this.arrayFootprints[0].transform.y._value;
		} else {
			hitPosition.x = latestObject.transform.x._value;
			hitPosition.y = latestObject.transform.y._value - latestObject.footprint.image.getNaturalHeight();
		}
		var dist = math.NDiVector2D.getDistance(currentObjectPosition,hitPosition);
		if(dist < 20) {
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			this.addFootPrint();
			this.currentItemSelected.returnPosition();
			this.owner.parent.parent._compMap.Scene_0.sendFrontDepthCharacter();
			var tmpRuler = this.getLatestFootprint();
			tmpRuler.hotspot.showNormal = false;
			tmpRuler.show();
			tmpRuler.hotspot.showCorrectTexture();
		} else {
			var distanceBit = this.currentItemSelected.clickArea.getMoveDistance();
			if(distanceBit > 10) {
				managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
				this.currentItemSelected.hotspot.showWrongTexture();
				var f1 = new flambe.script.CallFunction(function() {
					_g.currentItemSelected.isBlocked = false;
				});
				var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.0),f1]);
				this.owner._compMap.Script_36.run(seq1);
			} else this.currentItemSelected.isBlocked = false;
		}
		this.resetTimerHint();
	}
	,getLatestFootprint: function() {
		var index = this.arrayFootprints.length - 1;
		while(index >= 0) {
			if((this.arrayFootprints[index].footprint.transform._flags & 1) != 0) return this.arrayFootprints[index];
			index--;
		}
		return null;
	}
	,getLatestFootprintIndex: function() {
		var index = this.arrayFootprints.length - 1;
		while(index >= 0) {
			if((this.arrayFootprints[index].footprint.transform._flags & 1) != 0) return index;
			index--;
		}
		return -1;
	}
	,createHandlerRuler: function() {
		var tmpRuler = new gui.components.NDiRulerUnit();
		tmpRuler.transform.x.set__(310);
		tmpRuler.transform.y.set__(199);
		tmpRuler.setOriginalPosition();
		this.owner.addChild(new flambe.Entity().add(tmpRuler));
		tmpRuler.hotspot.toggleHide();
		tmpRuler.clickArea.get_pointerDown().connect($bind(this,this.handlerPointerDown));
		this.currentItemSelected = tmpRuler;
	}
	,addArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayFootprints[index]));
			if(index == this.currentFootprint) {
			}
		}
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(this.arrayFootprints[this.currentFootprint].transform.x._value);
		this.lineHeightSignal.transform.y.set__(this.arrayFootprints[this.currentFootprint].transform.y._value);
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value + this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * 0.5);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
	}
	,addFootPrint: function() {
		if(this.currentFootprint + 1 > this.totalFootprints) return;
		var _g = this.lineHeightSignal.transform.y;
		_g.set__(_g._value - this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight());
		if(this.currentFootprint == this.totalFootprints - 1) {
			this.lineHeightSignal.transform.set_visible(false);
			this.owner.parent.parent._compMap.Scene_0.gameOver();
		}
		this.arrayFootprints[this.currentFootprint].transform.y.animate(this.currentItemSelected.transform.y._value,this.arrayFootprints[this.currentFootprint].transform.y._value,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.x.animate(this.currentItemSelected.transform.x._value,this.arrayFootprints[this.currentFootprint].transform.x._value,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.alpha.animate(0,1,0.4,flambe.animation.Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].show();
		this.arrayFootprints[this.currentFootprint].hotspot.showCorrectTexture();
		this.currentFootprint++;
	}
	,initArrayFootPrints: function() {
		var _g1 = 0, _g = this.totalFootprints;
		while(_g1 < _g) {
			var index = _g1++;
			this.arrayFootprints[index] = new gui.components.NDiRulerUnit(true);
			var _g2 = this.arrayFootprints[index].transform.y;
			_g2.set__(_g2._value - this.arrayFootprints[index].footprint.image.getNaturalHeight() * index);
			var _g2 = this.arrayFootprints[index].transform.y;
			_g2.set__(_g2._value + 383);
			this.arrayFootprints[index].transform.x.set__(630);
			this.arrayFootprints[index].footprint.transform.set_visible(false);
			this.arrayFootprints[index].hotspot.transform.set_visible(false);
			if(index == this.currentFootprint) {
			} else {
			}
		}
	}
	,get_name: function() {
		return "NDiFootprintManagerMig6_12";
	}
	,__class__: managers.mig6.NDiFootprintManagerMig6
});
managers.mig7 = {}
managers.mig7.NDiCharacterManagerMig7 = function() {
	this.bit = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig2/bit"));
	this.bit.transform.set_visible(false);
	this.bit.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5 + 290);
	this.bit.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT * 0.5);
};
$hxClasses["managers.mig7.NDiCharacterManagerMig7"] = managers.mig7.NDiCharacterManagerMig7;
managers.mig7.NDiCharacterManagerMig7.__name__ = ["managers","mig7","NDiCharacterManagerMig7"];
managers.mig7.NDiCharacterManagerMig7.__super__ = flambe.Component;
managers.mig7.NDiCharacterManagerMig7.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.addChild(new flambe.Entity().add(this.bit));
	}
	,get_name: function() {
		return "NDiCharacterManagerMig7_11";
	}
	,__class__: managers.mig7.NDiCharacterManagerMig7
});
managers.mig7.NDiPiecesManagerMig7 = function() {
	this.transform = new flambe.display.Sprite();
	this.arrayPieces = new Array();
	this.arrayRobot = new Array();
	this.initArrayPieces();
	this.lineHeightSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_large2"));
	this.lineHeightSignal.transform.disablePointer();
	this.linePieceSignal = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_short"));
	this.linePieceSignal.transform.disablePointer();
	this.lineHeightHighlight = new gui.components.NDiHighlightSignal(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/shared/line_largeHighlightWrong"),null,null);
	this.lineHeightHighlight.transform.set_visible(false);
	this.background = new gui.components.NDiButtonFill(11447982,340,523);
	this.background.resetAnchor();
	this.background.x.set__(10);
	this.background.y.set__(10);
	this.background.alpha.set__(0.7);
	this.totalSizeMeasure = 4;
	this.thereBad = false;
};
$hxClasses["managers.mig7.NDiPiecesManagerMig7"] = managers.mig7.NDiPiecesManagerMig7;
managers.mig7.NDiPiecesManagerMig7.__name__ = ["managers","mig7","NDiPiecesManagerMig7"];
managers.mig7.NDiPiecesManagerMig7.__super__ = flambe.Component;
managers.mig7.NDiPiecesManagerMig7.prototype = $extend(flambe.Component.prototype,{
	onAdded: function() {
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.addArrayPieces();
		this.addHeightLineSignal();
		this.addPieceLineSignal();
	}
	,handlerPointerUp: function(e) {
		var tmpButton = js.Boot.__cast(e.hit , gui.components.NDiButton);
		this.movePieceRobot(tmpButton.owner.parent._compMap.NDiPieceRobot_10);
	}
	,addArrayPieces: function() {
		var _g1 = 0, _g = this.arrayPieces.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.arrayPieces[index]));
		}
	}
	,addPieceLineSignal: function() {
		this.linePieceSignal.transform.x.set__(575);
		this.linePieceSignal.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT - 150);
		this.owner.addChild(new flambe.Entity().add(this.linePieceSignal));
	}
	,addHeightLineSignal: function() {
		this.lineHeightSignal.transform.x.set__(670);
		this.lineHeightSignal.transform.y.set__(205);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightSignal));
		this.lineHeightHighlight.transform.x.set__(670);
		this.lineHeightHighlight.transform.y.set__(205);
		this.owner.addChild(new flambe.Entity().add(this.lineHeightHighlight));
	}
	,movePieceRobot: function(tmpButton) {
		if(!tmpButton.isPlaced) {
			if(this.validateOverloadPieces(tmpButton)) {
				if(!this.thereBad) this.thereBad = true; else {
					this.showError();
					return;
				}
			}
			tmpButton.hideHiglight();
			var latestIndex = this.getFirstNullPieceArrayRobot();
			latestIndex -= 1;
			var incX = 550;
			var incY = globals.NDiGameConstants.GAME_HEIGHT - 150;
			if(!this.isEmptyPieceArrayRobot() && latestIndex >= 0) {
				incY = this.arrayRobot[latestIndex].transform.y._value;
				incY -= this.arrayRobot[latestIndex].piece.getNaturalHeight();
			}
			tmpButton.transform.y.animateTo(incY,0.2,flambe.animation.Ease.sineOut);
			tmpButton.transform.x.animateTo(incX,0.2,flambe.animation.Ease.sineOut);
			HxOverrides.remove(this.arrayPieces,tmpButton);
			this.addPieceArrayRobot(tmpButton);
			tmpButton.isPlaced = true;
			this.isFinished(tmpButton);
		} else {
			if(!this.isLatestObject(tmpButton)) {
				this.showError();
				return;
			}
			if(this.thereBad) this.thereBad = false;
			tmpButton.transform.x.animateTo(tmpButton.piece.getOriginalPosition().x,0.2,flambe.animation.Ease.sineOut);
			tmpButton.transform.y.animateTo(tmpButton.piece.getOriginalPosition().y,0.2,flambe.animation.Ease.sineOut);
			this.removePieceArrayRobot(tmpButton);
			this.arrayPieces.push(tmpButton);
			tmpButton.isPlaced = false;
		}
		if(this.getCurrentSizePieces() <= this.totalSizeMeasure) this.lineHeightHighlight.transform.set_visible(false); else this.lineHeightHighlight.transform.set_visible(true);
		if(this.getCurrentSizePieces() == this.totalSizeMeasure) this.linePieceSignal.transform.set_visible(false); else {
			var pieceLineY = globals.NDiGameConstants.GAME_HEIGHT - 150;
			var _g1 = 0, _g = this.arrayRobot.length;
			while(_g1 < _g) {
				var index = _g1++;
				if(this.arrayRobot[index] != null) pieceLineY -= this.arrayRobot[index].piece.getNaturalHeight(); else break;
			}
			this.linePieceSignal.transform.y.set__(pieceLineY);
		}
	}
	,showError: function() {
		var tmp = this.arrayRobot[this.getFirstNullPieceArrayRobot() - 1];
		tmp.transform.x.animate(tmp.transform.x._value + 10,tmp.transform.x._value,0.3,flambe.animation.Ease.bounceOut);
		tmp.transform.y.animate(tmp.transform.y._value - 10,tmp.transform.y._value,0.3,flambe.animation.Ease.bounceOut);
	}
	,isFinished: function(tmpButton) {
		var currentSize = this.getCurrentSizePieces();
		if(currentSize == this.totalSizeMeasure) this.owner.parent.parent._compMap.Scene_0.gameOver();
		if(currentSize <= this.totalSizeMeasure) {
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			tmpButton.showCorrectHighlight();
		} else {
			managers.NDiAudioManager.getInstance().playSoundEffect(globals.NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
			tmpButton.showIncorrectHighlight();
		}
	}
	,isLatestObject: function(tmpButton) {
		if(this.arrayRobot.length > 0) {
			if(tmpButton == this.arrayRobot[this.getFirstNullPieceArrayRobot() - 1]) return true;
		}
		return false;
	}
	,validateOverloadPieces: function(tmpButton) {
		var currentSize = this.getCurrentSizePieces();
		currentSize += tmpButton.size;
		if(currentSize > this.totalSizeMeasure) return true;
		return false;
	}
	,getCurrentSizePieces: function() {
		var sum = 0;
		var _g1 = 0, _g = this.arrayRobot.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayRobot[index] != null) sum += this.arrayRobot[index].size;
		}
		return sum;
	}
	,getFirstNullPieceArrayRobot: function() {
		var index = 0;
		while(index < this.arrayRobot.length) {
			if(this.arrayRobot[index] == null) return index;
			index++;
		}
		return -1;
	}
	,isEmptyPieceArrayRobot: function() {
		var _g1 = 0, _g = this.arrayRobot.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayRobot[index] != null) return false;
		}
		return true;
	}
	,removePieceArrayRobot: function(piece) {
		var _g1 = 0, _g = this.arrayRobot.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayRobot[index] == piece) {
				this.arrayRobot[index] = null;
				return index;
			}
		}
		return 0;
	}
	,addPieceArrayRobot: function(piece) {
		var _g1 = 0, _g = this.arrayRobot.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.arrayRobot[index] == null) {
				this.arrayRobot[index] = piece;
				return index;
			}
		}
		return 0;
	}
	,createFootPrint: function(imgName) {
		var imgPath = "images/mig7/pieces/" + imgName;
		var idPiece = imgName.split("r")[1];
		var tmp = null;
		if(idPiece > 10) tmp = new gui.components.mig7.NDiPieceRobot(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,imgPath),2); else tmp = new gui.components.mig7.NDiPieceRobot(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,imgPath),1);
		tmp.piece.nameButton = imgName;
		tmp.piece.bottomCenterAnchor();
		return tmp;
	}
	,initArrayPieces: function() {
		var arrayFixed = new Array();
		var copyArray1p = new Array();
		var _g = 0;
		while(_g < 10) {
			var index = _g++;
			copyArray1p.push(globals.NDiGameConstants.ARRAY_ASSETS_ROBOT[index]);
		}
		copyArray1p = util.NDiRandomUtils.shuffle(copyArray1p);
		var copyArray2p = new Array();
		var _g1 = 10, _g = globals.NDiGameConstants.ARRAY_ASSETS_ROBOT.length;
		while(_g1 < _g) {
			var index = _g1++;
			copyArray2p.push(globals.NDiGameConstants.ARRAY_ASSETS_ROBOT[index]);
		}
		copyArray2p = util.NDiRandomUtils.shuffle(copyArray2p);
		var _g = 0;
		while(_g < 6) {
			var indexIt = _g++;
			var index = arrayFixed.length;
			arrayFixed[index] = copyArray1p[indexIt];
		}
		var _g = 0;
		while(_g < 3) {
			var indexIt = _g++;
			var index = arrayFixed.length;
			arrayFixed[index] = copyArray2p[indexIt];
		}
		var gridWidth = 3;
		var rndHighlight = util.NDiRandomUtils.getRandomInt(0,gridWidth * 3);
		var _g = 0;
		while(_g < gridWidth) {
			var j = _g++;
			var _g1 = 0;
			while(_g1 < gridWidth) {
				var i = _g1++;
				var index = j * gridWidth + i;
				this.arrayRobot[index] = null;
				this.arrayPieces[index] = this.createFootPrint(arrayFixed[index]);
				var incX = 110 * i;
				incX += 60;
				var incY = 185 * j;
				incY += 100;
				if(index == rndHighlight) this.arrayPieces[index].highlight.transform.set_visible(true);
				this.arrayPieces[index].transform.y.set__(incY);
				this.arrayPieces[index].transform.x.set__(incX);
				this.arrayPieces[index].piece.setOriginalPosition(this.arrayPieces[index].transform.x._value,this.arrayPieces[index].transform.y._value);
				this.arrayPieces[index].piece.get_pointerUp().connect($bind(this,this.handlerPointerUp));
			}
		}
	}
	,get_name: function() {
		return "NDiPiecesManagerMig7_9";
	}
	,__class__: managers.mig7.NDiPiecesManagerMig7
});
managers.mig8 = {}
managers.mig8.NDiGapsManager = function() {
	this.loadInit();
};
$hxClasses["managers.mig8.NDiGapsManager"] = managers.mig8.NDiGapsManager;
managers.mig8.NDiGapsManager.__name__ = ["managers","mig8","NDiGapsManager"];
managers.mig8.NDiGapsManager.__super__ = flambe.Component;
managers.mig8.NDiGapsManager.prototype = $extend(flambe.Component.prototype,{
	onUpdate: function(dt) {
	}
	,onRemoved: function() {
	}
	,onAdded: function() {
		var _g = this;
		flambe.Component.prototype.onAdded.call(this);
		this.owner.add(new flambe.script.Script());
		this.owner.add(this.transform);
		this.owner.addChild(new flambe.Entity().add(this.wagon));
		this.owner.addChild(new flambe.Entity().add(this.background));
		this.addGapsButtons();
		this.owner.addChild(new flambe.Entity().add(this.arrowSignal));
		var f1 = new flambe.script.CallFunction(function() {
			_g.nextGap();
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(0.9),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,hideWagon: function() {
		this.wagon.transform.set_visible(false);
	}
	,nextGap: function() {
		var _g = this;
		this.wagon.animationCreate("_entry");
		this.currentGap++;
		this.arrowSignal.transform.set_visible(true);
		this.arrowSignal.transform.x.animateTo(this.gapButtons[this.currentGap].x._value,0.8,flambe.animation.Ease.backInOut);
		this.arrowSignal.transform.y.set__(this.gapButtons[this.currentGap].y._value - 50);
		var f1 = new flambe.script.CallFunction(function() {
			var parent = _g.owner.parent.parent._compMap.Scene_0;
			parent.getPanelController().changeGap(globals.NDiGameConstants.ARRAY_CONFIG_UNITS_GAPS[_g.currentGap]);
		});
		var seq1 = new flambe.script.Sequence([new flambe.script.Delay(1.5),f1]);
		this.owner._compMap.Script_36.run(seq1);
	}
	,endingWagonAnimation: function() {
		this.wagon.animationCreate("_exit");
	}
	,fillGap: function() {
		this.gapButtons[this.currentGap].set_visible(true);
	}
	,addGapsButtons: function() {
		var _g1 = 0, _g = this.gapButtons.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.owner.addChild(new flambe.Entity().add(this.gapButtons[index]));
		}
	}
	,initGapsButtons: function() {
		var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_CONFIG_POSITION_GAPS.length;
		while(_g1 < _g) {
			var index = _g1++;
			this.gapButtons[index] = new gui.components.mig8.NDiGapButton(globals.NDiGameConstants.ARRAY_CONFIG_UNITS_GAPS[index]);
			this.gapButtons[index].x.set__(globals.NDiGameConstants.ARRAY_CONFIG_POSITION_GAPS[index].x);
			this.gapButtons[index].y.set__(globals.NDiGameConstants.ARRAY_CONFIG_POSITION_GAPS[index].y);
			this.gapButtons[index].nameButton = "GAP_BUTTON_" + index;
			this.gapButtons[index].indexGap = index;
			this.gapButtons[index].set_visible(false);
		}
	}
	,isEndingGap: function() {
		if(this.currentGap == this.totalGaps - 1) return true; else return false;
	}
	,loadInit: function() {
		this.transform = new flambe.display.Sprite();
		var lib = managers.NDiResourcesManager.loadSetAnimations(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"animations/mig8/rollerCoasterAnimations");
		this.wagon = new gui.components.NDiAnimationMovie(lib,"bigcart");
		this.wagon.animationIdle();
		this.wagon.transform.set_visible(false);
		this.totalGaps = globals.NDiGameConstants.ARRAY_CONFIG_POSITION_GAPS.length;
		this.currentGap = -1;
		this.gapButtons = new Array();
		this.initGapsButtons();
		this.background = new gui.components.NDiImage(managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/background_gaps"));
		this.background.bottomCenterAnchor();
		this.background.transform.x.set__(globals.NDiGameConstants.GAME_WIDTH * 0.5);
		this.background.transform.y.set__(globals.NDiGameConstants.GAME_HEIGHT);
		var arrowSignalTexture = managers.NDiResourcesManager.loadImage(globals.NDiGameConstants.ASSET_PACKAGE_GENERAL,"images/mig8/arrow_down");
		this.arrowSignal = new gui.components.NDiImage(arrowSignalTexture);
		this.arrowSignal.transform.set_visible(false);
		this.arrowSignal.transform.x.set__(-28);
	}
	,get_name: function() {
		return "NDiGapsManager_8";
	}
	,__class__: managers.mig8.NDiGapsManager
});
var util = {}
util.JSEmbedProxy = function() { }
$hxClasses["util.JSEmbedProxy"] = util.JSEmbedProxy;
util.JSEmbedProxy.__name__ = ["util","JSEmbedProxy"];
util.JSEmbedProxy.get_base = function() {
	return util.JSEmbedProxy.callJSEmbedMethod("baseUrl()");
}
util.JSEmbedProxy.callJSEmbedMethod = function(pRequest) {
	try {
		var result = eval("jsembed." + pRequest);
		return result == null?"":result;
	} catch( err ) {
	}
	return "";
}
util.NDiRandomUtils = function() { }
$hxClasses["util.NDiRandomUtils"] = util.NDiRandomUtils;
util.NDiRandomUtils.__name__ = ["util","NDiRandomUtils"];
util.NDiRandomUtils.getRandomFloat = function(a,b) {
	var dif = Math.abs(a - b);
	var rnd = Math.random();
	rnd = rnd * dif;
	rnd = a + rnd;
	return rnd;
}
util.NDiRandomUtils.getRandomInt = function(a,b) {
	var dif = Math.floor(Math.abs(a - b));
	var rnd = Std.random(dif);
	rnd = a + rnd;
	return rnd;
}
util.NDiRandomUtils.shuffle = function(arr) {
	if(arr != null) {
		var _g1 = 0, _g = arr.length;
		while(_g1 < _g) {
			var i = _g1++;
			var j = Math.floor((arr.length - 1 + 1) * Math.random());
			var a = arr[i];
			var b = arr[j];
			arr[i] = b;
			arr[j] = a;
		}
	}
	return arr;
}
util.NDiSaveData = function() {
	this.data = flambe.System._platform.getStorage();
	this.initData();
};
$hxClasses["util.NDiSaveData"] = util.NDiSaveData;
util.NDiSaveData.__name__ = ["util","NDiSaveData"];
util.NDiSaveData.initInstance = function() {
	if(util.NDiSaveData.instance == null) util.NDiSaveData.instance = new util.NDiSaveData();
}
util.NDiSaveData.getInstance = function() {
	return util.NDiSaveData.instance;
}
util.NDiSaveData.prototype = {
	getData: function(key) {
		return this.data.get(key);
	}
	,setData: function(key,value) {
		this.data.set(key,value);
	}
	,initData: function() {
		var _g1 = 0, _g = globals.NDiGameConstants.ARRAY_VARS_TO_SAVE.length;
		while(_g1 < _g) {
			var index = _g1++;
			if(this.getData(globals.NDiGameConstants.ARRAY_VARS_TO_SAVE[index][0]) == null) this.setData(globals.NDiGameConstants.ARRAY_VARS_TO_SAVE[index][0],globals.NDiGameConstants.ARRAY_VARS_INIT_VALUES[index]);
		}
	}
	,__class__: util.NDiSaveData
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
if(typeof(JSON) != "undefined") haxe.Json = JSON;
flambe.platform.html.HtmlPlatform.instance = new flambe.platform.html.HtmlPlatform();
flambe.util.SignalBase.DISPATCHING_SENTINEL = new flambe.util.SignalConnection(null,null);
flambe.System.root = new flambe.Entity();
flambe.System.uncaughtError = new flambe.util.Signal1();
flambe.System.hidden = new flambe.util.Value(false);
flambe.System.hasGPU = new flambe.util.Value(false);
flambe.System.volume = new flambe.animation.AnimatedFloat(1);
flambe.System._platform = flambe.platform.html.HtmlPlatform.instance;
flambe.System._calledInit = false;
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
js.Browser.navigator = typeof window != "undefined" ? window.navigator : null;
flambe.asset.Manifest.__meta__ = { obj : { assets : [{ assets_loading : [{ bytes : 2825, md5 : "f61bafc3435d0b629fcc35c21162eced", name : "loading_bar.png"},{ bytes : 20389, md5 : "29cbf94c851b11a523037e3dacedf2b3", name : "loading_bg.jpg"},{ bytes : 6961, md5 : "6b2c7bb470437091d70013c221ec2c63", name : "loading_icon.png"}], assets_general : [{ bytes : 27748, md5 : "551d5bc088d7b38e2f4817beb9bb72f7", name : "animations/mig8/rollerCoasterAnimations/atlas0.png"},{ bytes : 1613, md5 : "0b971d29146dfd47123c7aa1015eae0c", name : "animations/mig8/rollerCoasterAnimations/library.json"},{ bytes : 360, md5 : "32d2954204a2fb16fdb0bd1e263a035d", name : "animations/mig8/rollerCoasterAnimations_mini/atlas0.png"},{ bytes : 9940, md5 : "93d6d7d7fc9b3523a65cf23b49370631", name : "animations/mig8/rollerCoasterAnimations_mini/library.json"},{ bytes : 70767, md5 : "bc57181bfcfcad03d152311d2d069cf0", name : "animations/mig8/UMIposses/atlas0.png"},{ bytes : 3019, md5 : "dc583bde764b8ac46201074ca8ee25e1", name : "animations/mig8/UMIposses/library.json"},{ bytes : 19947, md5 : "5b8cbee4bab3587d65d5d8392cbc1631", name : "animations/preloader/atlas0.png"},{ bytes : 1405, md5 : "071944865726f4a75644156ed041e204", name : "animations/preloader/library.json"},{ bytes : 55370, md5 : "f51f16563c57b39697d6056cfa560cd7", name : "fonts/calibri/calibri.fnt"},{ bytes : 21247, md5 : "c85e9849b2908fae1bc028ebf2369747", name : "fonts/calibri/calibri_0.png"},{ bytes : 20389, md5 : "ae6846ad0cdcf6108d8227a536b70ab7", name : "images/backgrounds/loading_bg.jpg"},{ bytes : 533259, md5 : "1ac73e5bc5d3a49b16e60ea6db03eb12", name : "images/backgrounds/test_background.png"},{ bytes : 403597, md5 : "5c406e85493487af068b182204a41da2", name : "images/mig1/background.png"},{ bytes : 7424, md5 : "2f347379a167aafd96ff71cb8a3afcb4", name : "images/mig1/background_play.jpg"},{ bytes : 8842, md5 : "1fd5cdd0df102210ad0d18e80741b157", name : "images/mig1/go_button.png"},{ bytes : 3520, md5 : "a38237b7e07b282dc7c7c473676a3035", name : "images/mig1/go_buttonHighlight.png"},{ bytes : 90659, md5 : "740c11d45872c371c4eee5bbf6616c30", name : "images/mig2/background.png"},{ bytes : 50399, md5 : "a9a42b2a3dea5a43fa00f8c0b75ca8a7", name : "images/mig2/bean.png"},{ bytes : 23840, md5 : "251b06969d455781b771482e7181cc2a", name : "images/mig2/bit.png"},{ bytes : 39266, md5 : "7fa4cd58d5579ef56b5259204ff65567", name : "images/mig2/bit_old.png"},{ bytes : 57582, md5 : "666813e734a5d6484eeea00966cbe46b", name : "images/mig2/dizzy.png"},{ bytes : 7165, md5 : "6233e0e641f3496601287cda54b0b2ea", name : "images/mig2/footprint.png"},{ bytes : 4154, md5 : "e36d9e6fca65fea0196f21f2dbb1c07f", name : "images/mig2/footprintCorrect.png"},{ bytes : 1639, md5 : "cde072370c9c63c205c620277277a696", name : "images/mig2/footprintCue.png"},{ bytes : 4209, md5 : "605b606144b3b0b4bc603866a3d88020", name : "images/mig2/footprintWrong.png"},{ bytes : 7433, md5 : "dabb8b5e8b2e9e63bb33c55b7c7c870f", name : "images/mig2/highlightFootNormal.png"},{ bytes : 87494, md5 : "68a4117000518ddd3cad5b2b90eafec2", name : "images/mig3/background.png"},{ bytes : 50399, md5 : "a9a42b2a3dea5a43fa00f8c0b75ca8a7", name : "images/mig3/bean.png"},{ bytes : 39266, md5 : "7fa4cd58d5579ef56b5259204ff65567", name : "images/mig3/bit.png"},{ bytes : 57582, md5 : "666813e734a5d6484eeea00966cbe46b", name : "images/mig3/dizzy.png"},{ bytes : 7276, md5 : "66bb6e1cf0c20e4932d7d444a61404ff", name : "images/mig3/foot.png"},{ bytes : 7165, md5 : "6233e0e641f3496601287cda54b0b2ea", name : "images/mig3/footprint.png"},{ bytes : 4154, md5 : "e36d9e6fca65fea0196f21f2dbb1c07f", name : "images/mig3/footprintCorrect.png"},{ bytes : 2032, md5 : "d87a18ee49e1ab7b5ad8b211fa4c445a", name : "images/mig3/footprintHotspot.png"},{ bytes : 12170, md5 : "582a00840929ebbb0c8b24b576c82bbe", name : "images/mig3/footprintNormal.png"},{ bytes : 4209, md5 : "605b606144b3b0b4bc603866a3d88020", name : "images/mig3/footprintWrong.png"},{ bytes : 40044, md5 : "0e4dcf6858a06238ce4f53543f95b896", name : "images/mig4/background.png"},{ bytes : 35618, md5 : "c5183508f34e08f54c0c213dba6a3cfd", name : "images/mig4/background_old.jpg"},{ bytes : 24664, md5 : "26c6db87efe48b37ca930ea082c62ca4", name : "images/mig4/hand.png"},{ bytes : 56666, md5 : "d1c0d52cdb2937a7d475415c932708ec", name : "images/mig4/handWithRuler.png"},{ bytes : 16217, md5 : "85369d4d8ba245cdbe999befdc2af06a", name : "images/mig4/handWithRuler_highlight.png"},{ bytes : 10475, md5 : "1f3f9a14d3252b88f422d01a5b63646c", name : "images/mig4/hand_highlight.png"},{ bytes : 16866, md5 : "e845c4a495fdd80806e038e7332d9e83", name : "images/mig4/obj1.png"},{ bytes : 50453, md5 : "903417dc10686cce574116f615cd4488", name : "images/mig4/obj1_highlight.png"},{ bytes : 1895, md5 : "ad64229f6b98877a1c13fa98740a0563", name : "images/mig4/obj1_old.jpg"},{ bytes : 15794, md5 : "382dad460540015572559415ec8be318", name : "images/mig4/obj2.png"},{ bytes : 1895, md5 : "7894cb7bd60a2e32a208e7c08f76cfaa", name : "images/mig4/obj2_old.jpg"},{ bytes : 26637, md5 : "616390a8f79e8e090a651f3e5d27eba6", name : "images/mig4/obj3.png"},{ bytes : 1894, md5 : "77b2aa147bad208e7a4bcbbce8a69cc6", name : "images/mig4/obj3_old.jpg"},{ bytes : 17635, md5 : "c612fe51027561d526c706787e07ae0b", name : "images/mig4/obj4.png"},{ bytes : 1895, md5 : "d6bd532047e6ce1fe308e8c47dcb3458", name : "images/mig4/obj4_old.jpg"},{ bytes : 27929, md5 : "ac83a54a61f35fcb7ed60b2f688c9ab1", name : "images/mig4/obj5.png"},{ bytes : 7878, md5 : "f716bb08b47acac630a7074244e203f6", name : "images/mig4/obj5_highlight.png"},{ bytes : 1894, md5 : "3cb4ab1bf27119d0a65a2f8aec2ccbdc", name : "images/mig4/obj5_old.jpg"},{ bytes : 11688, md5 : "1c9720756fcba2510305f7bedfb06df8", name : "images/mig4/objFinal.jpg"},{ bytes : 1686, md5 : "cfe0ec80687f8f6e8b61bdd9e5fac8e1", name : "images/mig4/objFinalHihglight.png"},{ bytes : 102862, md5 : "305d0b775e3d118f012f522ae576d842", name : "images/mig5/background.png"},{ bytes : 33889, md5 : "1ef436bb58d9d95949751bef2dc6f9d2", name : "images/mig5/bit.png"},{ bytes : 77917, md5 : "aa3e36267b78c9bbc4a2d3bbefa9b239", name : "images/mig6/background.png"},{ bytes : 39382, md5 : "d6a8582e6e1fd5fc9ed760f361c91a7b", name : "images/mig6/bit.png"},{ bytes : 29216, md5 : "a1f313a91abbf5ce9ea5f0cca393066a", name : "images/mig6/bit_.png"},{ bytes : 55809, md5 : "ac5495566393188fcb5f826b1b57293f", name : "images/mig7/background.png"},{ bytes : 5860, md5 : "6a2d33f90fecf0f31e184eb5a3b2ce3f", name : "images/mig7/pieces/bigobj_correct.png"},{ bytes : 5899, md5 : "21de762371408a73b4092eb7a79189b8", name : "images/mig7/pieces/bigobj_highlight.png"},{ bytes : 5867, md5 : "6155239e6d595015eface239f4892475", name : "images/mig7/pieces/bigobj_incorrect.png"},{ bytes : 5370, md5 : "c608bda26929051c4b48191db3caeb79", name : "images/mig7/pieces/r1.png"},{ bytes : 4697, md5 : "a6eb597fa3b501f0a4dfe98a001b7612", name : "images/mig7/pieces/r10.png"},{ bytes : 10788, md5 : "578c4e27e1c8e962f710372bd0e4cc0d", name : "images/mig7/pieces/r11.png"},{ bytes : 9512, md5 : "e19f07d0ed78e38b5ea60325851e5816", name : "images/mig7/pieces/r12.png"},{ bytes : 7113, md5 : "b96b81e3572d4cb1eea7649704baca1d", name : "images/mig7/pieces/r13.png"},{ bytes : 7083, md5 : "ada2070e09b72ec370dac1958561ad33", name : "images/mig7/pieces/r14.png"},{ bytes : 5007, md5 : "8545c9d22a7cd45d14135195910815c3", name : "images/mig7/pieces/r15.png"},{ bytes : 3720, md5 : "fcf5502213e00bb4cd5e574fa4b72b44", name : "images/mig7/pieces/r2.png"},{ bytes : 3671, md5 : "dfec53e214919002f13fe68f5b4d9d41", name : "images/mig7/pieces/r3.png"},{ bytes : 6102, md5 : "adaa80b2c7d20c43b827439f5a25a76d", name : "images/mig7/pieces/r4.png"},{ bytes : 5787, md5 : "1b20dc6a63420f42869b3c2ec90537eb", name : "images/mig7/pieces/r5.png"},{ bytes : 3645, md5 : "7934f1527b0b593063dcbf8e23d6298e", name : "images/mig7/pieces/r6.png"},{ bytes : 3730, md5 : "dcbba8fbfcc8247c3c757299aae6ab6e", name : "images/mig7/pieces/r7.png"},{ bytes : 4082, md5 : "e3a052e07ee74a58780861749628bb7f", name : "images/mig7/pieces/r8.png"},{ bytes : 5937, md5 : "7af5d70382767d4f168ea228599bf2e7", name : "images/mig7/pieces/r9.png"},{ bytes : 4525, md5 : "3f6b4e5de77efadf2a89c52b0bd3bfac", name : "images/mig7/pieces/smalobj_correct.png"},{ bytes : 4535, md5 : "cfaf7e47c5bc248abd4d52359c234db0", name : "images/mig7/pieces/smalobj_highlight.png"},{ bytes : 4531, md5 : "559786c7c8e875bdf8d5da1a2d1cd744", name : "images/mig7/pieces/smalobj_incorrect.png"},{ bytes : 15003, md5 : "df543ee449b0ad592c273854be45f82c", name : "images/mig7/robot/r1.png"},{ bytes : 20917, md5 : "111acbaa61090285a8509cd456a2f405", name : "images/mig7/robot/r2.png"},{ bytes : 16431, md5 : "110cd0e7d204c475ced6120f9bcb2d46", name : "images/mig7/robot/r3.png"},{ bytes : 1404, md5 : "f4afbe2e42f89ef95f611b1cfab005f0", name : "images/mig8/arrow_down.png"},{ bytes : 37523, md5 : "38a700d281c720279119b133582328e1", name : "images/mig8/background.jpg"},{ bytes : 62691, md5 : "96b959a86246aa6f7f87fc27ef898087", name : "images/mig8/background_gaps.png"},{ bytes : 1361, md5 : "256b632c4490d70fbeb4cced9b7e3b47", name : "images/mig8/bridge_rail.jpg"},{ bytes : 11682, md5 : "b656072fcbac88aca190eeed5d0e715b", name : "images/mig8/clean_button.jpg"},{ bytes : 5480, md5 : "3cfe3a9e7366393199b3a019a0531461", name : "images/mig8/error_x.png"},{ bytes : 2781, md5 : "46375973e4b424b7080c9cb87b1b1245", name : "images/mig8/railCorrect.png"},{ bytes : 2547, md5 : "844b1a79de6e2a17ae868d24814f037b", name : "images/mig8/railWrong.png"},{ bytes : 1189, md5 : "ed9c0183a3c4170c946e109bfba2cd76", name : "images/mig8/rail_selector.jpg"},{ bytes : 10827, md5 : "79675ed47ab68f6f916962b81f9f77ed", name : "images/mig8/rail_zoom_panel.jpg"},{ bytes : 1295, md5 : "af93e44796b78cf45dd2e4c4b7418902", name : "images/mig8/ruler.png"},{ bytes : 3794, md5 : "db61e81680ac6ee0ff54a7c3b5e74802", name : "images/shared/alpha_bg.png"},{ bytes : 1520, md5 : "09383d8bc0b847899993e690aa5e6668", name : "images/shared/controls/background.png"},{ bytes : 1262, md5 : "181580fc484dc6988201f8d4eb4cebc2", name : "images/shared/controls/pause_button.png"},{ bytes : 1566, md5 : "04f3fefa486053fd99dfe34e3fcfa6fb", name : "images/shared/controls/play_button.png"},{ bytes : 1745, md5 : "92da5e72c208547ec02cf0bdac84c2cd", name : "images/shared/controls/prev_button.png"},{ bytes : 1428, md5 : "7e5370900d42e1e3729cfc682d60f2c2", name : "images/shared/controls/stop_button.png"},{ bytes : 6254, md5 : "72371f07728a27467ec4b6ae6309792a", name : "images/shared/line_large.png"},{ bytes : 1493, md5 : "f2cc712f94a065b3a136d0567a101a87", name : "images/shared/line_large2.png"},{ bytes : 15355, md5 : "97b26673cf9481f3f60755d366efee12", name : "images/shared/line_large3.png"},{ bytes : 1829, md5 : "3e3885d546a61dec61793fb669dae182", name : "images/shared/line_largeHighlightWrong.png"},{ bytes : 5632, md5 : "70dc64addda9d92cf07246da5f903846", name : "images/shared/line_short.png"},{ bytes : 7824, md5 : "516f156f7c9d2f3b017795c84f255ca6", name : "images/shared/play_button.png"},{ bytes : 4786, md5 : "7bc32c7a7c00dd8612e1e70f4657e333", name : "images/shared/play_buttonHightlight.png"},{ bytes : 17937, md5 : "862742de744edc6b6404bbce3be48a19", name : "images/shared/ruler.png"},{ bytes : 2885, md5 : "da72de606f1fbdc954e13428fd3e9297", name : "images/shared/rulerHighlight.png"},{ bytes : 2878, md5 : "ddf5c3e1cfda4fa16c38a46a06d98129", name : "images/shared/rulerHighlightCorrect.png"},{ bytes : 2822, md5 : "15f1277c4679bbf00c637d347a69b7d0", name : "images/shared/rulerHighlightWrong.png"},{ bytes : 14958, md5 : "e4ebc77686f09ccc96f8c9ef4ce5fe11", name : "images/shared/rulerHotspot.png"},{ bytes : 51427, md5 : "7249fb756d173a2f6f0822db187d5431", name : "sounds/401_ALL_128.mp3"},{ bytes : 29463, md5 : "1250e1523f4f2491c625e3ebe8b3411d", name : "sounds/401_ALL_128.ogg"},{ bytes : 108451, md5 : "ec8f70db21b9fb706a130a480ba4dcf0", name : "sounds/401_BEAN_04.mp3"},{ bytes : 65373, md5 : "1efc235184aa20f7056264f665b9e761", name : "sounds/401_BEAN_04.ogg"},{ bytes : 27811, md5 : "7af04ddeb22df7fd9a16e2ec61bab2ca", name : "sounds/401_BEAN_160.mp3"},{ bytes : 20494, md5 : "45dd6e10c32eda8a318d0e99cbf22110", name : "sounds/401_BEAN_160.ogg"},{ bytes : 125731, md5 : "d05f63ebf2c4fe9a5cf5b3289d05d96a", name : "sounds/401_BEAN_17.mp3"},{ bytes : 70686, md5 : "02800683bf656975966397f29d826389", name : "sounds/401_BEAN_17.ogg"},{ bytes : 39907, md5 : "d3d0a80bba99c50feadeffee5dc65b42", name : "sounds/401_BEAN_174.mp3"},{ bytes : 24388, md5 : "adc7851253cb227cc828dcd33bea857e", name : "sounds/401_BEAN_174.ogg"},{ bytes : 222499, md5 : "02b060b6ae8de5bd4f9ce74be4d9bdc1", name : "sounds/401_BEAN_40.mp3"},{ bytes : 123324, md5 : "c545c436c91605c134ba0287a7d0e8df", name : "sounds/401_BEAN_40.ogg"},{ bytes : 157411, md5 : "ccda66a448d825547f7977fd9d444cb2", name : "sounds/401_BEAN_56.mp3"},{ bytes : 88874, md5 : "ef103db9db717da7e8fe450a222d6aa6", name : "sounds/401_BEAN_56.ogg"},{ bytes : 61219, md5 : "acda72e3ed27c6ac11e1a7109581a167", name : "sounds/401_BEAN_72.mp3"},{ bytes : 37026, md5 : "b8d6bbf32aec391000b7bf97069a46e3", name : "sounds/401_BEAN_72.ogg"},{ bytes : 126883, md5 : "fa7ab31f8f33672da2296b3deb48cfd3", name : "sounds/401_BEAN_92.mp3"},{ bytes : 74629, md5 : "0351a79e928fbae060132cafaf93e461", name : "sounds/401_BEAN_92.ogg"},{ bytes : 128035, md5 : "a5148ef2f754b203a7e3423e54e79a88", name : "sounds/401_BEAN_MIG07_line01.mp3"},{ bytes : 71448, md5 : "2d1579a488d8baff2b34136b8edd69f1", name : "sounds/401_BEAN_MIG07_line01.ogg"},{ bytes : 170083, md5 : "e4d527bf366e1fbfc68199dab3d0cfa8", name : "sounds/401_BEAN_MIG07_line02.mp3"},{ bytes : 92492, md5 : "355ede2420271805be00655bcb57b4ec", name : "sounds/401_BEAN_MIG07_line02.ogg"},{ bytes : 242083, md5 : "e76039f1c47d8beecff567aeb69f5009", name : "sounds/401_BIT_09.mp3"},{ bytes : 127599, md5 : "cb0040ab6e92ff5b270b20d61e82eabd", name : "sounds/401_BIT_09.ogg"},{ bytes : 234595, md5 : "f7316cc68cf2377624285365ca444187", name : "sounds/401_BIT_25.mp3"},{ bytes : 122899, md5 : "abf4f51a921f1fcbe5db07f48c5e9dea", name : "sounds/401_BIT_25.ogg"},{ bytes : 10166, md5 : "92e4e2e1949e5cc9ef5baa58b3d663ad", name : "sounds/401_correct_placement02.mp3"},{ bytes : 9585, md5 : "0d07a334d116da04e45828203c12ef7a", name : "sounds/401_correct_placement02.ogg"},{ bytes : 241507, md5 : "8ed5188c0c82714ac834b393c2bd4da1", name : "sounds/401_DIZZY_48.mp3"},{ bytes : 127709, md5 : "2607056e13283131b384611305c2ec44", name : "sounds/401_DIZZY_48.ogg"},{ bytes : 40483, md5 : "d37c01c0bc5c31e56526305e0c99784e", name : "sounds/401_DIZZY_49.mp3"},{ bytes : 24832, md5 : "a0d33c7ed9fd9968d4aee32387ee7221", name : "sounds/401_DIZZY_49.ogg"},{ bytes : 87139, md5 : "5b0f10991506e641f9491a36ac88df99", name : "sounds/401_DIZZY_93.mp3"},{ bytes : 48050, md5 : "8b5d1dc5d1bfc42cead06870425a2330", name : "sounds/401_DIZZY_93.ogg"},{ bytes : 4287, md5 : "e0a504d846cfb6ae66245e36b3a34b8d", name : "sounds/401_incorrect_placement02.mp3"},{ bytes : 5514, md5 : "e2e6dfb0c43047ba0c9061067ca5dc10", name : "sounds/401_incorrect_placement02.ogg"},{ bytes : 6615, md5 : "ba0f72b07f86fef72eda4f2340dc6e49", name : "sounds/401_place_footprint.mp3"},{ bytes : 8317, md5 : "4b0bf94e9944325615e4ca6ae5a1475a", name : "sounds/401_place_footprint.ogg"},{ bytes : 12305, md5 : "1ce0d26317ba0795cc3fe013dac76b9e", name : "sounds/silence.mp3"},{ bytes : 4036, md5 : "556576df5381d08964f9a415edbfddc8", name : "sounds/silence.ogg"},{ bytes : 351920, md5 : "ee601e4cc2f8c5b94ba5cd8e7f9f64da", name : "sounds/TutorialTheme.mp3"},{ bytes : 399152, md5 : "53734f42e2782055bf3944c72b70e83d", name : "sounds/TutorialTheme.ogg"}], config : [{ bytes : 187, md5 : "7f61a047b1c9a1cef71422ad8b4896fd", name : "Config.xml"},{ bytes : 1959, md5 : "66ff326bc25544f550cdde1fe6306700", name : "Credits.xml"},{ bytes : 477, md5 : "28d20a8a1d61fe1f753870780f029c3d", name : "Localization.xml"}]}]}};
flambe.asset.Manifest._supportsCrossOrigin = (function() {
	var blacklist = new EReg("\\b(Android)\\b","");
	if(blacklist.match(js.Browser.window.navigator.userAgent)) return false;
	var xhr = new XMLHttpRequest();
	return xhr.withCredentials != null;
})();
flambe.display.Sprite._scratchPoint = new flambe.math.Point();
flambe.display.Font.NEWLINE = new flambe.display.Glyph(10);
flambe.platform.BasicMouse._sharedEvent = new flambe.input.MouseEvent();
flambe.platform.BasicPointer._sharedEvent = new flambe.input.PointerEvent();
flambe.platform.html.CanvasRenderer.CANVAS_TEXTURES = (function() {
	var pattern = new EReg("(iPhone|iPod|iPad)","");
	return pattern.match(js.Browser.window.navigator.userAgent);
})();
flambe.platform.html.HtmlAssetPackLoader._mediaRefCount = 0;
flambe.platform.html.HtmlAssetPackLoader._detectBlobSupport = true;
flambe.platform.html.HtmlUtil.VENDOR_PREFIXES = ["webkit","moz","ms","o","khtml"];
flambe.platform.html.HtmlUtil.SHOULD_HIDE_MOBILE_BROWSER = js.Browser.window.top == js.Browser.window && new EReg("Mobile(/.*)? Safari","").match(js.Browser.navigator.userAgent);
flambe.platform.html.WebAudioSound._detectSupport = true;
flambe.platform.html.WebGLGraphics._scratchMatrix = new flambe.math.Matrix();
globals.NDiGameConstants.ASSET_PACKAGE_CONFIG = "config";
globals.NDiGameConstants.ASSET_PACKAGE_LOADING = "assets_loading";
globals.NDiGameConstants.ASSET_PACKAGE_GENERAL = "assets_general";
globals.NDiGameConstants.CONFIG_ASSET_CONFIG_XML = "Config.xml";
globals.NDiGameConstants.CONFIG_ASSET_LOCALIZATION_XML = "Localization.xml";
globals.NDiGameConstants.ARRAY_VARS_TO_SAVE = Type.allEnums(globals.NDiVarsToSave);
globals.NDiGameConstants.ARRAY_VARS_INIT_VALUES = [true,true];
globals.NDiGameConstants.BACKGROUND_LOADING = "loading_bg";
globals.NDiGameConstants.BAR_LOADING = "loading_bar";
globals.NDiGameConstants.ICON_BAR_LOADING = "loading_icon";
globals.NDiGameConstants.GAME_WIDTH = 960;
globals.NDiGameConstants.GAME_HEIGHT = 560;
globals.NDiGameConstants.SCENES_FLOW = [globals.NDiTypeScene.NDI_TYPE_SCENE_PLAY,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG1,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG2,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG3,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG4,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG5,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG6,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG7,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_MIG8,globals.NDiTypeScene.NDI_TYPE_SCENE_VIDEO,globals.NDiTypeScene.NDI_TYPE_SCENE_END_STORY];
globals.NDiGameConstants.VIDEO_SCENES_URL = ["video/mig01.mp4","video/mig02.mp4","video/mig03.mp4","video/mig04.mp4","video/mig05.mp4","video/mig06.mp4","video/mig07.mp4","video/mig08.mp4","video/mig09.mp4"];
globals.NDiGameConstants.VIDEO_MIG8_GAPS = "video/mig10.mp4";
globals.NDiGameConstants.ARRAY_SOUNDS = (function($this) {
	var $r;
	var _g = new haxe.ds.StringMap();
	_g.set("MIG1-Intro","sounds/401_BEAN_04");
	_g.set("MIG2-Intro","sounds/401_BIT_09");
	_g.set("MIG3-Intro","sounds/401_BEAN_17");
	_g.set("MIG4-Intro","sounds/401_BIT_25");
	_g.set("MIG5-Intro","sounds/401_BEAN_40");
	_g.set("MIG6-Intro","sounds/401_DIZZY_48");
	_g.set("MIG7-Intro","sounds/401_BEAN_56");
	_g.set("MIG8-Intro","sounds/401_BEAN_72");
	_g.set("MIG8-UMI-Appear","sounds/401_BEAN_MIG07_line01");
	_g.set("MIG8-Finish-Measure","sounds/401_BEAN_92");
	_g.set("MIG8-Finish-Gap","sounds/401_DIZZY_93");
	_g.set("MIG8-Way-Continue","sounds/401_ALL_128");
	_g.set("ANY_MIG-PositiveReaction","sounds/401_correct_placement02");
	_g.set("ANY_MIG-NegativeReaction","sounds/401_incorrect_placement02");
	_g.set("ANY_MIG-GoodJob","sounds/401_BEAN_160");
	_g.set("THEME_1","sounds/TutorialTheme");
	$r = _g;
	return $r;
}(this));
globals.NDiGameConstants.ARRAY_FOOTPRINT_POSITIONS_MIG2 = [new math.NDiVector2D(288.36276434361935,15),new math.NDiVector2D(258.75698492862284,-39.208029164001346),new math.NDiVector2D(420.8521481771022,-73.86841956758872),new math.NDiVector2D(222.83293985761702,-123.73417027993128),new math.NDiVector2D(330.48288679495454,-140.18417065870017),new math.NDiVector2D(383.94224318675697,-192.42996530374512),new math.NDiVector2D(295.5805439129472,-206.74984232755378),new math.NDiVector2D(170.2388345319778,-210.59795891679823),new math.NDiVector2D(229.25701593980193,-248.2582422089763),new math.NDiVector2D(355.841113967821,-320.89749272959307)];
globals.NDiGameConstants.ARRAY_PATH_TEXTURE_ITEMS = ["images/mig4/objFinal","images/mig4/obj4","images/mig4/obj3","images/mig4/obj2","images/mig4/obj1","images/mig4/obj5"];
globals.NDiGameConstants.ARRAY_ASSETS_ROBOT = ["r1","r2","r3","r4","r5","r6","r7","r8","r9","r10","r11","r12","r13","r14","r15"];
globals.NDiGameConstants.ARRAY_CONFIG_POSITION_GAPS = [new math.NDiVector2D(410,549),new math.NDiVector2D(549,549)];
globals.NDiGameConstants.ARRAY_CONFIG_UNITS_GAPS = [4,9,4,5];
globals.NDiGameConstants.ARRAY_ANSWERS = [[1,3,5,6],[1,3,10,12],[1,2,3,5],[1,2,3,6]];
globals.NDiGameConstants.ARRAY_LEVELS_CONFIG = [(function($this) {
	var $r;
	var _g = new haxe.ds.StringMap();
	_g.set("TOTAL_GAPS",6);
	_g.set("ARRAY_CONFIG_POSITION_GAPS",[new math.NDiVector2D(137,549),new math.NDiVector2D(274,549),new math.NDiVector2D(411,549),new math.NDiVector2D(548,549),new math.NDiVector2D(685,549),new math.NDiVector2D(822,549)]);
	_g.set("ARRAY_CONFIG_UNITS_GAPS",[2,4,5,7,8,10]);
	_g.set("ARRAY_ANSWERS",[[1,3,5,6],[1,2,3,5],[4,2,3,8],[4,1,3,10],[4,2,3,9],[5,2,3,12]]);
	$r = _g;
	return $r;
}(this))];
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
Main.main();
})();
