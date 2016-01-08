package managers.mig2;

import flambe.animation.Ease;
import flambe.Component;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import flambe.System;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import gui.components.mig2.NDiBitCharacterMig2;
import gui.components.mig2.NDiFootprintBitMig2;
import gui.components.NDiButtonFillText;
import gui.components.NDiHighlightSignal;
import gui.components.NDiImage;
import gui.scenes.NDiMig2Scene;
import managers.NDiResourcesManager;
import math.NDiVector2D;
import managers.NDiAudioManager;

/**
 * ...
 * @author Edwin
 */
class NDiCharacterManagerMig2 extends Component
{
	private var bean:NDiImage;
	private var dizzy:NDiImage;
	private var bit:NDiBitCharacterMig2;
	private var lineHeightSignal:NDiImage;
	
	
	/*Drag and Drop*/	
	private var isClicking:Bool;
	
	public function new() 
	{
		
		this.bean = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/bean"));
		this.bean.transform.x._ = 340.5;
		this.bean.transform.y._ = 256;
		this.bean.transform.visible = false;
		
		this.dizzy = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/dizzy"));
		this.dizzy.transform.x._ = 211.5;
		this.dizzy.transform.y._ = 313.5;
		this.dizzy.transform.visible = false;
		
		this.bit = new NDiBitCharacterMig2();
		this.bit.transform.x._ = 700;
		this.bit.transform.y._ = 366;
		this.bit.originalPosition.x = this.bit.transform.x._;
		this.bit.originalPosition.y = this.bit.transform.y._;
		
		
		
		this.bit.footBitArea.pointerDown.connect(this.handlerPointerDown);
		System.pointer.move.connect(this.handlerPointerMove);
		System.pointer.up.connect(this.handlerPointerUp);
		
		//this.footBitArea.text.x._ = 765 - 290;
		//this.footBitArea.text.y._ = 490 - 50;
		
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_large2"));
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = this.bean.transform.x._ + 17;
		this.lineHeightSignal.transform.y._ = this.bean.transform.y._;
		this.lineHeightSignal.transform.y._ -= this.bean.image.getNaturalHeight() * 0.5;
		this.lineHeightSignal.transform.y._ -= 10;
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function moveCurrentItem(newPosition:NDiVector2D)
	{
		if (this.bit != null)
		{
			var deltaX:Float = newPosition.x * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			deltaX += this.bit.footBitArea.getOriginalDelta().x;			
			this.bit.transform.x._ = deltaX;			
			
			var deltaY:Float = newPosition.y * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			deltaY += this.bit.footBitArea.getOriginalDelta().y;
			this.bit.transform.y._ = deltaY;
		}
		this.owner.parent.parent.get(NDiMig2Scene).getFootsprintManager().resetTimerHint();
	}
	
	private function endingAction(isGood:Bool)
	{
		if (isGood)
		{
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));
			this.owner.parent.parent.get(NDiMig2Scene).getFootsprintManager().addFootPrint();
		}else {
			var distanceBit:Float = NDiVector2D.getDistance(new NDiVector2D(this.bit.transform.x._, this.bit.transform.y._),
			this.bit.originalPosition);
			trace(distanceBit);
			if (distanceBit > 10)
			{
				NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
				var badPosition:NDiVector2D = new NDiVector2D(this.bit.transform.x._, this.bit.transform.y._);
				badPosition.x += this.bit.highlightSignal.transform.x._;
				badPosition.y += this.bit.highlightSignal.transform.y._;
				this.owner.parent.parent.get(NDiMig2Scene).getFootsprintManager().createBadFootprint(badPosition);
			}
		}
		this.bit.transform.x.animateTo(this.bit.originalPosition.x, 0.3, Ease.sineOut);
		this.bit.transform.y.animateTo(this.bit.originalPosition.y, 0.3, Ease.sineOut);
	}
	
	private function validateItem()
	{
		//trace(this.currentItemSelected);
		var currentObjectPosition:NDiVector2D = new NDiVector2D(0, 0);
		currentObjectPosition.x = this.bit.transform.x._ + this.bit.footBitArea.x._;		
		currentObjectPosition.y = this.bit.transform.y._ + this.bit.footBitArea.y._;
		//trace("currentObjectPosition X "+currentObjectPosition.x);
		//trace("currentObjectPosition Y "+currentObjectPosition.y);
		
		var latestObject:NDiFootprintBitMig2 = this.owner.parent.parent.get(NDiMig2Scene).getFootsprintManager().getLatestFootprint();
		var hitPosition:NDiVector2D = new NDiVector2D(0, 0);
		hitPosition.x = latestObject.transform.x._;
		hitPosition.y = latestObject.transform.y._ - (latestObject.footprint.image.getNaturalHeight());
		
		//trace("hitPosition X "+hitPosition.x);
		//trace("hitPosition Y "+hitPosition.y);
		
		var dist:Float = NDiVector2D.getDistance(currentObjectPosition, hitPosition);
		//trace(dist);
		//trace("===============");
		if (dist < 14)
		{
			this.endingAction(true);
		}
		else 
		{
			this.endingAction(false);
			//this.bit.highlightSignal.showWrongTexture();
		}
		this.owner.parent.parent.get(NDiMig2Scene).getFootsprintManager().resetTimerHint();
	}
	
	private function handlerPointerUp_(e:PointerEvent):Void
	{		
		//this.owner.parent.parent.get(NDiMig2Scene).getFootsprintManager().addFootPrint();
	}
	
	
	/*
	 * POINTER EVENTS
	 * */
	private function handlerPointerUp(e:PointerEvent):Void
	{
		if (!this.isClicking)
			return;
		
		this.bit.highlightSignal.toggleHide();
		this.validateItem();
		
		this.isClicking = false;		
	}
	
	private function handlerPointerDown(e:PointerEvent):Void
	{
		this.isClicking = false;		
		
		var tmpButton:NDiButtonFillText = cast(e.hit, NDiButtonFillText);
		var factor:Float = (1 / NDiGameGlobals.getInstance().currentScaleGame);
		var delta:NDiVector2D = NDiVector2D.getComponentDistance(new NDiVector2D(e.viewX * factor, e.viewY * factor), new NDiVector2D(this.bit.transform.x._, this.bit.transform.y._));
		tmpButton.setOriginalDelta(delta.x, delta.y);
		this.bit.highlightSignal.toggleHide();
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));
		
		this.isClicking = true;
	}
	
	private function handlerPointerMove(e:PointerEvent):Void
	{
		if (!this.isClicking)
			return;
			
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));		
	}
	
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.addChild(new Entity().add(this.bean));
		this.owner.addChild(new Entity().add(this.dizzy));
		
		this.owner.addChild(new Entity().add(this.bit));
		
		
		
		this.addHeightLineSignal();
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
}