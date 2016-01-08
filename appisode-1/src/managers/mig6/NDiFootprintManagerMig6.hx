package managers.mig6;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.System;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import gui.components.NDiButtonFill;
import gui.components.NDiImage;
import gui.components.NDiRulerUnit;
import gui.scenes.NDiMig6Scene;
import managers.NDiResourcesManager;
import math.NDiVector2D;
import managers.NDiAudioManager;

/**
 * ...
 * @author Edwin
 */
class NDiFootprintManagerMig6 extends Component
{
	private var arrayFootprints:Array <NDiRulerUnit>;
	private var totalFootprints:Int;
	private var lineHeightSignal:NDiImage;
	
	private var currentItemSelected:NDiRulerUnit;
	private var isClicking:Bool;
	
	private var elapsedTimeHint:Float;
	private var totalTimeHint:Float;
	private var showingHint:Bool;
	
	public var transform:Sprite;
	public var currentFootprint:Int;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.totalFootprints = 4;
		this.arrayFootprints = new Array <NDiRulerUnit>();
		this.initArrayFootPrints();
		this.currentFootprint = 0;
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_short"));
		this.currentItemSelected = null;
		this.isClicking = false;
		this.elapsedTimeHint = 7;
		this.totalTimeHint = 7;
		this.showingHint = false;
	}
	
	
	private function initArrayFootPrints()
	{
		for (index in 0...this.totalFootprints)
		{
			this.arrayFootprints[index] = new NDiRulerUnit(true);
			this.arrayFootprints[index].transform.y._ -= this.arrayFootprints[index].footprint.image.getNaturalHeight() * index;
			//this.arrayFootprints[index].transform.y._ -= 2;
			this.arrayFootprints[index].transform.y._ += 383;// 390;
			this.arrayFootprints[index].transform.x._ = 630;			
			//this.arrayFootprints[index].transform.visible = false;
			this.arrayFootprints[index].footprint.transform.visible = false;
			this.arrayFootprints[index].hotspot.transform.visible = false;
			if (index == this.currentFootprint)
			{
				//this.arrayFootprints[index].transform.visible = true;
			}else {
				
			}
		}
	}
	
	
	public function addFootPrint()
	{
		
		if (this.currentFootprint + 1 > this.totalFootprints)
			return;
		
		this.lineHeightSignal.transform.y._ -= this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight();
		if (this.currentFootprint == this.totalFootprints - 1)
		{
			this.lineHeightSignal.transform.visible = false;
			this.owner.parent.parent.get(NDiMig6Scene).gameOver();
		}
		this.arrayFootprints[this.currentFootprint].transform.y.animate(this.currentItemSelected.transform.y._,
		this.arrayFootprints[this.currentFootprint].transform.y._, 0.4, Ease.sineOut);
		
		this.arrayFootprints[this.currentFootprint].transform.x.animate(this.currentItemSelected.transform.x._,
		this.arrayFootprints[this.currentFootprint].transform.x._, 0.4, Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.alpha.animate(0, 1, 0.4, Ease.sineOut);
		
		//this.arrayFootprints[this.currentFootprint].transform.visible = true;
		this.arrayFootprints[this.currentFootprint].show();
		this.arrayFootprints[this.currentFootprint].hotspot.showCorrectTexture();
		
		this.currentFootprint++;
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = this.arrayFootprints[this.currentFootprint].transform.x._;
		this.lineHeightSignal.transform.y._ = this.arrayFootprints[this.currentFootprint].transform.y._;
		this.lineHeightSignal.transform.y._ += this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * 0.5;
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function addArrayFootPrints()
	{
		for (index in 0...this.totalFootprints)
		{
			this.owner.addChild(new Entity().add(this.arrayFootprints[index]));
			if (index == this.currentFootprint)
			{
				//this.arrayFootprints[index].transform.visible = true;
			}
		}		
	}
	
	private function createHandlerRuler()
	{
		var tmpRuler:NDiRulerUnit = new NDiRulerUnit();
		tmpRuler.transform.x._ = 310;
		tmpRuler.transform.y._ = 199;
		tmpRuler.setOriginalPosition();
		this.owner.addChild(new Entity().add(tmpRuler));
		tmpRuler.hotspot.toggleHide();
		tmpRuler.clickArea.pointerDown.connect(this.handlerPointerDown);
		this.currentItemSelected = tmpRuler;
	}
	
	public function getLatestFootprintIndex():Int
	{
		var index:Int = this.arrayFootprints.length-1;
		while (index >= 0)
		{
			if (this.arrayFootprints[index].footprint.transform.visible)
			{
				return index;
			}
			index--;
		}
		return -1;
	}
	
	public function getLatestFootprint():NDiRulerUnit
	{
		var index:Int = this.arrayFootprints.length-1;
		while (index >= 0)
		{
			if (this.arrayFootprints[index].footprint.transform.visible)
			{
				return this.arrayFootprints[index];
			}
			index--;
		}
		return null;
	}
	
	private function validateItem()
	{
		//trace(this.currentItemSelected);
		var currentObjectPosition:NDiVector2D = new NDiVector2D(0, 0);
		currentObjectPosition.x = this.currentItemSelected.transform.x._;		
		currentObjectPosition.y = this.currentItemSelected.transform.y._;
		
		//trace("currentObjectPosition X "+currentObjectPosition.x);
		//trace("currentObjectPosition Y "+currentObjectPosition.y);
		
		//var latestObject:NDiRulerUnit = this.arrayFootprints[this.arrayFootprints.length-1];		
		var latestObject:NDiRulerUnit = this.getLatestFootprint();
		trace(latestObject);
		var hitPosition:NDiVector2D = new NDiVector2D(0, 0);
		if (latestObject == null)
		{
			hitPosition.x = this.arrayFootprints[0].transform.x._;
			hitPosition.y = this.arrayFootprints[0].transform.y._;
		}else {
			hitPosition.x = latestObject.transform.x._;
			hitPosition.y = latestObject.transform.y._ - (latestObject.footprint.image.getNaturalHeight());
		}
		
		//trace("hitPosition X "+hitPosition.x);
		//trace("hitPosition Y "+hitPosition.y);
		
		var dist:Float = NDiVector2D.getDistance(currentObjectPosition, hitPosition);
		trace(dist);
		trace("===============");
		if (dist < 20)
		{
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));

			this.addFootPrint();
			this.currentItemSelected.returnPosition();
			this.owner.parent.parent.get(NDiMig6Scene).sendFrontDepthCharacter();
			var tmpRuler:NDiRulerUnit = this.getLatestFootprint();
			tmpRuler.hotspot.showNormal = false;
			tmpRuler.show();
			tmpRuler.hotspot.showCorrectTexture();
		}else {
			
			var distanceBit:Float = this.currentItemSelected.clickArea.getMoveDistance();			
			if (distanceBit > 10)
			{
				NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));

				//this.currentItemSelected.isBlocked = true;
				this.currentItemSelected.hotspot.showWrongTexture();
				var f1:CallFunction = new CallFunction(function() {
					//this.currentItemSelected.returnPosition();
					this.currentItemSelected.isBlocked = false;
				});
				var seq1:Sequence = new Sequence([new Delay(1.0), f1]);
				this.owner.get(Script).run(seq1);
			}else {
				//this.currentItemSelected.returnPosition();
				this.currentItemSelected.isBlocked = false;
			}
		}
		this.resetTimerHint();
	}
	
	private function moveCurrentItem(newPosition:NDiVector2D)
	{
		if (this.currentItemSelected != null)
		{
			this.currentItemSelected.clickArea.updateMoveDistance(new NDiVector2D(this.currentItemSelected.transform.x._, this.currentItemSelected.transform.y._));
			
			this.currentItemSelected.transform.x._ = newPosition.x * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			this.currentItemSelected.transform.x._ += this.currentItemSelected.clickArea.getOriginalDelta().x;
			
			this.currentItemSelected.transform.y._ = newPosition.y * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			this.currentItemSelected.transform.y._ += this.currentItemSelected.clickArea.getOriginalDelta().y;			
		}
		this.resetTimerHint();
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButton = cast(e.hit, NDiButton);
		//this.addFootPrint(tmpButton);
		
		if (!this.isClicking)
			return;
		
		this.currentItemSelected.hotspot.toggleHide();
		this.validateItem();		
		//this.currentItemSelected = null;
		this.isClicking = false;		
	}
	
	private function handlerPointerDown(e:PointerEvent):Void
	{
		if (this.currentItemSelected.isBlocked)
			return;
			
		this.isClicking = false;
		//this.currentItemSelected = null;		
		
		var tmpButton:NDiButtonFill = cast(e.hit, NDiButtonFill);
		//tmpButton.setOnTop();
		var tmpFoot:NDiRulerUnit = tmpButton.owner.parent.get(NDiRulerUnit);
		
		var factor:Float = (1 / NDiGameGlobals.getInstance().currentScaleGame);
		var delta:NDiVector2D = NDiVector2D.getComponentDistance(new NDiVector2D(e.viewX * factor, e.viewY * factor), 
		new NDiVector2D(tmpFoot.transform.x._, tmpFoot.transform.y._));
		
		tmpButton.setOriginalDelta(delta.x, delta.y);
		tmpButton.setOriginalPosition(tmpFoot.transform.x._, tmpFoot.transform.y._);
		this.currentItemSelected = tmpButton.owner.parent.get(NDiRulerUnit);
		this.currentItemSelected.hotspot.toggleHide();
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));
		this.owner.parent.parent.get(NDiMig6Scene).sendBackDepthCharacter();
		this.isClicking = true;		
	}
	
	private function handlerPointerMove(e:PointerEvent):Void
	{
		if (!this.isClicking)
			return;
			
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));		
	}
	
	public function resetTimerHint()
	{
		this.elapsedTimeHint = 0;
		this.showingHint = false;
	}
	
	private function timerToHint(dt:Float)
	{
		if (this.showingHint)
			return;
			
		if (this.elapsedTimeHint >= this.totalTimeHint)
		{
			var latestIndex:Int = this.getLatestFootprintIndex();
			this.arrayFootprints[latestIndex+1].hotspot.transform.visible = true;
			this.showingHint = true;
		}
		
		this.elapsedTimeHint += dt;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		this.owner.add(new Script());
		this.owner.add(this.transform);
		this.addArrayFootPrints();
		this.addHeightLineSignal();
		this.createHandlerRuler();
		System.pointer.move.connect(this.handlerPointerMove);
		System.pointer.up.connect(this.handlerPointerUp);
	}
	
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
		this.timerToHint(dt);
	}
	
}