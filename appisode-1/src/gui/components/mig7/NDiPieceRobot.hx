package gui.components.mig7;

import flambe.Component;
import flambe.display.Sprite;
import flambe.display.Texture;
import flambe.Entity;
import flambe.script.Script;
import globals.NDiGameConstants;
import gui.components.NDiButton;
import gui.components.NDiHighlightSignal;
import managers.NDiResourcesManager;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin
 */
class NDiPieceRobot extends Component
{
	
	public var size:Int;
	public var isPlaced:Bool;
	public var piece:NDiButton;
	public var highlight:NDiHighlightSignal;
	public var transform:Sprite;
	
	public function new(texture:Texture, sizePiece:Int) 
	{
		//super(texture);
		this.transform = new Sprite();
		this.piece = new NDiButton(texture);
		isPlaced = false;
		this.piece.setOriginalPosition(0, 0);
		this.size = sizePiece;
		if (this.size == 1)
		{
			this.createSingleHighlight();
		}else {
			this.createDoubleHighlight();
		}
		this.centerHightlight();
		this.highlight.transform.disablePointer();
		this.highlight.transform.visible = false;		
	}
	
	public function hideHiglight()
	{
		if (!this.highlight.transform.visible)
			return;
			
		this.highlight.transform.visible = false;
	}
	
	public function showCorrectHighlight()
	{
		this.highlight.showNormal = false;
		this.highlight.toggleHide();
		this.highlight.showCorrectTexture();
	}
	
	public function showIncorrectHighlight()
	{
		this.highlight.showNormal = false;
		this.highlight.toggleHide();
		this.highlight.showWrongTexture();
	}
	
	private function centerHightlight()
	{
		//this.highlight.bottomCenterAnchor();
		//this.highlight.transform.x._ = -this.piece.getNaturalWidth() * 0.5;
		this.highlight.transform.y._ = -this.piece.getNaturalHeight() * 0.5;
	}
	
	private function createSingleHighlight()
	{
		this.highlight = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig7/pieces/smalobj_highlight"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig7/pieces/smalobj_correct"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig7/pieces/smalobj_incorrect"));
	}
	
	private function createDoubleHighlight()
	{
		this.highlight = new NDiHighlightSignal(NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig7/pieces/bigobj_highlight"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig7/pieces/bigobj_correct"),
		NDiResourcesManager.loadImage(NDiGameConstants.ASSET_PACKAGE_GENERAL, "images/mig7/pieces/bigobj_incorrect"));
	}
	
	override public function onAdded():Void
    {
		this.owner.add(this.transform);
		this.owner.add(new Script());
		this.owner.addChild(new Entity().add(this.highlight));
		this.owner.addChild(new Entity().add(this.piece));		
		super.onAdded();
	}
	
}