package util;
import flambe.Component;

/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiTimer extends Component
{
	private var elapsedTime:Float;
	private var func:Void->Void;
	private var interval:Float;
	
	public function new(functionParam:Void->Void, intervalParam:Float)
	{
		this.elapsedTime = 0;
		this.func = functionParam;
		this.interval = intervalParam;
	}
	
	override public function onUpdate(dt:Float):Void
	{
		this.elapsedTime += dt;
		if (this.elapsedTime >= this.interval)
		{
			this.func();
			this.elapsedTime = 0;
		}		
	}
	
}