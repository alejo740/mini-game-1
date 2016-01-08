package gui.scenes;
import flambe.animation.Ease;
import flambe.Entity;
import flambe.script.CallFunction;
import flambe.script.Delay;
import flambe.script.Script;
import flambe.script.Sequence;
import globals.NDiGameConstants;
import gui.components.NDiControlPanel;
import gui.popups.mig8.NDiVideoPopup;
import managers.NDiAudioManager;
import managers.NDiScenesController;
import managers.NDiVideoManager;

/**
 * ...
 * @author Edwin
 */
class NDiVideoScene extends NDiAbstractScene
{
	private var videoPopup:NDiVideoPopup;
	private var controlPanel:NDiControlPanel;
	
	public function new() 
	{
		super();
		this.videoPopup = new NDiVideoPopup();
		this.controlPanel = new NDiControlPanel();
		//trace("VIDEO-- "+NDiScenesController.getInstance().currentScene);
		//trace("VIDEO-- "+NDiGameConstants.SCENES_FLOW[NDiScenesController.getInstance().currentScene]);
	}
	
	public function showVideoPopup()
	{		
		var indexVideo:Int = NDiScenesController.getInstance().countVideos;
		this.videoPopup.setup( NDiGameConstants.VIDEO_SCENES_URL[indexVideo] );
		
		this.owner.addChild(new Entity().add(this.videoPopup));
		
		this.videoPopup.loadVideo(NDiGameConstants.VIDEO_SCENES_URL[indexVideo]);		
	}
	
	override public function onAdded():Void
    {		
		this.owner.add(new Script());
		this.showVideoPopup();
		this.owner.addChild(new Entity().add(this.controlPanel));
		
		super.onAdded();				
    }
	
	override public function onUpdate(dt:Float):Void
	{
		super.onUpdate(dt);
	}
	
}