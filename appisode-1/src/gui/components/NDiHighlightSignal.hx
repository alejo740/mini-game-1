package gui.components;

import flambe.display.Texture;

/**
 * ...
 * @author Edwin Cobos
 */
class NDiHighlightSignal extends NDiImage
{
	private var elapsedTime:Float;
	private var highlightSignalDirection:Bool = true;
	private var correctTexture:Texture;
	private var wrongTexture:Texture;
	private var normalTexture:Texture;
	private var elapsedTimePause:Float;
	private var totalTimePause:Float;
	
	public var showNormal:Bool;	
	public var isPaused:Bool;

	public function new(texture:Texture, textureCorrect:Texture, textureWrong:Texture, isNormal:Bool = true) 
	{
		super(texture);
		this.normalTexture = texture;
		this.correctTexture = textureCorrect;
		this.wrongTexture = textureWrong;
		this.elapsedTime = 0;
		this.elapsedTimePause = 0;
		this.totalTimePause = 1.5;
		this.highlightSignalDirection = true;
		this.isPaused = false;
		this.showNormal = isNormal;
	}
	
	public function showCorrectTexture()
	{
		if (this.correctTexture == null)
			return;
			
		this.image.texture = this.correctTexture;
		this.pause();
		this.transform.alpha._ = 1;		
		this.image.centerAnchor();
	}
	
	public function showWrongTexture()
	{
		if (this.wrongTexture == null)
			return;
			
		this.image.texture = this.wrongTexture;
		this.pause();
		this.transform.alpha._ = 1;
		this.image.centerAnchor();
	}
	
	public function showNormalTexture()
	{	
		this.elapsedTimePause = 0;
		this.isPaused = false;
		this.image.texture = this.normalTexture;
		this.image.centerAnchor();		
		
		if (!this.showNormal)
			this.transform.visible = false;
		else
			this.transform.visible = true;
	}
	
	public function pause()
	{
		this.elapsedTimePause = 0;
		this.isPaused = true;		
	}
	
	private function highlightTempTimer(dt:Float):Void
	{
		if (!this.transform.visible || !this.isPaused )
			return;
			
		if (this.elapsedTimePause >= this.totalTimePause)
		{			
			this.elapsedTimePause = 0;
			this.isPaused = false;
			this.showNormalTexture();
		}
		this.elapsedTimePause += dt;
	}
	
	private function highlightSignalTimer(dt:Float):Void
	{
		if (!this.transform.visible || this.isPaused || !this.showNormal)
			return;
			
		//trace("HIGLIGHT");
		this.transform.alpha._ = this.elapsedTime;
		
		if (this.elapsedTime > 1)
		{
			highlightSignalDirection = false;
		}else if (this.elapsedTime < 0) {
			highlightSignalDirection = true;
		}
		
		if (highlightSignalDirection)
		{
			this.elapsedTime += dt * 1.6;
		}else {
			this.elapsedTime -= dt * 1.6;
		}
	}
	
	public function toggleHide()
	{
		if (this.transform.visible)
		{
			this.transform.visible = false;
		}else {
			this.elapsedTime = 0;
			this.transform.alpha._ = this.elapsedTime;
			this.transform.visible = true;
		}
	}
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
		this.highlightSignalTimer(dt);
		this.highlightTempTimer(dt);
	}
	
}