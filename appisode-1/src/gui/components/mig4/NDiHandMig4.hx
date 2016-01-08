package gui.components.mig4;

import flambe.Component;
import flambe.display.Texture;
import flambe.display.Sprite;
import flambe.Entity;
import flambe.script.Script;
import gui.components.NDiButton;
import gui.components.NDiHighlightSignal;
import managers.NDiResourcesManager;
import globals.NDiGameConstants;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin
 */
class NDiHandMig4 extends Component
{
	public var normalState:NDiButton;
	public var correctState:NDiButton;
	public var highlight:NDiHighlightSignal;
	
	public var transform:Sprite;

	public function new()
	{
		this.transform = new Sprite();

		this.normalState = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig4/hand"));
		this.normalState.centerAnchor();

		this.correctState = new NDiButton(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig4/handWithRuler"));
		this.correctState.centerAnchor();
		
		this.highlight = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig4/hand_highlight"),
												NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig4/handWithRuler_highlight"), 
												null);
		this.highlight.image.centerAnchor();
		this.highlight.transform.disablePointer();
	}

	public function setInitialState()
	{
		this.normalState.visible = true;
		this.correctState.visible = false;
		this.highlight.transform.visible = false;
	}

	public function setWrongState()
	{
		this.normalState.visible = true;
		this.correctState.visible = false;
		this.highlight.transform.visible = true;
		this.highlight.showNormalTexture();
	}

	public function setRightState()
	{
		this.normalState.visible = false;
		this.correctState.visible = true;
		this.highlight.transform.visible = true;
		this.highlight.showCorrectTexture();
	}

	override public function onAdded():Void
    {
		super.onAdded();

		this.owner.add(new Script());
		this.owner.add(this.transform);
		
		this.owner.addChild(new Entity().add(this.highlight));		
		this.owner.addChild(new Entity().add(this.normalState));
		this.owner.addChild(new Entity().add(this.correctState));
	}
}
