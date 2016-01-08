package gui.components;

import flambe.animation.Ease;
import flambe.display.FillSprite;
import flambe.Entity;
import math.NDiVector2D;

/**
 * ...
 * @author Edwin
 */
class NDiButtonFill extends FillSprite
{
	public var isSelected:Bool;
	public var nameButton:String;
	private var originalDelta:NDiVector2D;
	private var originalPosition:NDiVector2D;
	private var moveDistance:Float;

	public function new(color:Int, width:Float, height:Float)
	{
		super(color, width, height);
		this.isSelected = false;
		this.nameButton = super.name;
		this.centerAnchor();
		this.originalDelta = new NDiVector2D(0, 0);
		this.originalPosition = new NDiVector2D(0, 0);
		this.moveDistance = 0;
	}
	
	public function resetAnchor()
	{
		this.setAnchor(0, 0);
	}
	public function bottomCenterAnchor()
	{
		this.setAnchor(this.getNaturalWidth() * 0.5, this.getNaturalHeight());
		
	}
	
	public function getOriginalDelta():NDiVector2D
	{
		return this.originalDelta;
	}
	
	public function setOriginalDelta(x:Float, y:Float)
	{
		this.originalDelta.x = x;
		this.originalDelta.y = y;
	}
	
	
	
	public function getOriginalPosition():NDiVector2D
	{
		return this.originalPosition;
	}
	
	public function setOriginalPosition(x:Float, y:Float)
	{
		this.originalPosition.x = x;
		this.originalPosition.y = y;
	}
	
	public function updateMoveDistance(newPosition:NDiVector2D)
	{
		this.moveDistance = NDiVector2D.getDistance(this.originalPosition,newPosition);
	}
	
	public function getMoveDistance():Float
	{
		return this.moveDistance;
	}
	
	
	
	
	public function setOnTop()
	{
		var tmpEntity:Entity = this.owner.parent;
		tmpEntity.removeChild(this.owner);
		tmpEntity.addChild(this.owner);
	}
	
	public function animationPressed()
	{
		this.scaleX.animateTo(0.85, 0.2, Ease.linear);
		this.scaleY.animateTo(0.85, 0.2, Ease.linear);		
	}
	
	public function animationRelease()
	{
		this.scaleX.animateTo(1, 0.2, Ease.linear);
		this.scaleY.animateTo(1, 0.2, Ease.linear);
	}
	
	override public function onAdded():Void
    {
		super.onAdded();				
	}
	
}