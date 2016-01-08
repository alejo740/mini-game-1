package globals;
import math.NDiVector2D;

enum NDiTypeScene
{
	NDI_TYPE_SCENE_NONE;
	NDI_TYPE_SCENE_LOADING;
	NDI_TYPE_SCENE_TEST;
	NDI_TYPE_SCENE_PLAY;
	NDI_TYPE_SCENE_VIDEO;	
	NDI_TYPE_SCENE_MIG1;
	NDI_TYPE_SCENE_MIG2;
	NDI_TYPE_SCENE_MIG3;
	NDI_TYPE_SCENE_MIG4;
	NDI_TYPE_SCENE_MIG5;
	NDI_TYPE_SCENE_MIG6;
	NDI_TYPE_SCENE_MIG7;
	NDI_TYPE_SCENE_MIG8;
	NDI_TYPE_SCENE_END_STORY;
	NDI_TYPE_SCENE_GAME;
}

enum NDiVarsToSave
{
	MUTE_MUSIC;
	MUTE_SOUNDS;
}

class NDiGameConstants
{
    /* ASSET PACKAGES */
    public static var ASSET_PACKAGE_CONFIG:String = "config";
    public static var ASSET_PACKAGE_LOADING:String = "assets_loading";
    public static var ASSET_PACKAGE_GENERAL:String = "assets_general";

	// CONFIG ASSETS.
	public static var CONFIG_ASSET_CONFIG_XML = "Config.xml";
	public static var CONFIG_ASSET_LOCALIZATION_XML = "Localization.xml";
	public static var CONFIG_ASSET_CREDITS_XML = "Credits.xml";
	
	/* VARS TO SAVE */
	public static var ARRAY_VARS_TO_SAVE:Array<NDiVarsToSave> = NDiVarsToSave.createAll();
	public static var ARRAY_VARS_INIT_VALUES:Array<Dynamic> = [
		true,
		true
	];

	/* Loading Package */
	public static var BACKGROUND_LOADING:String = "loading_bg";
	public static var BAR_LOADING:String = "loading_bar";
	public static var ICON_BAR_LOADING:String = "loading_icon";
	
	/* General Package */
	public static var PRELOADING:String = "images/shared/preloader";
	

	/* GAME VARS */
	public static var GAME_WIDTH:Float = 960;
	public static var GAME_HEIGHT:Float = 560;
	public static var SCENES_FLOW:Array<NDiTypeScene> = [
		//NDiTypeScene.NDI_TYPE_SCENE_END_STORY,//to debug
		NDiTypeScene.NDI_TYPE_SCENE_PLAY,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG1,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG2,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG3,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG4,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG5,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG6,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG7,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_MIG8,
		NDiTypeScene.NDI_TYPE_SCENE_VIDEO,
		NDiTypeScene.NDI_TYPE_SCENE_END_STORY,		
	];
	public static var VIDEO_SCENES_URL:Array<String> = [
	/*
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/01.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/02.mp4",		
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/03.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/04.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/05.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/06.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/07.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/08.mp4",
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/09.mp4",		
		"http://teravisiongames.com/UMIGO/appisode1/2014-03-04/web/video/10.mp4",//"url video MUSIC:...",
	*/
	
		"video/mig01.mp4",
		"video/mig02.mp4",		
		"video/mig03.mp4",
		"video/mig04.mp4",
		"video/mig05.mp4",
		"video/mig06.mp4",
		"video/mig07.mp4",
		"video/mig08.mp4",		
		"video/mig09.mp4",
		//"video/mig11.mp4",//"url video MUSIC:...",
		//"video/mig10.mp4",// MIG8 GAPS
	];
	
	public static var VIDEO_MIG8_GAPS:String = "video/mig10.mp4";
	public static var VIDEO_MUSIC:String = "video/mig11.mp4";
	
