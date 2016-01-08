package factories;
import globals.NDiGameConstants.NDiTypeScene;
import gui.scenes.NDiAbstractScene;
import gui.scenes.NDiEndStoryScene;
import gui.scenes.NDiGameScene;
import gui.scenes.NDiMig1Scene;
import gui.scenes.NDiMig2Scene;
import gui.scenes.NDiMig3Scene;
import gui.scenes.NDiMig4Scene;
import gui.scenes.NDiMig5Scene;
import gui.scenes.NDiMig6Scene;
import gui.scenes.NDiMig7Scene;
import gui.scenes.NDiMig8Scene;
import gui.scenes.NDiPlayScene;
import gui.scenes.NDiTestScene;
import gui.scenes.NDiVideoScene;


/**
 * NDiTeravision
 * @author Edwin Cobos
 */
class NDiSceneFactory
{
	public static function createScene(sceneType:NDiTypeScene):NDiAbstractScene
	{
		var newScene:NDiAbstractScene = null;

		if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_TEST)
		{
			newScene = new NDiTestScene();
		
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_PLAY)
		{
			newScene = new NDiPlayScene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_VIDEO)
		{
			newScene = new NDiVideoScene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG1)
		{
			newScene = new NDiMig1Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG2)
		{
			newScene = new NDiMig2Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG3)
		{
			newScene = new NDiMig3Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG4)
		{
			newScene = new NDiMig4Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG5)
		{
			newScene = new NDiMig5Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG6)
		{
			newScene = new NDiMig6Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG7)
		{
			newScene = new NDiMig7Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_MIG8)
		{
			newScene = new NDiMig8Scene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_END_STORY)
		{
			newScene = new NDiEndStoryScene();
		}else if(sceneType == NDiTypeScene.NDI_TYPE_SCENE_GAME)
		{
			newScene = new NDiGameScene();
		}
		
		if (newScene != null)
		{
			newScene.type = sceneType;
		}
		
		return newScene;
	}
}