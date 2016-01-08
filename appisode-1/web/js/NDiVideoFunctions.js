/**
 * ...
 * @author Edwin Cobos
 */

(function() {
	console.log("FLAMBE...###");	
})();
/* GLOBALS */
var video = null;
var canvas = null;

/* INIT */
$( document ).ready(function() {
    console.log( "ready!" );
	
	$("#contentVideo").hide();
	video = document.querySelector('#contentVideo video');
	canvas = document.querySelector('#contentGame-canvas');	
	video.addEventListener('ended', endingVideoPlayer, false);
	video.addEventListener('pause', pauseVideoPlayer, false);
	video.addEventListener('canplay', startingVideoPlayer, false);
	
	
});

/*Functions to video control*/
function showVideoTag(url)
{
	console.log("showVideoTag"); 
	$("#contentVideo").show();
	//$("#contentGame").hide();
	
	video.pause();
    video.src = null;
	video.src = url;
	//video.load();
	video.play();
}

function pauseVideo()
{
	if(!video.paused)
	{
		video.pause();		
	}
}

function playVideo()
{
	if(video.paused)
	{
		video.play();
		flambePauseVideo();
	}	
}

function stopVideo()
{
	if(!video.paused)
	{
		video.pause();
		video.src = null;
		$("#contentVideo").hide();
	}	
}

function endingVideoPlayer(e)
{
	$("#contentVideo").hide();
	flambeBackToGame();
}
function startingVideoPlayer(e)
{	
	flambeStartVideo();
}

function pauseVideoPlayer(e)
{	
	flambePauseVideo();
}

/*Functions to linkage flambe*/
function flambeBackToGame(){}
function flambeStartVideo(){}
function flambePauseVideo(){}


