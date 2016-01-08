/**
 * ...
 * @author Edwin Cobos
 */

(function() {
	
})();
	
	var targetId;
	var targetIdVideo;
	var targetIdContainer;
	
	var base = "/UMIGO/appisode1/2014-03-04/web/";
	
	var widthIdeal 	= 960;
    var heightIdeal = 560;
    var scaleMax = 3;
    var widthMax = 960;
    var heightMax = 560;
    
	var _canvasWidth;
	var _canvasHeight;
	var _canvasScale;
	//var _canvasScaleX; // Actual runtime scale of the canvas on the X axis. Only relevant in scaling modes that fill rather than fit.
	//var _canvasScaleY; // Actual runtime scale of the canvas on the Y axis. Only relevant in scaling modes that fill rather than fit.
	var _contentOffsetX = 0;
	var _contentOffsetY = 0;
	var _scaledWidth = 0;
	var _scaledHeight = 0;
	// IE Console fix, for the inevitable situation when a .log is accidentally left in the code.
	if (!window.console) window.console = {};
	if (!window.console.log) window.console.log = function () { };
	
	
	// DOM Elements
    var win = window;
    var doc = document;
    var nav = navigator;
	
	
	
	function scaleCalculate()
	{
		 var tWidth = getBrowserWidth();
         var tHeight = getBrowserHeight();
         //if(console.log){console.log("Width: " + tWidth + " Height: " + tHeight);}
         var tScale = 1;         
		 if ( tWidth/widthIdeal < tHeight/heightIdeal ) tScale = tWidth/widthIdeal;
		 else tScale = tHeight/heightIdeal;
         
         scaleSet(tScale);
	}
	
	function onEventResize (event)
	{
		scaleCalculate();
	}
	
	function embedScalingScript() 
	{
		addEvent(window,'resize',onEventResize);
		scaleCalculate();
		setTimeout(scaleCalculate, 500); // Ugly hack to work around mobile safari's documentSize delay. [Keith] No longer needed?
	}
	
	
	function getCanvasScale()
	{
		//console.log("scale....get");
		return _canvasScale;
	}
	
	
	/*
	Get the client width.
	 */
    function getBrowserWidth()
    {
    	if (window.innerWidth) { return window.innerWidth; }
        if (document.documentElement && document.documentElement.clientWidth != 0) { return document.documentElement.clientWidth; }
        if (document.body) { return document.body.clientWidth; }
        return 0;
    };
    /*
	Get the client height.
	 */
    function getBrowserHeight()
    {    	
        if (window.innerHeight) {  return window.innerHeight; }
        if (document.documentElement && document.documentElement.clientHeight != 0) { return document.documentElement.clientHeight; }
        if (document.body) { return document.body.clientHeight; }
        return 0;
    };
	
	/* Helper method to add an event listener to an element. */
	function addEvent (elem, type, eventHandle) {
		if (elem == null || elem == undefined) return;
		if ( elem.addEventListener ) {
			elem.addEventListener( type, eventHandle, false );
		} else if ( elem.attachEvent ) {
			elem.attachEvent( "on" + type, eventHandle );
		} else {
			elem["on"+type]=eventHandle;
		}
	}
	
	
	/* 
    Set the scale of the document canvas. Used for dynamic stage resizing.
	 */
	function scaleSet (pScale)
	{
	    if ( pScale > scaleMax ){ pScale = scaleMax; }
	   
		var tFinalW = Math.round(widthIdeal*pScale*1000)/1000;
		var tFinalH = Math.round(heightIdeal*pScale*1000)/1000;
					
		var d = doc.getElementById(targetId);		
		d.style.width = tFinalW + "px";
		d.style.height = tFinalH + "px"; 
		d.style.left = ((getBrowserWidth()/2) - (tFinalW/2)) + "px";
		
		var dVid = doc.getElementById(targetIdVideo);
		dVid.style.width = tFinalW + "px";
		dVid.style.height = tFinalH + "px"; 
		dVid.style.left = ((getBrowserWidth()/2) - (tFinalW/2)) + "px";
		
		dVid = doc.getElementById(targetIdContainer);
		dVid.style.width = tFinalW + "px";
		dVid.style.height = tFinalH + "px"; 
		dVid.style.left = ((getBrowserWidth()/2) - (tFinalW/2)) + "px";
			
	    //if(console.log){console.log("CanvasScale: " + pScale);}
	    win.canvasScale = pScale; // [TODO] Legacy. Should probably remove.
	    doc.canvasScale = pScale; // [TODO] Legacy. Should probably remove.
	    _canvasScale	= pScale;	    
	    _canvasWidth 	= getBrowserWidth();
	    _canvasHeight 	= getBrowserHeight();
	    _scaledWidth  	= tFinalW;
	    _scaledHeight  	= tFinalH;
	    
	}
	
//})();