	/* SOUNDS */
	public static var ARRAY_SOUNDS:Map<String, String> = [
		"MIG1-Intro" => "sounds/401_BEAN_04",
		"MIG2-Intro" => "sounds/401_BIT_09",
		"MIG3-Intro" => "sounds/401_BEAN_17",
		"MIG4-Intro" => "sounds/401_BIT_25",
		"MIG5-Intro" => "sounds/401_BEAN_40",
		"MIG6-Intro" => "sounds/401_DIZZY_48",
		"MIG7-Intro" => "sounds/401_BEAN_56",
		"MIG8-Intro" => "sounds/401_BEAN_72",
		"MIG8-UMI-Appear" => "sounds/401_BEAN_MIG07_line01",
		"MIG8-Finish-Measure" => "sounds/401_BEAN_92",
		"MIG8-Finish-Gap" => "sounds/401_DIZZY_93",
		"MIG8-Way-Continue" => "sounds/401_ALL_128",
		"ANY_MIG-PositiveReaction" => "sounds/401_correct_placement02",//empty
		"ANY_MIG-NegativeReaction" => "sounds/401_incorrect_placement02",
		"ANY_MIG-GoodJob" => "sounds/401_BEAN_160",
		"THEME_1" => "sounds/TutorialTheme",
	];
	
	
	/* CONFIG MIG-3 */
	public static var ARRAY_FOOTPRINT_POSITIONS_MIG2:Array<NDiVector2D> = [
		new NDiVector2D(288.36276434361935, 15),
		new NDiVector2D(258.75698492862284, -39.208029164001346),
		new NDiVector2D(420.8521481771022, -73.86841956758872),
		new NDiVector2D(222.83293985761702, -123.73417027993128),
		new NDiVector2D(330.48288679495454, -140.18417065870017),
		new NDiVector2D(383.94224318675697, -192.42996530374512),
		new NDiVector2D(295.5805439129472, -206.74984232755378),
		new NDiVector2D(170.2388345319778, -210.59795891679823),
		new NDiVector2D(229.25701593980193, -248.2582422089763),
		new NDiVector2D(355.841113967821, -320.89749272959307),
	];
	
	public static var ARRAY_PATH_TEXTURE_ITEMS:Array<String> = [
		"images/mig4/objFinal",		
		"images/mig4/obj4",		
		"images/mig4/obj3",
		"images/mig4/obj2",		
		"images/mig4/obj1",
		"images/mig4/obj5",
	];
	
	
	/* CONFIG MIG-7 */
	public static var ARRAY_ASSETS_ROBOT:Array<String> = [
		"r1",
		"r2",
		"r3",		
		"r4",
		"r5",
		"r6",
		"r7",
		"r8",
		"r9",
		"r10",
		"r11",
		"r12",
		"r13",
		"r14",
		"r15",
	];
	/*
	public static var ARRAY_CORRECT_ORDER_ROBOT:Array<String> = [
		"r3",
		"r2",
		"r1",
	];
	*/
	
	
	
	/* CONFIG MIG-8 */
	public static var ARRAY_CONFIG_POSITION_GAPS:Array<NDiVector2D> = [
		new NDiVector2D(410, 549),
		new NDiVector2D(549, 549),	
	];
	public static var ARRAY_CONFIG_UNITS_GAPS:Array<Int> = [
		4,
		9,
		4,
		5
	];
	public static var ARRAY_ANSWERS:Array<Array<Int>> = [
		[1, 3, 5, 6],//2		
		[1, 3, 10, 12],//3
		[1, 2, 3, 5],//4
		[1, 2, 3, 6],//5
	];
	
	
	/* CONFIG FINAL GAME*/
	public static var ARRAY_LEVELS_CONFIG:Array < Map < String, Dynamic >> =
	[
		//Level 0
		[
			"TOTAL_GAPS" => 6,
			"ARRAY_CONFIG_POSITION_GAPS" => [
				new NDiVector2D(137, 549), 
				new NDiVector2D(274, 549),
				new NDiVector2D(411, 549),
				new NDiVector2D(548, 549),
				new NDiVector2D(685, 549),
				new NDiVector2D(822, 549),
			],
			"ARRAY_CONFIG_UNITS_GAPS" => [2, 4, 5, 7, 8, 10],
			"ARRAY_ANSWERS" => [
				[1, 3, 5, 6],//2				
				[1, 2, 3, 5],//4
				[4, 2, 3, 8],//5
				[4, 1, 3, 10],//7
				[4, 2, 3, 9],//8
				[5, 2, 3, 12],//10
			]
		],
		/*
		//Level 1
		[
			"TOTAL_GAPS" => 3,
			"ARRAY_CONFIG_POSITION_GAPS" => [
				new NDiVector2D(240, 549), 
				new NDiVector2D(480, 549),
				new NDiVector2D(720, 549)
			],
			"ARRAY_CONFIG_UNITS_GAPS" => [3, 10, 7],
			"ARRAY_ANSWERS" => [
				[1, 2, 5, 7],//3
				[1, 3, 5, 12],//10		
				[2, 5, 3, 9],//7
			]
		]
		*/
	];
	
}
