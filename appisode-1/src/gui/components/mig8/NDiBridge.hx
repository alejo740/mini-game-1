package gui.components.mig8;

import flambe.display.Texture;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import gui.components.NDiHighlightSignal;
import managers.NDiResourcesManager;

/**
 * ...
 * @author Edwin
 */
class NDiBridge extends NDiButton
{
	public var railIndex:Int;
	public var groupIndex:Int;
	
	public var highlight:NDiHighlightSignal;
	
	public function new(texture:Texture) 
	{
		super(texture);
		
		this.highlight = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/railCorrect"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/railCorrect"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig8/railWrong"));
		this.highlight.transform.visible = false;		
		
		this.highlight.transform.disablePointer();
		this.highlight.showNormal = false;
		//this.highlight.resetAnchor();
		
	}
	
	public function centerHotspot()
	{
		//this.highlight.resetAnchor();
		var dif:Float = this.highlight.image.getNaturalHeight() - this.getNaturalHeight();
		dif = Math.abs(dif);
		this.highlight.transform.y._ = this.highlight.image.getNaturalHeight() * 0.5;
		this.highlight.transform.y._ -= dif * 0.5;
		
		dif = this.highlight.image.getNaturalWidth() - this.getNaturalWidth();
		dif = Math.abs(dif);
		this.highlight.transform.x._ = this.highlight.image.getNaturalWidth() * 0.5;
		this.highlight.transform.x._ -= dif * 0.5;
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(new Script());
		var f1:CallFunction = new CallFunction(function() {
			//this.highlight.transform.x._ = this.x._;
			//this.highlight.transform.y._ = this.y._;
			this.centerHotspot();
			this.owner.addChild(new Entity().add(this.highlight));
			
			this.setOnTop();
		});
		var seq1:Sequence = new Sequence([new Delay(0.05), f1]);
		this.owner.get(Script).run(seq1);
		
	}
	
	override public function onRemoved()
	{
		this.highlight.owner.dispose();
		this.owner.dispose();		
		super.onRemoved();		
	}
	
	public function setOnTop()
	{
		var tmpEntity:Entity = this.owner.parent;
		tmpEntity.removeChild(this.owner);
		tmpEntity.addChild(this.owner);
	}
}