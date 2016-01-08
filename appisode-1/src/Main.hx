import flambe.asset.Manifest;
import flambe.debug.FpsDisplay;
import flambe.display.EmitterMold;
import flambe.display.FillSprite;
import flambe.display.Font;
import flambe.display.Sprite;
import flambe.display.TextSprite;
import flambe.Entity;
import globals.NDiGameConstants;
import globals.NDiGameGlobals;
import managers.NDiAudioManager;
import managers.NDiSceneManager;
import managers.NDiResourcesManager;
import managers.NDiLocalizationManager;
import flambe.System;
import flambe.asset.AssetPack;
import managers.NDiScenesController;
import managers.NDiVideoManager;
import util.NDiSaveData;

class Main
{
    private static function main()
    {
        // Wind up all platform-specific stuff!
        System.init();
		
		
		/**
		 * http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/system/System.html#pauseForGCIfCollectionImminent()
		 */
		#if air
		//flash.system.System.gc();
		flash.system.System.pauseForGCIfCollectionImminent();
		#end
		
        // Init singletons.
		NDiSaveData.initInstance();
        NDiGameGlobals.initInstance();
        NDiSceneManager.initInstance();
        NDiResourcesManager.initInstance();
		NDiAudioManager.initInstance();
		NDiLocalizationManager.initInstance();
		NDiScenesController.initInstance();
		NDiVideoManager.initInstance();
		
        // Load initial assets.
        NDiResourcesManager.getInstance().loadAssetPack(NDiGameConstants.ASSET_PACKAGE_CONFIG, null, Main.onLoadConfigAssets);
    }

	public static function onLoadConfigAssets(pack:AssetPack):Void
	{
		NDiGameGlobals.getInstance().initGlobalConfigData();
		NDiLocalizationManager.getInstance().initLocalizationData();

		// Load loading assets.
        NDiResourcesManager.getInstance().loadAssetPack(NDiGameConstants.ASSET_PACKAGE_LOADING, null, Main.onLoadInitialAssets);
	}

	public static function onLoadInitialAssets(pack:AssetPack):Void
	{
		//Display current FPS
		//displayFPS();
		
		/* Loading Scene */
		//NDiSceneManager.getInstance().changeScene(NDI_TYPE_SCENE_MIG2);
		NDiSceneManager.getInstance().changeScene(NDiGameConstants.SCENES_FLOW[0]);
		//NDiScenesController.getInstance().nextScene();
	}
	
	private static function displayFPS()
	{
		//var font:Font = new Font(pack, "Giddyup");
		var font:Font = NDiResourcesManager.loadFont(NDiGameConstants.ASSET_PACKAGE_LOADING, "arial");
		var textSp:TextSprite = new TextSprite(font);
		textSp.align = TextAlign.Right;
		textSp.x._ = System.stage.width-textSp.getNaturalWidth();
		textSp.y._ = System.stage.height-textSp.getNaturalHeight();
		var fpsMeterEntity = new Entity().add(textSp).add(new FpsDisplay());
		System.root.addChild(fpsMeterEntity);
	}	
}
