package gui.components.mig2;

import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiHighlightSignal;
import gui.components.NDiImage;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiFootprintBitMig2 extends Component
{
	public var footprint:NDiImage;
	public var hotspot:NDiHighlightSignal;
	
	public var transform:Sprite;

	public function new()
	{
		this.transform = new Sprite();		
		
		this.footprint = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/footprint"));
		this.footprint.transform.visible = false;
		
		this.hotspot = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/footprintCue"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/footprintCorrect"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/footprintWrong"));
		this.hotspot.transform.visible = false;
	}
	
	public function show()
	{
		this.footprint.transform.visible = true;
		this.hotspot.transform.visible = true;
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