package gui.components;

import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiRulerUnit extends Component
{
	public var footprint:NDiImage;
	public var hotspot:NDiHighlightSignal;
	public var clickArea:NDiButtonFill;
	public var transform:Sprite;
	public var originalPosition:NDiVector2D;
	public var isBlocked:Bool;

	public function new(isHotspot:Bool = false) 
	{
		this.transform = new Sprite();		
		
		this.clickArea = new NDiButtonFill(0x000000, 50, 50);
		this.clickArea.alpha._ = 0.0;
		this.footprint = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/ruler"));
		//this.footprint.transform.visible = false;		
		if (isHotspot)
		{
			this.hotspot = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/rulerHotspot"),
			NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/rulerHighlightCorrect"),
			NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/rulerHighlightWrong"));
		}else {
			this.hotspot = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/rulerHighlight"),
			NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/rulerHighlightCorrect"),
			NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/shared/rulerHighlightWrong"));
		}
		
		this.hotspot.transform.visible = false;
		
		this.hotspot.transform.disablePointer();
		this.originalPosition = new NDiVector2D(0, 0);
		this.isBlocked = false;
	}
	
	public function setOriginalPosition()
	{
		this.originalPosition.x = this.transform.x._;
		this.originalPosition.y = this.transform.y._;
	}
	
	public function returnPosition()
	{
		this.transform.x._ = this.originalPosition.x;
		this.transform.y._ = this.originalPosition.y;
		this.hotspot.showNormalTexture();
	}
	
	public function centerHotspot()
	{
		this.hotspot.bottomCenterAnchor();
		var dif:Float = this.hotspot.image.getNaturalHeight() - this.footprint.image.getNaturalHeight();
		dif = Math.abs(dif);
		this.hotspot.transform.y._ = dif*0.5;
	}
	
	public function show()
	{
		this.footprint.transform.visible = true;
		this.hotspot.transform.visible = true;
		this.transform.visible = true;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();		
		this.owner.add(new Script());
		this.owner.add(this.transform);
		
		this.owner.addChild(new Entity().add(this.hotspot));
		this.owner.addChild(new Entity().add(this.footprint));
		this.owner.addChild(new Entity().add(this.clickArea));
	}
	
}