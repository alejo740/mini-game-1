package gui.components.mig3;

import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import gui.components.NDiHighlightSignal;
import gui.components.NDiImage;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiFootprintBitMig3 extends Component
{
	public var footprint:NDiButton;
	public var hotspot:NDiHighlightSignal;
	
	public var transform:Sprite;

	public function new() 
	{
		this.transform = new Sprite();		
		
		this.footprint = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig3/foot"));
		this.footprint.bottomCenterAnchor();
		//this.footprint.transform.visible = false;		
		
		this.hotspot = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig3/footprintNormal"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig3/footprintCorrect"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig3/footprintWrong"));
		this.hotspot.transform.visible = false;
		this.hotspot.bottomCenterAnchor();
		this.hotspot.transform.disablePointer();
	}
	
	public function centerHotspot()
	{
		this.hotspot.bottomCenterAnchor();
		var dif:Float = this.hotspot.image.getNaturalHeight() - this.footprint.getNaturalHeight();
		dif = Math.abs(dif);
		this.hotspot.transform.y._ = dif*0.5;
		
	}
	
	public function show()
	{
		this.footprint.visible = true;
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
	}
	
}