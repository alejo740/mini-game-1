package managers.mig3;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.input.PointerEvent;
import flambe.script.Script;
import flambe.System;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import gui.components.mig3.NDiFootprintBitMig3;
import gui.components.NDiButton;
import gui.components.NDiHighlightSignal;
import gui.components.NDiImage;
import gui.scenes.NDiMig3Scene;
import managers.NDiResourcesManager;
import math.NDiVector2D;
import util.NDiRandomUtils;
import managers.NDiAudioManager;

/**
 * ...
 * @author Edwin
 */
class NDiFootprintManagerMig3 extends Component
{
	private var arrayFootprints:Array <NDiFootprintBitMig3>;
	private var arrayBitFootprints:Array <NDiButton>;
	private var arrayHotspot:Array <NDiHighlightSignal>;
	private var currentItemSelected:NDiFootprintBitMig3;
	private var isClicking:Bool;
	
	private var totalFootprints:Int;
	private var totalBitFootprints:Int;
	private var lineHeightSignal:NDiImage;
	private var footprintScale:Float;
	
	private var elapsedTimeHint:Float;
	private var totalTimeHint:Float;
	private var showingHint:Bool;
	
	public var transform:Sprite;
	
	
	public function new() 
	{
		this.transform = new Sprite();
		this.totalFootprints = 5;
		this.footprintScale = 1;
		this.totalBitFootprints = 6;
		this.arrayFootprints = new Array <NDiFootprintBitMig3>();
		this.arrayBitFootprints = new Array <NDiButton>();
		this.arrayHotspot = new Array<NDiHighlightSignal>();
		this.initArrayFootPrints();
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_short"));
		this.currentItemSelected = null;
		this.isClicking = false;
		
		this.elapsedTimeHint = 0;
		this.totalTimeHint = 7;
		this.showingHint = false;
	}
	
	private function initArrayFootPrints()
	{
		
		//this.arrayFootprints[0] = this.createFootPrint();
		//this.arrayFootprints[0].y._ -= this.arrayFootprints[0].getNaturalHeight() * 0;
		//this.arrayFootprints[0].y._ += 35;
		//this.arrayFootprints[0].x._ += 55;
		
		for (index in 0...this.totalFootprints)
		{
			this.arrayHotspot[index] = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig3/footprintHotspot"), null, null);
			this.arrayHotspot[index].transform.y._ -= this.arrayHotspot[index].image.getNaturalHeight() * index;			
			this.arrayHotspot[index].transform.y._ += 35;
			this.arrayHotspot[index].transform.x._ = 35;
			this.arrayHotspot[index].transform.visible = false;
			//this.arrayHotspot[index].transform.x._ += 35;
			//this.arrayHotspot[index].transform.y._ = this.arrayBitFootprints[index].y._;
			this.arrayHotspot[index].bottomCenterAnchor();
		}
		
		for (index in 0...this.totalBitFootprints)
		{
			this.arrayBitFootprints[index] = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig3/footprint"));
			this.arrayBitFootprints[index].y._ -= this.arrayBitFootprints[index].getNaturalHeight() * this.footprintScale * index;			
			this.arrayBitFootprints[index].y._ += 35;
			this.arrayBitFootprints[index].x._ -= 40;
			this.arrayBitFootprints[index].setScale(footprintScale);
			this.arrayBitFootprints[index].bottomCenterAnchor();			
		}
	}
	
	private function createFootPrint():NDiFootprintBitMig3
	{
		var tmp:NDiFootprintBitMig3 = new NDiFootprintBitMig3();		
		return tmp;
	}
	
