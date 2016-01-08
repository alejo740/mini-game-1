package util;
import math.NDiVector2D;
import flambe.Component;
import flambe.display.Sprite;
import flambe.Entity;

/**
 * Class to define the basic structure of line
 * @author Edwin Cobos
 */
class NDiLine extends Component
{
	
	public var nameLine:String;
	public var startingPoint:NDiVector2D;
	public var endingPoint:NDiVector2D;
	public var transform:Sprite;
	public var distance:Float;
	public var entity:Entity;	
	
	private var line:Sprite;

	public function new(point0:NDiVector2D, point1:NDiVector2D):Void
	{
		this.startingPoint = point0;
		this.endingPoint = point1;
		this.nameLine = this.name;		
		this.transform = new Sprite();
		this.distance = NDiVector2D.getDistance(this.startingPoint, this.endingPoint);
	}
	
	public function setStartingPoint(newPos:NDiVector2D)
	{
		this.startingPoint = newPos;		
		this.updateLine();
	}
	public function setEndingPoint(newPos:NDiVector2D)
	{
		this.endingPoint = newPos;		
		this.updateLine();
	}
	
	private function updateLine()
	{
		this.line.x._ = this.startingPoint.x;
		this.line.y._ = this.startingPoint.y;
		this.distance = NDiVector2D.getDistance(this.startingPoint, this.endingPoint);
		this.line.rotation._ = NDiVector2D.getAngle(this.startingPoint, this.endingPoint);		
	}
	
	public function getLine():Sprite 
	{
		return this.line;
	}
	
	public function addToEntity():Entity
	{
		this.entity = new Entity();
		this.entity.add(this);
		return this.entity;
	}
	
	
	
	
}