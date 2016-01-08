package gui.scenes;

import flambe.display.Sprite;
import flambe.math.Rectangle;
import flambe.System;
import managers.NDiAudioManager;
import managers.NDiScenesController;
#if air
import flash.desktop.SystemIdleMode;
import flash.ui.Keyboard;
import flash.events.KeyboardEvent;
import flash.desktop.NativeApplication;
import flash.events.Event;
import flash.system.Capabilities;
#end
import globals.NDiGameConstants;
import flambe.scene.Scene;
import globals.NDiGameGlobals;
import managers.NDiSceneManager;

class NDiAbstractScene extends Scene
{
	public var type:NDiTypeScene;
	
	private var lastWidth:Float;
	private var lastHeight:Float;
	private var lastPosX:Float;
	private var lastPosY:Float;
	private var thereAudio:Bool;
	
	public var transform:Sprite;
	
	public function new(opaque:Bool = true)
    {
    	super(opaque);
		this.lastWidth = 0;
		this.lastHeight = 0;
		this.lastPosX = 0;
		this.lastPosY = 0;
		this.transform = new Sprite();	
		this.thereAudio = false;
		
		trace("LOADING SCENE...: " + NDiGameConstants.SCENES_FLOW[NDiScenesController.getInstance().currentScene]);
		NDiScenesController.getInstance().initPauseScene();
    }
    
	override public function onAdded():Void
    {
		super.onAdded();
		
		if (this.type != NDI_TYPE_SCENE_GAME)
		{
			if (this.type == NDI_TYPE_SCENE_VIDEO)
			{
				NDiAudioManager.getInstance().pauseSoundBackground();
			}else {
				NDiAudioManager.getInstance().setEnabledSoundBackground();
			}
		}
			
		this.owner.add(this.transform);
		this.updateDisplaySize();
		
		//System.hidden.watch(this.manageHiddenSystem);
		#if air
		NativeApplication.nativeApplication.systemIdleMode = SystemIdleMode.KEEP_AWAKE;
		NativeApplication.nativeApplication.addEventListener(Event.DEACTIVATE, this.onEnterBackground, false, 0, true);
		NativeApplication.nativeApplication.addEventListener(Event.EXITING, this.onEnterBackground, false, 0, true);
		NativeApplication.nativeApplication.addEventListener(Event.ACTIVATE, this.onEnterForeground, false, 0, true);
		NativeApplication.nativeApplication.addEventListener(KeyboardEvent.KEY_DOWN, this.handlerOnKeyDown);		
		#end
	}
	
    override public function onUpdate(dt:Float):Void
	{
		this.updateDisplaySize();
	}
	
	private function updateDisplaySize() 
	{		
		var tScale:Float = Std.parseFloat(System.external.call("getCanvasScale"));
		this.transform.setScale(tScale);
		NDiGameGlobals.getInstance().currentScaleGame = tScale;
		/**
		 * MOBILE VERSION SCALE
		 */		
		 /*
		var tWidth:Float = System.stage.width;
		var tHeight:Float = System.stage.height;
		
		if (lastWidth != System.stage.width || lastHeight != System.stage.height)
		{
			
			var tScale:Float = 1;
			
			if ( tWidth / NDiGameConstants.GAME_WIDTH < tHeight / NDiGameConstants.GAME_HEIGHT ) 
				tScale = tWidth / NDiGameConstants.GAME_WIDTH;
			else 
				tScale = tHeight / NDiGameConstants.GAME_HEIGHT;
				
			this.lastWidth = System.stage.width;
			this.lastHeight = System.stage.height;			
			NDiGameGlobals.getInstance().currentScaleGame = tScale;
		}
			this.transform.setScale(NDiGameGlobals.getInstance().currentScaleGame);
			
			var incX:Float = Math.abs(System.stage.width - (NDiGameConstants.GAME_WIDTH * NDiGameGlobals.getInstance().currentScaleGame)) / 2;
			if (this.transform.x._+incX != lastPosX)
			{
				lastPosX = this.transform.x._ +incX;
				this.transform.x._ = incX;
			}
			
			var incY:Float = Math.abs(System.stage.height - (NDiGameConstants.GAME_HEIGHT * NDiGameGlobals.getInstance().currentScaleGame)) / 2;
			if (this.transform.y._+incY != lastPosY)
			{
				lastPosY = NDiSceneManager.getInstance().transform.y._ +incY;
				this.transform.y._ = incY;
			}
			
			//MASK
			//NDiSceneManager.getInstance().transform.scissor.set(0, 0, (NDiGameConstants.GAME_WIDTH), (NDiGameConstants.GAME_HEIGHT));
			
			//trace("RESIZEEEE ------ > "+NDiGameGlobals.getInstance().currentScaleGame);
		*/
	}
	
	public function handlerOnKeyDown(e:Dynamic)
	{
		#if air
		var event:KeyboardEvent = cast e;
		if (event.keyCode == Keyboard.HOME)
		{
			event.preventDefault();
		}else if (event.keyCode == Keyboard.BACK)
		{
			event.preventDefault();
			NativeApplication.nativeApplication.exit();
		}
		#end
	}
	
	public function onEnterBackground(e:Dynamic)
	{
		trace("onEnterBackground - ");
		System.volume._ = 0;
		if (!NDiAudioManager.getInstance().enabledSoundBackground)
		{
			NDiAudioManager.getInstance().setMuteAll(true);
			this.thereAudio = true;
		}else {
			this.thereAudio = false;
		}
	}
	
	public function onEnterForeground(e:Dynamic)
	{
		trace("onEnterForeground - ");		
		System.volume._ = 1;
		if (this.thereAudio)
		{
			NDiAudioManager.getInstance().setMuteAll(false);			
		}
	}
	
	override public function dispose():Void
	{
		super.dispose();
	}
}