	public function addFootPrint(tmpButton:NDiFootprintBitMig3)
	{
		if (this.arrayFootprints.length >= this.totalFootprints)
			return;
		
		var posX:Float = 35;
		var posY:Float = 37.5;
		if (this.arrayFootprints.length > 0)
		{
			posX = this.arrayFootprints[this.arrayFootprints.length - 1].transform.x._;
			posY = this.arrayFootprints[this.arrayFootprints.length - 1].transform.y._ - this.arrayFootprints[this.arrayFootprints.length - 1].footprint.getNaturalHeight();
		}
		
		tmpButton.transform.x.animateTo(posX, 
		0.2, Ease.sineOut);		
		
		tmpButton.transform.y.animateTo(posY,
		0.2, Ease.sineOut);
		
		
		this.arrayHotspot[this.arrayFootprints.length].transform.visible = false;
		this.resetTimerHint();
		
		this.arrayFootprints.push(tmpButton);
		tmpButton.transform.disablePointer();
		
		this.lineHeightSignal.transform.y._ -= this.arrayFootprints[this.arrayFootprints.length - 1].footprint.getNaturalHeight();		
		if (this.arrayFootprints.length == this.totalFootprints)
		{
			this.lineHeightSignal.transform.visible = false;
			this.owner.parent.parent.get(NDiMig3Scene).gameOver();
		}
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = 35;
		this.lineHeightSignal.transform.y._ = 35;
		this.lineHeightSignal.transform.disablePointer();
		//this.lineHeightSignal.transform.y._ -= this.arrayFootprints[0].getNaturalHeight() * 1;
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function addArrayFootPrints()
	{
		for (index in 0...this.arrayBitFootprints.length)
		{
			this.owner.addChild(new Entity().add(this.arrayBitFootprints[index]));			
		}
		
		this.addHeightLineSignal();
		
		for (index in 0...this.totalFootprints)
		{
			this.owner.addChild(new Entity().add(this.arrayHotspot[index]));
		}
		
		for (index in 0...this.arrayFootprints.length)
		{
			this.owner.addChild(new Entity().add(this.arrayFootprints[index]));
		}
		
		///RANDOM FOOTPRINTS
		var selectedRandom:Int = NDiRandomUtils.getRandomInt(1, 10);
		
		for (index in 0...10)
		{
			var tmp:NDiFootprintBitMig3 = this.createFootPrint();
			
			tmp.transform.x._ = NDiGameConstants.ARRAY_FOOTPRINT_POSITIONS_MIG2[index].x;
			tmp.transform.y._ = NDiGameConstants.ARRAY_FOOTPRINT_POSITIONS_MIG2[index].y;
			tmp.transform.pointerDown.connect(this.handlerPointerDown);
			this.owner.addChild(new Entity().add(tmp));
			
			if (index == 0)
			{
				this.addFootPrint(tmp);
			}
			
			if (index == selectedRandom)
			{
				tmp.show();				
				tmp.hotspot.showNormalTexture();
				tmp.centerHotspot();
			}
		}
		System.pointer.move.connect(this.handlerPointerMove);
		System.pointer.up.connect(this.handlerPointerUp);
	}
	
	private function validateItem()
	{
		//trace(this.currentItemSelected);
		var currentObjectPosition:NDiVector2D = new NDiVector2D(0, 0);
		currentObjectPosition.x = this.currentItemSelected.transform.x._;		
		currentObjectPosition.y = this.currentItemSelected.transform.y._;
		
		//trace("currentObjectPosition X "+currentObjectPosition.x);
		//trace("currentObjectPosition Y "+currentObjectPosition.y);
		
		var latestObject:NDiFootprintBitMig3 = this.arrayFootprints[this.arrayFootprints.length-1];		
		var hitPosition:NDiVector2D = new NDiVector2D(0, 0);
		if (latestObject == null)
		{
			hitPosition.x = 35;
			hitPosition.y = 37.5;
		}else {
			hitPosition.x = latestObject.transform.x._;
			hitPosition.y = latestObject.transform.y._ - (latestObject.footprint.getNaturalHeight());
		}
		
		//trace("hitPosition X "+hitPosition.x);
		//trace("hitPosition Y "+hitPosition.y);
		
		var dist:Float = NDiVector2D.getDistance(currentObjectPosition, hitPosition);
		//trace(dist);
		//trace("===============");
		if (dist < 20)
		{
			this.currentItemSelected.hotspot.toggleHide();
			NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-PositiveReaction"));

			this.addFootPrint(this.currentItemSelected);
			this.currentItemSelected.hotspot.showNormal = false;
			this.currentItemSelected.show();
			this.currentItemSelected.hotspot.showCorrectTexture();
			this.currentItemSelected.centerHotspot();
		}
		else 
		{
			var distanceBit:Float = this.currentItemSelected.footprint.getMoveDistance();
			if (distanceBit > 10)
			{
				NDiAudioManager.getInstance().playSoundEffect(NDiGameConstants.ARRAY_SOUNDS.get("ANY_MIG-NegativeReaction"));
				this.currentItemSelected.hotspot.showNormal = false;
				this.currentItemSelected.show();
				this.currentItemSelected.hotspot.showWrongTexture();
				this.currentItemSelected.centerHotspot();				
			}else {
				//this.currentItemSelected.hotspot.toggleHide();
			}
		}
		this.resetTimerHint();
	}
	
	private function moveCurrentItem(newPosition:NDiVector2D)
	{
		if (this.currentItemSelected != null)
		{
			this.currentItemSelected.footprint.updateMoveDistance(new NDiVector2D(this.currentItemSelected.transform.x._, this.currentItemSelected.transform.y._));
			
			this.currentItemSelected.transform.x._ = newPosition.x * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			this.currentItemSelected.transform.x._ += this.currentItemSelected.footprint.getOriginalDelta().x;
			
			this.currentItemSelected.transform.y._ = newPosition.y * (1 / NDiGameGlobals.getInstance().currentScaleGame);
			this.currentItemSelected.transform.y._ += this.currentItemSelected.footprint.getOriginalDelta().y;			
			
		}
		this.resetTimerHint();
	}
	
	private function handlerPointerUp(e:PointerEvent):Void
	{
		//var tmpButton:NDiButton = cast(e.hit, NDiButton);
		//this.addFootPrint(tmpButton);
		
		if (!this.isClicking)
			return;
		
		this.validateItem();
		this.currentItemSelected = null;
		this.isClicking = false;		
	}
	
	private function handlerPointerDown(e:PointerEvent):Void
	{
		this.isClicking = false;
		this.currentItemSelected = null;		
		
		var tmpButton:NDiButton = cast(e.hit, NDiButton);
		//tmpButton.setOnTop();
		var tmpFoot:NDiFootprintBitMig3 = tmpButton.owner.parent.get(NDiFootprintBitMig3);
		
		var factor:Float = (1 / NDiGameGlobals.getInstance().currentScaleGame);
		var delta:NDiVector2D = NDiVector2D.getComponentDistance(new NDiVector2D(e.viewX * factor, e.viewY * factor), 
		new NDiVector2D(tmpFoot.transform.x._, tmpFoot.transform.y._));
		
		tmpButton.setOriginalDelta(delta.x, delta.y);
		tmpButton.setOriginalPosition(tmpFoot.transform.x._, tmpFoot.transform.y._);
		this.currentItemSelected = tmpButton.owner.parent.get(NDiFootprintBitMig3);
		//this.currentItemSelected.hotspot.toggleHide();
		this.moveCurrentItem(new NDiVector2D(e.viewX, e.viewY));
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
			var latestIndex:Int = this.arrayFootprints.length;
			this.arrayHotspot[latestIndex].transform.visible = true;
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
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
		this.timerToHint(dt);
	}
	
}