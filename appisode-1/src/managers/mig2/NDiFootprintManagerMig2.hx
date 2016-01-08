package managers.mig2;

import flambe.animation.Ease;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.System;
import globals.NDiGameConstants;
import gui.components.mig2.NDiFootprintBitMig2;
import gui.components.NDiImage;
import gui.scenes.NDiMig2Scene;
import managers.NDiResourcesManager;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin
 */
class NDiFootprintManagerMig2 extends Component
{
	private var arrayFootprints:Array <NDiFootprintBitMig2>;
	private var totalFootprints:Int;
	private var lineHeightSignal:NDiImage;
	private var footprintScale:Float;
	
	private var elapsedTimeHint:Float;
	private var totalTimeHint:Float;
	private var showingHint:Bool;
	
	public var transform:Sprite;
	public var currentFootprint:Int;
	
	public function new() 
	{
		this.transform = new Sprite();
		this.footprintScale = 1;// 1.05;
		this.totalFootprints = 6;
		this.elapsedTimeHint = 0;
		this.totalTimeHint = 7;
		this.showingHint = false;
		this.arrayFootprints = new Array <NDiFootprintBitMig2>();
		this.initArrayFootPrints();
		this.currentFootprint = 0;
		this.lineHeightSignal = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/line_short"));
		
	}
	
	
	private function initArrayFootPrints()
	{
		for (index in 0...this.totalFootprints)
		{
			this.arrayFootprints[index] = new NDiFootprintBitMig2();
			this.arrayFootprints[index].transform.setScale(footprintScale);
			this.arrayFootprints[index].transform.x._ += 502.5;
			this.arrayFootprints[index].transform.y._ -= this.arrayFootprints[index].footprint.image.getNaturalHeight() * this.footprintScale * index;
			this.arrayFootprints[index].transform.y._ += 385;
		}
	}
	
	public function getLatestFootprint():NDiFootprintBitMig2
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
		return this.arrayFootprints[0];
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
		return 0;
	}
	
	public function addFootPrint()
	{
		if (this.currentFootprint + 1 >= this.totalFootprints)
			return;
			
		this.currentFootprint++;
		
		this.lineHeightSignal.transform.y._ -= this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * this.footprintScale;
		if (this.currentFootprint == this.totalFootprints - 1)
		{
			this.lineHeightSignal.transform.visible = false;
			this.owner.parent.parent.get(NDiMig2Scene).gameOver();
		}
		
		//this.arrayFootprints[this.currentFootprint].transform.x.animate(this.arrayFootprints[this.currentFootprint].transform.x._ + 20,
		//this.arrayFootprints[this.currentFootprint].transform.x._, 0.4, Ease.sineOut);
		this.arrayFootprints[this.currentFootprint].transform.alpha.animate(0, 1, 0.4, Ease.sineOut);
		
		//this.arrayFootprints[this.currentFootprint].transform.visible = true;
		//this.arrayFootprints[this.currentFootprint].hotspot.transform.visible = false;
		//this.arrayFootprints[this.currentFootprint].footprint.transform.visible = true;
		this.arrayFootprints[this.currentFootprint].hotspot.showNormal = false;
		this.arrayFootprints[this.currentFootprint].show();
		this.arrayFootprints[this.currentFootprint].hotspot.showCorrectTexture();
	}
	
	public function createBadFootprint(position:NDiVector2D)
	{
		var tmpFoot:NDiFootprintBitMig2 = new NDiFootprintBitMig2();
		tmpFoot.transform.x._ = position.x-(tmpFoot.footprint.image.getNaturalWidth() * 0.5);
		tmpFoot.transform.y._ = position.y;
		tmpFoot.show();
		tmpFoot.hotspot.showWrongTexture();
		this.owner.addChild(new Entity().add(tmpFoot));
		var f1:CallFunction = new CallFunction(function() {
			tmpFoot.owner.dispose();
		} );
		var seq1:Sequence = new Sequence([new Delay(1.45), f1]);
		this.owner.get(Script).run(seq1);
	}
	
	private function addHeightLineSignal()
	{
		this.lineHeightSignal.transform.x._ = this.arrayFootprints[this.currentFootprint].transform.x._;
		this.lineHeightSignal.transform.y._ = this.arrayFootprints[this.currentFootprint].transform.y._;
		this.lineHeightSignal.transform.y._ -= this.arrayFootprints[this.currentFootprint].footprint.image.getNaturalHeight() * 0.5 * this.footprintScale;
		this.lineHeightSignal.transform.disablePointer();
		this.owner.addChild(new Entity().add(this.lineHeightSignal));
	}
	
	private function addArrayFootPrints()
	{
		for (index in 0...this.totalFootprints)
		{
			this.owner.addChild(new Entity().add(this.arrayFootprints[index]));
			if (index == this.currentFootprint)
			{
				this.arrayFootprints[index].footprint.transform.visible = true;
				this.arrayFootprints[index].hotspot.transform.visible = false;
			}
		}		
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
		this.addHeightLineSignal();
		this.addArrayFootPrints();		
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
		this.timerToHint(dt);
	}
	
	
}