package managers;
import flambe.sound.Playback;
import flambe.sound.Sound;
import flambe.System;
import globals.NDiGameConstants;
import managers.NDiResourcesManager;
import util.NDiSaveData;

/**
 * NDiTeravision
 * Singleton to manage the audio system.
 * @author Edwin Cobos
 */
class NDiAudioManager
{
	public var enabledSoundEffects:Bool;
	public var enabledSoundBackground:Bool;
	
	private var soundFX:Playback;
	private var soundFXVolume:Float;
	private var backgroundSound:Playback;
	private var backgroundSoundVolume:Float;
	private static var instance:NDiAudioManager;
	
	private function new() 
	{
		
		this.enabledSoundEffects = true;
		this.enabledSoundBackground = true;
		this.backgroundSoundVolume = 1;
		this.soundFXVolume = 1;
	}
	
	/**
	 * Function to change the state of both playbacks(Background sound and Sfx)
	 * @param	value
	 */
	public function setMuteAll(value:Bool)
	{
		this.enabledSoundBackground = !value;
		this.enabledSoundEffects = value;
		
		this.setEnabledSoundEffects();
		this.setEnabledSoundBackground();
	}
	
	/**
	 * Function to enable/disable sound effects
	 */
	public function setEnabledSoundEffects()
	{
		if (this.enabledSoundEffects)
		{
			this.enabledSoundEffects = false;
		}else{
			this.enabledSoundEffects = true;
		}
		NDiSaveData.getInstance().setData(NDiVarsToSave.MUTE_SOUNDS.getName(), this.enabledSoundEffects);
	}
	
	/**
	 * Function to enable/disable bakcground sound.
	 */
	public function setEnabledSoundBackground()
	{
		if (this.backgroundSound == null)
			return;		
			
		trace("setEnabledSoundBackground "+this.enabledSoundBackground);
		if (!this.enabledSoundBackground)
		{
			//PAUSED
			this.backgroundSound.paused = true;
			this.enabledSoundBackground = true;
		}else {
			this.backgroundSound.paused = false;
			this.enabledSoundBackground = false;
		}
		NDiSaveData.getInstance().setData(NDiVarsToSave.MUTE_MUSIC.getName(), !this.enabledSoundBackground);
	}
	
	public function pauseSoundBackground()
	{
		if (this.backgroundSound == null)
			return;	
		trace("pauseSoundBackground");
		this.backgroundSound.paused = true;
		this.enabledSoundBackground = true;
		
		NDiSaveData.getInstance().setData(NDiVarsToSave.MUTE_MUSIC.getName(), !this.enabledSoundBackground);
	}
	
	/**
	 * Function to play a specific sound effect with its volume level
	 * @param	path: The path of the asset into the ASSET_PACKAGE_GENERAL pack
	 * @param	vol: Level volume
	 */
	public function playSoundEffect(path:String, vol:Float = 1)
	{
		
		if (!this.enabledSoundEffects)
			return;
		var newSoundFX:Sound = NDiResourcesManager.loadSound(NDiGameConstants.ASSET_PACKAGE_GENERAL, path);
		vol = vol * this.soundFXVolume;
		this.soundFX = newSoundFX.play(vol);
	}
	
	public function stopSoundEffect()
	{
		if (this.soundFX != null)
		{
			this.soundFX.dispose();			
		}
	}
	
	/**
	 * Function to play a specific background sound
	 * @param	path: The path of the asset into the ASSET_PACKAGE_GENERAL pack
	 */
	public function playSoundBackground(path:String)
	{
		if (this.backgroundSound != null)
		{
			this.backgroundSound.dispose();
			this.backgroundSound = null;
		}
		
		var bgSound:Sound = NDiResourcesManager.loadSound(NDiGameConstants.ASSET_PACKAGE_GENERAL, path);
		this.backgroundSound = bgSound.loop(this.backgroundSoundVolume);
		this.enabledSoundBackground = true;
		this.setEnabledSoundBackground();
	}
	
	
	
	
	
	public static function initInstance():Void
    {
    	if(NDiAudioManager.instance == null)
    	{
    		NDiAudioManager.instance = new NDiAudioManager();
    	}
    }
    
    public static function getInstance():NDiAudioManager
    {
    	return NDiAudioManager.instance;
    }
	
}