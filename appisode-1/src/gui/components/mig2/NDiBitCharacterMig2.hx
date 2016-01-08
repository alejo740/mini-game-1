package gui.components.mig2;

import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButtonFillText;
import gui.components.NDiHighlightSignal;
import gui.components.NDiImage;
import managers.NDiResourcesManager;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiBitCharacterMig2 extends Component
{
	public var highlightSignal:NDiHighlightSignal;		
	public var footBitArea:NDiButtonFillText;	
	public var character:NDiImage;
	public var originalPosition:NDiVector2D;
	public var transform:Sprite;
	
	

	public function new() 
	{
		this.transform = new Sprite();
		this.originalPosition = new NDiVector2D(0, 0);
		this.character = new NDiImage(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/bit"));
		this.highlightSignal = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig2/highlightFootNormal"),
		null, null);
		this.highlightSignal.transform.x._ = -85;
		this.highlightSignal.transform.y._ = 0;
		this.highlightSignal.transform.alpha._ = 0; 
		
		this.footBitArea = new NDiButtonFillText(0x000000, 65, 65);
		this.footBitArea.nameButton = "CLICK_FOOT";
		this.footBitArea.text.text = "Click here";
		this.footBitArea.x._ = -95;
		this.footBitArea.y._ = 0;
		this.footBitArea.alpha._ = 0.0;
		this.footBitArea.text.setAnchor(0, 0);
	}
	
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		this.owner.add(this.transform);
		this.owner.addChild(new Entity().add(this.highlightSignal));
		this.owner.addChild(new Entity().add(this.character));
		this.owner.addChild(new Entity().add(this.footBitArea));
	}
	
}