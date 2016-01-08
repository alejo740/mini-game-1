package gui.components;

import flambe.display.Sprite;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import flambe.swf.Library;
import flambe.swf.MoviePlayer;

/**
 * ...
 * @author Edwin
 */
class NDiAnimationMovie extends MoviePlayer
{
	public var transform:Sprite;
	public var animationName:String;
	public var libraryAnimation:Library;
	
	public function new(lib:Library, name:String) 
	{
		this.libraryAnimation = lib;
		super(lib);
		this.transform = new Sprite();
		this.animationName = name;
	}
	
	public function hide()
	{
		this.transform.visible = false;
	}
	
	public function animationIdle(isLoop:Bool = true, time:Float = 0, posfix:String = "_idle", func:Dynamic->Void = null, param1:Dynamic = null)
	{
		this.loop(this.animationName +"" + posfix);		
		if (!isLoop)
		{
			var f1:CallFunction = new CallFunction(function() {
				this.delete();
				if (func != null)
				{ 
					func(param1);
				}
			});
			
			var seq1:Sequence = new Sequence([new Delay(time), f1]);
			this.owner.get(Script).run(seq1);
		}
	}
	
	public function animationCreate(posfix:String = "_create")
	{
		this.transform.visible = true;
		this.play(this.animationName +"" + posfix);		
	}
	
	public function animationDisappear(posfix:String = "_disappear")
	{
		this.transform.visible = true;
		this.play(this.animationName +"" + posfix);
		var f1:CallFunction = new CallFunction(function() {
			this.delete();			
		});
		var seq1:Sequence = new Sequence([new Delay(0.5), f1]);
		this.owner.get(Script).run(seq1);
		
	}
	
	override public function onAdded():Void
    {
		super.onAdded();
		this.owner.add(this.transform);
		this.owner.add(new Script());
		
	}
	
	public function delete():Void
	{		
		this.owner.dispose();
	}
	
}